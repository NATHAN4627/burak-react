import React from "react";
import { Box, Container } from "@mui/material";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider, Stack } from "@mui/joy";
import CardOverflow from "@mui/joy/CardOverflow";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { createSelector } from "@reduxjs/toolkit";
import { retrievePopularDishes } from "./selector";
import { useSelector } from "react-redux";
import { serverApi } from "../../../lib/config";
import { Product } from "../../../lib/types/product";

/** REDUX SELECTOR **/
const popularDishesRetriever = createSelector(
  retrievePopularDishes,
  (popularDishes) => ({ popularDishes }),
);

export default function PopularDishes() {
  const { popularDishes } = useSelector(popularDishesRetriever);

  return (
    <CssVarsProvider>
      <div className="popular-dishes-frame">
        <Container>
          <Stack className="popular-section">
            <Box className="category-title">Popular Dishes</Box>
            <Stack className="cards-frame">
              {popularDishes.length !== 0 ? (
                popularDishes.map((ele: Product) => {
                  const imagePath = `${serverApi}/${ele.productImages[0]}`;
                  return (
                    <Card key={ele._id} className={"card"}>
                      <CardCover>
                        <img src={imagePath} alt="" />
                      </CardCover>
                      <CardCover className={"card-cover"} />
                      <CardContent sx={{ justifyContent: "flex-end" }}>
                        <Stack
                          flexDirection={"row"}
                          justifyContent={"space-between"}
                          alignItems={"center"}
                          sx={{ width: "100%" }}
                        >
                          <Typography
                            level="h2"
                            fontSize="lg"
                            textColor="#fff"
                            mb={0}
                          >
                            {ele.productName}
                          </Typography>
                          <Typography
                            sx={{
                              fontWeight: "md",
                              color: "neutral.300",
                              alignItems: "center",
                              display: "flex",
                            }}
                          >
                            {ele.productViews}
                            <VisibilityIcon
                              style={{ fontSize: "25px", marginLeft: "5px" }}
                            />
                          </Typography>
                        </Stack>
                      </CardContent>
                      <CardOverflow
                        sx={{
                          display: "flex",
                          gap: 1.5,
                          py: 1.5,
                          px: "var(--Card-padding)",
                          borderTop: "1px solid",
                          height: "60px",
                        }}
                      >
                        <Typography
                          startDecorator={<DescriptionOutlinedIcon />}
                          textColor="neutral.300"
                        >
                          {ele.productDesc}
                        </Typography>
                      </CardOverflow>
                    </Card>
                  );
                })
              ) : (
                <Box className="no-data">
                  Popular products are not avaliable!
                </Box>
              )}
            </Stack>
          </Stack>
        </Container>
      </div>
    </CssVarsProvider>
  );
}
