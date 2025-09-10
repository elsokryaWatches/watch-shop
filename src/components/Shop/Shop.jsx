import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../i18n";
import { useTranslation } from "react-i18next";
import UpBtn from "../UpBtn/UpBtn";
import ShopNav from "../ShopNav";
import { Helmet } from "react-helmet";
import { useLocation, useNavigate } from "react-router-dom";
import { collection, query, getDocs } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { ref, getDownloadURL } from "firebase/storage";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export default function Shop() {
  const [t, i18n] = useTranslation();
  const [watches, setWatches] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [addedToCart, setAddedToCart] = useState(() => {
    return JSON.parse(localStorage.getItem("orders")) || [];
  });
  const [filterOption, setFilterOption] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  useEffect(() => {
    const fetchedAllWatches = async () => {
      try {
        setLoading(true);
        setError(null);

        const watchesRef = collection(db, "watches");
        const q = query(watchesRef);

        const querySnapshot = await getDocs(q);

        const fetchedWatches = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const watchesWithImageUrls = await Promise.all(
          fetchedWatches.map(async (watch) => {
            if (watch.images && watch.images.length > 0) {
              try {
                const firstImagePath = watch.images[0];
                const imageRef = ref(storage, firstImagePath);
                const imageUrl = await getDownloadURL(imageRef);
                return { ...watch, firstImageUrl: imageUrl };
              } catch (imageError) {
                console.error(`Error fetching image for ${watch.id}`);
                return { ...watch, firstImageUrl: null };
              }
            }
            return { ...watch, firstImageUrl: null };
          })
        );

        const inStockWatches = watchesWithImageUrls.filter(
          (watch) => watch.stock > 0
        );

        const shuffled = inStockWatches.sort(() => 0.5 - Math.random());
        setWatches(shuffled);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load all watches from Firestore", error);
        setError("Failed to load watches. Please try again.");
        setLoading(false);
      }
    };
    fetchedAllWatches();
  }, []);

  const handleAddToCart = (code) => {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    if (!orders.includes(code)) {
      orders.push(code);
      localStorage.setItem("orders", JSON.stringify(orders));
    }
    setAddedToCart((prev) => [...prev, code]);
  };

  const handleFilterChange = (e) => {
    const selectedValue = e.target.value;
    setFilterOption(selectedValue);
    setCurrentPage(1);
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

  const queryParams = useQuery();
  const navigate = useNavigate();

  const initialPage = parseInt(queryParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

  const updatePage = (page) => {
    setCurrentPage(page);
    navigate(`?page=${page}`, { replace: true });
  };

  const getFilteredAndSortedWatches = () => {
    let filteredWatches = [...watches];

    if (filterOption === "cheap") {
      filteredWatches.sort((a, b) => {
        const priceA = a.price?.final || a.price?.original || 0;
        const priceB = b.price?.final || b.price?.original || 0;
        return priceA - priceB;
      });
    } else if (filterOption === "expensive") {
      filteredWatches.sort((a, b) => {
        const priceA = a.price?.final || a.price?.original || 0;
        const priceB = b.price?.final || b.price?.original || 0;
        return priceB - priceA;
      });
    } else if (filterOption === "discounts") {
      filteredWatches = filteredWatches.filter(
        (watch) => watch.price?.discount_percentage > 0
      );
      filteredWatches.sort(
        (a, b) => b.price?.discount_percentage - a.price?.discount_percentage
      );
    }
    return filteredWatches;
  };

  const filteredAndSortedWatches = getFilteredAndSortedWatches();

  const watchesToDisplay = searchTerm
    ? searchResults || []
    : filteredAndSortedWatches;

  const watchesPerPage = 20;
  const visibleWatches = watchesToDisplay.slice(
    (currentPage - 1) * watchesPerPage,
    currentPage * watchesPerPage
  );
  const totalPages = Math.ceil(watchesToDisplay.length / watchesPerPage);

  const getPaginationItems = () => {
    const items = [];
    const maxPagesToShow = 4;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(i);
      }
    } else {
      items.push(1);

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      if (startPage > 2) {
        items.push("...");
      }

      for (let i = startPage; i <= endPage; i++) {
        items.push(i);
      }

      if (endPage < totalPages - 1) {
        items.push("...");
      }

      items.push(totalPages);
    }

    return items;
  };

  return (
    <>
      <Helmet>
        <title>El Sokarya - All Watches</title>
      </Helmet>
      <div className="shop">
        <div className="container-fluid">
          <div className="shopInner row">
            <div className="shopHeader col-12">
              <div className="backgroundLayer">
                <img
                  src="/imgs/shop-BG.jpg"
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
              <select
                className="filterProds"
                value={filterOption}
                onChange={handleFilterChange}
              >
                <option disabled value="">
                  {t("filter by")}
                </option>
                <option value="">{t("all")}</option>
                <option value="cheap">{t("cheapest")}</option>
                <option value="expensive">{t("most expensive")}</option>
                <option value="discounts">{t("discounts")}</option>
              </select>
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

            {loading ? (
              <div className="col-12 d-flex justify-content-center my-5">
                <LoadingSpinner />
              </div>
            ) : error ? (
              <div className="col-12">
                <p style={{ color: "red" }}>{error}</p>
              </div>
            ) : (
              <>
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
                        {watch.price?.discount_percentage > 0 && (
                          <div className="discount">
                            <span className="discount_percentage">
                              {watch.price?.discount_percentage}%
                            </span>

                            <span className="discount_period">
                              {t("for")}
                              {watch.discount?.duration_days} {t("days")}
                            </span>
                          </div>
                        )}
                        <div className="img">
                          {watch.firstImageUrl ? (
                            <img
                              src={watch.firstImageUrl}
                              alt={watch.brand + " " + watch.model}
                              onContextMenu={(e) => e.preventDefault()}
                            />
                          ) : (
                            <div className="image-placeholder">
                              No Image Available
                            </div>
                          )}
                        </div>
                        <div className="details">
                          <Link
                            to={`/product_details/${watch.code}`}
                            state={{ watch }}
                          >
                            <h4 className="name">
                              {watch.brand?.[i18n.language]}&nbsp;
                              {watch.model?.[i18n.language]}
                            </h4>
                          </Link>
                          {watch.price?.discount_percentage > 0 &&
                          watch.price?.original ? (
                            <del>
                              <h5 className="price">
                                {watch.price.original} {watch.price.currency}
                              </h5>
                            </del>
                          ) : null}
                          <h4 className="dis_price">
                            {watch.price?.discount_percentage > 0 &&
                            watch.price?.final ? (
                              <>
                                {watch.price.final} {watch.price.currency}
                              </>
                            ) : (
                              <>
                                {watch.price?.original} {watch.price.currency}
                              </>
                            )}
                          </h4>
                          <h5 className="stock">
                            <strong>{t("stock")}: </strong>
                            {watch.stock}
                          </h5>
                        </div>
                        <div className="btns">
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
                    onClick={() => updatePage(Math.max(currentPage - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    {t("Previous")}
                  </button>

                  {getPaginationItems().map((item, index) =>
                    item === "..." ? (
                      <span key={index} className="mx-1">
                        ...
                      </span>
                    ) : (
                      <button
                        key={index}
                        className={`pagNum mx-1 ${
                          currentPage === item ? "currPagNum" : "pagNum"
                        }`}
                        onClick={() => updatePage(item)}
                      >
                        {item}
                      </button>
                    )
                  )}

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
