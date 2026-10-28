import React, { useState, SyntheticEvent } from "react";
import { Container, Box, Tab } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import "../../../css/orders.css";

export default function OrdersPage() {
  const [value, setValue] = useState("1");

  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className={"order-page"}>
      <Container>
        <div className={"order-wrapper"}>
          {/* ===== Chap: tablar va buyurtmalar ===== */}
          <div className={"order-left-box"}>
            <TabContext value={value}>
              <TabList onChange={handleChange} aria-label="orders tabs">
                <Tab label="Paused Order" value={"1"} />
                <Tab label="Proccess Order" value={"2"} />
                <Tab label="Finished Orders" value={"3"} />
              </TabList>
              <PausedOrders />
              <ProcessOrders />
              <FinishedOrders />
            </TabContext>
          </div>

          {/* ===== O'ng: user va payment ===== */}
          <div className={"order-right-box"}>
            <Box className={"member-box"}>
              <div className={"order-user-img"}>
                <img
                  src={"/img/justin.webp"}
                  className={"order-user-avatar"}
                  alt="user"
                />
                <img
                  src={"/icons/user-badge.svg"}
                  className={"order-user-icon"}
                  alt="badge"
                />
              </div>
              <span className={"order-user-name"}>Justin</span>
              <span className={"order-user-prof"}>USER</span>
              <div className={"liner"}></div>
              <div className={"order-user-address"}>
                <LocationOnIcon sx={{ fontSize: 16 }} />
                South Korea, Busan
              </div>
            </Box>

            <Box className={"payment-box"}>
              <input
                type="text"
                name="cardNumber"
                placeholder="Card number : 5243 4090 2002 7495"
              />
              <div className={"half-input"}>
                <input type="text" name="cardPeriod" placeholder="07 / 24" />
                <input type="text" name="cardCVV" placeholder="CVV : 010" />
              </div>
              <input
                type="text"
                name="cardCreator"
                placeholder="Justin Robertson"
              />
              <div className={"cards-box"}>
                <img src={"/icons/western-card.svg"} alt="western union" />
                <img src={"/icons/master-card.svg"} alt="mastercard" />
                <img src={"/icons/paypal-card.svg"} alt="paypal" />
                <img src={"/icons/visa-card.svg"} alt="visa" />
              </div>
            </Box>
          </div>
        </div>
      </Container>
    </div>
  );
}
