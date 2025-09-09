import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import NavBar from "../Navbar/Navbar";
import "./ProdDetails.css";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { ref, getDownloadURL } from "firebase/storage";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export default function ProdDetails() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { watch: passedWatch } = state || {};
  const { code } = useParams();
  const [watch, setWatch] = useState(passedWatch);
  const [t, i18n] = useTranslation();
  const [imageIndex, setImageIndex] = useState(0);
  const [addedToCart, setAddedToCart] = useState(() => {
    return JSON.parse(localStorage.getItem("orders")) || [];
  });
  const [zoomPosition, setZoomPosition] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (passedWatch) {
      fetchImageUrls(passedWatch.images || []);
      setLoading(false);
    }
  }, [passedWatch]);

  const fetchImageUrls = async (imagePaths) => {
    try {
      const urls = await Promise.all(
        imagePaths.map(async (path) => {
          try {
            const imageRef = ref(storage, path);
            return await getDownloadURL(imageRef);
          } catch (error) {
            console.error("Error fetching image URL:", path, error);
            return null;
          }
        })
      );
      setImageUrls(urls.filter((url) => url !== null));
    } catch (error) {
      console.error("Error fetching image URLs:", error);
      setImageUrls([]);
    }
  };

  useEffect(() => {
    if (!passedWatch && code) {
      const fetchProduct = async () => {
        try {
          setLoading(true);
          setError(null);

          const docRef = doc(db, "watches", code);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const watchData = { id: docSnap.id, ...docSnap.data() };
            setWatch(watchData);
            await fetchImageUrls(watchData.images || []);
            setLoading(false);
          } else {
            console.warn("No such document in Firestore for code:", code);
            setError("Product not found.");
            setLoading(false);
          }
        } catch (error) {
          console.error("Failed to load product from Firestore:", error);
          setError("Failed to load product details. Please try again.");
          setLoading(false);
        }
      };
      fetchProduct();
    }

    let intervalId;
    if (!watch || !watch.discount || !watch.discount.expiresAt) {
      setRemainingTime(null);
      if (intervalId) clearInterval(intervalId);
      return;
    }

    const expiryTimestamp = watch.discount.expiresAt;
    const targetDate = expiryTimestamp.toDate
      ? expiryTimestamp.toDate()
      : new Date(expiryTimestamp);

    const updateCountdown = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        setRemainingTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(intervalId);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setRemainingTime({ days, hours, minutes, seconds });
    };

    updateCountdown();

    intervalId = setInterval(updateCountdown, 1000);

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [watch, code, passedWatch]);

  const handleZoom = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  const handleNextImage = () => {
    setImageIndex((prev) => (prev + 1) % (imageUrls.length || 1));
  };

  const handlePrevImage = () => {
    setImageIndex((prev) =>
      prev === 0 ? (imageUrls.length ? imageUrls.length - 1 : 0) : prev - 1
    );
  };

  const handleAddToCart = () => {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    if (watch?.code && !orders.includes(watch.code)) {
      orders.push(watch.code);
      localStorage.setItem("orders", JSON.stringify(orders));
      setAddedToCart(orders);
    }
  };

  if (loading) {
    return (
      <>
        <NavBar />
        <div className="prodDet container">
          <LoadingSpinner />
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <NavBar />
        <div className="prodDet container">
          <p style={{ color: "red", textAlign: "center" }}>{error}</p>
        </div>
      </>
    );
  }

  if (!watch) {
    return (
      <>
        <NavBar />
        <div className="prodDet container">
          <p style={{ textAlign: "center" }}>
            {t("No product selected or found.")}
          </p>
        </div>
      </>
    );
  }

  // Helper function to get localized or direct value
  const getLocalizedOrDirectValue = (field) => {
    if (typeof field === "object" && field !== null) {
      return field[i18n.language] || field.en || "";
    }
    return field || "";
  };

  return (
    <>
      <Helmet>
        <title>El Sokarya - Details</title>
      </Helmet>
      <NavBar />
      <div className="prodDet container">
        <div className="prodDetInner row">
          <div className="backContainer col-12">
            <button className="backBtn" onClick={() => navigate(-1)}>
              {t("back")}
            </button>
          </div>
          <div className="imgSide col-10 col-lg-5 text-center">
            {imageUrls.length > 0 ? (
              <>
                <div
                  className="zoomContainer"
                  onMouseMove={(e) => handleZoom(e)}
                  onMouseLeave={() => setZoomPosition(null)}
                >
                  <div
                    className="zoomImage"
                    style={{
                      backgroundImage: `url(${imageUrls[imageIndex]})`,
                      backgroundPosition: zoomPosition
                        ? `${zoomPosition.x}% ${zoomPosition.y}%`
                        : "center",
                    }}
                  ></div>
                </div>
                {imageUrls.length > 1 && (
                  <div className="imgNavBtns mt-2">
                    <button onClick={handlePrevImage} className="imgNav">
                      ←
                    </button>
                    <button onClick={handleNextImage} className="imgNav">
                      →
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="image-placeholder">No Images Available</div>
            )}
          </div>

          <div className="textSide col-10 col-lg-5">
            <h3>
              {getLocalizedOrDirectValue(watch.brand)}{" "}
              {getLocalizedOrDirectValue(watch.model)}
            </h3>
            <p>{getLocalizedOrDirectValue(watch.movement)}</p>

            {watch.price?.discount_percentage > 0 && watch.price?.original ? (
              <del>
                <h5 className="price">
                  {watch.price.original} {watch.price.currency}
                </h5>
              </del>
            ) : null}
            <h4 className="dis_price">
              {watch.price?.discount_percentage > 0 && watch.price?.final ? (
                <>
                  {watch.price.final} {watch.price.currency}
                </>
              ) : (
                <>
                  {watch.price?.original} {watch.price.currency}
                </>
              )}
            </h4>
            <h3>
              <strong>{t("features")}</strong>
            </h3>
            <ul>
              {Array.isArray(watch.features?.[i18n.language]) ? (
                watch.features[i18n.language].map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))
              ) : (
                <li>
                  {getLocalizedOrDirectValue(watch.features) ||
                    t("noFeaturesAvailable")}{" "}
                </li>
              )}
            </ul>
            <h3 className="mt-4">
              <strong>{t("details")}</strong>
            </h3>
            <ul>
              {watch.gender && (
                <li>
                  <strong>{t("gender")}:</strong>{" "}
                  {getLocalizedOrDirectValue(watch.gender)}
                </li>
              )}

              {watch.movement && (
                <li>
                  <strong>{t("movement")}:</strong>{" "}
                  {getLocalizedOrDirectValue(watch.movement)}
                </li>
              )}

              {watch.material && (
                <li>
                  <strong>{t("material")}:</strong>{" "}
                  {getLocalizedOrDirectValue(watch.material)}
                </li>
              )}

              {(watch.water_resistance || watch.waterResistant) && (
                <li>
                  <strong>{t("waterResistant")}:</strong>
                  {getLocalizedOrDirectValue(
                    watch.water_resistance || watch.waterResistant
                  )}
                </li>
              )}

              {watch.specs &&
                Object.entries(watch.specs).map(
                  ([key, val]) =>
                    val && (
                      <li key={key}>
                        <strong>{t(key)}:</strong>
                        {getLocalizedOrDirectValue(val)}
                      </li>
                    )
                )}

              {watch.discount?.expiresAt && remainingTime && (
                <li>
                  <strong>{t("discount_valid_until")}:</strong>{" "}
                  {remainingTime.days} {t("days")} {remainingTime.hours}{" "}
                  {t("hours")} {remainingTime.minutes} {t("minutes")}{" "}
                  {remainingTime.seconds} {t("seconds")}
                </li>
              )}
              {"stock" in watch && (
                <li>
                  <strong>{t("stock")}:</strong> {watch.stock}
                </li>
              )}
            </ul>
            <button
              className="toCartBtn"
              onClick={handleAddToCart}
              disabled={addedToCart.includes(watch.code)}
            >
              {addedToCart.includes(watch.code)
                ? t("addedToCart")
                : t("add to cart")}
            </button>
            <button className="toCheckoutBtn">
              <Link to={"/cart"}>{t("checkout")}</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
