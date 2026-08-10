'use client'

import Header from "./Header";
import SearchBar from "./SearchBar";
import HamburgerButton from "./HamburgerButton";
import { useState } from "react";
import { logOut } from "../lib/member-api";

interface NavBar1Props {
    isLoggedOn : boolean;
}

export default function NavBar1({isLoggedOn } : NavBar1Props) {

    const [shrinkNavbar, setShrinkNavbar] = useState(false);

    const handleShrink = () => {
        setShrinkNavbar(!shrinkNavbar);
    };

    let navWidthCss = "w-2/10";

    if (shrinkNavbar) {
        navWidthCss = "w-1/20";

    }

    const handleLogout = () => {
        if (!confirm("정말로 로그아웃하시겠습니까?")) {
            return;
        }

        logOut();
    };




    return (
        <div className={`${navWidthCss} h-screen bg-gray-200 p-5 overflow-hidden relative`}>
            <h1 className="hidden">navbar</h1>

            <div className="flex justify-between mb-5">
                <Header visible={!shrinkNavbar} text="메뉴" />
                <HamburgerButton handleShirnk={handleShrink} />
            </div>

            <SearchBar
                shrinkDesign={shrinkNavbar}
            />

            {isLoggedOn && (
                <div className="absolute bottom-12 left-55">
                    <button
                        onClick={handleLogout}
                        className="text-lg outline-none hover:cursor-pointer">
                        로그아웃
                    </button>

                </div>
            )}
        </div>
    );
}