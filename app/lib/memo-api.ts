"use server";

import { revalidatePath } from "next/cache";

export interface MemoEntity {
    idx: number;
    title: string;
    content: string;
}

export async function getMemoList() : Promise<Array<MemoEntity>> {
    try{
        const response = await fetch("http://127.0.0.1:8080/todo/get-todo-list", {
                                        method:"GET",
                                        headers: {
                                            "Accept": "application/json",
                                        },
        });

        

        if(!response.ok){
            throw new Error(`조회 실패 - ${response.status}`);
        }

        return await response.json();
    }catch(error){
        console.log("에러!");
        console.log(error);
        throw error;
    }
}

//saveNewMemo({title:newTitle, content:newContent});

export async function saveNewMemo(title:string, content:string){
    try{
        const data = {
            title: title, content: content
        }

        console.log("nextjs api 영역 도달");

        await fetch("http://127.0.0.1:8080/todo/save-new-todo", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => {

            if(response.status == 200){
                revalidatePath("/", "layout");
                return {success: true};
            }

        });

        throw new Error("등록 실패!");

    }catch(error){
        console.log(`error => ${error}`);
    }
}
