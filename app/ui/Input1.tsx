'use client'

import { ChangeEvent } from "react";

interface Input1Props {
    placeholder : string;
    extraCss? : string;
    value: string;
    onChange : (e: ChangeEvent<HTMLInputElement>) => void;
} 

export default function Input1({placeholder, value, extraCss, onChange} : Input1Props){
    return (
        <input 
            type="text" 
            placeholder={placeholder} 
            className={`${extraCss} outline-none pl-5`}
            value={value}
            onChange={onChange}
            />
    );
}