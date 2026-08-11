'use client'

import { MemoEntity } from "../store/memo-store";

interface MemoCardProps {
    memoItem : MemoEntity;
}

export default function MemoCard({memoItem} : MemoCardProps) {
    return (
        <li
            className="w-64 h-64 bg-yellow-300 break-all break-words p-3 flex flex-col gap-5 shadow-2xl cursor-pointer hover:bg-yellow-200">
            <p className="font-bold text-4xl overflow-hidden text-ellipsis whitespace-nowrap w-full">
                {memoItem.title}
            </p>
            <pre className="whitespace-pre-wrap break-words ">
                {memoItem.content}
            </pre>

        </li>
    );
}