import Watches from "./Watches/Watches";
import Wallets from "./Wallets/Wallets";
import Belts from "./Belts/Belts";
import Perfumes from "./Perfumes/Perfumes";
import Shoes from "./Shoes/Shoes";
import UpBtn from "../UpBtn/UpBtn";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>El Sokrya - Home Page</title>
      </Helmet>
      <Watches />
      <Wallets />
      <Belts />
      <Perfumes />
      <Shoes />
      <UpBtn />
    </>
  );
}
