import React from "react";
import { Box, Container, Stack } from "@mui/material";

const brands = [
  { name: "Burak Gurme", imagePath: "/img/gurme.webp" },
  { name: "Burak Seafood", imagePath: "/img/seafood.webp" },
  { name: "Burak Sweets", imagePath: "/img/sweets.webp" },
  { name: "Burak Gonul", imagePath: "/img/doner.webp" },
];

export default function FamilyBrands() {
  return (
    <div className="family-brands">
      <Container>
        <Stack className="family-brands-area">
          <Box className="category-title">Our Family Brands</Box>
          <Stack className="brands-list">
            {brands.map((brand, index) => (
              <Box key={index} className="brand-card">
                <img src={brand.imagePath} alt={brand.name} />
              </Box>
            ))}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
