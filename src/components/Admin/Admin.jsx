import { useState, useEffect } from "react";
import "./Admin.css";
import Navbar from "../Navbar/Navbar";
import UpBtn from "../UpBtn/UpBtn";
import "../../i18n";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

import { db, storage } from "../../firebase";

import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  setDoc,
  deleteDoc,
  orderBy,
  startAt,
  endAt,
  limit,
  onSnapshot,
} from "firebase/firestore";

import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
} from "firebase/storage";

export default function Admin() {
  const [t, i18n] = useTranslation();

  const getLocalizedValue = (data, lang = i18n.language) => {
    if (
      typeof data === "object" &&
      data !== null &&
      (data.ar !== undefined || data.en !== undefined)
    ) {
      return data[lang] || data.en || "";
    }
    return data || "";
  };

  const [activeTab, setActiveTab] = useState("orders");
  const [crudType, setCrudType] = useState("watches");

  const [searchQuery, setSearchQuery] = useState("");

  const [watchFormData, setWatchFormData] = useState({
    code: "",
    brand: { en: "", ar: "" },
    model_en: "",
    model_ar: "",
    price: "",
    discount: "",
    discounted_price: "",
    discount_period: "",
    stock: "",
    gender_en: "",
    gender_ar: "",
    material_en: "",
    material_ar: "",
    movement_en: "",
    movement_ar: "",
    diameter_en: "",
    diameter_ar: "",
    caseThickness_en: "",
    caseThickness_ar: "",
    weight_en: "",
    weight_ar: "",
    features_en: "",
    features_ar: "",
    waterResistant_en: "",
    waterResistant_ar: "",
  });

  const [strapFormData, setStrapFormData] = useState({
    code: "",
    brand: { en: "", ar: "" },
    model_en: "",
    model_ar: "",
    price: "",
    color_en: "",
    color_ar: "",
    stock: "",
    gender_en: "",
    gender_ar: "",
    material_en: "",
    material_ar: "",
  });

  const [selectedImages, setSelectedImages] = useState([]);
  const [existingImageUrls, setExistingImageUrls] = useState([]);
  const [imagesToKeep, setImagesToKeep] = useState([]);

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchCode, setSearchCode] = useState("");
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [productsError, setProductsError] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(null);
  const [submitError, setSubmitError] = useState(null);

  const [editingProduct, setEditingProduct] = useState(null);

  const [orders, setOrders] = useState([]);

  const handleWatchInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "brand") {
      try {
        const brandValue = JSON.parse(value);
        setWatchFormData((prevData) => ({
          ...prevData,
          [name]: brandValue,
        }));
      } catch (error) {
        console.error("Error parsing brand value:", error);
      }
    } else {
      setWatchFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleStrapInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "brand") {
      try {
        const brandValue = JSON.parse(value);
        setStrapFormData((prevData) => ({
          ...prevData,
          [name]: brandValue,
        }));
      } catch (error) {
        console.error("Error parsing brand value:", error);
      }
    } else {
      setStrapFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const resetForms = () => {
    setWatchFormData({
      code: "",
      brand: { en: "", ar: "" },
      model_en: "",
      model_ar: "",
      price: "",
      discount: "",
      discounted_price: "",
      discount_period: "",
      stock: "",
      gender_en: "",
      gender_ar: "",
      material_en: "",
      material_ar: "",
      movement_en: "",
      movement_ar: "",
      diameter_en: "",
      diameter_ar: "",
      caseThickness_en: "",
      caseThickness_ar: "",
      weight_en: "",
      weight_ar: "",
      features_en: "",
      features_ar: "",
      waterResistant_en: "",
      waterResistant_ar: "",
    });
    setStrapFormData({
      code: "",
      brand: { en: "", ar: "" },
      model_en: "",
      model_ar: "",
      price: "",
      color_en: "",
      color_ar: "",
      stock: "",
      gender_en: "",
      gender_ar: "",
      material_en: "",
      material_ar: "",
    });
    setSelectedImages([]);
    setExistingImageUrls([]);
    setEditingProduct(null);
    setSearchCode("");

    setSubmitSuccess(null);
    setSubmitError(null);
  };

  const uploadImagesAndGetPaths = async (formData, oldImagePaths = []) => {
    const imageStoragePaths = [];

    if (selectedImages.length > 0) {
      if (oldImagePaths.length > 0) {
        console.log("DEBUG: oldImagePaths:", oldImagePaths);
        console.log(
          "DEBUG: Type of oldImagePaths[0]:",
          typeof oldImagePaths[0]
        );
        console.log("DEBUG: Value of oldImagePaths[0]:", oldImagePaths[0]);

        const baseStoragePath = oldImagePaths[0].substring(
          0,
          oldImagePaths[0].lastIndexOf("/")
        );
        const listRef = ref(storage, baseStoragePath);
        try {
          const res = await listAll(listRef);
          for (const itemRef of res.items) {
            await deleteObject(itemRef);
          }
        } catch (error) {
          console.warn("Error listing/deleting old images:", error);
        }
      }

      for (let i = 0; i < selectedImages.length; i++) {
        const file = selectedImages[i];
        const fileName = `${i + 1}.jpg`;

        let storagePath = `${formData.brand}/${formData.code}/`;

        console.log("DEBUG: formData.brand:", formData.brand);
        console.log("DEBUG: formData.code:", formData.code);
        console.log(
          "DEBUG: Constructed storagePath before gender:",
          storagePath
        );

        if (crudType === "watches" && formData.gender === "men") {
          storagePath += "M/";
        }

        storagePath += fileName;
        const imageRef = ref(storage, storagePath);
        await uploadBytes(imageRef, file);
        imageStoragePaths.push(storagePath);
      }
    } else if (editingProduct && oldImagePaths.length > 0) {
      console.log("DEBUG: No new images, retaining old paths.");
      imageStoragePaths.push(...oldImagePaths);
    }
    return imageStoragePaths;
  };

  const handleSubmitProduct = async () => {
    setSubmitSuccess(null);
    setSubmitError(null);
    setIsSubmitting(true);

    console.log(
      "DEBUG in handleSubmitProduct: editingProduct state:",
      editingProduct
    );

    if (editingProduct) {
      console.log(
        "DEBUG in handleSubmitProduct: editingProduct.id:",
        editingProduct.id
      );
    }

    let formDataToUse =
      crudType === "watches" ? { ...watchFormData } : { ...strapFormData };
    const collectionName = crudType === "watches" ? "watches" : "straps";

    if (
      !formDataToUse.code ||
      !formDataToUse.brand ||
      !formDataToUse.model_en ||
      !formDataToUse.model_ar ||
      !formDataToUse.price ||
      !formDataToUse.stock
    ) {
      setSubmitError(
        "Please fill in all required fields (Code, Brand, Model (English & Arabic), Price, Stock)."
      );
      setIsSubmitting(false);
      return;
    }
    if (selectedImages.length === 0 && !editingProduct) {
      setSubmitError("Please select at least one image for a new product.");
      setIsSubmitting(false);
      return;
    }
    if (
      editingProduct &&
      selectedImages.length === 0 &&
      (!existingImageUrls || existingImageUrls.length === 0)
    ) {
      setSubmitError(
        "No images selected for update, and no existing images found."
      );
      setIsSubmitting(false);
      return;
    }

    try {
      const oldImagePaths = editingProduct ? editingProduct.images || [] : [];
      const imageStoragePaths = await uploadImagesAndGetPaths(
        formDataToUse,
        oldImagePaths
      );

      const productDataForFirestore = {
        code: formDataToUse.code,
        code_lowercase: formDataToUse.code.toLowerCase(),
        stock: parseInt(formDataToUse.stock || 0),
        images: imageStoragePaths,
        updatedAt: new Date(),
        createdAt:
          editingProduct && editingProduct.createdAt
            ? editingProduct.createdAt
            : new Date(),
      };

      const setLocalizedMap = (baseName) => {
        const enValue = formDataToUse[`${baseName}_en`];
        const arValue = formDataToUse[`${baseName}_ar`];
        if (!enValue && !arValue) return null;
        return {
          en: enValue || "",
          ar: arValue || "",
        };
      };

      productDataForFirestore.brand = formDataToUse.brand;
      productDataForFirestore.model = setLocalizedMap("model");
      productDataForFirestore.gender = setLocalizedMap("gender");
      productDataForFirestore.material = setLocalizedMap("material");
      productDataForFirestore.price = {
        currency: "EGP",
        original: parseFloat(formDataToUse.price || 0),
        discount_percentage: parseFloat(formDataToUse.discount || 0),
        final: parseFloat(formDataToUse.discounted_price || 0),
      };

      if (parseFloat(formDataToUse.discount || 0) > 0) {
        const discountDurationDays = parseInt(
          formDataToUse.discount_period || 0
        );

        let expiresAtTimestamp = null;

        if (
          editingProduct &&
          editingProduct.discount &&
          editingProduct.discount.expiresAt &&
          editingProduct.discount.duration_days === discountDurationDays
        ) {
          expiresAtTimestamp = editingProduct.discount.expiresAt;
        } else {
          if (discountDurationDays > 0) {
            const expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() + discountDurationDays);
            expiresAtTimestamp = expiryDate;
          }
        }

        productDataForFirestore.discount = {
          discount_percentage: parseFloat(formDataToUse.discount || 0),
          duration_days: discountDurationDays,
          expiresAt: expiresAtTimestamp,
        };
      } else {
        delete productDataForFirestore.discount;
      }

      if (crudType === "watches") {
        productDataForFirestore.movement = setLocalizedMap("movement");
        productDataForFirestore.features = setLocalizedMap("features");
        productDataForFirestore.water_resistance = formDataToUse.waterResistant;

        const setSpecValue = (baseName) => {
          const enValue = formDataToUse[`${baseName}_en`];
          const arValue = formDataToUse[`${baseName}_ar`];
          if (!enValue && !arValue) return null;
          return {
            en: enValue || "",
            ar: arValue || "",
          };
        };

        productDataForFirestore.specs = {
          diameter: setSpecValue("diameter"),
          caseThickness: setSpecValue("caseThickness"),
          weight: setSpecValue("weight"),
        };

        productDataForFirestore.water_resistance =
          setSpecValue("waterResistant");

        productDataForFirestore.outer_frame = "Stainless Steel";
      } else {
        productDataForFirestore.color = setLocalizedMap("color");
      }

      Object.keys(productDataForFirestore).forEach((key) => {
        if (
          productDataForFirestore[key] === null ||
          (typeof productDataForFirestore[key] === "object" &&
            Object.keys(productDataForFirestore[key]).length === 0)
        ) {
          delete productDataForFirestore[key];
        }
      });

      if (!editingProduct) {
        await addDoc(collection(db, collectionName), {
          ...productDataForFirestore,
          createdAt: new Date(),
        });
        setSubmitSuccess("Product added successfully!");
      } else {
        const productDocRef = doc(db, collectionName, editingProduct.id);
        await setDoc(productDocRef, productDataForFirestore, { merge: false });
        setSubmitSuccess("Product updated successfully!");
      }
      resetForms();

      if (searchCode.trim() !== "") {
        fetchProducts(searchCode);
      }
    } catch (error) {
      console.error(
        `Error ${editingProduct ? "updating" : "adding"} product:`,
        error
      );
      setSubmitError(
        `Failed to ${editingProduct ? "update" : "add"} product: ${
          error.message
        }`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchProducts = async (searchTerm = "") => {
    setIsLoadingProducts(true);
    setProductsError(null);
    setProducts([]);
    setFilteredProducts([]);

    const collectionName = crudType === "watches" ? "watches" : "straps";
    let productsQuery = collection(db, collectionName);

    if (searchTerm.trim() !== "") {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();

      productsQuery = query(
        productsQuery,
        orderBy("code_lowercase"),
        startAt(lowerCaseSearchTerm),
        endAt(lowerCaseSearchTerm + "\uf8ff"),
        limit(50)
      );
    } else {
      setIsLoadingProducts(false);
      return;
    }

    try {
      const querySnapshot = await getDocs(productsQuery);
      const fetchedProducts = [];
      for (const docSnapshot of querySnapshot.docs) {
        const rawProductData = docSnapshot.data();
        const processedProduct = { id: docSnapshot.id };

        for (const key in rawProductData) {
          if (rawProductData.hasOwnProperty(key)) {
            if (key === "id") {
              continue;
            }

            const value = rawProductData[key];

            if (key === "createdAt" || key === "updatedAt") {
              processedProduct[key] = value;
            } else if (key === "images") {
              processedProduct.images = value;
            } else if (key === "price") {
              processedProduct.price = value.original || 0;
              processedProduct.discounted_price = value.final || 0;
              processedProduct.currency = value.currency || "";
            } else if (key === "discount") {
              const discountData = value;

              processedProduct.discount = discountData.discount_percentage || 0;
              processedProduct.discount_period =
                discountData.duration_days || 0;

              if (discountData.expiresAt) {
                const expiryDate = discountData.expiresAt.toDate
                  ? discountData.expiresAt.toDate()
                  : new Date(discountData.expiresAt);
                const now = new Date();

                const timeLeftMs = expiryDate.getTime() - now.getTime();

                const timeLeftDays = Math.ceil(
                  timeLeftMs / (1000 * 60 * 60 * 24)
                );

                processedProduct.discountRemainingDays = Math.max(
                  0,
                  timeLeftDays
                );
              } else {
                processedProduct.discountRemainingDays = 0;
              }
            } else if (key === "specs") {
              processedProduct.diameter_en = value.diameter?.en || "";
              processedProduct.diameter_ar = value.diameter?.ar || "";
              processedProduct.caseThickness_en = value.caseThickness?.en || "";
              processedProduct.caseThickness_ar = value.caseThickness?.ar || "";
              processedProduct.weight_en = value.weight?.en || "";
              processedProduct.weight_ar = value.weight?.ar || "";
            } else if (key === "water_resistance") {
              processedProduct.waterResistant_en =
                value.waterResistant?.en || "";
              processedProduct.waterResistant_ar =
                value.waterResistant?.ar || "";
            } else if (key === "outer_frame") {
              processedProduct.outerFrame = value || "";
            } else if (
              typeof value === "object" &&
              value !== null &&
              (value.en !== undefined || value.ar !== undefined)
            ) {
              processedProduct[`${key}_en`] = value.en || "";
              processedProduct[`${key}_ar`] = value.ar || "";
              processedProduct[key] = getLocalizedValue(value);
            } else {
              processedProduct[key] = value;
            }
          }
        }

        processedProduct.downloadUrls = [];
        if (processedProduct.images && processedProduct.images.length > 0) {
          for (const imagePath of processedProduct.images) {
            try {
              const imageRef = ref(storage, imagePath);
              const url = await getDownloadURL(imageRef);
              processedProduct.downloadUrls.push(url);
            } catch (imgErr) {
              console.warn(
                `Could not get download URL for image ${imagePath}:`,
                imgErr
              );
              processedProduct.downloadUrls.push(
                "/path/to/error-placeholder.jpg"
              );
            }
          }
          processedProduct.imageUrl = processedProduct.downloadUrls[0] || "";
        } else {
          processedProduct.imageUrl = "";
        }

        fetchedProducts.push(processedProduct);
      }
      setProducts(fetchedProducts);
      console.log(
        "DEBUG fetchProducts: IDs in 'products' state after update:",
        fetchedProducts.map((p) => p.id)
      );
      setFilteredProducts(fetchedProducts);
      console.log(
        "DEBUG fetchProducts: IDs in 'filteredProducts' state after update:",
        fetchedProducts.map((p) => p.id)
      );
    } catch (error) {
      console.error("Error fetching products:", error);
      setProductsError(`Failed to fetch products: ${error.message}`);
    } finally {
      setIsLoadingProducts(false);
    }
  };

  const handleSearchSubmit = () => {
    if (searchCode.trim() !== "") {
      fetchProducts(searchCode);
    } else {
      setProducts([]);
      setFilteredProducts([]);
    }
  };

  const handleEditClick = (product) => {
    console.log(
      "DEBUG in handleEditClick: Product received for editing:",
      product
    );
    console.log("DEBUG in handleEditClick: Product ID received:", product.id);

    setEditingProduct(product);
    setExistingImageUrls(product.images || []);
    setImagesToKeep(product.images || []);
    setSelectedImages([]);
    setSearchCode("");
    setSubmitSuccess(null);
    setSubmitError(null);

    if (crudType === "watches") {
      setWatchFormData({
        code: product.code || "",
        brand: product.brand || "",
        model_en: product.model?.en || "",
        model_ar: product.model?.ar || "",
        price: product.price || 0,
        discount: product.discount || 0,
        discounted_price: product.discounted_price || 0,
        discount_period: product.discount_period || 0,
        stock: product.stock || 0,
        gender_en: product.gender?.en || "",
        gender_ar: product.gender?.ar || "",
        material_en: product.material?.en || "",
        material_ar: product.material?.ar || "",
        movement_en: product.movement?.en || "",
        movement_ar: product.movement?.ar || "",
        diameter_en: product.diameter?.en || "",
        diameter_ar: product.diameter?.ar || "",
        caseThickness_en: product.caseThickness?.en || "",
        caseThickness_ar: product.caseThickness?.ar || "",
        weight_en: product.weight?.en || "",
        weight_ar: product.weight?.ar || "",
        waterResistant_en: product.waterResistant?.en || "",
        waterResistant_ar: product.waterResistant?.ar || "",
        features_en: product.features?.en || "",
        features_ar: product.features?.ar || "",
      });
    } else {
      setStrapFormData({
        code: product.code || "",
        brand: product.brand || "",
        model_en: product.model?.en || "",
        model_ar: product.model?.ar || "",
        price: product.price || 0,
        color_en: product.color?.en || "",
        color_ar: product.color?.ar || "",
        stock: product.stock || 0,
        gender_en: product.gender?.en || "",
        gender_ar: product.gender?.ar || "",
        material_en: product.material?.en || "",
        material_ar: product.material?.ar || "",
      });
    }
  };

  const handleDeleteProduct = async (product) => {
    if (
      !window.confirm(
        `Are you sure you want to delete ${product.brand} ${product.model} (${product.code})? This action cannot be undone.`
      )
    ) {
      return;
    }

    setSubmitSuccess(null);
    setSubmitError(null);
    setIsSubmitting(true);

    const collectionName = crudType === "watches" ? "watches" : "straps";
    const productDocRef = doc(db, collectionName, product.id);

    try {
      if (product.images && product.images.length > 0) {
        for (const imagePath of product.images) {
          try {
            const imageRef = ref(storage, imagePath);
            await deleteObject(imageRef);
            console.log(`Deleted image: ${imagePath}`);
          } catch (imageDeleteError) {
            console.warn(
              `Failed to delete image ${imagePath}:`,
              imageDeleteError.message
            );
          }
        }
      }

      await deleteDoc(productDocRef);
      setSubmitSuccess(
        "Product and its associated images deleted successfully!"
      );

      setProducts((prevProducts) =>
        prevProducts.filter((p) => p.id !== product.id)
      );
      setFilteredProducts((prevFilteredProducts) =>
        prevFilteredProducts.filter((p) => p.id !== product.id)
      );
    } catch (error) {
      console.error("Error deleting product:", error);
      setSubmitError(`Failed to delete product: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchCode(e.target.value);
  };

  const handleRemoveExistingImage = (imagePathToRemove) => {
    setImagesToKeep((prevImagesToKeep) =>
      prevImagesToKeep.filter((path) => path !== imagePathToRemove)
    );
  };

  const handleConfirmOrder = async (orderId) => {
    if (
      window.confirm("Are you sure you want to confirm and remove this order?")
    ) {
      try {
        await deleteDoc(doc(db, "orders", orderId));
        console.log("Order confirmed and deleted successfully!");
      } catch (error) {
        console.error("Error confirming/deleting order: ", error);
      }
    }
  };

  useEffect(() => {
    const lowercasedSearch = searchCode.toLowerCase();
    if (lowercasedSearch === "") {
      setFilteredProducts(products);
      console.log(
        "DEBUG useEffect: IDs in 'filteredProducts' (no search):",
        products.map((p) => p.id)
      );
    } else {
      const filtered = products.filter(
        (product) =>
          product.code && product.code.toLowerCase().includes(lowercasedSearch)
      );
      setFilteredProducts(filtered);
      console.log(
        "DEBUG useEffect: IDs in 'filteredProducts' (with search):",
        filtered.map((p) => p.id)
      );
    }
  }, [searchCode, products]);

  useEffect(() => {
    resetForms();
  }, [crudType]);

  useEffect(() => {
    const fetchOrders = () => {
      const ordersCollectionRef = collection(db, "orders");
      const q = query(ordersCollectionRef, orderBy("orderDate", "desc"));

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const fetchOrders = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setOrders(fetchOrders);
        },
        (error) => {
          console.log("error fetching orders:", error);
        }
      );

      return () => unsubscribe();
    };
    fetchOrders();
  }, []);

  return (
    <>
      <Helmet>
        <title>El Sokarya - Admin</title>
      </Helmet>
      <Navbar />
      <div className="admin">
        <div className="container-fluid">
          <div className="adminInner row">
            <div className="adminNav col-10">
              <button
                className={`adminNavBtn ${
                  activeTab === "orders" ? "selected" : ""
                }`}
                onClick={() => setActiveTab("orders")}
              >
                {t("orders")}
              </button>

              <button
                className={`adminNavBtn ${
                  activeTab === "crud" ? "selected" : ""
                }`}
                onClick={() => setActiveTab("crud")}
              >
                {t("crud title")}
              </button>
            </div>

            {activeTab === "crud" && (
              <div className="crudSystem row col-12">
                <div className="formSide col-10 col-lg-6">
                  <div className="chooseFunc">
                    <select
                      onChange={(e) => {
                        setCrudType(e.target.value);
                        resetForms();
                      }}
                      value={crudType}
                      disabled={isSubmitting}
                    >
                      <option value="watches">
                        {t("adding / editing watches")}
                      </option>
                      <option value="straps">
                        {t("adding / editing straps")}
                      </option>
                    </select>
                  </div>

                  <div className="searchPanel">
                    <input
                      type="search"
                      placeholder={t("search using code...")}
                      name="searchCode"
                      id="searchCode"
                      value={searchCode}
                      onChange={handleSearchChange}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSearchSubmit();
                        }
                      }}
                      disabled={isSubmitting}
                    />
                    <button
                      type="button"
                      onClick={handleSearchSubmit}
                      disabled={isSubmitting}
                    >
                      {t("Search")}
                    </button>
                  </div>

                  {crudType === "watches" && (
                    <form
                      className="crudForm row"
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmitProduct(editingProduct !== null);
                      }}
                    >
                      <div className="formHeader col-12">
                        <h4>
                          {editingProduct
                            ? t("editing watches")
                            : t("adding / editing watches")}
                        </h4>
                      </div>
                      <div className="inputContainer col-4 row">
                        <label className="col-12" htmlFor="watchCode">
                          {t("code")}
                        </label>
                        <input
                          className="col-12"
                          type="text"
                          name="code"
                          id="watchCode"
                          value={watchFormData.code}
                          onChange={handleWatchInputChange}
                          disabled={isSubmitting || editingProduct !== null}
                        />
                      </div>
                      <div className="inputContainer col-4 row">
                        <label className="col-12" htmlFor="watchBrand">
                          {t("brand")}
                        </label>
                        <select
                          name="brand"
                          id="watchBrand"
                          className="col-12"
                          value={JSON.stringify(watchFormData.brand)}
                          onChange={handleWatchInputChange}
                          disabled={isSubmitting}
                        >
                          <option value="" disabled>
                            select the brand
                          </option>
                          <option value='{"en":"SKMEI","ar":"SKMEI"}'>
                            {t("skmei")}
                          </option>
                          <option value='{"en":"Mini Focus","ar":"مينى فوكس"}'>
                            {t("MiniFocus")}
                          </option>
                          <option value='{"en":"IBSO","ar":"IBSO"}'>
                            {t("ibso")}
                          </option>
                        </select>
                      </div>
                      <div className="inputContainer col-4 row">
                        <label className="col-12" htmlFor="watchModel_en">
                          {t("model")}
                        </label>
                        <input
                          className="col-12"
                          type="text"
                          name="model_en"
                          id="watchModel_en"
                          value={watchFormData.model_en}
                          onChange={handleWatchInputChange}
                          disabled={isSubmitting}
                          placeholder={t("english")}
                        />
                        <input
                          className="col-12"
                          type="text"
                          name="model_ar"
                          id="watchModel_ar"
                          value={watchFormData.model_ar}
                          onChange={handleWatchInputChange}
                          disabled={isSubmitting}
                          placeholder={t("arabic")}
                        />
                      </div>
                      <div className="inputContainer col-4 row">
                        <label className="col-12" htmlFor="watchPrice">
                          {t("price")}
                        </label>
                        <input
                          className="col-12"
                          type="number"
                          name="price"
                          id="watchPrice"
                          value={watchFormData.price}
                          onChange={handleWatchInputChange}
                          disabled={isSubmitting}
                        />
                      </div>
                      <div className="inputContainer col-4 row">
                        <label className="col-12" htmlFor="watchDiscount">
                          {t("discount")}
                        </label>
                        <input
                          className="col-12"
                          type="number"
                          name="discount"
                          id="watchDiscount"
                          value={watchFormData.discount}
                          onChange={handleWatchInputChange}
                          disabled={isSubmitting}
                        />
                      </div>
                      <div className="inputContainer col-4 row">
                        <label
                          className="col-12"
                          htmlFor="watchDiscounted_price"
                        >
                          {t("discounted price")}
                        </label>
                        <input
                          className="col-12"
                          type="number"
                          name="discounted_price"
                          id="watchDiscounted_price"
                          value={watchFormData.discounted_price}
                          onChange={handleWatchInputChange}
                          disabled={isSubmitting}
                        />
                      </div>
                      <div className="inputContainer col-4 row">
                        <label
                          className="col-12"
                          htmlFor="watchDiscount_period"
                        >
                          {t("discount period")}
                        </label>
                        <input
                          className="col-12"
                          type="number"
                          name="discount_period"
                          id="watchDiscount_period"
                          value={watchFormData.discount_period}
                          onChange={handleWatchInputChange}
                          disabled={isSubmitting}
                        />
                      </div>
                      <div className="inputContainer col-4 row">
                        <label className="col-12" htmlFor="watchStock">
                          {t("stock")}
                        </label>
                        <input
                          className="col-12"
                          type="number"
                          name="stock"
                          id="watchStock"
                          value={watchFormData.stock}
                          onChange={handleWatchInputChange}
                          disabled={isSubmitting}
                        />
                      </div>
                      {watchFormData.brand.en !== "SKMEI" && (
                        <div className="inputContainer col-4 row">
                          <label className="col-12" htmlFor="watchGender_en">
                            {t("gender")}
                          </label>
                          <input
                            className="col-12"
                            type="text"
                            name="gender_en"
                            id="watchGender_en"
                            value={watchFormData.gender_en}
                            onChange={handleWatchInputChange}
                            disabled={isSubmitting}
                            placeholder={t("english")}
                          />
                          <input
                            className="col-12"
                            type="text"
                            name="gender_ar"
                            id="watchGender_ar"
                            value={watchFormData.gender_ar}
                            onChange={handleWatchInputChange}
                            disabled={isSubmitting}
                            placeholder={t("arabic")}
                          />
                        </div>
                      )}
                      <div className="inputContainer col-4 row">
                        <label className="col-12" htmlFor="watchMaterial_en">
                          {t("material")}
                        </label>
                        <input
                          className="col-12"
                          type="text"
                          name="material_en"
                          id="watchMaterial_en"
                          value={watchFormData.material_en}
                          onChange={handleWatchInputChange}
                          disabled={isSubmitting}
                          placeholder={t("english")}
                        />
                        <input
                          className="col-12"
                          type="text"
                          name="material_ar"
                          id="watchMaterial_ar"
                          value={watchFormData.material_ar}
                          onChange={handleWatchInputChange}
                          disabled={isSubmitting}
                          placeholder={t("arabic")}
                        />
                      </div>
                      <div className="inputContainer col-4 row">
                        <label className="col-12" htmlFor="watchMovement_en">
                          {t("movement")}
                        </label>
                        <input
                          className="col-12"
                          type="text"
                          name="movement_en"
                          id="watchMovement_en"
                          value={watchFormData.movement_en}
                          onChange={handleWatchInputChange}
                          disabled={isSubmitting}
                          placeholder={t("english")}
                        />
                        <input
                          className="col-12"
                          type="text"
                          name="movement_ar"
                          id="watchMovement_ar"
                          value={watchFormData.movement_ar}
                          onChange={handleWatchInputChange}
                          disabled={isSubmitting}
                          placeholder={t("arabic")}
                        />
                      </div>
                      <div className="inputContainer col-4 row">
                        <label className="col-12" htmlFor="watchDiameter">
                          {t("diameter")}
                        </label>
                        <input
                          className="col-12"
                          type="text"
                          name="diameter_en"
                          id="watchDiameter_en"
                          value={watchFormData.diameter_en}
                          onChange={handleWatchInputChange}
                          disabled={isSubmitting}
                          placeholder={t("english")}
                        />
                        <input
                          className="col-12"
                          type="text"
                          name="diameter_ar"
                          id="watchDiameter_ar"
                          value={watchFormData.diameter_ar}
                          onChange={handleWatchInputChange}
                          disabled={isSubmitting}
                          placeholder={t("arabic")}
                        />
                      </div>
                      <div className="inputContainer col-4 row">
                        <label className="col-12" htmlFor="watchCaseThickness">
                          {t("caseThickness")}
                        </label>
                        <input
                          className="col-12"
                          type="text"
                          name="caseThickness_en"
                          id="watchCaseThickness_en"
                          value={watchFormData.caseThickness_en}
                          onChange={handleWatchInputChange}
                          disabled={isSubmitting}
                          placeholder={t("english")}
                        />
                        <input
                          className="col-12"
                          type="text"
                          name="caseThickness_ar"
                          id="watchCaseThickness_ar"
                          value={watchFormData.caseThickness_ar}
                          onChange={handleWatchInputChange}
                          disabled={isSubmitting}
                          placeholder={t("arabic")}
                        />
                      </div>
                      <div className="inputContainer col-4 row">
                        <label className="col-12" htmlFor="watchWeight">
                          {t("weight")}
                        </label>
                        <input
                          className="col-12"
                          type="text"
                          name="weight_en"
                          id="watchWeight_en"
                          value={watchFormData.weight_en}
                          onChange={handleWatchInputChange}
                          disabled={isSubmitting}
                          placeholder={t("english")}
                        />
                        <input
                          className="col-12"
                          type="text"
                          name="weight_ar"
                          id="watchWeight_ar"
                          value={watchFormData.weight_ar}
                          onChange={handleWatchInputChange}
                          disabled={isSubmitting}
                          placeholder={t("arabic")}
                        />
                      </div>
                      <div className="inputContainer col-4 row">
                        <label className="col-12" htmlFor="watchFeatures_en">
                          {t("features")}
                        </label>
                        <input
                          className="col-12"
                          type="text"
                          name="features_en"
                          id="watchFeatures_en"
                          value={watchFormData.features_en}
                          onChange={handleWatchInputChange}
                          disabled={isSubmitting}
                          placeholder={t("english")}
                        />
                        <input
                          className="col-12"
                          type="text"
                          name="features_ar"
                          id="watchFeatures_ar"
                          value={watchFormData.features_ar}
                          onChange={handleWatchInputChange}
                          disabled={isSubmitting}
                          placeholder={t("arabic")}
                        />
                      </div>
                      <div className="inputContainer col-4 row">
                        <label className="col-12" htmlFor="watchWaterResistant">
                          {t("waterResistant")}
                        </label>
                        <input
                          className="col-12"
                          type="text"
                          name="waterResistant_en"
                          id="watchWaterResistant_en"
                          value={watchFormData.waterResistant_en}
                          onChange={handleWatchInputChange}
                          disabled={isSubmitting}
                          placeholder={t("english")}
                        />
                        <input
                          className="col-12"
                          type="text"
                          name="waterResistant_ar"
                          id="watchWaterResistant_ar"
                          value={watchFormData.waterResistant_ar}
                          onChange={handleWatchInputChange}
                          disabled={isSubmitting}
                          placeholder={t("arabic")}
                        />
                      </div>
                      <div className="inputContainer col-4 row">
                        <label className="col-12" htmlFor="imageUpload">
                          {t("images")}
                        </label>

                        {editingProduct && existingImageUrls.length > 0 && (
                          <div className="form-group mb-3 col-12">
                            <label>{t("Existing Images")}:</label>
                            <div className="d-flex flex-wrap gap-2 mt-2">
                              {existingImageUrls.map((imagePath, index) => {
                                if (imagesToKeep.includes(imagePath)) {
                                  return (
                                    <div
                                      key={imagePath}
                                      className="position-relative border p-1 rounded"
                                    >
                                      <img
                                        src={imagePath}
                                        alt={`Existing Product Image ${
                                          index + 1
                                        }`}
                                        style={{
                                          width: "100px",
                                          height: "100px",
                                          objectFit: "cover",
                                        }}
                                      />
                                      <button
                                        type="button"
                                        className="btn btn-danger btn-sm position-absolute top-0 end-0"
                                        onClick={() =>
                                          handleRemoveExistingImage(imagePath)
                                        }
                                        title={t("Remove this image")}
                                        disabled={isSubmitting}
                                      >
                                        &times;
                                      </button>
                                    </div>
                                  );
                                }
                                return null;
                              })}
                            </div>
                          </div>
                        )}

                        <input
                          className="col-12 imageInput"
                          type="file"
                          name="images"
                          id="imageUpload"
                          accept="image/jpeg,image/png"
                          multiple
                          onChange={(e) =>
                            setSelectedImages(Array.from(e.target.files))
                          }
                          disabled={isSubmitting}
                        />

                        {editingProduct &&
                          existingImageUrls.length > 0 &&
                          selectedImages.length === 0 && (
                            <small className="col-12 mt-2">
                              Current images: {existingImageUrls.length} files.
                              Select new files to replace.
                            </small>
                          )}
                      </div>
                      <div className="btns">
                        {!editingProduct ? (
                          <button
                            className="addBtn"
                            type="submit"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "Adding..." : t("add")}
                          </button>
                        ) : (
                          <button
                            className="updateBtn"
                            type="submit"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "Updating..." : t("update")}
                          </button>
                        )}
                        <button
                          className="resetBtn"
                          type="button"
                          onClick={resetForms}
                          disabled={isSubmitting}
                        >
                          {t("reset")}
                        </button>
                      </div>
                    </form>
                  )}

                  {crudType === "straps" && (
                    <form
                      className="crudForm row"
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmitProduct(editingProduct !== null);
                      }}
                    >
                      <div className="formHeader col-12">
                        <h4>
                          {editingProduct
                            ? t("editing straps")
                            : t("adding / editing straps")}
                        </h4>
                      </div>
                      <div className="inputContainer col-4 row">
                        <label className="col-12" htmlFor="strapCode">
                          {t("code")}
                        </label>
                        <input
                          className="col-12"
                          type="text"
                          name="code"
                          id="strapCode"
                          value={strapFormData.code}
                          onChange={handleStrapInputChange}
                          disabled={isSubmitting || editingProduct !== null}
                        />
                      </div>
                      <div className="inputContainer col-4 row">
                        <label className="col-12" htmlFor="strapBrand">
                          {t("brand")}
                        </label>
                        <select
                          name="brand"
                          id="strapBrand"
                          className="col-12"
                          value={JSON.stringify(strapFormData.brand)}
                          onChange={handleStrapInputChange}
                          disabled={isSubmitting}
                        >
                          <option value="" disabled>
                            select the brand
                          </option>
                          <option value='{"en":"SKMEI","ar":"SKMEI"}'>
                            {t("skmei")}
                          </option>
                          <option value='{"en":"Mini Focus","ar":"مينى فوكس"}'>
                            {t("MiniFocus")}
                          </option>
                          <option value='{"en":"IBSO","ar":"IBSO"}'>
                            {t("ibso")}
                          </option>
                        </select>
                      </div>
                      <div className="inputContainer col-4 row">
                        <label className="col-12" htmlFor="strapModel_en">
                          {t("model")}
                        </label>
                        <input
                          className="col-12"
                          type="text"
                          name="model_en"
                          id="strapModel_en"
                          value={strapFormData.model_en}
                          onChange={handleStrapInputChange}
                          disabled={isSubmitting}
                          placeholder={t("english")}
                        />
                        <input
                          className="col-12"
                          type="text"
                          name="model_ar"
                          id="strapModel_ar"
                          value={strapFormData.model_ar}
                          onChange={handleStrapInputChange}
                          disabled={isSubmitting}
                          placeholder={t("arabic")}
                        />
                      </div>
                      <div className="inputContainer col-4 row">
                        <label className="col-12" htmlFor="strapPrice">
                          {t("price")}
                        </label>
                        <input
                          className="col-12"
                          type="number"
                          name="price"
                          id="strapPrice"
                          value={strapFormData.price}
                          onChange={handleStrapInputChange}
                          disabled={isSubmitting}
                        />
                      </div>
                      <div className="inputContainer col-4 row">
                        <label className="col-12" htmlFor="strapColor_en">
                          {t("color")}
                        </label>
                        <input
                          className="col-12"
                          type="text"
                          name="color_en"
                          id="strapColor_en"
                          value={strapFormData.color_en}
                          onChange={handleStrapInputChange}
                          disabled={isSubmitting}
                          placeholder={t("english")}
                        />
                        <input
                          className="col-12"
                          type="text"
                          name="color_ar"
                          id="strapColor_ar"
                          value={strapFormData.color_ar}
                          onChange={handleStrapInputChange}
                          disabled={isSubmitting}
                          placeholder={t("arabic")}
                        />
                      </div>
                      <div className="inputContainer col-4 row">
                        <label className="col-12" htmlFor="strapStock">
                          {t("stock")}
                        </label>
                        <input
                          className="col-12"
                          type="number"
                          name="stock"
                          id="strapStock"
                          value={strapFormData.stock}
                          onChange={handleStrapInputChange}
                          disabled={isSubmitting}
                        />
                      </div>
                      <div className="inputContainer col-4 row">
                        <label className="col-12" htmlFor="strapGender_en">
                          {t("gender")}
                        </label>
                        <input
                          className="col-12"
                          type="text"
                          name="gender_en"
                          id="strapGender_en"
                          value={strapFormData.gender_en}
                          onChange={handleStrapInputChange}
                          disabled={isSubmitting}
                          placeholder={t("english")}
                        />
                        <input
                          className="col-12"
                          type="text"
                          name="gender_ar"
                          id="strapGender_ar"
                          value={strapFormData.gender_ar}
                          onChange={handleStrapInputChange}
                          disabled={isSubmitting}
                          placeholder={t("arabic")}
                        />
                      </div>
                      <div className="inputContainer col-4 row">
                        <label className="col-12" htmlFor="strapMaterial_en">
                          {t("material")}
                        </label>
                        <input
                          className="col-12"
                          type="text"
                          name="material_en"
                          id="strapMaterial_en"
                          value={strapFormData.material_en}
                          onChange={handleStrapInputChange}
                          disabled={isSubmitting}
                          placeholder={t("english")}
                        />
                        <input
                          className="col-12"
                          type="text"
                          name="material_ar"
                          id="strapMaterial_ar"
                          value={strapFormData.material_ar}
                          onChange={handleStrapInputChange}
                          disabled={isSubmitting}
                          placeholder={t("arabic")}
                        />
                      </div>
                      <div className="inputContainer col-4 row">
                        <label className="col-12" htmlFor="imageUpload">
                          {t("images")}
                        </label>

                        {editingProduct && existingImageUrls.length > 0 && (
                          <div className="form-group mb-3 col-12">
                            <label>{t("Existing Images")}:</label>
                            <div className="d-flex flex-wrap gap-2 mt-2">
                              {existingImageUrls.map((imagePath, index) => {
                                if (imagesToKeep.includes(imagePath)) {
                                  return (
                                    <div
                                      key={imagePath}
                                      className="position-relative border p-1 rounded"
                                    >
                                      <img
                                        src={imagePath}
                                        alt={`Existing Product Image ${
                                          index + 1
                                        }`}
                                        style={{
                                          width: "100px",
                                          height: "100px",
                                          objectFit: "cover",
                                        }}
                                      />
                                      <button
                                        type="button"
                                        className="btn btn-danger btn-sm position-absolute top-0 end-0"
                                        onClick={() =>
                                          handleRemoveExistingImage(imagePath)
                                        }
                                        title={t("Remove this image")}
                                        disabled={isSubmitting}
                                      >
                                        &times;
                                      </button>
                                    </div>
                                  );
                                }
                                return null;
                              })}
                            </div>
                          </div>
                        )}

                        <input
                          className="col-12 imageInput"
                          type="file"
                          name="images"
                          id="imageUpload"
                          accept="image/jpeg,image/png"
                          multiple
                          onChange={(e) =>
                            setSelectedImages(Array.from(e.target.files))
                          }
                          disabled={isSubmitting}
                        />

                        {editingProduct &&
                          existingImageUrls.length > 0 &&
                          selectedImages.length === 0 && (
                            <small className="col-12 mt-2">
                              Current images: {existingImageUrls.length} files.
                              Select new files to replace.
                            </small>
                          )}
                      </div>
                      <div className="btns">
                        {!editingProduct ? (
                          <button
                            className="addBtn"
                            type="submit"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "Adding..." : t("add")}
                          </button>
                        ) : (
                          <button
                            className="updateBtn"
                            type="submit"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "Updating..." : t("update")}
                          </button>
                        )}
                        <button
                          className="resetBtn"
                          type="button"
                          onClick={resetForms}
                          disabled={isSubmitting}
                        >
                          {t("reset")}
                        </button>
                      </div>
                    </form>
                  )}

                  {isSubmitting && (
                    <p className="feedback-message">
                      Submitting product data...
                    </p>
                  )}
                  {submitSuccess && (
                    <p className="feedback-message success-message">
                      {submitSuccess}
                    </p>
                  )}
                  {submitError && (
                    <p className="feedback-message error-message">
                      {submitError}
                    </p>
                  )}
                </div>

                <div className="cardsSide row col-12 col-lg-6">
                  <h3>
                    {crudType === "watches"
                      ? t("Watches List")
                      : t("Straps List")}
                  </h3>
                  {isLoadingProducts && (
                    <p className="loading-message">Loading products...</p>
                  )}
                  {productsError && (
                    <p className="error-message">{productsError}</p>
                  )}

                  {!isLoadingProducts && filteredProducts.length === 0 && (
                    <p className="no-products-message">
                      {searchCode
                        ? t("No products found matching your search.")
                        : t("No products to display for this category.")}
                    </p>
                  )}

                  {filteredProducts.map((product) => (
                    <div className="itemCard col-5" key={product.id}>
                      <img
                        src={product.imageUrl || "/path/to/placeholder.jpg"}
                        alt={`${product.brand} ${product.model}`}
                      />

                      <div className="details">
                        <h4>
                          {product.brand} {product.model} ({product.code})
                        </h4>

                        {product.discount > 0 ? (
                          <>
                            <del>
                              <h4>
                                {product.price} {t("EGP")}
                              </h4>
                            </del>
                            <h4>
                              {product.discounted_price} {t("EGP")}
                            </h4>
                          </>
                        ) : (
                          <h4>
                            {product.price} {t("EGP")}
                          </h4>
                        )}

                        <p>
                          {t("Stock")}: {product.stock}
                        </p>

                        <button
                          className="editBtn"
                          type="button"
                          onClick={() => handleEditClick(product)}
                          disabled={isSubmitting}
                        >
                          {t("edit")}
                        </button>
                        <button
                          className="deleteBtn"
                          type="button"
                          onClick={() => handleDeleteProduct(product)}
                          disabled={isSubmitting}
                        >
                          {t("delete")}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="orders row col-10">
                {orders.length === 0 ? (
                  <p className="col-12 text-center">
                    {t("noOrdersYet") || "No new orders yet."}
                  </p>
                ) : (
                  orders.map((order) => (
                    <div
                      className="orderItem row col-12 col-lg-3"
                      key={order.id}
                    >
                      <div className="orderHeader col-12">
                        <h4>
                          Order ID: <br /> {order.id}
                        </h4>
                      </div>

                      <div className="orderDetails col-12">
                        <h6>
                          Name : <br /> {order.customer?.fullName || "N/A"}
                        </h6>
                        <h6>
                          Phone : <br /> {order.customer?.phoneNumber || "N/A"}
                        </h6>
                        <h6>
                          Email : <br /> {order.customer?.emailAddress || "N/A"}
                        </h6>
                        <h6>
                          Address : <br />
                          {order.customer?.address?.city || "N/A"},
                          {order.customer?.address?.governorate || "N/A"},
                          <br />
                          Landmark : <br />
                          {order.customer?.address?.landMark || "N/A"}
                        </h6>
                        <h6>
                          Ordered Codes : <br />
                          {order.productCodes && order.productCodes.length > 0
                            ? order.productCodes.join(", ")
                            : "N/A"}
                        </h6>
                        <h6>
                          Order Date : <br />
                          {order.orderDate
                            ? new Date(
                                order.orderDate.toDate()
                              ).toLocaleString()
                            : "N/A"}
                        </h6>
                      </div>

                      <div className="btns col-12">
                        <button
                          className="confirmBtn"
                          onClick={() => handleConfirmOrder(order.id)}
                        >
                          {t("confirm")}
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <UpBtn />
    </>
  );
}
