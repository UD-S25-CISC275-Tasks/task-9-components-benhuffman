import React, { useState } from "react";
import { Button } from "react-bootstrap";

function ShoveBoxButton({
    position,
    setPosition,
}: {
    position: number;
    setPosition: (newPosition: number) => void;
}) {
    return (
        <Button
            onClick={() => {
                setPosition(position + 4); // Increase marginLeft by 4px on each click
            }}
        >
            Shove the Box
        </Button>
    );
}

function MoveableBox({ position }: { position: number }): React.JSX.Element {
    return (
        <div
            data-testid="moveable-box"
            style={{
                width: "50px",
                height: "50px",
                backgroundColor: "lightblue",
                border: "1px solid blue",
                display: "inline-block",
                verticalAlign: "bottom",
                marginLeft: position + "px", // Dynamically set margin based on position
            }}
        ></div>
    );
}

export function ShoveBox(): React.JSX.Element {
    const [position, setPosition] = useState<number>(10); // Initial position set to 10px

    return (
        <div>
            <h3>Shove Box</h3>
            <div>
                <ShoveBoxButton
                    position={position}
                    setPosition={setPosition} // Pass setPosition to update position state
                />
                <MoveableBox position={position} /> {/* Pass position as prop */}
            </div>
        </div>
    );
}