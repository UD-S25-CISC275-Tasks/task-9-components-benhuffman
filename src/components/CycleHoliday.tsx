import React, { useState } from "react";
import { Button } from "react-bootstrap";

export function CycleHoliday(): React.JSX.Element {
    var date = ["VT Day", "Easter", "Halloween", "Thanksgiving", "Christmas"]
    var alpha = ["Christmas", "Easter", "Halloween", "Thanksgiving", "VT Day"]

    var [text, changeText] = useState<string>("VT Day");



    //ONE BUTTON FOR ALPHABETICAL
    //ONE BUTTON FOR DATE
    function alphaFunc(input: string){
        const index = alpha.findIndex((word: string) => word === input);
        changeText(alpha[index === 4 ? 0: index + 1]);
    }

    function dateFunc(input: string){
       const index = date.findIndex((word: string) => word === input);
        changeText(date[index === 4 ? 0: index + 1]);
    }
    return (
        <div>

            <Button onClick={() => {alphaFunc(text)}}>Alphabet</Button>
        <Button onClick={() => {dateFunc(text)}}>Year</Button>
        <p>Holiday: {text}</p>
        
        </div>
        
    );
        
    
}
