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
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, login } from "../redux/authReducer/authAction";

export default function Login() {
  const Loading = useSelector((state) => state.authReducer.isLoading);
  const toast = useToast();
  const navigate = useNavigate();
  const [user, setUser] = useState("masai-school");
  const [pass, setPass] = useState("secret");
  const dispatch = useDispatch();
  const [valid, setValid] = useState({
    password: false,
    username: false,
  });

  const handleSubmit = () => {
    if (!user) setValid({ username: true });
    if (!pass) setValid({ password: true });
    const params = {
      password: pass,
      username: user,
    };
    if (user && pass) {
      dispatch(login(params)).then((r) => {
        if (r.type === "LOGIN_SUCCESS") {
          toast({
            title: "Login Success",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
          navigate("/app", { replace: true });
        } else if (r.type === "LOGIN_ERROR") {
          toast({
            title: "Login failed",
            description: "Invalid login creadentials",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        }
        dispatch(getUserDetails(r.payload, user)).then((r) => {
          let data = {
            name: r.payload.name,
            email: r.payload.email,
            username: r.payload.username,
          };
          localStorage.setItem("user", JSON.stringify(data));
        });
      });
    }
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
