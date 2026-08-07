'use client'

import { Menu } from "lucide-react";

interface HamburgerButtonProps {
    handleShirnk : () => void;
}

export default function HamburgerButton({handleShirnk} : HamburgerButtonProps) {
    return (
        <button 
            className="cursor-pointer"
            onClick={handleShirnk}>
            <Menu />
        </button>
    );
}