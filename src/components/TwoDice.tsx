import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useEffect } from "react"

/**
 * Here is a helper function you *must* use to "roll" your die.
 * The function uses the builtin `random` function of the `Math`
 * module (which returns a random decimal between 0 up until 1) in order
 * to produce a random integer between 1 and 6 (inclusive).
 */
export function d6(): number {
    return 1 + Math.floor(Math.random() * 6);
}

function getDifferentValues()
    {
        var left = d6();
        var right = d6();
        var count = 0;
        while (right === left && count < 100){
            right = d6();
            count++;
        }

        return [left,right];
    }

var [initialLeft, initialRight] = getDifferentValues();
export function TwoDice(): React.JSX.Element {
    
    
   // const [[initialLeft, initialRight], setTest] = useState<number[]>(getDifferentValues());

    const [leftDie, setLeftDie] = useState<number>(initialLeft)
    const [rightDie, setRightDie] = useState<number>(initialRight)
    const [message, changeMessage] = useState<string>("testng...")


    function rollLeft(){
        
        setLeftDie(d6());
        //gameStatus();
    }

    function rollRight(){
        
        setRightDie(d6());
        //gameStatus();
        
    }
    
    useEffect(() => {
        if (leftDie === rightDie){
            if (leftDie === 1) changeMessage("Lose")
            
            else changeMessage("Win")
        }
    }, [leftDie, rightDie]);

    return (
        <div>
        <span data-testid="left-die">LEFT: {leftDie}</span>
        <span data-testid="right-die">RIGHT: {rightDie}</span>

        <Button onClick={() => {rollLeft()}}>Roll Left</Button>
        <Button onClick={() => {rollRight()}}>Roll Right</Button>
        <p>{message}</p>
        </div>
        
    );
}
