import { useState } from "react";
import { 
    Button, 
    Input, 
    useColorModeValue 
} from "@chakra-ui/react";
import { FaRegCopy } from "react-icons/fa";

export default function CopyClipboard({ copyText }) {
    const [isCopied, setIsCopied] = useState(false);

    async function copyTextToClipboard(text) {
        if ('clipboard' in navigator) {
            return await navigator.clipboard.writeText(text),alert(text);
        } else {
            return document.execCommand('copy', true, text);
        }
    }

    const handleCopyClick = () => {
        copyTextToClipboard(copyText)
            .then(() => {
                setIsCopied(true);
                setTimeout(() => {
                    setIsCopied(false);
                }, 1500);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const color = useColorModeValue('primary', 'white');

    return (
        <div>
            <Input
                borderRadius={'30px'}
                borderColor='black'
                type="text"
                value={copyText}
                readOnly
                display={'none'} />
            <Button
                onClick={handleCopyClick}
                variant={'button-outline'}
                color={color}
                borderColor={color}
                gap='2'>
                <FaRegCopy />
                {isCopied === true
                    ?
                    'Copied'
                    :
                    'Copy'
                }
            </Button>
        </div>
    );
}
