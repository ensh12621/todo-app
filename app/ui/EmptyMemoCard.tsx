'use client'

import { Plus } from "lucide-react";

interface EmptyMemoCardProps {
    handleClick : () => void;
};

export default function EmptyMemoCard({handleClick} : EmptyMemoCardProps) {
    
    return (
        <li onClick={handleClick}
            className="w-64 h-64 bg-gray-300 break-all break-words p-3 flex flex-col gap-5 shadow-2xl cursor-pointer relative hover:bg-gray-200">
            
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Plus />
            </span>

        </li>
    );
}