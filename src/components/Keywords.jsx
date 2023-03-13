import {
    Button,
    Flex,
    FormControl,
    Input,
    useColorModeValue
} from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import React from 'react'
import Tooltips from './Tooltips';

export default function Keywords({
    required,
    label,
    tooltip,
    name,
    keyPress,
    changeName,
    addClick,
    clear,
    children
}) {
    const { t } = useTranslation("common");

    const border = useColorModeValue("black", "white");
    const color = useColorModeValue('primary', 'white');

    return (
        <Flex
            w='full'
            flexDir={'column'}
            gap='4'>
            <FormControl
                isRequired={required}>
                <Tooltips
                    label={label}
                    tooltip={tooltip} />
                <Flex
                    align={'center'}
                    gap='2'>
                    <Input
                        isRequired={true}
                        borderColor={border}
                        value={name}
                        borderRadius={"30px"}
                        onKeyPress={keyPress}
                        onChange={changeName} />
                    <Button
                        onClick={addClick}
                        variant='button'>
                        {t('adicionar')}
                    </Button>
                    <Button
                        onClick={clear}
                        variant='button-outline'
                        color={color}
                        borderColor={color}>
                        {t('limpar')}
                    </Button>
                </Flex>
            </FormControl>
            {/* <div>
                {keywords.map((item) => {
                    const handleRemoveClick = () => {
                        setKeywords(list => list.filter((entry) => entry !== item));
                    };
                    return (
                        <Tag
                            key={item}
                            borderRadius='full'
                            variant='solid'
                            colorScheme='purple'
                            mr='2'
                            mb='2'>
                            <TagLabel>
                                {item}
                            </TagLabel>
                            <TagCloseButton
                                onClick={handleRemoveClick} />
                        </Tag>
                    )
                })}
            </div> */}
            {children}
        </Flex>
    )
}
