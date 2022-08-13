import {
  Badge,
  Box,
  Checkbox,
  CheckboxGroup,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { DeleteIcon } from "@chakra-ui/icons";
import { getTasks, updateSubTasksStatus } from "../redux/appReducer/appAction";
import { useDispatch } from "react-redux";

const Task = ({
  title,
  id,
  description,
  tags,
  subTasks,
  scheme,
  date,
  hanldeTaskDelete,
}) => {
  const subTaskBG = useColorModeValue("blue.50", "blue.800");
  const desBg = useColorModeValue("gray.600", "gray.400");
  const dispatch = useDispatch();

  const [checkbox, setCheckbox] = useState(() => {
    let data = subTasks
      .filter((item) => {
        return item.status && item.subTaskTitle;
      })
      .map((item) => item.subTaskTitle);
    return data;
  });

  const handleOnchange = (value) => {
    setCheckbox(value);
    const data = subTasks.map((item) => {
      if (value.includes(item.subTaskTitle)) {
        return { ...item, status: true };
      }
      return { ...item, status: false };
    });

    dispatch(updateSubTasksStatus(id, { subTasks: data })).then(() =>
      dispatch(getTasks())
    );
  };

  return (
    <Box boxShadow="md" p="0.5rem 1rem" mb="0.8rem">
      <Flex justify="space-between" align="center">
        <Text fontSize={{ base: "xl", xl: "2xl" }} fontWeight={600}>
          {title}
        </Text>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<BiDotsVerticalRounded />}
            variant="outline"
          />
          <MenuList size="lg">
            <Link to={`/app/${id}`}>
              <MenuItem icon={<FiEdit />}>Edit</MenuItem>
            </Link>
            <MenuItem
              icon={<DeleteIcon />}
              onClick={() => hanldeTaskDelete(id)}
            >
              Delete
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <hr />
      <Box>
        {tags.map((tag, index) => (
          <Badge
            key={index}
            colorScheme={scheme}
            mr="1em"
            p="0.1rem 0.5rem"
            borderRadius="10px"
          >
            {tag}
          </Badge>
        ))}
      </Box>
      <Text
        fontSize={{ base: "lg", lg: "lg", xl: "xl" }}
        m="5px 0 10px 0"
        color={desBg}
      >
        {description}
      </Text>
      {subTasks.length > 0 && (
        <Flex
          direction="column"
          p="0.5rem 0.2rem 0.5rem 1rem"
          gap={2}
          bg={subTaskBG}
          borderRadius="6px"
        >
          <CheckboxGroup
            value={checkbox}
            onChange={(value) => handleOnchange(value)}
          >
            {subTasks?.map((subtask, index) => (
              <Checkbox
                textDecoration={
                  checkbox.includes(subtask.subTaskTitle) ? "line-through" : ""
                }
                opacity={checkbox.includes(subtask.subTaskTitle) ? 0.5 : 1}
                key={index}
                fontWeight={500}
                value={subtask.subTaskTitle}
                colorScheme="green"
              >
                {subtask.subTaskTitle}
              </Checkbox>
            ))}
          </CheckboxGroup>
        </Flex>
      )}
      <Text fontSize="xs" textAlign="end" opacity={0.6}>
        {date}
      </Text>
    </Box>
  );
};

export default Task;
