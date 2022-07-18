import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useReducer, useState } from "react";
import { useDispatch } from "react-redux";
import { addNewTask, getTasks } from "../redux/appReducer/appAction";

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
    case "date":
      return {
        ...state,
        date: action.payload,
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
  date: today,
};

const NewTask = () => {
  const [state, setter] = useReducer(reducer, initialState);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);

  const handleAddNewTask = () => {
    dispatch(addNewTask(state)).then((r) => {
      dispatch(getTasks());
    });
    state.title = "";
    state.description = "";
    state.tags = [];
    state.status = "";
    onClose();
  };

  return (
    <>
      <Button mt={3} colorScheme="blue" ref={btnRef} onClick={onOpen}>
        + Add New Task
      </Button>

      <Modal
        onClose={onClose}
        finalFocusRef={btnRef}
        isOpen={isOpen}
        scrollBehavior={"inside"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgColor="Highlight" color="white" borderTopRadius={5}>
            New Task
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormLabel>Title</FormLabel>
            <Input
              placeholder="Title"
              value={state.title}
              onChange={(e) => {
                setter({ type: "title", payload: e.target.value });
              }}
            />

            <FormLabel>Description</FormLabel>
            <Textarea
              placeholder="Description"
              value={state.description}
              onChange={(e) => {
                setter({ type: "description", payload: e.target.value });
              }}
            />

            <Box m="0.5rem 0">
              <FormLabel>Status</FormLabel>
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
            <hr />

            {/* tags  */}
            <Box>
              <FormLabel>Tags</FormLabel>
              <CheckboxGroup
                colorScheme="green"
                value={state.tags}
                onChange={(e) => {
                  setter({ type: "tag", payload: e });
                }}
              >
                <Stack spacing={[1, 5]} direction={"column"} pt="0.5rem">
                  <Checkbox value="Personal">Personal</Checkbox>
                  <Checkbox value="Official">Official</Checkbox>
                  <Checkbox value="Others">Others</Checkbox>
                </Stack>
              </CheckboxGroup>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleAddNewTask} colorScheme="green">
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NewTask;
