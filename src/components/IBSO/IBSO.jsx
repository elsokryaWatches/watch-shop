import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../i18n";
import { useTranslation } from "react-i18next";
import UpBtn from "../UpBtn/UpBtn";
import ShopNav from "../ShopNav";
import { Helmet } from "react-helmet";

export default function IBSO() {
  const [t, i18n] = useTranslation();

  const [watches, setWatches] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [selectedGender, setSelectedGender] = useState("Men");
  const [currentPage, setCurrentPage] = useState(1);
  const [addedToCart, setAddedToCart] = useState(() => {
    return JSON.parse(localStorage.getItem("orders")) || [];
  });

  useEffect(() => {
    fetch("/API/IBSO.JSON")
      .then((res) => {
        if (!res.ok) throw new Error("File not found");
        return res.json();
      })
      .then((data) => {
        const inStockWatches = data.watches.filter((w) => w.stock > 0);
        setWatches(inStockWatches);
      })
      .catch(() => setWatches([]));
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
    const results = watches.filter((watch) =>
      `${watch.brand[i18n.language]} ${watch.model}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
    setCurrentPage(1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const getLocalizedGender = () => {
    if (i18n.language === "ar") {
      return selectedGender === "Men" ? "رجالي" : "حريمي";
    }
    return selectedGender;
  };

  const filteredWatches =
    watches &&
    (searchResults ?? watches).filter((watch) => {
      const gender = watch.gender[i18n.language] || watch.gender["en"];
      return gender?.toLowerCase() === getLocalizedGender().toLowerCase();
    });

  const watchesPerPage = 20;
  const indexOfLastWatch = currentPage * watchesPerPage;
  const indexOfFirstWatch = indexOfLastWatch - watchesPerPage;
  const currentWatches =
    filteredWatches?.slice(indexOfFirstWatch, indexOfLastWatch) || [];
  const totalPages = Math.ceil((filteredWatches?.length || 0) / watchesPerPage);

  return (
    <>
      <Helmet>
        <title>El Sokrya - IBSO Collection</title>
      </Helmet>
      <div className="shop">
        <div className="container-fluid">
          <div className="shopInner row">
            <div className="shopHeader col-12">
              <div className="backgroundLayer">
                <img
                  src="/imgs/IBSO-BG.jpg"
                  alt=""
                  onContextMenu={(e) => e.preventDefault()}
                />
              </div>
              <div className="textLayer">
                <h2>{t("IBSO")}</h2>
              </div>
            </div>

            <ShopNav />

            {watches === null ? (
              <div className="col-12 text-center my-5">
                <h4>{t("loading")}...</h4>
              </div>
            ) : watches.length === 0 ? (
              <div className="Watches row col-12">
                <div className="soonText col-12">
                  <h2>{t("soon")}</h2>
                </div>
              </div>
            ) : (
              <>
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

                <div className="genderFilter d-flex justify-content-center">
                  <button
                    className={`navBtn ${
                      selectedGender === "Men" ? "selected" : ""
                    }`}
                    onClick={() => {
                      setSelectedGender("Men");
                      setCurrentPage(1);
                    }}
                  >
                    {t("men")}
                  </button>
                  <button
                    className={`navBtn ${
                      selectedGender === "Women" ? "selected" : ""
                    }`}
                    onClick={() => {
                      setSelectedGender("Women");
                      setCurrentPage(1);
                    }}
                  >
                    {t("women")}
                  </button>
                </div>

                <div className="Watches row col-12">
                  {currentWatches.map((watch) => (
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
                        <img
                          src={watch.images[0]}
                          alt=""
                          onContextMenu={(e) => e.preventDefault()}
                        />
                      </div>
                      <div className="details">
                        <h4 className="name">
                          {watch.brand[i18n.language]} {watch.model}
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
                          <strong>{t("stock")}:</strong> {watch.stock}
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
                  ))}
                </div>

                <div className="pagination col-12 d-flex justify-content-center mt-4">
                  <button
                    className="prevBtn"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                  >
                    {t("Previous")}
                  </button>

                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      className={`pagNum mx-1 ${
                        currentPage === index + 1 ? "currPagNum" : ""
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
              </>
            )}
          </div>
        </div>
      </div>
      <UpBtn />
    </>
  );
}
