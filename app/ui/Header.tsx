'use client'

interface HeaderProps{
    text: string;
    visible?: boolean;
}

export default function Header({text, visible = true} : HeaderProps){

    const visibleDesignCss = visible === true ? "" : "hidden";

    return (
        <p
            className={`${visibleDesignCss} text-2xl`}>
            {text}
        </p>
    );
}
