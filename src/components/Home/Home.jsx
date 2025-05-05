import Header from "./Header/Header";
import Collections from "./Collections/Collections";
import About from "./About/About";
import Arabic from "./Arabic/Arabic";
import UpBtn from "../UpBtn/UpBtn";
import { Helmet } from "react-helmet";

export default function home() {
  return (
    <>
      <Helmet>
        <title>Watch Shop - Home Page</title>
      </Helmet>
      <Header />
      <Collections />
      <About />
      <Arabic />
      <UpBtn />
    </>
  );
}
