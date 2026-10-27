import { Container, Box } from "@mui/material";
import React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider, Stack } from "@mui/joy";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Divider from "../../components/divider";

const newDishes = [
  { productName: "Cutlet", imagePath: "/img/cutlet.webp" },
  { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
  { productName: "Kebab", imagePath: "/img/kebab.webp" },
  { productName: "Lavash", imagePath: "/img/lavash.webp" },
];

export default function NewDishes() {
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
              {newDishes.map((ele, index) => (
                <Card key={index} variant="outlined" className="card">
                  <CardOverflow>
                    <div className="product-sale">Normal Size</div>
                    <AspectRatio ratio="1">
                      <img src={ele.imagePath} alt={ele.productName} />
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
                        <Typography className="price">$12</Typography>
                      </Stack>

                      <Typography className="views">
                        20
                        <VisibilityIcon
                          style={{ fontSize: 20, marginLeft: "5px" }}
                        />
                      </Typography>
                    </Stack>
                  </CardOverflow>
                </Card>
              ))}
            </Stack>
          </Stack>
        </Container>
      </div>
    </CssVarsProvider>
  );
}
