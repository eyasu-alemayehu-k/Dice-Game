import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
} from '@chakra-ui/react'

export default function Rules() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <div>
            <Button onClick={onOpen} size={'lg'} width={'100%'} _hover={{ bg: 'black', color: 'white' }} outline={'black'}
                border={'solid black 1px'} color={'black'} bgColor={'transparent'}>
                Show Rules
            </Button>
            <Modal size={'lg'} isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Rules for the Dice Game</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <ol className='mb-6'>
                            <li>-- Select a number from top to bet with</li>
                            <li>-- Now roll the dice by clicking on it</li>
                            <li>-- If the dice number comes equal to your selected number, You got 10 points</li>
                            <li>-- If the dice is not equal to number, scores will deduct by that dice number</li>
                            <li>-- Happy Gaming !</li>
                        </ol>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    )
}
