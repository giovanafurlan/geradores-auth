import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { useRouter } from "next/router";
import { setCookie } from "cookies-next";
import { CircularProgress } from "@chakra-ui/react";

interface UserType {
  email: string | null;
  uid: string | null;
}

const AuthContext = createContext({});

export const useAuth = () => useContext<any>(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<UserType>({ email: null, uid: null });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          email: user.email,
          uid: user.uid,
        });
      } else {
        setUser({ email: null, uid: null });
      }
    });
    setLoading(false);

    return () => unsubscribe();
  }, []);

  const signUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = async () => {
    setUser({ email: null, uid: null });
    await signOut(auth);
  };

  ///
  // const [user2, setUser2] = useAuthState(auth);

  const router = useRouter();

  const googleAuth = new GoogleAuthProvider();

  const logInGoogle = async () => {
    try {
      await signInWithPopup(auth, googleAuth);
      router.push("/geradorTitle");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    setCookie("uid", user.uid);
  }, [user]);
  ///

  return (
    <AuthContext.Provider value={{ user, signUp, logIn, logOut, logInGoogle }}>
      {loading ? <CircularProgress isIndeterminate /> : children}
    </AuthContext.Provider>
  );
};
