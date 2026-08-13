'use client'

import React, { useState } from "react";
import EmptyMemoCard from "./ui/EmptyMemoCard";
import MemoCard from "./ui/MemoCard";
import NewMemoDialog from "./ui/NewMemoDialog";
import { useMemoStore } from "./store/memo-store";
import { saveNewMemo } from "./lib/memo-api2";

export default function StickerList() {

    const { memos: memoList } = useMemoStore();

    const [showNewMemoDialog, setShowNewMemoDialog] = useState(false);

    const handleShowNewMemoDialog = () => {
        setShowNewMemoDialog(true);
    };

    const handleHideNewMemoDialog = () => {
        setShowNewMemoDialog(false);
    };


    const [newTitle, setNewTitle] = useState("");
    const [newContent, setNewContent] = useState("");

    const handleChangeNewTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.target.value);
    };

    const handleChangeNewContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewContent(e.target.value);
    };

    const handleSaveNewMemo = async () => {
      
        await saveNewMemo(newTitle, newContent);
        setNewTitle("");
        setNewContent("");
        setShowNewMemoDialog(false);
    };

    return (
        <>
            <ul className="flex gap-10 pt-5 flex-wrap">
                {memoList && memoList.map(memoItem => (
                    <MemoCard key={memoItem.idx} memoItem={memoItem} />
                ))}
                <EmptyMemoCard
                    handleClick={handleShowNewMemoDialog}
                />
            </ul>

            {showNewMemoDialog && (
                <NewMemoDialog
                    newTitle={newTitle}
                    newContent={newContent}
                    handleChangeNewTitle={handleChangeNewTitle}
                    handleChangeNewContent={handleChangeNewContent}
                    handleHideNewMemoDialog={handleHideNewMemoDialog}
                    handleSaveNewMemo={handleSaveNewMemo}
                />
            )}
        </>
    );
}