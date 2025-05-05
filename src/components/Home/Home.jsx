import Collections from "./Collections/Collections";
import About from "./About/About";
import Arabic from "./Arabic/Arabic";
import UpBtn from "../UpBtn/UpBtn";
import { Helmet } from "react-helmet";

export default function home() {
  return (
    <>
      <Helmet>
        <title>El Sokkaria - Home Page</title>
      </Helmet>
      <About />
      <Collections />
      <Arabic />
      <UpBtn />
    </>
  );
}
