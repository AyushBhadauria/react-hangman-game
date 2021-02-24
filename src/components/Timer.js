import React, { useEffect } from 'react'

const Timer = ({ counter, updateCounter }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            updateCounter(counter - 1);
        }, 1000);
        return () => clearTimeout(timer);
    });
    return (
        <h1>{counter}</h1>
    )
}

export default Timer
