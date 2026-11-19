import React, { useState } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import HomePage from "./screens/homePage";
import ProductsPage from "./screens/productsPage";
import OrdersPage from "./screens/ordersPage";
import UserPage from "./screens/userPage";
import HelpPage from "./screens/helpPage";
import HomeNavbar from "./components/headers/HomeNavbar";
import OtherNavbar from "./components/headers/OtherNavbar";
import Footer from "./components/footer";
import "../css/app.css";
import "../css/navbar.css";
import "../css/footer.css";
import { CardItem } from "../lib/types/search";

function App() {
  const location = useLocation();

  // Sahifa qayta ochilganda savatni localStorage'dan tiklaydi.
  const cardJson: string | null = localStorage.getItem("cardData");
  const currentCard = cardJson ? JSON.parse(cardJson) : [];

  const [cardItems, setCardItems] = useState<CardItem[]>(currentCard);

  // Mahsulotni ID bo'yicha topadi yoki savatga yangi qator qo'shadi.
  const onAdd = (input: CardItem) => {
    const exist = cardItems.find((item: CardItem) => item._id === input._id);

    if (exist) {
      // Savatdagi mahsulot sonini bittaga oshiradi.
      const cardUpdate = cardItems.map((item: CardItem) =>
        item._id === input._id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
      // Yangilangan savatni state va localStorage'da saqlaydi.
      setCardItems(cardUpdate);
      localStorage.setItem("cardData", JSON.stringify(cardUpdate));
    } else {
      const cardUpdate = [...cardItems, { ...input }];
      setCardItems(cardUpdate);
      localStorage.setItem("cardData", JSON.stringify(cardUpdate));
    }
  };
  return (
    <>
      {/* Ikkala navbar ham bir xil savat ro'yxatini oladi. */}
      {location.pathname === "/" ? (
        <HomeNavbar cardItems={cardItems} />
      ) : (
        <OtherNavbar cardItems={cardItems} />
      )}
      <Switch>
        <Route path="/products">
          <ProductsPage onAdd={onAdd} />
        </Route>
        <Route path="/orders">
          <OrdersPage />
        </Route>
        <Route path="/member-page">
          <UserPage />
        </Route>
        <Route path="/help">
          <HelpPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;
