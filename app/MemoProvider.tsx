'use client'

import { useEffect } from "react";
import { MemoEntity, useMemoStore } from "./store/memo-store";


interface MemoProviderProps{
    initialValue : MemoEntity[];
}

export default function MemoProvider({initialValue} : MemoProviderProps){

    const setMemos = useMemoStore(state => state.setMemos);

    useEffect(() => {
        setMemos(initialValue);
    }, [initialValue, setMemos]);

    return null;
}