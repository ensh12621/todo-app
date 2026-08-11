"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { MemoEntity } from "../store/memo-store";
import { setCookie } from "./common-api";


const apiUrl = process.env.NEXT_PUBLIC_API_URL;

async function retrieveJwt() {
    const cookieStore = await cookies();
    const jwtHolder = cookieStore.get("jwt");
    return jwtHolder ? jwtHolder.value : "";
}

export async function getMemoList(): Promise<Array<MemoEntity>> {

    // const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://my-spring-boot-app:8080" as string;
    // console.log(`getMemoList().. url => ${apiUrl}/todo/get-todo-list`);

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
            console.log("조회실패 --------------");
            console.log(response.statusText);
            console.log("조회실패 --------------");
            throw new Error(`조회 실패 - ${response.status}`);
        }

        // console.log("getMemoList().. fetching..성공 api..");

        return await response.json();
    } catch (error) {
        console.log(error);
        return [];
    }
}

async function refreshJwt() {
    const params = new URLSearchParams();

    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refresh")?.value;

    if (refreshToken) {
        console.log("refreshing jwt..");
        params.append("refreshToken", refreshToken);

        try {

            const newJwt = await fetch(`${apiUrl}/member/refresh-JWT`, {
                method: "post",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: params
            }).then(response => response.text());

            console.log(`new jwt => ${newJwt}`);
            setCookie("jwt", newJwt, 1 * 30);

            return newJwt;
        } catch (err) {
            console.log(err);
            throw err;
        }

    } else {
        throw new Error("refresh token is not presented")
    }

}

export async function saveNewMemo(title: string, content: string) {

    console.log("도달 1");

    let isFailedWithTokenExpiration = false;

    try {
        const data = {
            title: title, content: content
        }

        console.log("도달 2");

        await fetch(`${apiUrl}/todo/save-new-todo`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${await retrieveJwt()}`
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                console.log("도달 3");


                if (response.status == 200) {
                    revalidatePath("/", "layout");
                    return { success: true };
                } else if (response.status == 403) {
                    console.log("도달 5")
                    isFailedWithTokenExpiration = true;
                }

            });

    } catch (error) {
        console.log("도달 4");
        console.log(`error => ${error}`);
        throw error;
    }

    if (isFailedWithTokenExpiration) {
        await refreshJwt();

        console.log("도달 6");

        try {
            const data = {
                title: title, content: content
            }

            console.log(`도달 7 - jwt (${retrieveJwt()})`);

            await fetch(`${apiUrl}/todo/save-new-todo`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${await retrieveJwt()}`
                },
                body: JSON.stringify(data)
            })
                .then(response => {
                    console.log("도달 8");


                    // TODO 리팩터링

                    if (response.status == 200) {
                        revalidatePath("/", "layout");
                        console.log("도달 9");
                        return { success: true };
                        
                    } else if (response.status == 403) {
                        console.log("도달 10");
                        isFailedWithTokenExpiration = true;
                    }

                });

        } catch (error) {
            console.log("도달 11");
            console.log(`error => ${error}`);
            throw error;
        }
    }
}

export default async function searchByTitle(keyword: string) {
    const jwt = await retrieveJwt();
    if (jwt.length == 0)
        return [];

    console.log(`keyword => ${keyword}`);

    return await fetch(`${apiUrl}/todo/search-by-title?keyword=${keyword}`, {
        method: "get",
        headers: {
            "Authorization": `Bearer ${jwt}`
        }
    }).then(response => response.json());

}