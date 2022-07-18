import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";

const DrawerButtons = ({ item, handleTagChange, selectedTags }) => {
  const selected = selectedTags.includes(`${item.title}`);
  const color = useColorModeValue("white", "gray.900");
  return (
    <Flex
      fontWeight="500"
      _hover={{ transform: "scale(1.1)", bg: `${item.color}.300` }}
      transition="500ms"
      fontSize="large"
      justify="space-between"
      align="center"
      bg={selected ? `${item.color}.400` : `${item.color}.200`}
      p="0.5rem 1rem"
      m="0.6rem"
      borderRadius="8px"
      cursor="pointer"
      onClick={() => handleTagChange(item.title)}
    >
      <Text color={color}>{item.title}</Text>
      <Text
        bg={`${item.color}.600`}
        color={color}
        p="0.1rem 0.5rem"
        borderRadius="50%"
      >
        {item.length}
      </Text>
    </Flex>
  );
};

export default DrawerButtons;
