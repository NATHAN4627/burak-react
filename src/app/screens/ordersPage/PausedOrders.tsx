import { Box, Stack } from "@mui/joy";
import Button from "@mui/material/Button";
import TabPanel from "@mui/lab/TabPanel";

export default function PausedOrders() {
  return (
    <TabPanel value={"1"}>
      <Stack>
        {[1, 2].map((ele, index) => {
          return (
            <Box key={index} className={"order-main-box"}>
              <Box className={"order-box-scroll"}>
                {[1, 2, 3].map((ele2, index2) => {
                  return (
                    <Box key={index2} className={"orders-name-price"}>
                      <img
                        src={"/img/lavash.webp"}
                        className={"order-dish-img"}
                        alt="dish"
                      />
                      <p className={"title-dish"}>Lavash</p>
                      <Box className={"price-box"}>
                        <p>$9</p>
                        <img src={"/icons/close.svg"} alt="x" />
                        <p>2</p>
                        <img src={"/icons/pause.svg"} alt="=" />
                        <p style={{ marginLeft: "15px" }}>$18</p>
                      </Box>
                    </Box>
                  );
                })}
              </Box>

              <Box className={"total-price-box"}>
                <Box className={"box-total"}>
                  <p>Product price</p>
                  <p>$54</p>
                  <img
                    src={"/icons/plus.svg"}
                    style={{ marginLeft: "20px" }}
                    alt="+"
                  />
                  <p>delivery cost</p>
                  <p>$2</p>
                  <img
                    src={"/icons/pause.svg"}
                    style={{ marginLeft: "20px" }}
                    alt="="
                  />
                  <p>Total</p>
                  <p>$56</p>
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

        {false && (
          <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
            <img
              src={"/icons/noimage-list.svg"}
              style={{ width: 300, height: 300 }}
              alt="no data"
            />
          </Box>
        )}
      </Stack>
    </TabPanel>
  );
}
