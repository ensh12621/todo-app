'use client'

interface Button1Props {
    title: string;
    color?: "blue" | "black" | "green";
    onClick? : () => void;
}

export default function Button1({ title, color = "blue", onClick }: Button1Props) {

    let colorCss = null;
    switch (color) {


        case "blue":
            colorCss = "bg-blue-400 hover:bg-blue-600 text-white";
            break;
        case "black":
            colorCss = "bg-black hover:bg-gray-600 text-white";
            break;
        case "green":
            colorCss = "bg-green-400 hover:bg-green-600 text-white";
            break;
    }

    return (
        <button
            className={`${colorCss} p-3 pl-5 pr-5 rounded-md cursor-pointer`}
            onClick={onClick}
            >
            {title}
        </button>
    );
}