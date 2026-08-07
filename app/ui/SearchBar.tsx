'use client'
import {Search} from "lucide-react";


interface SearchBarProps {
    shrinkDesign : boolean;
}

export default function SearchBar({shrinkDesign} : SearchBarProps){

    const shrinkOrNotCss = shrinkDesign === true ? "hidden" : "";

    return (
        <div className="flex relative">
            <input 
                type="text" 
                placeholder="검색"
                className={`${shrinkOrNotCss} bg-white grow pl-10 pr-5 leading-10 outline-none`}
            />
            <span className="absolute top-2 left-2">
                <Search className="w-5 h-5" />
            </span>
        </div>
    );
}