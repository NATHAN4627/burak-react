import { Container, Box } from "@mui/material";
import React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider, Stack } from "@mui/joy";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Divider from "../../components/divider";
import { retrieveNewDishes } from "./selector";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { serverApi } from "../../../lib/config";
import { Product } from "../../../lib/types/product";
import { ProductCollection } from "../../../lib/enums/product.enum";

/** REDUX SELECTOR **/
const newDishesRetriever = createSelector(retrieveNewDishes, (newDishes) => ({
  newDishes,
}));

export default function NewDishes() {
  const { newDishes } = useSelector(newDishesRetriever);

  return (
    <CssVarsProvider>
      <div className="new-product-frame">
        <Container>
          <Stack className="main">
            <Box className="category-title">New Dishes</Box>
            <Stack
              className="cards-frame"
              direction="row"
              sx={{
                flexWrap: "wrap",
                gap: "20px",
                justifyContent: "space-between",
              }}
            >
              {newDishes.length !== 0 ? (
                newDishes.map((ele: Product) => {
                  const imagePath = `${serverApi}/${ele.productImages[0]}`;
                  const sizeVolume =
                    ele.productCollection === ProductCollection.DRINK
                      ? ele.productVolume + "L"
                      : ele.productSize + " size";
                  return (
                    <Card key={ele._id} variant="outlined" className="card">
                      <CardOverflow>
                        <div className="product-sale">{sizeVolume}</div>
                        <AspectRatio ratio="1">
                          <img src={imagePath} alt={ele.productName} />
                        </AspectRatio>
                      </CardOverflow>

                      <CardOverflow variant="soft" className="product-detail">
                        <Stack
                          className="info"
                          direction="row"
                          sx={{
                            width: "100%",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Stack direction="row" sx={{ alignItems: "center" }}>
                            <Typography className="title">
                              {ele.productName}
                            </Typography>
                            <Divider width="2" height="24" bg="#d9d9d9" />
                            <Typography className="price">
                              {ele.productPrice}
                            </Typography>
                          </Stack>

                          <Typography className="views">
                            {ele.productViews}
                            <VisibilityIcon
                              style={{ fontSize: 20, marginLeft: "5px" }}
                            />
                          </Typography>
                        </Stack>
                      </CardOverflow>
                    </Card>
                  );
                })
              ) : (
                <Box className="no-data">New Products are not avaliable!</Box>
              )}
            </Stack>
          </Stack>
        </Container>
      </div>
    </CssVarsProvider>
  );
}
