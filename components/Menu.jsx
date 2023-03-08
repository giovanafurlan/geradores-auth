import {
    Box,
    Flex,
    HStack,
    IconButton,
    useDisclosure,
    useColorModeValue,
    Stack,
    Container,
} from '@chakra-ui/react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
import Language from './Language';
import Link from 'next/link';

const Links = [
    {
        nome: 'Gerador título',
        link: '/geradorTitle'
    },
    {
        nome: 'Gerador anúncio',
        link: '/geradorAds'
    },
    {
        nome: 'Gerador texto',
        link: '/geradorTexto'
    },
    {
        nome: 'Gerador anúncio mídias sociais',
        link: '/geradorSocialMedia'
    },
    {
        nome: 'Gerador anúncio facebook',
        link: '/geradorFacebook'
    },
    {
        nome: 'Gerador anúncio instagram',
        link: '/geradorInstagram'
    },
    {
        nome: 'Gerador anúncio linkedin',
        link: '/geradorLinkedin'
    },
    {
        nome: 'Gerador anúncio youtube',
        link: '/geradorYoutube'
    },
    {
        nome: 'Gerador descrição produto',
        link: '/geradorProduto'
    }
];

export default function Simple({ children }) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Box
                bg={useColorModeValue('gray.100', 'gray.900')}
                px={4}>
                <Flex
                    h={16}
                    alignItems={'center'}
                    justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen
                            ?
                            <AiOutlineClose />
                            :
                            <GiHamburgerMenu />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen
                            ?
                            onClose
                            :
                            onOpen} />
                    <HStack
                        spacing={8}
                        alignItems={'center'}>
                        <HStack
                            as={'nav'}
                            spacing={4}
                            display={{
                                base: 'none',
                                md: 'flex'
                            }}
                            fontSize='sm'>
                            {Links.map((link) => (
                                <Link
                                    key={link.link}
                                    href={link.link}>
                                    {link.nome}
                                </Link>
                            ))}
                        </HStack>
                        <Language />
                    </HStack>
                </Flex>

                {isOpen ? (
                    <Box
                        pb={4}
                        display={{
                            md: 'none'
                        }}>
                        <Stack
                            as={'nav'}
                            spacing={4}>
                            {Links.map((link) => (
                                <Link
                                    px={2}
                                    py={1}
                                    rounded={'md'}
                                    href={link.link}>
                                    {link.nome}
                                </Link>
                            ))}
                        </Stack>
                    </Box>
                ) : null}
            </Box>

            <Container
                maxW={'7xl'}
                py='10'>
                {children}
            </Container>
        </>
    );
}