import "./Contact.css";
export default function Contact() {
  return (
    <>
      <div className="contact">
        <div className="backgroundLayer">
          <img src="imgs/pexels-olly-845451.jpg" alt="" />
        </div>
        <div className="container-fluid">
          <div className="contactInner row">
            <form className="contactForm col-10" action="">
              <div className="inputContainer row">
                <label htmlFor="fullName" className="col-10">
                  full name
                </label>
                <input
                  className="col-10"
                  type="text"
                  name="name"
                  id="fullName"
                />
              </div>
              <div className="inputContainer row">
                <label htmlFor="phone" className="col-10">
                  phone nubmer
                </label>
                <input className="col-10" type="tel" name="phone" id="phone" />
              </div>
              <div className="inputContainer row">
                <label htmlFor="email" className="col-10">
                  email address
                </label>
                <input
                  className="col-10"
                  type="email"
                  name="email"
                  id="email"
                />
              </div>
              <div className="inputContainer row">
                <label htmlFor="msg" className="col-10">
                  your message
                </label>
                <textarea
                  className="col-10"
                  name="msg"
                  id="msg"
                  rows={10}
                ></textarea>
              </div>
              <div className="submit">
                <button className="submitBtn" type="submit">
                  send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
