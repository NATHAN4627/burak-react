import { Box, Container, Stack } from "@mui/material";
import Card from "@mui/joy/Card";
import { CssVarsProvider, Typography } from "@mui/joy";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { retrieveTopUsers } from "./selector";
import { serverApi } from "../../../lib/config";
import { Member } from "../../../lib/types/member";

/** REDUX SELECTOR **/
const topUsersRetriever = createSelector(retrieveTopUsers, (topUsers) => ({
  topUsers,
}));

export default function ActiveUsers() {
  const { topUsers } = useSelector(topUsersRetriever);

  return (
    <div className={"active-users-frame"}>
      <Container>
        <Stack className={"main"}>
          <Box className={"category-title"}>Active Users</Box>
          <Stack className={"cards-frame"}>
            <CssVarsProvider>
              {topUsers.length !== 0 ? (
                topUsers.map((ele: Member) => {
                  const imagePath = `${serverApi}/${ele.memberImage}`;
                  return (
                    <Card key={ele._id} variant="outlined" sx={{ width: 200 }}>
                      <CardOverflow>
                        <AspectRatio ratio="1">
                          <img src={imagePath} alt={ele.memberNick} />
                        </AspectRatio>
                      </CardOverflow>
                      <Typography level="title-md" mt={1} textAlign="center">
                        {ele.memberNick}
                      </Typography>
                    </Card>
                  );
                })
              ) : (
                <Box className="no-data">No Active Users!</Box>
              )}
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
