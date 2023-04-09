import React, {useEffect, useState} from 'react'


type TimerPropsType = {
    timerKey: string
    timerValue: number
    onChange: (actualSeconds: number) => void
}


export const Timer: React.FC<TimerPropsType> = ({timerValue, onChange, timerKey}) => {
    const [seconds, setSeconds] = useState(timerValue)

    useEffect(() => {
        setSeconds(timerValue)
    }, [timerValue])

    useEffect(() => onChange(seconds), [seconds, onChange])

    useEffect(() => {
        const intervalId = setInterval(() => {
            setSeconds((prevState) => prevState - 1)
        }, 1000)

        return () => clearInterval(intervalId)
    }, [timerKey])

    return (
        <div
            style={{padding: '10px'}}
        >
            timer: {seconds}
        </div>
    )
}