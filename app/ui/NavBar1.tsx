'use client'

import { Menu } from "lucide-react";
import Header from "./Header";
import SearchBar from "./SearchBar";
import HamburgerButton from "./HamburgerButton";
import { useState } from "react";

export default function NavBar1(){

    const [shrinkNavbar, setShrinkNavbar] = useState(false);

    const handleShrink = () => {
        setShrinkNavbar(!shrinkNavbar);
    };

    let navWidthCss = "w-2/10";
    
    if(shrinkNavbar){
        navWidthCss = "w-1/20";
        
    }

    return (
        <div className={`${navWidthCss} h-screen bg-gray-200 p-5 overflow-hidden`}>
            <h1 className="hidden">navbar</h1>

            <div className="flex justify-between mb-5">
                <Header visible={!shrinkNavbar} text="메뉴" />
                <HamburgerButton handleShirnk={handleShrink} />
            </div>

            <SearchBar 
                shrinkDesign={shrinkNavbar}
            />          
        </div>
    );
}