'use server'

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { setCookie } from "./common-api";


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
    const isJwtStored = cookieStore.get("jwt") != null;
    const isRefreshStored = cookieStore.get("refresh") != null;

    let jwt = cookieStore.get("jwt");
    let refresh = cookieStore.get("refresh");
    if (jwt && refresh) {
        console.log("jwt------------------------------------------------start");
        console.log(jwt.value);
        console.log(refresh.value);
        console.log("jwt------------------------------------------------end");
    }

    return isJwtStored && isRefreshStored;
}

interface AuthTokenSetType {
    jwt: string;
    refresh: string;
}




export async function login(email: string, password: string) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    try {
        const data = {
            email: email,
            password: password
        };

        console.log(`${apiUrl}/member/login`);
        console.log(`api login() .. ${email} / ${password}`);

        const authTokenSet: AuthTokenSetType = await fetch(`${apiUrl}/member/login`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(response => response.json());

        console.log(`${authTokenSet.jwt} / ${authTokenSet.refresh}`);
        await setCookie("jwt", authTokenSet.jwt, 10); // 30초 유지
        await setCookie("refresh", authTokenSet.refresh, 60 * 15); // 15분 유지
        console.log('test');

       

    } catch (error) {
        console.log(error);
    }

     redirect("/");
}

export async function logOut() {
    const cookieStore = await cookies();
    cookieStore.delete("jwt");
    // todo - refresh table entry 삭제
    redirect("/login")
}