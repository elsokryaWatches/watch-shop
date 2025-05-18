import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../i18n";
import { useTranslation } from "react-i18next";
import UpBtn from "../UpBtn/UpBtn";
import ShopNav from "../ShopNav";
import { Helmet } from "react-helmet";
import { useLocation, useNavigate } from "react-router-dom";

export default function Skmei() {
  const [t, i18n] = useTranslation();
  const [watches, setWatches] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(null);

  const [addedToCart, setAddedToCart] = useState(() => {
    return JSON.parse(localStorage.getItem("orders")) || [];
  });

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  useEffect(() => {
    fetch("/API/SKMEI.JSON")
      .then((res) => res.json())
      .then((data) => {
        const inStockWatches = data.watches.filter((watch) => watch.stock > 0);
        setWatches(inStockWatches);
      })
      .catch((err) => console.log("failed to fetch watches", err));
  }, []);

  const query = useQuery();
  const navigate = useNavigate();

  const initialPage = parseInt(query.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

  const updatePage = (page) => {
    setCurrentPage(page);
    navigate(`?page=${page}`, { replace: true });
  };

  const watchesPerPage = 20;

  const indexOfLastWatch = currentPage * watchesPerPage;
  const indexOfFirstWatch = indexOfLastWatch - watchesPerPage;
  const currentWatches = watches.slice(indexOfFirstWatch, indexOfLastWatch);

  const totalPages = Math.ceil(watches.length / watchesPerPage);

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
      `${watch.brand[i18n.language]} ${watch.model[i18n.language]} ${
        watch.movement[i18n.language]
      }`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
    setCurrentPage(1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <Helmet>
        <title>El Sokrya - SKMEI Collection</title>
      </Helmet>
      <div className="shop">
        <div className="container-fluid">
          <div className="shopInner row">
            <div className="shopHeader col-12">
              <div className="backgroundLayer">
                <img
                  src="/imgs/SKMEI-BG.jpg"
                  alt=""
                  onContextMenu={(e) => e.preventDefault()}
                />
              </div>
              <div className="textLayer">
                <h2>{t("SKMEI watches")}</h2>
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
              {(searchResults || currentWatches)
                .slice(indexOfFirstWatch, indexOfLastWatch)
                .map((watch) => (
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
                        {watch.brand[i18n.language]}{" "}
                        {watch.model[i18n.language]}
                        <br />
                        {watch.movement[i18n.language]}
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
                        <Link
                          to={`/product_details/${watch.code}`}
                          state={{ watch }}
                        >
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
              <div className="pagination col-12 d-flex justify-content-center mt-4">
                <button
                  className="prevBtn"
                  onClick={() => updatePage(Math.max(currentPage - 1, 1))}
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
                    onClick={() => updatePage(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  className="nextBtn"
                  onClick={() =>
                    updatePage(Math.min(currentPage + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  {t("Next")}
                </button>
              </div>
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
