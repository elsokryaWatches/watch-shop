import Header from "./Header/Header";
import Collections from "./Collections/Collections";
import About from "./About/About";
import Arabic from "./Arabic/Arabic";
import UpBtn from "../UpBtn/UpBtn";

export default function home() {
  return (
    <>
      <Header />
      <Collections />
      <About />
      <Arabic />
      <UpBtn />
    </>
  );
}
