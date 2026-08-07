'use client'
import React from "react";
import Button1 from "./Button1";
import Input1 from "./Input1";
import TextArea1 from "./TextArea1";

interface NewMemoDialogProps {
    handleHideNewMemoDialog: () => void;
    handleSaveNewMemo: () => void;

    newTitle: string;
    newContent: string;
    handleChangeNewTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleChangeNewContent: (e : React.ChangeEvent<HTMLTextAreaElement>) => void;

}

export default function NewMemoDialog({ handleHideNewMemoDialog, handleSaveNewMemo, newTitle, newContent, handleChangeNewTitle, handleChangeNewContent }: NewMemoDialogProps) {
    return (
        <div className="absolute top-1/2 left-1/2 bg-amber-100 shadow-2xl w-4/10 h-6/10 -translate-x-1/2 -translate-y-1/2 p-5 flex flex-col gap-5 p-5">
            <Input1
                placeholder="제목을 입력하세요."
                extraCss="border-b-1"
                value={newTitle}
                onChange={handleChangeNewTitle}
            />
            <TextArea1
                extraCss="h-full bg-yellow-300"
                placeholder="내용을 입력하세요."
                value={newContent}
                onChange={handleChangeNewContent}
            />
            <div className="flex w-full justify-end gap-5">
                <Button1
                    title="저장"
                    color="blue"
                    onClick={handleSaveNewMemo}
                />
                <Button1
                    title="취소"
                    color="black"
                    onClick={handleHideNewMemoDialog}

                />

            </div>

        </div>
    );
}