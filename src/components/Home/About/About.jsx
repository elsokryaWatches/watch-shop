import "./About.css";

export default function About() {
  return (
    <>
      <div className="about">
        <div className="container-fluid">
          <div className="aboutInner row">
            <div className="img fadeIn col-4">
              <img src="imgs/Untitled_design_1.webp" alt="" />
            </div>
            <div className="text col-6">
              <h2>about us</h2>
              <p>
                At <strong>Ofilans Watches</strong>, we specialize in creating{" "}
                <strong>custom Seiko timepieces</strong>, catering to watch
                enthusiasts who appreciate craftsmanship, style, and
                individuality. Taking the classic reliability and precision of
                Seiko watches and transform them into{" "}
                <strong>unique, personalized pieces</strong>. Known for our
                attention to detail, we{" "}
                <strong>offer a range of customization options</strong>,
                including dial modifications, hands, bezels, and straps,
                allowing our customers to tailor their watches to reflect their
                personal tastes and preferences.
              </p>
              <button className="aboutBtn">contact us</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
