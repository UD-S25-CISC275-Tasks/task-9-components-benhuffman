import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { QuestionType } from "../interfaces/question";

export function ChangeType(): React.JSX.Element {

    const [type, toggleType] = useState<QuestionType>("short_answer_question");
    const [text, changeText] = useState<string>("Short Answer");

    function testing(){
        if (type === "short_answer_question"){
            toggleType("multiple_choice_question");
            changeText("Multiple Choice");
        }
        else {
            toggleType("short_answer_question");
            changeText("Short Answer");
        }
        

    }
    return (
        //when 
        <div>
            <Button onClick={() => {testing()}}>Change Type</Button>
            <p>{text}</p>
        </div>


    );
}
