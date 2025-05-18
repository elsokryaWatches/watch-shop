import { useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import NavBar from "../Navbar/Navbar";
import "./ProdDetails.css";

export default function ProdDetails() {
  const { state } = useLocation();
  const { watch: passedWatch } = state || {};
  const { code } = useParams(); // Get the code from the URL
  const [watch, setWatch] = useState(passedWatch); // Initialize watch with passed state
  const [t, i18n] = useTranslation();
  const [imageIndex, setImageIndex] = useState(0);
  const [addedToCart, setAddedToCart] = useState(() => {
    return JSON.parse(localStorage.getItem("orders")) || [];
  });

  const [zoomPosition, setZoomPosition] = useState(null);

  const handleZoom = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  const [remainingTime, setRemainingTime] = useState(null);

  useEffect(() => {
    if (!passedWatch && code) {
      const fetchProduct = async () => {
        try {
          const response = await fetch(`API/products/${code}.json`);
          const data = await response.json();
          setWatch(data.watch);
        } catch (error) {
          console.error("Failed to load product:", error);
        }
      };
      fetchProduct();
    }

    if (!watch?.discount?.valid_until) return;

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

  const handleNextImage = () => {
    setImageIndex((prev) => (prev + 1) % watch.images.length);
  };

  const handlePrevImage = () => {
    setImageIndex((prev) => (prev === 0 ? watch.images.length - 1 : prev - 1));
  };

  const handleAddToCart = () => {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    if (!orders.includes(watch.code)) {
      orders.push(watch.code);
      localStorage.setItem("orders", JSON.stringify(orders));
      setAddedToCart(orders);
    }
  };

  if (!watch) {
    return <div>No product selected.</div>;
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
                  backgroundImage: `url(${watch.images[imageIndex]})`,
                  backgroundPosition: zoomPosition
                    ? `${zoomPosition.x}% ${zoomPosition.y}%`
                    : "center",
                }}
              ></div>
            </div>
            <div className="imgNavBtns mt-2">
              <button onClick={handlePrevImage} className="imgNav">
                ←
              </button>
              <button onClick={handleNextImage} className="imgNav">
                →
              </button>
            </div>
          </div>

          <div className="textSide col-10 col-lg-5">
            <h3>
              {watch.brand[i18n.language]}{" "}
              {typeof watch.model === "object"
                ? watch.model[i18n.language]
                : watch.model}
            </h3>
            <p>{watch.movement[i18n.language]}</p>

            <h4 className="text-success">
              {watch.price.final} {watch.price.currency}
            </h4>
            <del>
              <p>
                {watch.price.original} {watch.price.currency}
              </p>
            </del>

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
                  {watch.features?.[i18n.language] || t("noFeaturesAvailable")}
                </li>
              )}
            </ul>

            <h3 className="mt-4">
              <strong>{t("details")}</strong>
            </h3>
            <ul>
              {watch.gender && (
                <li>
                  <strong>{t("gender")}:</strong> {watch.gender[i18n.language]}
                </li>
              )}

              {watch.movement && (
                <li>
                  <strong>{t("movement")}:</strong>{" "}
                  {watch.movement[i18n.language]}
                </li>
              )}

              {watch.material && (
                <li>
                  <strong>{t("material")}:</strong>{" "}
                  {watch.material[i18n.language]}
                </li>
              )}

              {watch.outer_frame && (
                <li>
                  <strong>{t("outer_frame")}:</strong>{" "}
                  {watch.outer_frame[i18n.language]}
                </li>
              )}

              {watch.water_resistance?.[i18n.language] && (
                <li>
                  <strong>{t("waterResistant")}:</strong>{" "}
                  {watch.water_resistance[i18n.language]}
                </li>
              )}
              {watch.waterResistant?.[i18n.language] && (
                <li>
                  <strong>{t("waterResistant")}:</strong>{" "}
                  {watch.waterResistant[i18n.language]}
                </li>
              )}

              {watch.specs &&
                Object.entries(watch.specs).map(([key, val]) => (
                  <li key={key}>
                    <strong>{t(key)}:</strong> {val[i18n.language]}
                  </li>
                ))}

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
