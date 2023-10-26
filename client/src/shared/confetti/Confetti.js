import React, {useEffect} from "react";
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
export default function MyConfetti() {

    const { width, height } = useWindowSize()

    useEffect(() => {
        // console.log('confietttiiiiiii')
    }, [])

    return (<div style={{zIndex: 99}}>

        <Confetti
            width={width}
            height={height}
            confettiSource={
                {x: window.innerWidth/2, y: window.innerHeight}
            }
            numberOfPieces={300}
            gravity={0.03}
            initialVelocityX={8}
            initialVelocityY={15}
        />
    </div>)
}