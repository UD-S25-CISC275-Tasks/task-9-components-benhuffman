import React, { useState } from "react";
import { Button } from "react-bootstrap";

export function RevealAnswer(): React.JSX.Element {
    const [text, setText] = useState<string>("");
    

    function changeText(){
        if (text == "") setText("42");
        else setText("");
    }
    return (
        <div>
            <Button onClick={() => {changeText()}}>Reveal Answer</Button>
            <span>{text}</span>
        </div>
    )
}
