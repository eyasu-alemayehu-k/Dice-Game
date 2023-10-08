import React, { useEffect, useRef } from 'react'
import one from '../dice_1.png'
import two from '../dice_2.png'
import three from '../dice_3.png'
import four from '../dice_4.png'
import five from '../dice_5.png'
import six from '../dice_6.png'
import sound from '../sound.mp3'
import { Button } from '@chakra-ui/react'
import { useState } from 'react'
import Rules from './Rules'
import {
    Alert,
    AlertIcon,
    AlertTitle,
} from '@chakra-ui/react'
const array = [1, 2, 3, 4, 5, 6]

export default function Game() {
    const delay = async (ms) => {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    };
    const audioRef = useRef()
    const [random, setRandom] = useState(one)
    const [selectedNo, setselectedNo] = useState()
    const [scores, setScores] = useState(0)
    const [showDiv, setShowDiv] = useState(false);
    const [floatingNo, setFloatingNo] = useState()
    const [animate, setAnimate] = useState(false)
    const [alert, setAlert] = useState(false)
    const [scoresArray, setSetscoresArray] = useState([])
    const [highest, setHighest] = useState(JSON.parse(localStorage.getItem('high')))
    const [counter, setCounter] = useState(0)

    const getSrc = (no) => {
        switch (no) {
            case 1:
                return one;

            case 2:
                return two;

            case 3:
                return three;

            case 4:
                return four;

            case 5:
                return five;

            case 6:
                return six;

            default:
                return one;

        }
    }

    const scroll = async () => {
        if (!selectedNo) {
            setAlert(true)
            await delay(1000)
            setAlert(false)
        } else {
            if (animate) return;
            if (audioRef.current) {
                audioRef.current.play();
            }
            setAnimate(true)
            await delay(800)
            setAnimate(false)
            setRandom(array[Math.floor(Math.random() * array.length)])
            setCounter(counter + 1)
        }
    }

    // eslint-disable-next-line
    useEffect(() => {

        // eslint-disable-next-line
        if (!selectedNo) return;
        if (selectedNo === random) {
            setScores(s => s + 10)
            setSetscoresArray(
                Array.from(new Set([highest, ...scoresArray, scores + 10]))
            )
            setFloatingNo("+10")
            setShowDiv(true);
            setTimeout(() => {
                setShowDiv(false);
            }, 800);
        } else if (selectedNo !== random) {
            if (scores - random < 0) {
                setScores(0)
                setSetscoresArray(Array.from(new Set([highest, ...scoresArray, 0])))
            } else {
                setScores(s => s - random)
            }
            setFloatingNo(`-${random}`)
            setShowDiv(true);
            setTimeout(() => {
                setShowDiv(false);
            }, 800);
        }

        // eslint-disable-next-line
    }, [random, counter])

    useEffect(() => {
        // console.log(scoresArray, 'SCORES');
        if (scoresArray && scoresArray.length > 0) {
            setHighest(Math.max(...scoresArray))
        }
    }, [scores, scoresArray])

    useEffect(() => {
        localStorage.setItem('high', highest ? highest : 0)
    }, [highest])







    return (
        <div className='flex flex-col'>
            {alert &&

                <Alert colorScheme='blackAlpha' status='warning'>
                    <AlertIcon />
                    <AlertTitle>Select a number to bet</AlertTitle>
                </Alert>
            }
            <audio ref={audioRef} src={sound} id="audio-element" />

            {/* Header */}
            <div className="header mt-12 flex flex-col md:flex-row max-h-min justify-between">

                <div className="scores mb-5 md:mb-0 relative text-black flex flex-col text-7xl font-semibold text-center mx-12" >
                    <span>
                        {scores}
                        {showDiv && <span className={`absolute ${floatingNo.startsWith('-') ? "text-red-600" : "text-green-600"} animate md:-translate-y-20 bottom-0 -right-5 md:-right-20 text-4xl`}>{floatingNo}</span>}
                    </span>
                    <span className='text-xl text-center inline'>Total Scores</span>
                    <span className='text-center font-medium italic text-xl inline'>Highest = <span className='font-bold'>{highest}</span> </span>
                </div>


                <div className="numbers justify-center self-center flex-wrap flex flex-row items-center sm:space-x-1  md:space-x-5 mx-4 my-4">
                    {array.map((no) => {
                        return <div onClick={() => setselectedNo(no)} className={`no p-5 px-8 cursor-pointer ${no === selectedNo ? "bg-black border border-black text-white" : "text-black border border-black hover:bg-black hover:text-white bg-white"}  text-4xl`}>
                            {no}
                        </div>
                    })}
                </div>
            </div>

            {/* Dices */}
            <div className="diceGame space-y-11 mt-10 md:mt-28 self-center flex flex-col">

                <div className="top self-center text-center">

                    <div onClick={scroll} className={`dice cursor-pointer text-center mb-4 self-center`}>
                        <img className={` ${animate ? 'dice-animate' : ''}`} src={getSrc(random)} alt="" srcset="" />
                    </div>

                    <span className='text-2xl font-semibold text-center'>
                        Click on the dice to roll
                    </span>

                </div>

                <div className='space-y-1'>
                    <Button onClick={() => setScores(0)} size={'lg'} width={'100%'} bgColor={'black'} _hover={{ bg: '#363636' }} color={'white'}>Reset Scores</Button>
                    <Rules />
                </div>

            </div>

        </div>
    )
}
