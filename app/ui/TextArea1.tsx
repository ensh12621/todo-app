'use client'

interface TextArea1Props{
    placeholder : string;
    extraCss? : string;
    value?: string;
    onChange : (e : React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function TextArea1({placeholder, value, onChange, extraCss} : TextArea1Props){
    return (
        <textarea 
            placeholder={placeholder} 
            className={`${extraCss} outline-none p-5`}
            value={value}
            onChange={onChange}
        />
    );
}