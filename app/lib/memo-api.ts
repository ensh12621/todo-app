"use server";

import { revalidatePath } from "next/cache";
import { MemoEntity } from "../store/memo-store";
import { apiWithJsonDataAndJwt, apiWithJsonDataAndJwtParams, getCookie,  withJsonReceived, withJwtAsync } from "./common-api";


const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// async function retrieveJwt() {
//     const cookieStore = await cookies();
//     const jwtHolder = cookieStore.get("jwt");
//     return jwtHolder ? jwtHolder.value : "";
// }

export async function getMemoList(): Promise<Array<MemoEntity>> {

    // const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://my-spring-boot-app:8080" as string;
    // console.log(`getMemoList().. url => ${apiUrl}/todo/get-todo-list`);

    const jwt = await getCookie("jwt");
    if (!jwt)
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



export async function saveNewMemo2(title: string, content: string) {

    const data = {
        title: title,
        content: content
    };

    const params: apiWithJsonDataAndJwtParams = {
        uri: "/todo/save-new-todo",
        data: data,
        method: "POST",
        withHeaders: [withJsonReceived, withJwtAsync]
    };

    console.log(`with header - withJsonReceived, withJwtAsync`);

    const result = await apiWithJsonDataAndJwt(params);

    if (result && result.status == 200) {
        console.log("new memo added");
        revalidatePath("/"); // invalidate cache and reload the page
        return true; // 클라이언트 코드에서 boolean 값에 따라 추가 작업 진행할지 결정되므로 return true를 함.
    } else {
        return false;

    }
}



export default async function searchByTitle(keyword: string) {
    const jwt = await getCookie("jwt");
    if (!jwt)
        return [];

    console.log(`keyword => ${keyword}`);

    return await fetch(`${apiUrl}/todo/search-by-title?keyword=${keyword}`, {
        method: "get",
        headers: {
            "Authorization": `Bearer ${jwt}`
        }
    }).then(response => response.json());

}