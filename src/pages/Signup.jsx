import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { register } from "../redux/authReducer/authAction";

function reducer(state, action) {
  switch (action.type) {
    case "name":
      return {
        ...state,
        name: action.payload,
      };
    case "email":
      return {
        ...state,
        email: action.payload,
      };
    case "password":
      return {
        ...state,
        password: action.payload,
      };
    case "username":
      return {
        ...state,
        username: action.payload,
      };
    case "mobile":
      return {
        ...state,
        mobile: action.payload,
      };
    default: {
      return state;
    }
  }
}

const initialState = {
  name: "",
  email: "",
  username: "",
  password: "",
  mobile: "",
};

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, setter] = useReducer(reducer, initialState);
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const Loading = useSelector((state) => state.authReducer.isLoading);

  const [valid, setValid] = useState({
    name: false,
    email: false,
    password: false,
    username: false,
    mobile: false,
  });

  const handleSubmit = () => {
    if (!state.name) setValid({ name: true });
    if (!state.email) setValid({ email: true });
    if (!state.password) setValid({ password: true });
    if (!state.username) setValid({ username: true });
    if (state.mobile.length !== 10) setValid({ mobile: true });

    if (
      state.name &&
      state.email &&
      state.password &&
      state.username &&
      state.mobile.length === 10 &&
      !Loading
    ) {
      dispatch(register(state)).then((r) => {
        if (r.type === "SIGNUP_ERROR") {
          toast({
            title: "Something Went Wrong",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        } else if (!r.payload.data.error) {
          toast({
            title: "Account created.",
            description: "We've created your account for you.",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
          navigate("/login", { replace: true });
        } else if (r.payload.data.error) {
          toast({
            title: "Registration failed",
            description: "User already exists. PLease Login",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        }
      });
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
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="name" isRequired isInvalid={valid.name}>
                  <FormLabel>Name</FormLabel>
                  <Input
                    autoFocus
                    type="text"
                    value={state.name}
                    onChange={(e) => {
                      setter({ type: "name", payload: e.target.value });
                      setValid({ name: false });
                    }}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl
                  id="username"
                  isRequired
                  isInvalid={valid.username}
                >
                  <FormLabel>Username</FormLabel>
                  <Input
                    type="text"
                    value={state.username}
                    onChange={(e) => {
                      setter({ type: "username", payload: e.target.value });
                      setValid({ username: false });
                    }}
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired isInvalid={valid.email}>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={state.email}
                onChange={(e) => {
                  setter({ type: "email", payload: e.target.value });
                  setValid({ email: false });
                }}
              />
            </FormControl>
            <FormControl id="password" isRequired isInvalid={valid.password}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={state.password}
                  onChange={(e) => {
                    setter({ type: "password", payload: e.target.value });
                    setValid({ password: false });
                  }}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl id="mobile" isRequired isInvalid={valid.mobile}>
              <FormLabel>Mobile</FormLabel>
              <Input
                type="number"
                value={state.mobile}
                onChange={(e) => {
                  setter({ type: "mobile", payload: e.target.value });
                  setValid({ mobile: false });
                }}
              />
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                onClick={handleSubmit}
                isLoading={Loading}
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <RouterLink
                  to="/login"
                  style={{ color: "blue", textDecoration: "underline" }}
                >
                  Login
                </RouterLink>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
