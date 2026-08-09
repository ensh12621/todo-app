'use server'

import { revalidatePath } from "next/cache";
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