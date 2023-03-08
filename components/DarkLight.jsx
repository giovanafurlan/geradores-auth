import {
    Box,
    Flex,
    FormLabel,
    Menu,
    MenuButton,
    Switch,
    useColorMode,
    useColorModeValue,
} from '@chakra-ui/react';
import {
    BsSun,
    BsMoon
} from 'react-icons/bs';

export default function DarkLight() {

    const { colorMode, toggleColorMode } = useColorMode();
    const color = useColorModeValue('black', 'white');

    return (
        <>
            <Flex
                align={'center'}
                gap='2'
                display={{
                    lg: 'inline-flex',
                    sm: 'none'
                }}>
                <BsMoon
                    aria-label='Dark'
                    color={color} />
                <FormLabel
                    htmlFor='darklight'
                    display={'none'}>
                </FormLabel>
                <Switch
                    id='darklight'
                    onChange={toggleColorMode}
                    colorScheme='purple'
                    size='lg' />
                <BsSun
                    aria-label='Light'
                    color={color} />
            </Flex>
            <Box
                display={{
                    lg: 'none',
                    sm: 'inline-flex'
                }}>
                <Menu>
                    <MenuButton
                        transition='all 0.2s'
                        fontSize={'18'}
                        background='none'
                        _hover={{ bg: 'none' }}
                        onClick={toggleColorMode}>
                        {colorMode === 'light'
                            ?
                            <BsMoon
                                aria-label='Dark'
                                color={color} />
                            :
                            <BsSun
                                aria-label='Light'
                                color={color} />
                        }
                    </MenuButton>
                </Menu>
            </Box>
        </>
    );
};