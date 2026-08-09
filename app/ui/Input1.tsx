'use client'

import { ChangeEvent } from "react";

interface Input1Props {
    placeholder : string;
    extraCss? : string;
    value?: string;
    onChange? : (e: ChangeEvent<HTMLInputElement>) => void;
    passwordMode? : boolean | undefined;
} 

export default function Input1({placeholder, value, extraCss, onChange, passwordMode} : Input1Props){

    const inputType = passwordMode !== undefined ? "password" : "text";
    
    return (
        <input 
            type={inputType}
            placeholder={placeholder} 
            className={`${extraCss} outline-none pl-5`}
            value={value}
            onChange={onChange}
            />
    );
}