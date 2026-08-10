'use client'
import { Search } from "lucide-react";
import React, { useState } from "react";
import searchByTitle from "../lib/memo-api";
import { useMemoStore } from "../data/memo-store";


interface SearchBarProps {
    shrinkDesign: boolean;
}

export default function SearchBar({ shrinkDesign }: SearchBarProps) {

    const {setMemos} = useMemoStore();

    const [keyword, setKeyword] = useState("");

    const shrinkOrNotCss = shrinkDesign === true ? "hidden" : "";

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    };


    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {

        if (e.key === "Enter") {
            const filteredMemoList = await searchByTitle(keyword);
            console.log("--------------------result");
            console.log(filteredMemoList);
            console.log("--------------------result end");
            
            setMemos(filteredMemoList);
            
        }
    };

    return (
        <div className="flex relative">
            <input
                type="text"
                placeholder="검색"
                className={`${shrinkOrNotCss} bg-white grow pl-10 pr-5 leading-10 outline-none`}
                value={keyword}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
            <span className="absolute top-2 left-2">
                <Search className="w-5 h-5" />
            </span>
        </div>
    );
}