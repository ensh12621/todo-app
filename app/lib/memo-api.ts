"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";



export interface MemoEntity {
    idx: number;
    title: string;
    content: string;
}

async function retrieveJwt() {
    const cookieStore = await cookies();
    const jwtHolder = cookieStore.get("jwt");
    return jwtHolder ? jwtHolder.value : "";
}

export async function getMemoList(): Promise<Array<MemoEntity>> {

    // const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://my-spring-boot-app:8080" as string;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    console.log(`getMemoList().. url => ${apiUrl}/todo/get-todo-list`);

    const jwt = await retrieveJwt();
    if (jwt.length == 0)
        return [];

    try {
        const response = await fetch(`${apiUrl}/todo/get-todo-list`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${jwt}`
            },
        });

        if (!response.ok) {
            throw new Error(`조회 실패 - ${response.status}`);
        }

        console.log("getMemoList().. fetching..성공 api..");

        return await response.json();
    } catch (error) {
        console.log(error);
        return [];
    }
}

//saveNewMemo({title:newTitle, content:newContent});

export async function saveNewMemo(title: string, content: string) {

    const jwt = await retrieveJwt();
    if (jwt.length == 0)
        return [];

    // const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://my-spring-boot-app:8080" as string;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    console.log(`getMemoList().. url => ${apiUrl}/todo/save-new-todo`);

    try {
        const data = {
            title: title, content: content
        }

        await fetch(`${apiUrl}/todo/save-new-todo`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`
            },
            body: JSON.stringify(data)
        })
            .then(response => {

                if (response.status == 200) {
                    revalidatePath("/", "layout");
                    return { success: true };
                }

            });

    } catch (error) {
        console.log(`error => ${error}`);
        throw error;
    }
}

