import {
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

interface SignupType {
  email: string;
  password: string;
  password_confirm: string;
}
const SignupPage = () => {
  const { signUp } = useAuth();
  const router = useRouter();

  const methods = useForm<SignupType>({ mode: "onBlur" });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: SignupType) => {
    console.log(data);
    try {
      await signUp(data.email, data.password);
      router.push("/geradorTitle");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <Container p='10'>
      <Heading mb="4" textAlign={"center"}>
        Sign Up
      </Heading>
      <FormProvider {...methods}>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <Flex flexDir={"column"} gap="6">
            <FormControl>
              <FormLabel htmlFor="">Email</FormLabel>
              <Input
                type="email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && <Text>{errors.email.message}</Text>}
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="">Password</FormLabel>
              <Input
                type="password"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && <Text>{errors.password.message}</Text>}
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="">Confirm Password</FormLabel>
              <Input
                type="password"
                {...register("password_confirm", {
                  required: "Verify your password",
                })}
              />
              {errors.password_confirm && (
                <Text>{errors.password_confirm.message}</Text>
              )}
            </FormControl>
            <Button type="submit" variant={"button"} w="full">
              Submit
            </Button>
          </Flex>
        </form>
      </FormProvider>
    </Container>
  );
};

export default SignupPage;
