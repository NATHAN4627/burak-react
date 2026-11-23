import React from "react";
import { Stack } from "@mui/material";
import { Box } from "@mui/joy";
import TabPanel from "@mui/lab/TabPanel";
import moment from "moment";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { retrieveFinishedOrders } from "./selector";
import { Order, OrderItem } from "../../../lib/types/order";
import { serverApi } from "../../../lib/config";

/** REDUX SELECTOR **/
const finishedOrdersRetriever = createSelector(
  retrieveFinishedOrders,
  (finishedOrders) => ({ finishedOrders }),
);

export default function FinishedOrders() {
  const { finishedOrders } = useSelector(finishedOrdersRetriever);

  return (
    <TabPanel value={"3"}>
      <Stack>
        {finishedOrders?.map((order: Order) => {
          return (
            <Box key={order._id} className={"order-main-box"}>
              <Box className={"order-box-scroll"}>
                {order.orderItems?.map((orderItem: OrderItem) => {
                  const product = order.productData?.find(
                    (item) => item._id === orderItem.productId,
                  );
                  if (!product) return null;

                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  return (
                    <Box key={orderItem._id} className={"orders-name-price"}>
                      <img src={imagePath} className={"order-dish-img"} />
                      <p className={"title-dish"}>{product.productName}</p>
                      <Box className={"price-box"}>
                        <p>{orderItem.itemPrice}</p>
                        <img src={"/icons/close.svg"} />
                        <p>{orderItem.itemQuantity}</p>
                        <img src={"/icons/pause.svg"} />
                        <p style={{ marginLeft: "15px" }}>
                          {" "}
                          ${orderItem.itemQuantity * orderItem.itemPrice}
                        </p>
                      </Box>
                    </Box>
                  );
                })}
              </Box>

              <Box className={"total-price-box"}>
                <Box className={"box-total"}>
                  <p>Product price</p>
                  <p>${order.orderTotal - order.orderDelivery}</p>
                  <img src={"/icons/plus.svg"} style={{ marginLeft: "20px" }} />
                  <p>delivery cost</p>
                  <p>${order.orderDelivery}</p>
                  <img
                    src={"/icons/pause.svg"}
                    style={{ marginLeft: "20px" }}
                  />
                  <p>Total</p>
                  <p>${order.orderTotal}</p>
                </Box>
                <p className={"data-compl"}>
                  {moment().format("YY-MM-DD HH:mm")}
                </p>
              </Box>
            </Box>
          );
        })}

        {!finishedOrders ||
          (finishedOrders.length === 0 && (
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"center"}
            >
              <img
                src={"/icons/noimage-list.svg"}
                style={{ width: 300, height: 300 }}
              />
            </Box>
          ))}
      </Stack>
    </TabPanel>
  );
}
