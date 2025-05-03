import "./Arabic.css";
import { Link } from "react-router-dom";

export default function Arabic() {
  return (
    <>
      <div className="arabicColl">
        <div className="container-fluid">
          <div className="arabCollInner row">
            <div className="arCollHeader col-12">
              <h6>custom dials</h6>
              <h2>seiko arabic dial</h2>
            </div>
            <div className="items row col-12">
              <div className="item center col-3">
                <div className="img">
                  <img src="imgs/greenarabicdial.webp" alt="" />
                </div>
                <h6>seiko royal green arabic dial mod</h6>
              </div>
              <div className="item center col-3">
                <div className="img">
                  <img src="imgs/IMG_4958.webp" alt="" />
                </div>
                <h6>seiko olive green arabic dial mod</h6>
              </div>
              <div className="item center col-3">
                <div className="img">
                  <img
                    src="imgs/TwoToneRoseGoldChocolateDial_06f7ac83-3783-459f-9de0-7e612ac84f64.webp"
                    alt=""
                  />
                </div>
                <h6>seiko chocolate arabic dial</h6>
              </div>
              <div className="item center col-3">
                <div className="img">
                  <img src="imgs/Untitleddesign_9_1.webp" alt="" />
                </div>
                <h6>seiko white textured arabic dial mod</h6>
              </div>
            </div>
            <div className="toShop center col-10">
              <button className="arabicBtn">
                <Link to={"/shop"}>view all</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
