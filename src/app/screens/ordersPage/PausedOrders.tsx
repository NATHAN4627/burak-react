import { Box, Stack } from "@mui/joy";
import Button from "@mui/material/Button";
import TabPanel from "@mui/lab/TabPanel";
import { retrievePausedOrders } from "./selector";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { Order, OrderItem } from "../../../lib/types/order";
import { serverApi } from "../../../lib/config";

/** REDUX SELECTOR **/
const pausedOrdersRetriever = createSelector(
  retrievePausedOrders,
  (pausedOrders) => ({ pausedOrders }),
);

export default function PausedOrders() {
  const { pausedOrders } = useSelector(pausedOrdersRetriever);

  /** HANDLERS */

  

  return (
    <TabPanel value={"1"}>
      <Stack>
        {pausedOrders.map((order: Order) => {
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
                      <img
                        src={imagePath}
                        className={"order-dish-img"}
                        alt="dish"
                      />
                      <p className={"title-dish"}>{product.productName}</p>
                      <Box className={"price-box"}>
                        <p>{orderItem.itemPrice}</p>
                        <img src={"/icons/close.svg"} alt="x" />
                        <p>{orderItem.itemQuantity}</p>
                        <img src={"/icons/pause.svg"} alt="=" />
                        <p style={{ marginLeft: "15px" }}>
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
                  <img
                    src={"/icons/plus.svg"}
                    style={{ marginLeft: "20px" }}
                    alt="+"
                  />
                  <p>delivery cost</p>
                  <p>${order.orderDelivery}</p>
                  <img
                    src={"/icons/pause.svg"}
                    style={{ marginLeft: "20px" }}
                    alt="="
                  />
                  <p>Total</p>
                  <p>${order.orderTotal}</p>
                </Box>
                <Button variant="contained" className={"cancel-button"}>
                  Cancel
                </Button>
                <Button variant="contained" className={"pay-button"}>
                  Payment
                </Button>
              </Box>
            </Box>
          );
        })}

        {!pausedOrders ||
          (pausedOrders.length === 0 && (
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"center"}
            >
              <img
                src={"/icons/noimage-list.svg"}
                style={{ width: 300, height: 300 }}
                alt="no data"
              />
            </Box>
          ))}
      </Stack>
    </TabPanel>
  );
}
