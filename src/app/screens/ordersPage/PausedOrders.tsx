import { Box, Stack } from "@mui/joy";
import Button from "@mui/material/Button";
import TabPanel from "@mui/lab/TabPanel";
import { retrievePausedOrders } from "./selector";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { Order, OrderItem, OrderUpdateInput } from "../../../lib/types/order";
import { Messages, serverApi } from "../../../lib/config";
import { T } from "../../../lib/types/common";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { OrderStatus } from "../../../lib/enums/order.enum";
import { useGlobals } from "../../hooks/useGlobals";
import OrderService from "../../services/OrderService";
import { useHistory } from "react-router-dom";

/** REDUX SELECTOR **/
const pausedOrdersRetriever = createSelector(
  retrievePausedOrders,
  (pausedOrders) => ({ pausedOrders }),
);

interface PausedOrderProps {
  setValue: (input: string) => void;
}

export default function PausedOrders(props: PausedOrderProps) {
  const { authMember, setOrderBuilder } = useGlobals();
  const { pausedOrders } = useSelector(pausedOrdersRetriever);
  const { setValue } = props;

  /** HANDLERS */
  const deleteOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.DELETE,
      };

      const confirmation = window.confirm(
        "Are you sure you want to delete this order?",
      );
      if (confirmation) {
        const order = new OrderService();
        await order.updateOrder(input);

        setOrderBuilder(new Date());
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  const processOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.PROCESS,
      };

      const confirmation = window.confirm(
        "Are you sure you want to proceed the payment?",
      );
      if (confirmation) {
        const order = new OrderService();
        await order.updateOrder(input);

        setValue("2");
        setOrderBuilder(new Date());
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

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
                <Button
                  value={order._id}
                  variant="contained"
                  className={"cancel-button"}
                  onClick={deleteOrderHandler}
                >
                  Cancel
                </Button>
                <Button
                  value={order._id}
                  variant="contained"
                  className={"pay-button"}
                  onClick={processOrderHandler}
                >
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
