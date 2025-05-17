import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../i18n";
import { useTranslation } from "react-i18next";
import UpBtn from "../UpBtn/UpBtn";
import ShopNav from "../ShopNav";
import { Helmet } from "react-helmet";

export default function CombinedShop() {
  const [t, i18n] = useTranslation();
  const [watches, setWatches] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [addedToCart, setAddedToCart] = useState(() => {
    return JSON.parse(localStorage.getItem("orders")) || [];
  });

  useEffect(() => {
    Promise.all([
      fetch("/API/SKMEI.JSON").then((res) => res.json()),
      fetch("/API/MiniFocus.JSON").then((res) => res.json()),
    ])
      .then(([skmeiData, miniFocusData]) => {
        const allWatches = [
          ...skmeiData.watches.filter((w) => w.stock > 0),
          ...miniFocusData.watches.filter((w) => w.stock > 0),
        ];
        const shuffled = allWatches.sort(() => 0.5 - Math.random());
        setWatches(shuffled);
      })
      .catch((err) => console.log("Failed to fetch watches", err));
  }, []);

  const handleAddToCart = (code) => {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    if (!orders.includes(code)) {
      orders.push(code);
      localStorage.setItem("orders", JSON.stringify(orders));
    }
    setAddedToCart((prev) => [...prev, code]);
  };

  const handleSearch = () => {
    const results = watches.filter((watch) => {
      const brand =
        typeof watch.brand === "object"
          ? watch.brand[i18n.language]
          : watch.brand;
      const model =
        typeof watch.model === "object"
          ? watch.model[i18n.language]
          : watch.model;
      return `${brand} ${model}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    });
    setSearchResults(results);
    setCurrentPage(1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const watchesPerPage = 20;
  const visibleWatches = (searchResults ?? watches).slice(
    (currentPage - 1) * watchesPerPage,
    currentPage * watchesPerPage
  );
  const totalPages = Math.ceil(
    (searchResults ?? watches).length / watchesPerPage
  );

  return (
    <>
      <Helmet>
        <title>El Sokrya - All Watches</title>
      </Helmet>
      <div className="shop">
        <div className="container-fluid">
          <div className="shopInner row">
            <div className="shopHeader col-12">
              <div className="backgroundLayer">
                <img
                  src="/imgs/AllBrands-BG.jpg"
                  alt=""
                  onContextMenu={(e) => e.preventDefault()}
                />
              </div>
              <div className="textLayer">
                <h2>{t("All Watches")}</h2>
              </div>
            </div>

            <ShopNav />

            <div className="search-bar col-12 my-3 d-flex justify-content-center">
              <input
                type="text"
                placeholder={t("search")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                className="form-control w-50 me-2"
              />
              <button onClick={handleSearch} className="searchBtn">
                {t("search")}
              </button>
            </div>

            <div className="Watches row col-12">
              {visibleWatches.map((watch) => {
                const brand =
                  typeof watch.brand === "object"
                    ? watch.brand[i18n.language]
                    : watch.brand;
                const model =
                  typeof watch.model === "object"
                    ? watch.model[i18n.language]
                    : watch.model;
                return (
                  <div
                    className="watch homeSecAnimation col-9 col-lg-2"
                    key={watch.code}
                  >
                    <div className="discount">
                      <span className="discount_percentage">
                        {watch.price.discount_percentage}%
                      </span>
                      <span className="discount_period">
                        {t("for")} {watch.discount.valid_until} {t("days")}
                      </span>
                    </div>
                    <div className="img">
                      <img src={watch.images?.[0]} alt={brand + " " + model} />
                    </div>
                    <div className="details">
                      <h4 className="name">
                        {brand} {model}
                      </h4>
                      <del>
                        <h5 className="price">
                          {watch.price.original} {watch.price.currency}
                        </h5>
                      </del>
                      <h4 className="dis_price">
                        {watch.price.final} {watch.price.currency}
                      </h4>
                      <h5 className="stock">
                        <strong>{t("stock")}: </strong>
                        {watch.stock}
                      </h5>
                    </div>
                    <div className="btns">
                      <button className="moreDetails">
                        <Link to="/product_details" state={{ watch }}>
                          {t("details")}
                        </Link>
                      </button>
                      <button
                        className="addToCart"
                        onClick={() => handleAddToCart(watch.code)}
                        disabled={addedToCart.includes(watch.code)}
                      >
                        {addedToCart.includes(watch.code)
                          ? t("addedToCart")
                          : t("add to cart")}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pagination col-12 d-flex justify-content-center mt-4">
              <button
                className="prevBtn"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                {t("Previous")}
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  className={`pagNum mx-1 ${
                    currentPage === index + 1 ? "currPagNum" : "pagNum"
                  }`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}

              <button
                className="nextBtn"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                {t("Next")}
              </button>
            </div>

            <div className="toCart col-10">
              <button className="toCartBtn">
                <Link to={"/cart"}>{t("to cart")}</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
      <UpBtn />
    </>
  );
}
