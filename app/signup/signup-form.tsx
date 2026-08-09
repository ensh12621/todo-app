'use client'

import React, { useState } from "react";
import Input1 from "../ui/Input1";
import Header from "../ui/Header";
import Link from "next/link";
import Button1 from "../ui/Button1";
import { saveNewMember } from "../lib/member-api";

function checkValidEmail(email: string) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function checkValidPassword(password1: string, password2: string) {
    if (!(password1.length > 6)) {
        return false;
    }

    if (password1 !== password2) {
        return false;
    }
    
    return true;
}

function checkValidNickname(nickname: string) {

    if (!(nickname.length > 2)) {
        return false;
    }

    return true;
}

interface validType {
    value: string;
    isValid: boolean;
    isFirstInput: boolean;
}

export default function SignupForm() {

    const [email, setEmail] = useState<validType>({ value: "abc@abc.com", isValid: false, isFirstInput: true });
    const [password, setPassword] = useState<validType>({ value: "1234123412", isValid: false, isFirstInput: true });
    const [password2, setPassword2] = useState<validType>({ value: "1234123412", isValid: false, isFirstInput: true });
    const [nickname, setNickname] = useState<validType>({ value: "김누구", isValid: false, isFirstInput: true });

    const [isLoading, setIsLoading] = useState(false);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        
        setEmail(prevData => ({
            value: e.target.value,
            isValid: checkValidEmail(e.target.value),
            isFirstInput: false
        }));
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const isValid = checkValidPassword(e.target.value, password2.value)

        setPassword(prevData => ({
            value: e.target.value,
            isValid: isValid,
            isFirstInput: false
        }));
        setPassword2(prevData => ({
            ...prevData,
            isValid: isValid,
            isFirstInput: false
        }));
    };

    const handlePassword2Change = (e: React.ChangeEvent<HTMLInputElement>) => {

         const isValid = checkValidPassword(e.target.value, password.value)


        setPassword2(prevData => ({
            value: e.target.value,
            isValid: isValid,
            isFirstInput: false
        }));
        setPassword(prevData => ({
            ...prevData,
            isValid: isValid,
            isFirstInput: false
        }));
    };

    const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNickname(prevData => ({
            value: e.target.value,
            isValid: checkValidNickname(e.target.value),
            isFirstInput: false
        }));
    };

    const emailValidityAlarm = email.isValid ?
        <p className="text-green-400">좋은 이메일이네요.</p> :
        <p className="text-red-400">올바르지 않은 이메일 형식입니다.</p>;

    const password1ValidityAlarm = password.isValid ?
        <p className="text-green-400">좋은 비밀번호 값입니다.</p> :
        <p className="text-red-400">올바르지 않은 비밀번호 값입니다.</p>;

    const password2ValidityAlarm = password2.isValid ?
        <p className="text-green-400">좋은 비밀번호 값입니다.</p> :
        <p className="text-red-400">올바르지 않은 비밀번호 값입니다.</p>;

    const nicknameValidityAlarm = nickname.isValid ?
        <p className="text-green-400">좋은 닉네임이네요.</p> :
        <p className="text-red-400">올바르지 않은 닉네임 형식입니다.</p>;


    const checkValidityAllInputs = () => {
        return email.isValid && password.isValid && password2.isValid && nickname.isValid;
    };

    const handleSignUp = () => {
        if(!checkValidityAllInputs()){
            alert("모든 값을 제대로 입력해주세요.");
            return;
        }

        if(isLoading)
            return;

        setIsLoading(true);

        try{
            saveNewMember(email.value, password.value, nickname.value); 

        }catch(error){
            console.log(error);
        }finally{
            setIsLoading(false);
        }
            
            
        

        
    };

    return (
        <div className="border-1 border-gray-300 rounded-lg w-4/10 min-h-4/10 m-auto mt-30 p-15 flex flex-col gap-15">
            <Header
                text="회원가입"
            />

            <div className="flex flex-col gap-5">

                <Input1
                    placeholder="이메일"
                    extraCss="border-b-1 border-gray-300 text-lg"
                    value={email.value}
                    onChange={handleEmailChange}
                />

                {!email.isFirstInput && emailValidityAlarm}

                <Input1
                    placeholder="비밀번호"
                    passwordMode={true}
                    extraCss="border-b-1 border-gray-300 text-lg"
                    value={password.value}
                    onChange={handlePasswordChange}
                />

                {!password.isFirstInput && password1ValidityAlarm}

                <Input1
                    placeholder="비밀번호 확인"
                    passwordMode={true}
                    extraCss="border-b-1 border-gray-300 text-lg"
                    value={password2.value}
                    onChange={handlePassword2Change}
                />

                {!password2.isFirstInput && password2ValidityAlarm}

                <Input1
                    placeholder="닉네임"
                    extraCss="border-b-1 border-gray-300 text-lg"
                    value={nickname.value}
                    onChange={handleNicknameChange}
                />

                {!nickname.isFirstInput && nicknameValidityAlarm}
            </div>


            <div className="flex justify-end gap-3">
                <Link href="/login">
                    <Button1
                        title="로그인 페이지로"
                        color="blue"
                    />
                </Link>
                <Button1
                    title="회원가입"
                    color="green"
                    onClick={handleSignUp}
                />
            </div>

        </div>
    );
}