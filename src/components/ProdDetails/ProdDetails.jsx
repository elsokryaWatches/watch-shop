import { useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import NavBar from "../Navbar/Navbar";
import "./ProdDetails.css";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export default function ProdDetails() {
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

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (passedWatch) {
      setLoading(false);
    }
  }, [passedWatch]);

  useEffect(() => {
    if (!passedWatch && code) {
      const fetchProduct = async () => {
        try {
          setLoading(true);
          setError(null);

          const docRef = doc(db, "watches", code);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setWatch({ id: docSnap.id, ...docSnap.data() });
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

    if (!watch?.discount?.valid_until) {
      setRemainingTime(null);
      return;
    }

    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + watch.discount.valid_until);

    const updateCountdown = () => {
      const now = new Date();
      const diff = targetDate - now;

      if (diff <= 0) {
        setRemainingTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setRemainingTime({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const intervalId = setInterval(updateCountdown, 1000);

    return () => clearInterval(intervalId);
  }, [watch, code, passedWatch]);

  const handleZoom = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  const handleNextImage = () => {
    setImageIndex((prev) => (prev + 1) % (watch.images?.length || 1));
  };

  const handlePrevImage = () => {
    setImageIndex((prev) =>
      prev === 0
        ? watch.images?.length
          ? watch.images.length - 1
          : 0
        : prev - 1
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

  return (
    <>
      <NavBar />
      <div className="prodDet container">
        <div className="prodDetInner row">
          <div className="imgSide col-10 col-lg-5 text-center">
            <div
              className="zoomContainer"
              onMouseMove={(e) => handleZoom(e)}
              onMouseLeave={() => setZoomPosition(null)}
            >
              <div
                className="zoomImage"
                style={{
                  backgroundImage: `url(${watch.images?.[imageIndex] || ""})`,
                  backgroundPosition: zoomPosition
                    ? `${zoomPosition.x}% ${zoomPosition.y}%`
                    : "center",
                }}
              ></div>
            </div>
            {watch.images?.length > 1 && (
              <div className="imgNavBtns mt-2">
                <button onClick={handlePrevImage} className="imgNav">
                  ←
                </button>
                <button onClick={handleNextImage} className="imgNav">
                  →
                </button>
              </div>
            )}
          </div>

          <div className="textSide col-10 col-lg-5">
            <h3>
              {watch.brand?.[i18n.language] || watch.brand?.en || ""}

              {typeof watch.model === "object"
                ? watch.model?.[i18n.language] || watch.model?.en || ""
                : watch.model || ""}
            </h3>
            <p>{watch.movement?.[i18n.language] || watch.movement?.en || ""}</p>

            {watch.price?.final && (
              <h4 className="text-success">
                {watch.price.final} {watch.price.currency}
              </h4>
            )}
            {watch.price?.original &&
              watch.price.final !== watch.price.original && (
                <del>
                  <p>
                    {watch.price.original} {watch.price.currency}
                  </p>
                </del>
              )}
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
                  {watch.features?.[i18n.language] ||
                    watch.features?.en ||
                    t("noFeaturesAvailable")}{" "}
                </li>
              )}
            </ul>
            <h3 className="mt-4">
              <strong>{t("details")}</strong>
            </h3>
            <ul>
              {watch.gender?.[i18n.language] && (
                <li>
                  <strong>{t("gender")}:</strong> {watch.gender[i18n.language]}
                </li>
              )}

              {watch.movement?.[i18n.language] && (
                <li>
                  <strong>{t("movement")}:</strong>{" "}
                  {watch.movement[i18n.language]}
                </li>
              )}

              {watch.material?.[i18n.language] && (
                <li>
                  <strong>{t("material")}:</strong>{" "}
                  {watch.material[i18n.language]}
                </li>
              )}

              {watch.outer_frame?.[i18n.language] && (
                <li>
                  <strong>{t("outer_frame")}:</strong>{" "}
                  {watch.outer_frame[i18n.language]}
                </li>
              )}

              {(watch.water_resistance?.[i18n.language] ||
                watch.waterResistant?.[i18n.language]) && (
                <li>
                  <strong>{t("waterResistant")}:</strong>{" "}
                  {watch.water_resistance?.[i18n.language] ||
                    watch.waterResistant?.[i18n.language]}
                </li>
              )}

              {watch.specs &&
                Object.entries(watch.specs).map(
                  ([key, val]) =>
                    val?.[i18n.language] && (
                      <li key={key}>
                        <strong>{t(key)}:</strong> {val[i18n.language]}
                      </li>
                    )
                )}

              {watch.discount?.valid_until && remainingTime && (
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
          </div>
        </div>
      </div>
    </>
  );
}
