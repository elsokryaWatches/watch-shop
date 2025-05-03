import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <>
      <div className="navBar">
        <div className="container-fluid">
          <div className="navbarInner row">
            <div className="logo col-1">
              <Link to={"/"}>
                <img src="imgs\Ofilan_Watches_Logo_Enlarged_v1.avif" alt="" />
              </Link>
            </div>
            <div className="navList col-4">
              <li className="navItem">
                <Link className="navLink" to={"/"}>
                  home
                </Link>
              </li>
              <li className="navItem">
                <Link className="navLink" to={"/contact"}>
                  contact
                </Link>
              </li>
              <li className="navItem dropdown">
                <Link
                  className="navLink dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  to={"/shop"}
                >
                  shop
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={"/men"}>
                      men watches
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to={"/women"}>
                      women watches
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to={"/young"}>
                      young watches
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to={"/wallets"}>
                      wallets
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="navItem dropdown">
                <Link
                  className="navLink dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  langauge
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item">english</Link>
                  </li>
                  <li>
                    <Link className="dropdown-item">arabic</Link>
                  </li>
                </ul>
              </li>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
