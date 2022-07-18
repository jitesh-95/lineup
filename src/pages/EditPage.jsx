import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  FormControl,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import {
  getTasks,
  updateSubTasksStatus,
  updateTasks,
} from "../redux/appReducer/appAction";

function reducer(state, action) {
  switch (action.type) {
    case "title":
      return {
        ...state,
        title: action.payload,
      };
    case "description":
      return {
        ...state,
        description: action.payload,
      };
    case "status":
      return {
        ...state,
        status: action.payload,
      };
    case "tag":
      return {
        ...state,
        tags: action.payload,
      };
    case "newSubTask":
      return {
        ...state,
        subTasks: action.payload,
      };
    default: {
      return state;
    }
  }
}
let today = Date().split(" ");
today = today[1] + "-" + today[2] + "-" + today[3];

const initialState = {
  title: "",
  status: "",
  description: "",
  tags: [],
  subTasks: [],
};

const EditPage = () => {
  const bg = useColorModeValue("gray.100", "gray.800");
  const cardBG = useColorModeValue("white", "black");
  const hoverBG = useColorModeValue("gray.100", "gray.800");

  const [state, setter] = useReducer(reducer, initialState);
  const tasks = useSelector((state) => state.appReducer.tasks);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [checkbox, setCheckbox] = useState([]);
  const [newSubTask, setNewSubTask] = useState("");

  useEffect(() => {
    if (tasks) {
      const currentTask = tasks.find((task) => task.id === +id);
      if (currentTask) {
        state.title = currentTask.title;
        state.description = currentTask.description;
        state.status = currentTask.status;
        state.tags = currentTask.tags;
        state.subTasks = currentTask.subTasks;
        let data = currentTask.subTasks
          .filter((item) => {
            return item.status && item.subTaskTitle;
          })
          .map((item) => item.subTaskTitle);
        setCheckbox(data);
      }
    }
  }, [tasks, id]);

  useEffect(() => {
    if (tasks.length === 0) {
      dispatch(getTasks());
    }
  }, []);

  //adding new task
  const handleNewSubTaskSubmit = (e) => {
    e.preventDefault();
    setter({
      type: "newSubTask",
      payload: [...state.subTasks, { subTaskTitle: newSubTask, status: false }],
    });
    setNewSubTask("");
  };

  //updating
  const handleUpdate = () => {
    dispatch(updateTasks(id, state)).then(() => dispatch(getTasks()));
    navigate("/app");
  };

  //delete subtask
  const handleDeleteSubTAsk = (taskIndex) => {
    const data = state.subTasks.filter(
      (item, index) => index !== taskIndex && item
    );
    setter({
      type: "newSubTask",
      payload: data,
    });
  };

  //updating subtask status
  const handleSubTaskUpdate = (value) => {
    setCheckbox(value);
    const data = state.subTasks.map((item) => {
      if (value.includes(item.subTaskTitle)) {
        return { ...item, status: true };
      }
      return { ...item, status: false };
    });

    dispatch(updateSubTasksStatus(id, { subTasks: data })).then(() =>
      dispatch(getTasks())
    );
    setter({ type: "newSubTask", payload: data });
  };

  return (
    <Box pb={{ base: "2rem 0.5rem", lg: "2rem 1rem", xl: "2rem" }} bg={bg}>
      <Heading textAlign="center" p="0.5rem" borderBottom="1px solid #A0AEC0">
        Edit It
      </Heading>
      <Flex
        p={{ base: "0.5rem 1.6rem", lg: "1rem 3rem", xl: "1rem 5rem" }}
        gap={10}
        justify="center"
        direction={{ base: "column", sm: "column", lg: "row", xl: "row" }}
      >
        {/* task title  & description  */}
        <Box
          bg={cardBG}
          w={{ base: "100%", md: "100%", lg: "70%", xl: "40%" }}
          p="1rem 0.5rem"
          borderTopRadius={10}
          boxShadow="xl"
          direction="column"
        >
          {/* title */}
          <Stack w="95%" m="auto">
            <Input
              autoFocus
              size={{ base: "md", md: "md", lg: "lg", xl: "lg" }}
              boxShadow="md"
              value={state.title}
              onChange={(e) => {
                setter({ type: "title", payload: e.target.value });
              }}
            />
            <Textarea
              size={{ base: "md", md: "md", lg: "lg", xl: "lg" }}
              boxShadow="md"
              value={state.description}
              onChange={(e) => {
                setter({ type: "description", payload: e.target.value });
              }}
            />
          </Stack>

          {/* status */}
          <Box p="1rem 0.5rem">
            <Text
              fontSize="xl"
              mb="0.5rem"
              fontWeight={500}
              boxShadow="base"
              p="0.5rem"
            >
              Status
            </Text>
            <hr />
            <RadioGroup
              pt="0.5rem"
              value={state.status}
              onChange={(e) => {
                setter({ type: "status", payload: e });
              }}
            >
              <Stack direction="column">
                <Radio value="Todo">Todo</Radio>
                <Radio value="In-Progress">In-Progress</Radio>
                <Radio value="Done">Done</Radio>
              </Stack>
            </RadioGroup>
          </Box>

          {/* tags */}
          <Box p="0.6rem 0.5rem">
            <Text
              fontSize="xl"
              mb="0.5rem"
              fontWeight={500}
              boxShadow="base"
              p="0.5rem"
            >
              Tags
            </Text>
            <hr />
            <CheckboxGroup
              colorScheme="green"
              value={state.tags}
              onChange={(e) => {
                setter({ type: "tag", payload: e });
              }}
            >
              <Stack spacing={[1, 5]} direction={"column"} pt="0.5rem">
                <Checkbox _hover={{ bg: hoverBG }} p="0.3rem" value="Personal">
                  Personal
                </Checkbox>
                <Checkbox _hover={{ bg: hoverBG }} p="0.3rem" value="Official">
                  Official
                </Checkbox>
                <Checkbox _hover={{ bg: hoverBG }} p="0.3rem" value="Others">
                  Others
                </Checkbox>
              </Stack>
            </CheckboxGroup>
          </Box>
        </Box>

        {/* subtask  */}
        <Box
          w={{ base: "100%", md: "100%", lg: "70%", xl: "40%" }}
          borderTopRadius={10}
          boxShadow="xl"
          p={{ base: "1rem 1rem", lg: "1rem 2rem", xl: "1rem 2rem" }}
          bg={cardBG}
        >
          <FormControl w="100%" m="auto">
            <form onSubmit={handleNewSubTaskSubmit}>
              <Input
                size={{ base: "md", md: "md", lg: "lg", xl: "lg" }}
                boxShadow="md"
                id="subtask"
                type="text"
                value={newSubTask}
                placeholder="Add New SubTask"
                onChange={(e) => {
                  setNewSubTask(e.target.value);
                }}
              />
              <Button
                w="100%"
                mt="0.5rem"
                fontSize={{ base: "lg", md: "lg", lg: "xl", xl: "xl" }}
                colorScheme="blue"
                type="submit"
              >
                Add
              </Button>
            </form>
          </FormControl>
          <Flex direction="column" p="1rem 0" gap={2}>
            <Text
              fontSize={{ base: "lg", md: "lg", lg: "xl", xl: "xl" }}
              mb="0.5rem"
              fontWeight={500}
              boxShadow="base"
              p="0.5rem"
            >
              Sub Tasks
            </Text>
            <CheckboxGroup
              value={checkbox}
              onChange={(value) => handleSubTaskUpdate(value)}
            >
              {state.subTasks.map((item, index) => (
                <Flex
                  key={index}
                  align={"center"}
                  justify="space-between"
                  p="0.5rem"
                  _hover={{ bg: hoverBG }}
                >
                  <Checkbox
                    textDecoration={
                      checkbox.includes(item.subTaskTitle) ? "line-through" : ""
                    }
                    opacity={checkbox.includes(item.subTaskTitle) ? 0.5 : 1}
                    value={item.subTaskTitle}
                    size={{ base: "md", md: "md", lg: "lg", xl: "lg" }}
                  >
                    {item.subTaskTitle}
                  </Checkbox>
                  <DeleteIcon
                    _hover={{ transform: "scale(1.2)", transition: "500ms" }}
                    cursor="pointer"
                    fontSize={{ base: "lg", md: "lg", lg: "xl", xl: "xl" }}
                    onClick={() => handleDeleteSubTAsk(index)}
                  />
                </Flex>
              ))}
            </CheckboxGroup>
          </Flex>
        </Box>
      </Flex>
      <Box m="1rem 0" w="100%" textAlign="center">
        <Button
          _hover={{ transform: "scale(1.1)", transition: "1s" }}
          w={{ base: "80%", md: "90%", lg: "60%", xl: "50%" }}
          fontSize="xl"
          colorScheme="green"
          onClick={handleUpdate}
        >
          Update
        </Button>
      </Box>
    </Box>
  );
};

export default EditPage;
