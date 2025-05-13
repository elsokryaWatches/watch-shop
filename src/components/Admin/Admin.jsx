import { useEffect, useState } from "react";
import "./Admin.css";
import Navbar from "../Navbar/Navbar";
import "../../i18n";
import { useTranslation } from "react-i18next";

export default function Admin() {
  const [t] = useTranslation();
  const [authenticated, setAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("orders");

  useEffect(() => {
    const username = prompt("Enter admin username:");
    const password = prompt("Enter admin password:");

    if (username === "elsokarya" && password === "sokarya101") {
      setAuthenticated(true);
    } else {
      alert("Access denied.");
      window.location.href = "/";
    }
  }, []);

  if (!authenticated) return null;

  return (
    <>
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
                <div className="formSide col-6">
                  <form method="post" className="crudForm row">
                    <div className="inputContainer col-4 row">
                      <label className="col-12" htmlFor="">
                        code
                      </label>
                      <input
                        className="col-12"
                        type="text"
                        name="code"
                        id="code"
                      />
                    </div>
                    <div className="inputContainer col-4 row">
                      <label className="col-12" htmlFor="brand">
                        brand
                      </label>
                      <input
                        className="col-12"
                        type="text"
                        name="brand"
                        id="brand"
                      />
                    </div>
                    <div className="inputContainer col-4 row">
                      <label className="col-12" htmlFor="model">
                        model
                      </label>
                      <input
                        className="col-12"
                        type="text"
                        name="model"
                        id="model"
                      />
                    </div>
                    <div className="inputContainer col-4 row">
                      <label className="col-12" htmlFor="price">
                        price
                      </label>
                      <input
                        className="col-12"
                        type="number"
                        name="price"
                        id="price"
                      />
                    </div>
                    <div className="inputContainer col-4 row">
                      <label className="col-12" htmlFor="discount">
                        discount
                      </label>
                      <input
                        className="col-12"
                        type="number"
                        name="discount"
                        id="discount"
                      />
                    </div>
                    <div className="inputContainer col-4 row">
                      <label className="col-12" htmlFor="discounted_price">
                        discounted price
                      </label>
                      <input
                        className="col-12"
                        type="text"
                        name="discounted_price"
                        id="discounted_price"
                      />
                    </div>
                    <div className="inputContainer col-4 row">
                      <label className="col-12" htmlFor="discount_period">
                        discount period
                      </label>
                      <input
                        className="col-12"
                        type="number"
                        name="discount_period"
                        id="discount_period"
                      />
                    </div>
                    <div className="inputContainer col-4 row">
                      <label className="col-12" htmlFor="stock">
                        stock
                      </label>
                      <input
                        className="col-12"
                        type="number"
                        name="stock"
                        id="stock"
                      />
                    </div>
                    <div className="inputContainer col-4  row">
                      <label className="col-12" htmlFor="material">
                        material
                      </label>
                      <input
                        className="col-12"
                        type="text"
                        name="material"
                        id="material"
                      />
                    </div>
                    <div className="inputContainer col-4 row">
                      <label className="col-12" htmlFor="movement">
                        movement
                      </label>
                      <input
                        className="col-12"
                        type="text"
                        name="movement"
                        id="movement"
                      />
                    </div>
                    <div className="inputContainer col-4 row">
                      <label className="col-12" htmlFor="diameter">
                        diameter
                      </label>
                      <input
                        className="col-12"
                        type="text"
                        name="diameter"
                        id="diameter"
                      />
                    </div>
                    <div className="inputContainer col-4 row">
                      <label className="col-12" htmlFor="caseThickness">
                        case thickness
                      </label>
                      <input
                        className="col-12"
                        type="text"
                        name="caseThickness"
                        id="caseThickness"
                      />
                    </div>
                    <div className="inputContainer col-4 row">
                      <label className="col-12" htmlFor="weight">
                        weight
                      </label>
                      <input
                        className="col-12"
                        type="text"
                        name="weight"
                        id="weight"
                      />
                    </div>
                    <div className="inputContainer col-4 row">
                      <label className="col-12" htmlFor="features">
                        features
                      </label>
                      <input
                        className="col-12"
                        type="text"
                        name="features"
                        id="features"
                      />
                    </div>
                    <div className="inputContainer col-4 row">
                      <label className="col-12" htmlFor="waterResistant">
                        water resistant
                      </label>
                      <input
                        className="col-12"
                        type="text"
                        name="waterResistant"
                        id="waterResistant"
                      />
                    </div>
                    <div className="btns">
                      <button className="addBtn" name="send">
                        add
                      </button>
                      <button className="updateBtn">update</button>
                      <button className="resetBtn">reset</button>
                    </div>
                  </form>
                </div>

                <div className="cardsSide row col-6">
                  <div className="itemCard col-5">
                    <img src="" alt="" />
                    <div className="details">
                      <h4>product name</h4>
                      <del>
                        <h4>500 Egp</h4>
                      </del>
                      <h4>350 egp</h4>
                      <button className="editBtn">edit</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="orders row col-10">
                <div className="orderItem col-3">
                  <h4>customer name</h4>
                  <h4>customer phone</h4>
                  <h4>customer emails</h4>
                  <h4>customer address</h4>
                  <h4>customer order</h4>
                  <button className="confirmBtn">confirm order</button>
                </div>
                <div className="orderItem col-3">
                  <h4>customer name</h4>
                  <h4>customer phone</h4>
                  <h4>customer emails</h4>
                  <h4>customer address</h4>
                  <h4>customer order</h4>
                  <button className="confirmBtn">confirm order</button>
                </div>
                <div className="orderItem col-3">
                  <h4>customer name</h4>
                  <h4>customer phone</h4>
                  <h4>customer emails</h4>
                  <h4>customer address</h4>
                  <h4>customer order</h4>
                  <button className="confirmBtn">confirm order</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
