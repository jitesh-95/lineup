import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, getTasks } from "../redux/appReducer/appAction";
import {
  Box,
  Flex,
  Heading,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import Task from "../components/Task";
import { useSearchParams } from "react-router-dom";
import NewTask from "../components/NewTask";

const TodoApp = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const tasks = useSelector((state) => state.appReducer.tasks);
  const isLoading = useSelector((state) => state.appReducer.isLoading);

  const bg = useColorModeValue("gray.100", "gray.800");
  const cardBG = useColorModeValue("white", "black");

  const filterByParams = (task) => {
    const paramsTags = searchParams.getAll("tags");

    if (paramsTags.includes("All") || paramsTags.length === 0) return task;

    const data = task.tags.filter((tag) => {
      if (paramsTags.includes(tag)) {
        return true;
      }
      return false;
    });
    if (data.length) {
      return task;
    } else return false;
  };

  useEffect(() => {
    if (tasks.length === 0) {
      dispatch(getTasks());
    }
  }, [tasks]);

  const hanldeTaskDelete = (id) => {
    dispatch(deleteTask(id)).then(() => {
      dispatch(getTasks());
    });
  };

  //filtering
  const todo = tasks
    .filter((item) => item.status === "Todo")
    .filter(filterByParams);
  const inProgress = tasks
    .filter((item) => item.status === "In-Progress")
    .filter(filterByParams);
  const done = tasks
    .filter((item) => item.status === "Done")
    .filter(filterByParams);

  return (
    <>
      {isLoading ? (
        <Box display="grid" placeItems="center" height="85vh">
          <Spinner
            thickness="4px"
            speed="1s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Box>
      ) : (
        <>
          <Box
            p={{
              base: "0 2.4rem",
              md: "0 2rem",
              lg: "0 3rem",
              xl: "0 4rem",
            }}
            w="100%"
            bg={bg}
          >
            <NewTask />
          </Box>
          <Flex
            bg={bg}
            p={{
              base: "1rem 0.5rem",
              md: "1rem 2.5rem",
              lg: "1rem 2rem",
              xl: "1 5rem",
            }}
            gap={{ base: 10, sm: 10, lg: 5, xl: 8 }}
            justify="center"
            direction={{ base: "column", sm: "column", lg: "row", xl: "row" }}
          >
            {/* todo */}
            <Flex
              boxShadow="md"
              borderTopRadius={10}
              w={{ base: "80%", md: "70%", lg: "30%", xl: "30%" }}
              margin={{ base: "auto", lg: "0" }}
              direction="column"
              bg={cardBG}
            >
              <Heading
                size="md"
                borderTopRadius={10}
                w="100%"
                align="center"
                p="0.5rem"
                bg="cyan.500"
              >
                TODO
              </Heading>
              <Box>
                {todo?.map((task) => (
                  <Task
                    key={task.id}
                    {...task}
                    scheme={"green"}
                    hanldeTaskDelete={hanldeTaskDelete}
                  />
                ))}
              </Box>
            </Flex>

            {/* progress  */}
            <Flex
              boxShadow="md"
              borderTopRadius={10}
              w={{ base: "80%", md: "70%", lg: "30%", xl: "30%" }}
              margin={{ base: "auto", lg: "0" }}
              direction="column"
              bg={cardBG}
            >
              <Heading
                size="md"
                borderTopRadius={10}
                w="100%"
                align="center"
                p="0.5rem"
                bg="teal.500"
              >
                IN PROGRESS
              </Heading>
              <Box>
                {inProgress?.map((task) => (
                  <Task
                    key={task.id}
                    {...task}
                    scheme={"red"}
                    hanldeTaskDelete={hanldeTaskDelete}
                  />
                ))}
              </Box>
            </Flex>

            {/* done  */}
            <Flex
              boxShadow="md"
              borderTopRadius={10}
              w={{ base: "80%", md: "70%", lg: "30%", xl: "30%" }}
              margin={{ base: "auto", lg: "0" }}
              direction="column"
              bg={cardBG}
            >
              <Heading
                size="md"
                borderTopRadius={10}
                w="100%"
                align="center"
                p="0.5rem"
                bg="red.400"
              >
                DONE
              </Heading>
              <Box>
                {done?.map((task) => (
                  <Task
                    key={task.id}
                    {...task}
                    scheme={"purple"}
                    hanldeTaskDelete={hanldeTaskDelete}
                  />
                ))}
              </Box>
            </Flex>
          </Flex>
        </>
      )}
    </>
  );
};

export default TodoApp;
