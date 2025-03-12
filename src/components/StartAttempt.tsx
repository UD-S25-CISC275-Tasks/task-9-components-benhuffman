import React, { useState } from "react";
import { Button } from "react-bootstrap";

export function StartAttempt(): React.JSX.Element {
    const [attempts, setAttempts] = useState<number>(4);
    const [inProgress, toggleInProgress] = useState<boolean>(false);

    function mulliganFunc(){
        setAttempts(attempts + 1)
    }

    function toggleGame(){
        if (!inProgress) {
            setAttempts(attempts - 1);
            toggleInProgress(true);
        }
        else{
            toggleInProgress(false);
        }
    }
//GAME ON: Start Quiz and Mulligan disabled

//GAME OFF: Stop Quiz disabled
    return (
        <div>
            <Button onClick={mulliganFunc} disabled={inProgress}>Mulligan</Button>
            <Button onClick={()=>{toggleGame()}} disabled={inProgress || attempts === 0}>Start Quiz</Button>
            <Button onClick={()=>{toggleGame()}} disabled={!inProgress}>Stop Quiz</Button>
            <span>Attempts: {attempts}</span>

        </div>
        

    );
}
