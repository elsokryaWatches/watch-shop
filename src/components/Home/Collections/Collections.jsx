import "./Collections.css";
import { Link } from "react-router-dom";

export default function Collections() {
  return (
    <>
      <div className="collection">
        <div className="container-fluid">
          <div className="collectionInner row">
            <div className="collHeader col-12">
              <h6>custom seiko mods</h6>
              <h2>collections</h2>
            </div>
            <div className="items row col-12">
              <div className="item fromLeft col-2">
                <img src="imgs/pepsigmt.webp" alt="" />
                <button className="itemBtn fadeIn">
                  <Link to={"/shop"}>gmt</Link>
                </button>
              </div>
              <div className="item fromLeft col-2">
                <img src="imgs/black_aquanaut.webp" alt="" />
                <button className="itemBtn fadeIn">
                  <Link to={"/shop"}>aquanaut</Link>
                </button>
              </div>
              <div className="item center col-2">
                <img src="imgs/panda_daytona.webp" alt="" />
                <button className="itemBtn fadeIn">
                  <Link to={"/shop"}>daytona</Link>
                </button>
              </div>
              <div className="item fromRight col-2">
                <img src="imgs/greenarabicdial.webp" alt="" />
                <button className="itemBtn fadeIn">
                  <Link to={"/shop"}>datejust</Link>
                </button>
              </div>
              <div className="item fromRight col-2">
                <img src="imgs/navy_blue_nautilus.webp" alt="" />
                <button className="itemBtn fadeIn">
                  <Link to={"/shop"}>nautilus</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
