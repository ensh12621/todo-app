'use client'

import React, { useState } from "react";
import { MemoEntity, saveNewMemo } from "./lib/memo-api";
import EmptyMemoCard from "./ui/EmptyMemoCard";
import MemoCard from "./ui/MemoCard";
import NewMemoDialog from "./ui/NewMemoDialog";

interface StickerListProps{
    memoList : Array<MemoEntity>;
}

export default function StickerList( {memoList} : StickerListProps){
      
    const [showNewMemoDialog, setShowNewMemoDialog] = useState(false);

    const handleShowNewMemoDialog = () => {
        setShowNewMemoDialog(true);
    };

    const handleHideNewMemoDialog = () => {
        setShowNewMemoDialog(false);
    };


    const [newTitle, setNewTitle] = useState("");
    const [newContent, setNewContent] = useState("");

    const handleChangeNewTitle = (e : React.ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.target.value);
    };

    const handleChangeNewContent = (e : React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewContent(e.target.value);
    };

    const handleSaveNewMemo =  () => {
        saveNewMemo(newTitle, newContent);
        setNewTitle("");
        setNewContent("");
        setShowNewMemoDialog(false);
    };

    if(memoList.length == 0){
        return <p>어떤 메모도 등록이 되어 있지 않습니다. 추가해주세요.</p>
    }


    return (
        <>
            <ul className="flex gap-10 pt-5 flex-wrap">
                {memoList.map(memoItem => (
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