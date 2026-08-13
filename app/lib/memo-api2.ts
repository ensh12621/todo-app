'use server';
import { revalidatePath } from "next/cache";
import { MemoEntity, useMemoStore } from "../store/memo-store";
import { apiGetWithJwtTemplate, apiWithJwtTemplate, withHeaderJson, withHeaderJwt } from "./common-api";

export async function getMemoList(): Promise<Array<MemoEntity>> {

    const result = await apiWithJwtTemplate({
        uri: "/todo/get-todo-list",
        method: "GET",
        withHeaders: [withHeaderJwt, withHeaderJson]
    });

    if (result) {
        return result.data;
    }
    console.log("no retreiving todo list.., so return empty array.");

    return [];
}

export async function saveNewMemo(title: string, content: string) {

    const data = {
        title: title,
        content: content
    };

    const result = await apiWithJwtTemplate({
        uri: "/todo/save-new-todo",
        data: data,
        method: "POST",
        withHeaders: [withHeaderJson, withHeaderJwt]
    });

    if (result && result.status == 200) {
        revalidatePath("/"); // invalidate cache and reload the page
    } else if (result) {
        console.log(`saving new memo error - (${result.status})`);
    }
}


export default async function searchByTitle(keyword: string) {


    const result = await apiGetWithJwtTemplate({
        uri : "/todo/search-by-title",
        urlParams: `keyword=${keyword}`
    });


    if (result && result.status == 200) {
       return result.data;
    } else if (result) {
        console.log(`searching memo list error - (${result.status})`);
        return [];
    }

}