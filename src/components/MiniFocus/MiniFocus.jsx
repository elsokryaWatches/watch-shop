import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../i18n";
import { useTranslation } from "react-i18next";
import UpBtn from "../UpBtn/UpBtn";
import ShopNav from "../ShopNav";
import { Helmet } from "react-helmet";
import { useLocation, useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { ref, getDownloadURL } from "firebase/storage";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export default function MiniFocus() {
  const [t, i18n] = useTranslation();
  const [watches, setWatches] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [selectedGender, setSelectedGender] = useState("Men");

  const [addedToCart, setAddedToCart] = useState(() => {
    return JSON.parse(localStorage.getItem("orders")) || [];
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  useEffect(() => {
    const fetchedMiniFocusWatches = async () => {
      try {
        setLoading(true);
        setError(null);

        const watchesRef = collection(db, "watches");
        const q = query(watchesRef, where("brand.en", "==", "Mini Focus"));
        const querySnapshot = await getDocs(q);

        const fetchedWatches = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const watchesWithImageUrls = await Promise.all(
          fetchedWatches.map(async (watch) => {
            if (watch.images && watch.images.length > 0) {
              try {
                let firstImagePath = watch.images[0];

                const gender =
                  typeof watch.gender === "string"
                    ? watch.gender.toLowerCase()
                    : "";

                if (gender === "male") {
                  if (!firstImagePath.includes("/M/")) {
                    const parts = firstImagePath.split("/");

                    if (parts[1] === "imgs") {
                      const insertIndex = parts[2] === "" ? 2 : 2;
                      parts.splice(insertIndex, 0, "M");
                      firstImagePath = parts.join("/");

                      firstImagePath = firstImagePath.replace(/\/\/+/g, "/");
                    }
                  }
                } else if (gender === "female") {
                  firstImagePath = firstImagePath.replace("/M/", "/");
                  firstImagePath = firstImagePath.replace("/W/", "/");
                }

                const imageRef = ref(storage, firstImagePath);
                const imageUrl = await getDownloadURL(imageRef);
                return { ...watch, firstImageUrl: imageUrl };
              } catch (imageError) {
                console.error(
                  `Error fetching image for ${watch.id}:`,
                  imageError
                );
                return { ...watch, firstImageUrl: null };
              }
            }
            return { ...watch, firstImageUrl: null };
          })
        );

        const inStockWatches = watchesWithImageUrls.filter(
          (watch) => watch.stock > 0
        );

        setWatches(inStockWatches);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load MiniFocus watches from Firestore", error);
        setError("Failed to load MiniFocus watches. Please try again.");
        setLoading(false);
      }
    };
    fetchedMiniFocusWatches();
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
      `${watch.brand?.[i18n.language] || ""} ${
        watch.model?.[i18n.language] || ""
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

  const getLocalizedGender = () => {
    if (i18n.language === "ar") {
      return selectedGender === "Men" ? "رجالي" : "حريمي";
    }
    return selectedGender;
  };

  const watchesAfterSearch = searchResults !== null ? searchResults : watches;

  const filteredByGender = watchesAfterSearch.filter((watch) => {
    const watchGender =
      typeof watch.gender === "object"
        ? watch.gender?.[i18n.language] || watch.gender?.["en"]
        : watch.gender;

    return (
      typeof watchGender === "string" &&
      watchGender.toLowerCase() === getLocalizedGender().toLowerCase()
    );
  });

  const urlQueryParams = useQuery();
  const navigate = useNavigate();

  const initialPage = parseInt(urlQueryParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

  const updatePage = (page) => {
    setCurrentPage(page);
    navigate(`?page=${page}`, { replace: true });
  };

  const watchesPerPage = 20;
  const indexOfLastWatch = currentPage * watchesPerPage;
  const indexOfFirstWatch = indexOfLastWatch - watchesPerPage;

  const currentWatchesToDisplay = filteredByGender.slice(
    indexOfFirstWatch,
    indexOfLastWatch
  );

  const totalPages = Math.ceil(filteredByGender.length / watchesPerPage);

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
        <title>El Sokarya - Mini Focus Collection</title>
      </Helmet>
      <div className="shop">
        <div className="container-fluid">
          <div className="shopInner row">
            <div className="shopHeader col-12">
              <div className="backgroundLayer">
                <img
                  src="/imgs/MF-BG.jpg"
                  alt=""
                  onContextMenu={(e) => e.preventDefault()}
                />
              </div>
              <div className="textLayer">
                <h2>{t("MiniFocus watches")}</h2>
              </div>
            </div>

            <ShopNav />

            {watches.length === 0 && !loading && !error ? (
              <div className="Watches row col-12">
                <div className="soonText col-12">
                  <h1>{t("soon")}</h1>
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
                      setSearchResults(null);
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
                      setSearchResults(null);
                      setCurrentPage(1);
                    }}
                  >
                    {t("women")}
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
                      {currentWatchesToDisplay.length > 0 ? (
                        currentWatchesToDisplay.map((watch) => (
                          <div
                            className="watch homeSecAnimation col-9 col-lg-2"
                            key={watch.id}
                          >
                            {watch.price?.discount_percentage > 0 && (
                              <div className="discount">
                                <span className="discount_percentage">
                                  {watch.price.discount_percentage}%
                                </span>
                                <span className="discount_period">
                                  {t("for")} {watch.discount?.duration_days}{" "}
                                  {t("days")}
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
                                    {watch.price.original}{" "}
                                    {watch.price.currency}
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
                                    {watch.price?.original}{" "}
                                    {watch.price.currency}
                                  </>
                                )}
                              </h4>
                              {typeof watch.stock !== "undefined" && (
                                <h5 className="stock">
                                  <strong>{t("stock")}: </strong>
                                  {watch.stock}
                                </h5>
                              )}
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
                        ))
                      ) : (
                        <div className="col-12 text-center mt-5">
                          <h4>
                            {t(
                              "No watches found matching your search or filters."
                            )}
                          </h4>
                        </div>
                      )}
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
              </>
            )}
          </div>
        </div>
      </div>
      <UpBtn />
    </>
  );
}
