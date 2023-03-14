import {
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { FcGoogle } from "react-icons/fc";

interface SignupType {
  email: string;
  password: string;
  password_confirm: string;
}
const SignupPage = () => {
  const bg = useColorModeValue("white", "gray.900");

  const { signUp } = useAuth();
  const router = useRouter();

  const methods = useForm<SignupType>({ mode: "onBlur" });

  // ///
  // const [user, setUser] = useAuthState(auth);

  // const googleAuth = new GoogleAuthProvider();

  // const logInGoogle = async () => {
  //   try {
  //     await signInWithPopup(auth, googleAuth);
  //     router.push("/geradorTitle");
  //   } catch (error: any) {
  //     console.log(error.message);
  //   }
  // };

  // useEffect(() => {
  //   console.log(user);
  // }, [user]);
  // ///

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
    <Container p="10">
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
                borderRadius={"30px"}
                bg={bg}
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && <Text>{errors.email.message}</Text>}
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="">Password</FormLabel>
              <Input
                type="password"
                borderRadius={"30px"}
                bg={bg}
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && <Text>{errors.password.message}</Text>}
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="">Confirm Password</FormLabel>
              <Input
                type="password"
                borderRadius={"30px"}
                bg={bg}
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
        {/* <Button onClick={logInGoogle} w="full" borderRadius={"30px"} mt="4">
          <Flex align={"center"} gap="2">
            <FcGoogle />
            <Text> Google</Text>
          </Flex>
        </Button> */}
      </FormProvider>
    </Container>
  );
};

export default SignupPage;
