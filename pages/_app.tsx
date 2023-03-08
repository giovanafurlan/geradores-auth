import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Navbar from "../components/navbar";
import { AuthContextProvider } from "../context/AuthContext";
import Head from "next/head";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  fonts: {
    heading: `'Lato', sans-serif`,
    body: `'Lato', sans-serif`,
  },
  components: {
    Button: {
      variants: {
        button: {
          bg: "#5b1ab2",
          color: "white",
          fontWeight: "normal",
          borderRadius: "50px",
          fontSize: "14px",
          width: "min-content",
        },
        "button-orange": {
          bg: "#FF6600",
          color: "white",
          fontWeight: "normal",
          borderRadius: "50px",
          fontSize: "14px",
          width: "min-content",
        },
        "button-outline": {
          bg: "transparent",
          color: "#5b1ab2",
          borderColor: "#5b1ab2",
          fontWeight: "normal",
          borderRadius: "50px",
          fontSize: "14px",
          width: "min-content",
          border: "1px",
        },
      },
    },
    Heading: {
      variants: {
        h1: {
          fontSize: "4xl",
          fontWeight: "bold",
        },
        h2: {
          fontSize: "3xl",
          fontWeight: "bold",
          textAlign: "center",
        },
        h3: {
          fontSize: "2xl",
          fontWeight: "normal",
        },
        h4: {
          fontSize: "2xl",
          fontWeight: "normal",
        },
      },
    },
  },
  breakpoints: {
    sm: "320px",
    md: "768px",
    lg: "960px",
    xl: "1200px",
    "2xl": "1800px",
  },
  colors: {
    primary: "#5B1AB2",
    secondary: "#B69DF8",
    tertiary: "#FF6600",
    bgClear: "#FBF7FF",
    bgDark: "#2a2f3b",
    bgClearMedium: "#e9e8eb",
    bgDarkMedium: "#1f222b",
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AuthContextProvider>
        <Navbar>
          <Head>
            <meta
              name="description"
              content="Melhor Ferramenta de SEO para Aumentar o Tráfego Orgânico do seu site"
            />
            <meta
              name="viewport"
              content="minimum-scale=1, maximum-scale=5, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
            />
            <title>Webpeak</title>
          </Head>
          <Component {...pageProps} />
        </Navbar>
      </AuthContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
