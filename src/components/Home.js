import React from 'react'
import { Button } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom"
import dices from '../dices.png'

export default function Home() {
    const nav = useNavigate()
    return (
        <div>
            <div className="flex flex-col xs:flex-col sm:flex-col md:flex-row  items-center h-[90vh] justify-around">

                <div className="first space-y-20">
                    <div className="text-5xl uppercase text-center md:text-left font-bold font-sans">Dice Game</div>
                    <div className="dices"><img width={500} src={dices} alt='Blackdice' /></div>
                </div>

                <div className="play text-2xl flex flex-col space-y-1">
                    <Button onClick={() => nav('/play')} size={'lg'} width={'36'} bgColor={'black'} _hover={{ bg: '#363636' }} color={'white'}>Play</Button>
                    <Button size={'lg'} width={'36'} _hover={{ bg: 'black', color: 'white' }} outline={'black'} border={'solid black 2px'} color={'black'} bgColor={'transparent'}>By Eyasu</Button>
                </div>

            </div>
        </div>
    )
}
