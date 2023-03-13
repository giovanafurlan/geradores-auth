import React from 'react';
import {
    IconButton,
    Box,
    CloseButton,
    Flex,
    Icon,
    useColorModeValue,
    Link,
    Drawer,
    DrawerContent,
    Text,
    useDisclosure
} from '@chakra-ui/react';
import useTranslation from "next-translate/useTranslation";
import {
    FiMenu,
    FiAlignCenter,
} from 'react-icons/fi';
import { AiOutlineRobot } from "react-icons/ai";
import {
    MdAdsClick,
    MdProductionQuantityLimits,
    MdSocialDistance
} from "react-icons/md";
import {
    BsLayoutTextSidebarReverse,
    BsFacebook,
    BsInstagram,
    BsLinkedin,
    BsYoutube
} from "react-icons/bs";
import NavBar from './NavBar';

export default function SidebarWithHeader({
    children,
    nomePagina
}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Box
            minH="100vh"
            bg={useColorModeValue('gray.100', 'gray.900')}>
            <NavBar onOpen={onOpen} nomePagina={nomePagina} />
            <SidebarContent
                onClose={() => onClose}
                display={{ base: 'none', md: 'block' }}
            />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full">
                <DrawerContent>
                    <SidebarContent onClose={onClose} />
                </DrawerContent>
            </Drawer>
            {/* mobilenav */}
            <MobileNav onOpen={onOpen} />
            <Box ml={{ base: 0, md: 60 }} p="4">
                {children}
            </Box>
        </Box>
    );
}

const SidebarContent = ({ onClose, ...rest }) => {

    const { t } = useTranslation("common");

    const linksContent = [
        {
            name: 'Title e Description',
            icon: FiAlignCenter,
            link: "/geradorTitle",
        },
        {
            name: 'Anúncios',
            icon: MdAdsClick,
            link: "/geradorAds",
        },
        {
            name: 'Texto',
            icon: BsLayoutTextSidebarReverse,
            link: "/geradorTexto",
        },
        {
            name: 'Midia Sociais',
            icon: MdSocialDistance,
            link: "/geradorSocialMedia",
        },
        {
            name: `Facebook`,
            icon: BsFacebook,
            link: "/geradorFacebook",
        },
        {
            name: `Instagram`,
            icon: BsInstagram,
            link: "/geradorInstagram",
        },
        {
            name: `Linkedin`,
            icon: BsLinkedin,
            link: "/geradorLinkedin",
        },
        {
            name: `Youtube`,
            icon: BsYoutube,
            link: "/geradorYoutube",
        },
        {
            name: 'Produtos',
            icon: MdProductionQuantityLimits,
            link: "/geradorProduto",
        }
    ];

    return (
        <Box
            transition="3s ease"
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{ base: 'full', md: 60 }}
            pos="fixed"
            h="full"
            {...rest}>
            <Flex
                h="20"
                alignItems="center"
                mx="8"
                mt='8'
                justifyContent="space-between">
                <CloseButton
                    display={{
                        base: 'flex',
                        md: 'none'
                    }}
                    onClick={onClose} />
            </Flex>
            {linksContent.map((link) => (
                <NavItem
                    key={link.name}
                    link={link.link}
                    icon={link.icon}>
                    {link.name}
                </NavItem>
            ))}
        </Box>
    );
};

const NavItem = ({ link, icon, children, ...rest }) => {
    return (
        <Link
            href={link}
            style={{ textDecoration: 'none' }}
            _focus={{ boxShadow: 'none' }}>
            <Flex
                align="center"
                px="1"
                py='3'
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: 'primary',
                    color: 'white',
                }}
                {...rest}>
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: 'white',
                        }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </Link>
    );
};

const MobileNav = ({ onOpen, ...rest }) => {

    const { t } = useTranslation("common");

    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 4 }}
            height="20"
            alignItems="center"
            bg={useColorModeValue('white', 'gray.900')}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent={{ base: 'space-between', md: 'flex-end' }}
            {...rest}>
            <IconButton
                display={{ base: 'flex', md: 'none' }}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu />}
            />
        </Flex>
    );
};