'use client'

import Link from "next/link";
import Button1 from "../ui/Button1";
import Header from "../ui/Header"
import Input1 from "../ui/Input1";
import React, { useState } from "react";
import { login } from "../lib/member-api";

export default function LoginForm() {

    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = ( e : React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const checkValidity = (email : string, password : string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = regex.test(email);
        const isValidPassword = password.length > 6;

        return isValidEmail && isValidPassword;
    };

    const handleLogin = async () => {
        if(!checkValidity(email, password)){
            alert("로그인 시도 시 정확한 값을 입력해주세요.");
            return;
        }

        await login(email, password);
    };

    return (
        <div className="border-1 border-gray-300 rounded-lg w-4/10 min-h-4/10 m-auto mt-30 p-15 flex flex-col gap-15">
            <Header 
                text="로그인"
            />

            <div className="flex flex-col gap-5">
                <Input1 
                    placeholder="이메일" 
                    extraCss="border-b-1 border-gray-300 text-lg"
                    value={email}
                    onChange={handleEmailChange}
                />
                <Input1 
                    placeholder="비밀번호"
                    passwordMode={true}
                    extraCss="border-b-1 border-gray-300 text-lg"
                    value={password}
                    onChange={handlePasswordChange}
                />
            </div>

            <div className="flex justify-end gap-3">
                <Button1
                    title="로그인"
                    color="blue"
                    onClick={handleLogin}
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