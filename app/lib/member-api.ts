'use server'

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function saveNewMember(email: string, password: string, nickname: string) {

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;



    try {

        const data = {
            email: email,
            password: password,
            nickname: nickname
        };

        await fetch(`${apiUrl}/member/add`, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then(response => {
            if (response.status == 200) {
                //alert("회원가입을 완료하였습니다. 로그인 페이지로 이동합니다.");
                //revalidatePath("/login", "layout");
                redirect("/login?signupSucess=true");
            }
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default async function isJwtStored() {
    const cookieStore = await cookies();
    return cookieStore.get("jwt") != null;
}

export async function login(email: string, password: string) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    try {
        const data = {
            email: email,
            password: password
        };

        console.log("api url => " + apiUrl);

        console.log(`api login() .. ${email} / ${password}`);

        const jwt = await fetch(`${apiUrl}/member/login`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(response => response.text());

        const cookieStore = await cookies();
        cookieStore.set('jwt', jwt, {
            httpOnly: true,
            secure: false, // 아직 https 인증서 없으니..
            sameSite: "lax",
            maxAge: 60 * 5, // 5분 유지
            path: "/"
        });

        redirect("/");

    } catch (error) {
        console.log(error);
        throw error;
    }
}



export async function logOut() {
    const cookieStore = await cookies();
    cookieStore.delete("jwt");
    redirect("/login")
}