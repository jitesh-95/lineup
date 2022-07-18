import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authReducer/authAction";
import DrawerButtons from "./DrawerButtons";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaHouseUser } from "react-icons/fa";

const currentUser = JSON.parse(localStorage.getItem("user"));

const Sidebar = () => {
  const tasks = useSelector((state) => state.appReducer.tasks);
  const personal = tasks.filter((item) => item.tags.includes("Personal"));
  const official = tasks.filter((item) => item.tags.includes("Official"));
  const others = tasks.filter((item) => item.tags.includes("Others"));

  const buttons = [
    { title: "All", color: "green", length: tasks.length },
    { title: "Personal", color: "blue", length: personal.length },
    { title: "Official", color: "teal", length: official.length },
    { title: "Others", color: "orange", length: others.length },
  ];

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const paramsTags = searchParams.getAll("tags");

  const [selectedTags, setSelectedTags] = useState(paramsTags || []);

  const handleTagChange = (tag) => {
    let newSelectedTags = [...selectedTags];
    if (selectedTags.includes(tag)) {
      newSelectedTags.splice(newSelectedTags.indexOf(tag), 1);
    } else {
      newSelectedTags.push(tag);
    }
    setSelectedTags(newSelectedTags);
  };

  useEffect(() => {
    if (selectedTags) {
      setSearchParams({ tags: selectedTags });
    }
  }, [selectedTags]);

  const handleLogout = () => {
    onClose();
    dispatch(logout());
    navigate("/");
  };

  return (
    <Box>
      <Tooltip label="Menu" placement="auto">
        <Button ref={btnRef} fontSize="3xl" bg="none" onClick={onOpen}>
          <AiOutlineMenuUnfold />
        </Button>
      </Tooltip>

      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <Flex direction="column">
              <DrawerHeader>My Profile</DrawerHeader>
              {currentUser && (
                <Flex w="100%" pl="1rem" gap={5} mb="1rem">
                  <FaHouseUser fontSize="30px" />
                  <Box>
                    <Text>{currentUser.name}</Text>
                    <Text>{currentUser.username}</Text>
                    <Text>{currentUser.email}</Text>
                  </Box>
                </Flex>
              )}
              <hr />
              <DrawerHeader>Filter By</DrawerHeader>
              <Box>
                {buttons?.map((item, index) => (
                  <DrawerButtons
                    item={item}
                    key={index}
                    handleTagChange={handleTagChange}
                    selectedTags={selectedTags}
                  />
                ))}
              </Box>
            </Flex>
          </DrawerBody>
          <DrawerFooter>
            <Button w="95%" m="auto" colorScheme="red" onClick={handleLogout}>
              Logout
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
