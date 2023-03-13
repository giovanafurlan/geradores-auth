import {
    Box,
    Flex,
    Menu,
    MenuButton,
    MenuList,
    Tag,
    TagLabel,
    Text,
    useColorModeValue
} from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';

export default function Language() {

    const { t, lang } = useTranslation('common');

    const locales = [
        {
            lang: "pt-br",
            band: "🇧🇷",
            name: "Português"
        },
        {
            lang: "en",
            band: "🇺🇸",
            name: "English"
        },
        {
            lang: "es",
            band: "🇪🇸",
            name: "Español"
        }
    ]

    return (
        <Menu
            border={'none'}
            mb='6'>
            <MenuButton
                borderRadius={'lg'}
                _hover={{
                    bg: '#B69DF8',
                    color: 'primary',
                }}>
                <Flex
                    align="center"
                    p="2"
                    gap='2'
                    cursor="pointer"
                    fontSize='18'>
                    <Text
                        fontSize={'14px'}>
                        {t('language-name')}
                    </Text>
                </Flex>
            </MenuButton>
            <MenuList
                display='flex'
                flexDir={'column'}
                gap='2'
                bg='none'
                p='0'
                border='none'
                minW={'min-content'}
                boxShadow='none'>
                {locales.map(locale => {
                    if (locale === lang) return null;
                    return (
                        <Lang
                            key={locale.lang}
                            lng={locale.lang}
                            img={locale.band}>
                            {locale.name}
                        </Lang>
                    )
                })}
            </MenuList>
        </Menu>
    )
}

function Lang({ lng, img, children }) {

    const bg = useColorModeValue('gray.300', 'gray.700');

    return (
        <Link
            key={lng}
            href={''}
            locale={lng}>
            <Tag
                size='md'
                bg={bg}
                borderRadius='full'
                box-shadow='0px 4px 15px rgba(0, 0, 0, 0.07)'
                _hover={{
                    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)'
                }}
                pl='0'>
                    <Box
                    ml='2'>
                {img}
                    </Box>
                <TagLabel
                    ml='4'
                    fontSize={'13px'}>
                    {children}
                </TagLabel>
            </Tag>
        </Link>
    )
}