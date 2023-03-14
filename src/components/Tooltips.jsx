import {
    Flex,
    FormLabel,
    Text,
    Tooltip
} from '@chakra-ui/react'
import React from 'react'

export default function Tooltips({ label, tooltip }) {
    return (
        <Flex
            align={'center'}>
            <FormLabel
                htmlFor={'description'}
                mt='1.5'>
                {label}
            </FormLabel>
            <Tooltip
                label={tooltip}
                placement={'right'}
                hasArrow>
                <Text>
                    ⓘ
                </Text>
            </Tooltip>
        </Flex>
    )
}
