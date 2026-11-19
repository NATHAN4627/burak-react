import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import Basket from "./Basket";
import { CardItem } from "../../../lib/types/search";

interface OtherNavbarProps {
  cardItems: CardItem[];
}

export default function OtherNavbar(props: OtherNavbarProps) {
  const { cardItems } = props;
  const authMember = true;
  return (
    <div className="other-navbar">
      <Container className="navbar-container">
        <Stack className="menu">
          <Box>
            <NavLink to="/">
              <img className="brand-logo" src="/icons/burak.svg" />
            </NavLink>
          </Box>
          <Stack className="links">
            <Box className="hover-line">
              <NavLink to="/">Home</NavLink>
            </Box>
            <Box className="hover-line">
              <NavLink to="/products" activeClassName={"underline"}>
                Products
              </NavLink>
            </Box>
            {authMember ? (
              <>
                <Box className="hover-line">
                  <NavLink to="/orders" activeClassName={"underline"}>
                    Orders
                  </NavLink>
                </Box>
                <Box className="hover-line">
                  <NavLink to="/member-page" activeClassName={"underline"}>
                    My Page
                  </NavLink>
                </Box>
              </>
            ) : null}
            <Box className="hover-line">
              <NavLink to="/help" activeClassName={"underline"}>
                Help
              </NavLink>
            </Box>

            {/* App'dan kelgan savat ro'yxatini Basket'ga uzatadi. */}
            <Basket cardItems={cardItems} />

            {!authMember ? (
              <Box>
                <Button variant="contained" className="login-button">
                  Login
                </Button>
              </Box>
            ) : (
              <img
                className="user-avatar"
                src={"/icons/default-user.svg"}
                aria-haspopup={"true"}
              />
            )}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
