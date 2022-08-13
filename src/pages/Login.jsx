import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkUser } from "../redux/authReducer/authAction";

export default function Login() {
  const Loading = useSelector((state) => state.authReducer.isLoading);
  const users = useSelector((state) => state.authReducer.userData);
  const toast = useToast();
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (!users.length) {
      dispatch(checkUser());
    }
  }, []);

  const [valid, setValid] = useState({
    password: false,
    username: false,
  });

  const handleSubmit = () => {
    if (!user) setValid({ username: true });
    if (!pass) setValid({ password: true });

    // checking if the user is present or not
    let currentUser = users.find((item) => {
      if (item.username === user && item.password === pass) {
        return user;
      }
    });

    if (!currentUser) {
      return toast({
        title: "Invalid Credentials.",
        description: "Try again.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
    navigate("/app", { replace: true });
    localStorage.setItem("token", currentUser.token);
    const userdata = {
      username: currentUser.username,
      email: currentUser.email,
      name: currentUser.name,
    };
    localStorage.setItem("user", JSON.stringify(userdata));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <b>features</b> ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="username" isRequired isInvalid={valid.username}>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                value={user}
                onChange={(e) => {
                  setUser(e.target.value);
                  setValid({ username: false });
                }}
              />
            </FormControl>
            <FormControl id="password" isRequired isInvalid={valid.password}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={pass}
                onKeyDown={handleKeyPress}
                onChange={(e) => {
                  setPass(e.target.value);
                  setValid({ password: false });
                }}
              />
            </FormControl>
            <Stack spacing={10}>
              <Button
                isLoading={Loading}
                onClick={handleSubmit}
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Sign in
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Don't have an acount?{" "}
                <RouterLink
                  to="/signup"
                  style={{ color: "blue", textDecoration: "underline" }}
                >
                  Sign Up
                </RouterLink>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
