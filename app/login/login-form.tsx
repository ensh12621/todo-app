'use client'

import Link from "next/link";
import Button1 from "../ui/Button1";
import Header from "../ui/Header"
import Input1 from "../ui/Input1";

export default function LoginForm() {

    
    return (
        <div className="border-1 border-gray-300 rounded-lg w-4/10 min-h-4/10 m-auto mt-30 p-15 flex flex-col gap-15">
            <Header 
                text="로그인"
            />

            <div className="flex flex-col gap-5">
                <Input1 
                    placeholder="이메일" 
                    extraCss="border-b-1 border-gray-300 text-lg"
                />
                <Input1 
                    placeholder="비밀번호"
                    passwordMode={true}
                    extraCss="border-b-1 border-gray-300 text-lg"
                />
            </div>

            <div className="flex justify-end gap-3">
                <Button1
                    title="로그인"
                    color="blue"
                />  
                <Link 
                    href="/signup">
                    <Button1 
                        title="회원가입"
                        color="green"
                    />
                </Link>
            </div>

        </div>
    );
}