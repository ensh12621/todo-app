'use server';
import { revalidatePath } from "next/cache";
import { MemoEntity } from "../store/memo-store";
import { apiWithJwtTemplate, withHeaderJson, withHeaderJwt } from "./common-api";

export async function getMemoList(): Promise<Array<MemoEntity>> {

    const result = await apiWithJwtTemplate({
        uri: "/todo/get-todo-list",
        method: "GET",
        withHeaders: [withHeaderJwt, withHeaderJson]
    });

    if (result) {
        return result.data;
    }

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

    if(result && result.status == 200){
        revalidatePath("/"); // invalidate cache and reload the page
    }else if(result){
        console.log(`saving new memo error - (${result.status})`);
    }
}

