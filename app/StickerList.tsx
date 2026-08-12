'use client'

import React, { useMemo, useState } from "react";
import { saveNewMemo2 } from "./lib/memo-api";
import EmptyMemoCard from "./ui/EmptyMemoCard";
import MemoCard from "./ui/MemoCard";
import NewMemoDialog from "./ui/NewMemoDialog";
import { useMemoStore } from "./store/memo-store";
import { refreshJwt } from "./lib/common-api";


export default function StickerList( /*{memoList} : StickerListProps*/) {

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
        // saveNewMemo(newTitle, newContent);
        if (await saveNewMemo2(newTitle, newContent)) {
            setNewTitle("");
            setNewContent("");
            setShowNewMemoDialog(false);
        } else {
            await refreshJwt();
            console.log("retry to save new memo again with new jwt generated using refresh key..");
            await saveNewMemo2(newTitle, newContent)
            setNewTitle("");
            setNewContent("");
            setShowNewMemoDialog(false);
        }

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