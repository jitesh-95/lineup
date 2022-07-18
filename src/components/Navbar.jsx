import React from "react";
import { Flex, Button, useColorMode, Tooltip, Text } from "@chakra-ui/react";

import { BsFillLightbulbOffFill, BsLightbulb } from "react-icons/bs";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";

const Navbar = () => {
  const auth = useSelector((state) => state.authReducer.isAuth);

  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex
      boxShadow="xs"
      p={{
        base: "0.8rem 1rem",
        sm: "0.8rem 1.2rem",
        lg: "0.8rem 1.5rem",
        xl: "1rem 2rem",
        "2xl": "1rem 3rem",
      }}
      justify="space-between"
      align="center"
      mb={5}
    >
      {auth && <Sidebar />}
      <Text
        style={{ fontFamily: "Freehand, cursive" }}
        fontSize={{ base: "3xl", sm: "3xl", lg: "4xl", xl: "5xl" }}
        lineHeight={5}
      >
        Line.Up
      </Text>

      <Tooltip label="Color Mode" placement="auto">
        <Button onClick={toggleColorMode} fontSize="2xl" bg="none">
          {colorMode === "light" ? <BsFillLightbulbOffFill /> : <BsLightbulb />}
        </Button>
      </Tooltip>
    </Flex>
  );
};

export default Navbar;
