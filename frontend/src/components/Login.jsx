import {
  Button,
  FormControl,
  Box,
  VStack,
  HStack,
  Heading,
  Container,
  Link,
} from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import FormField from "./FormField";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schema/loginSchema";
import { useAuth } from "../contexts/AuthContext";
import { NavLink } from "react-router";

function Login() {
  const { login } = useAuth();
  const methods = useForm({
    resolver: zodResolver(loginSchema),
  });
  const onSubmit = async (data) => {
    const res = await login(data);
  };

  return (
    <FormProvider {...methods}>
      <FormControl as="form" onSubmit={methods.handleSubmit(onSubmit)}>
        <Container maxW="container.sm">
          <Box m={3}>
            <Heading>Login</Heading>
            <VStack spacing={3}>
              <FormField
                name="email"
                label="Email"
                placeholder="Enter your email"
                type="email"
              />
              <FormField
                name="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
              />
            </VStack>
            <VStack spacing={3}>
              <Button type="submit" w="100%" mt={4}>
                Login
              </Button>
              <span>
                Don't have an account?{" "}
                <NavLink to="/signup" end>
                  <Link>Signup</Link>
                </NavLink>
              </span>
            </VStack>
          </Box>
        </Container>
      </FormControl>
    </FormProvider>
  );
}

export default Login;
