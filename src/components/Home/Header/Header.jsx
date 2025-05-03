import "./Header.css";

export default function Header() {
  return (
    <>
      <div className="header">
        <div className="backgroundLayer">
          <img src="/imgs/Ofilan_Watches_Web_Banner_1.webp" alt="" />
        </div>
        <div className="container-fluid">
          <div className="headerInner">
            <div className="textOverlay">
              <h5>ELEGANCE IN EVERY TICK</h5>
              <h2>custom seiko modded watches</h2>
              <button className="headerBtn">shop all</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
