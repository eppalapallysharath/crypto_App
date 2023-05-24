import { Button, HStack } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <HStack p={"4"} shadow={"base"} bgColor={"blackAlpha.900"}>
      <Button variant={"unstyled"} color={"white"}>
        <NavLink
          to="/"
          style={({ isActive }) => {
            return {
              color: isActive ? "orangered" : "white",
            };
          }}
        >
          Home
        </NavLink>
      </Button>
      <Button variant={"unstyled"} color={"white"}>
        <NavLink
          to="/coins"
          style={({ isActive }) => {
            return {
              color: isActive ? "orangered" : "white",
            };
          }}
        >
          Coins
        </NavLink>
      </Button>
      <Button variant={"unstyled"} color={"white"}>
        <NavLink
          to="/exchanges"
          style={({ isActive }) => {
            return {
              color: isActive ? "orangered" : "white",
            };
          }}
        >
          Exchanges
        </NavLink>
      </Button>
    </HStack>
  );
};

export default Header;
