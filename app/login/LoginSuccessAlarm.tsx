'use client'

import { useState } from "react";
import Button1 from "../ui/Button1";
import Header from "../ui/Header";

export default function LoginSuccessAlarm() {

    const [show, setShow] = useState(true);

    const handleClose = () => {
        setShow(false);
    };

    if(!show){
        return <></>;
    }

    return ( 
        <div className="absolute z-10 p-10 shadow-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white flex flex-col gap-5 pt-5">
            <Header 
                text="회원가입이 완료되었습니다."
            />

            <div className="text-right">
                <Button1
                    title="완료"
                    onClick={handleClose}
                />
            </div>
        </div>
    );

}
