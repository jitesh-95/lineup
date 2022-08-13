import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Home = () => {
  let Token = localStorage.getItem("token");
  const navigate = useNavigate();
  const handleExplore = () => {
    navigate("/login");
  };

  if (Token) {
    return <Navigate to="/app" />;
  }
  return (
    <Flex
      direction={{
        base: "column",
        sm: "column",
        md: "row",
        lg: "row",
        xl: "row",
      }}
      justify="space-between"
      align="center"
      p={{
        base: "1rem 0.5rem",
        md: "2rem 3rem",
        lg: "3rem 4rem",
        xl: "3rem 8rem",
      }}
    >
      <Box>
        <Text
          fontSize={{ base: "2xl", md: "3xl", lg: "4xl", xl: "4xl" }}
          fontWeight={700}
          id="inbox"
        >
          STILL USING DIARY ?
        </Text>
        <Text
          fontSize={{ base: "2xl", md: "3xl", lg: "4xl", xl: "4xl" }}
          fontWeight={700}
          id="logoName"
        >
          TRY{" "}
          <span
            style={{ fontSize: "45px", lineHeight: "20px", color: "#3182CE" }}
          >
            Line.Up
          </span>
        </Text>
        <Text
          fontSize={{ base: "lg", md: "xl", lg: "2xl", xl: "2xl" }}
          mt="1rem"
          fontWeight={500}
          borderBottom="2px solid #0BC5EA"
        >
          Manage Your Every Task
        </Text>
        <Button
          mt="1rem"
          size={{ base: "sm", md: "md", lg: "lg", xl: "lg" }}
          colorScheme="twitter"
          fontSize={{ base: "lg", md: "xl", lg: "2xl", xl: "2xl" }}
          w={{ base: "50%", md: "50%", lg: "80%", xl: "80%" }}
          onClick={handleExplore}
        >
          Explore
        </Button>
      </Box>
      <img src="inboxFull.svg" alt="" className="homeIcon" />
      <img src="arrange_data.svg" alt="" className="homeIcon2" />
    </Flex>
  );
};

export default Home;
