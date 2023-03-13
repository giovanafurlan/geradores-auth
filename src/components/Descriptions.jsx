import {
    FormControl,
    Progress,
    Tag,
    Text,
    Textarea,
    useColorModeValue
} from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import React from 'react'
import Tooltips from './Tooltips';

export default function Descriptions({
    label,
    tooltip,
    value,
    changeDescription,
    count,
    colorful,
    visibilityTag,
    countTag
}) {
    const { t } = useTranslation("common");

    const border = useColorModeValue("black", "white");

    return (
        <FormControl
            isRequired={true}>
            <Tooltips
                label={label}
                tooltip={tooltip} />
            <Textarea
                pos='relative'
                id={'description'}
                borderRadius={'30px'}
                rows='6'
                maxLength={250}
                borderColor={border}
                value={value || ''}
                onChange={changeDescription} />
            <Text
                mt='2'
                right='5'
                bottom='16'
                pos='absolute'
                color='gray'>
                {count}/250
            </Text>
            <Progress
                colorScheme={colorful}
                value={count}
                min={0}
                max={250}
                borderRadius='lg'
                mt='4' />
            <Tag
                visibility={visibilityTag}
                variant='subtle'
                mt='2'
                colorScheme={colorful}>
                {countTag}
            </Tag>
        </FormControl>
    )
}
