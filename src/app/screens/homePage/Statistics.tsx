import { Box, Container, Divider, Stack } from "@mui/material";
import React from "react";

export default function Statistics() {
  return (
    // bizga tuliq div kk boladi,
    // va div ni ichida Container ishlatamiz hamma sectioanl componentda
    <div className="static-frame">
      <Container>
        <Stack className="info">
          <Stack className="static-box">
            <Box className="static-num">12</Box>
            <Box className="static-txt">Restaurants</Box>
          </Stack>
          <Divider
            sx={{ height: 64, borderRightWidth: 2, borderColor: "#E3C08D" }}
          />
          <Stack className="static-box">
            <Box className="static-num">8</Box>
            <Box className="static-txt">Experience</Box>
          </Stack>
          <Divider
            sx={{ height: 64, borderRightWidth: 2, borderColor: "#E3C08D" }}
          />
          <Stack className="static-box">
            <Box className="static-num">50+</Box>
            <Box className="static-txt">Menu</Box>
          </Stack>
          <Divider
            sx={{ height: 64, borderRightWidth: 2, borderColor: "#E3C08D" }}
          />
          <Stack className="static-box">
            <Box className="static-num">200+</Box>
            <Box className="static-txt">Clients</Box>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
