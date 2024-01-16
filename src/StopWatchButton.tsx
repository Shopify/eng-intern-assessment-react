import React from "react";
import { Button } from "@shopify/polaris";
// Using a Polaris button was inspired by Andrew Chen, so I wanted to experiement with Shopify's Polaris and give credit

interface ButtonProps {
    onClick: () => void;
    label: string;
    variant?:
        | "plain"
        | "primary"
        | "secondary"
        | "tertiary"
        | "monochromePlain";
}

const StopwatchButton: React.FC<ButtonProps> = ({ onClick, label }) => {
    return (
        <Button variant="primary" onClick={onClick}>
            {label}
        </Button>
    );
};

export default StopwatchButton;
