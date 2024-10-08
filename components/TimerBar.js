import { useState, useEffect } from 'react'

function TimerBar({ left, start, secs, matchDone, timer }) {

    const [width, setWidth] = useState(100)
    // const [isStart, setIsStart] = useState(start);

    useEffect(() => {

        if (start && !matchDone) {
            setWidth((100 / secs) * timer);
        }

        if (matchDone) {
            setWidth(100);
        }

    }, [start, timer, secs, matchDone])

    return (
        <div className="timerbar"
            style={{
                width: '100%',
                backgroundColor: 'rgb(221 221 221 / 25%)',
                borderRadius: '20px',
                direction: left || 'rtl'
            }}>
            <div className="bg-gradient-shadow relative bar bg-gradient-to-tr  from-[#8cc5ff] via-[#4e8cf0] to-[#1065c6]"
                style={{
                    width: width + '%',
                    borderRadius: '20px',
                    height: '3px'
                }}></div>
        </div>
    )
}

export default TimerBar