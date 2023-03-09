import { Button } from '@chakra-ui/react';
import React from 'react'

export default function DownloadTxt({content}) {

    const downloadTxtFile = (content) => {
        const element = document.createElement("a");
        const file = new Blob([JSON.stringify(content)],
            { type: 'text/plain;charset=utf-8' });
        element.href = URL.createObjectURL(file);
        element.download = "myFile.txt";
        document.body.appendChild(element);
        element.click();
    }

    return (
        <Button
            onClick={() => downloadTxtFile(content)}
            variant={'button'}>
            Download
        </Button>
    )
}
