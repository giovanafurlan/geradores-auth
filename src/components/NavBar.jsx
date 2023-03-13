import {
  Flex,
  Grid,
  GridItem,
  IconButton,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import DarkLight from "./DarkLight";
import Language from "./Language";

const NavBar = ({ onOpen, nomePagina }) => {

  const bg = useColorModeValue("white", "gray.900");
  const border = useColorModeValue("gray.200", "gray.700");
  const logos = useColorModeValue(
    "/images/webpeak-preto.webp",
    "/images/webpeak-branco.webp"
  );

  return (
    <Flex
      zIndex="3"
      pos="fixed"
      w={{
        '2xl': '92vw',
        lg: '90vw',
        sm: '0'
      }}
      height="20"
      bg={bg}
      borderBottomWidth="1px"
      borderBottomColor={border}
      align="center"
    >
      <Grid
        templateColumns={{
          "2xl": "repeat(11, 1fr)",
          lg: "repeat(9, 1fr)",
          sm: "repeat(6,1fr)",
        }}
        alignItems="center"
        m="0 auto"
        px="4"
      >
        {onOpen && (
          <IconButton
            aria-label="Menu"
            display={{
              base: "flex",
              md: "none",
            }}
            onClick={onOpen}
            icon={<FiMenu />}
          />
        )}

        <GridItem
          colStart={{
            lg: "1",
            sm: "auto",
          }}
          display={{
            lg: "inline-flex",
            sm: "none",
          }}
        >
          <Image src={logos} alt="Logo Webpeak" />
        </GridItem>

        <GridItem colStart={"2"}>
          <Text pl={{
            lg: '10',
            sm: '4'
          }}>
            {nomePagina}
          </Text>
        </GridItem>

        <GridItem
          colStart={{
            "2xl": "13",
            lg: "9",
            sm: "6",
          }}>
          <Flex gap="4"
            ml={{
              sm: '6'
            }}>
            <DarkLight />
            <Language />
          </Flex>
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default NavBar;
