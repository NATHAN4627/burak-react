import React from "react";
import "../css/app.css";
import { Box, Button, Container, Stack, Typography } from "@mui/material";

function App() {
  return (
  <Container maxWidth="sm">
      <Stack direction={"column"}>
        <Box sx={{my: 4}}>
          <Typography variant="h4" component={"h4"}>
            Create React App on Typescript with Redux
          </Typography>
        </Box>
        <Button variant="contained">Press</Button>
      </Stack>
  </Container>
  );
}

export default App;





