import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

export default function UpBtn() {
  const [isVisible, setIsVisible] = useState(false);

  const scrollHandle = () => {
    if (window.scrollY > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHandle);
    return () => {
      window.removeEventListener("scroll", scrollHandle);
    };
  });
  return (
    <>
      {isVisible && (
        <button className="upBtn" onClick={scrollUp}>
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
      )}
    </>
  );
}
