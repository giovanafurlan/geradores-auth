import { Button, Flex } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";

const Navbar = ({ children }: { children: React.ReactNode }) => {
  const { user, logOut } = useAuth();
  const router = useRouter();

  const menuItems = [
    {
      id: 2,
      name: "Login",
      link: "/",
    },
    {
      id: 3,
      name: "Sign Up",
      link: "/signup",
    },
  ];

  const handleLogout = async () => {
    try {
      await logOut();
      router.push("/");
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <>
      <Flex gap="2" w="min-content" float={"right"} m="2">
        {!user.uid ? (
          menuItems.map((item) => (
            <Link key={item.id} href={item?.link}>
              <Button variant={"button"}>
                {item?.name}{" "}
              </Button>
            </Link>
          ))
        ) : (
          <Button onClick={handleLogout} variant="button">
            Logout
          </Button>
        )}
      </Flex>
      {children}
    </>
  );
};

export default Navbar;
