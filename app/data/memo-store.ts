import { create } from "zustand";

export interface MemoEntity {
    idx: number;
    title: string;
    content: string;
}

export interface MemoZustandStoreType {
    memos: MemoEntity[];
    filteredMemos: MemoEntity[];
    setMemos : (memos: MemoEntity[]) => void;
}


export const useMemoStore = create<MemoZustandStoreType>(set => ({
    memos: [],
    filteredMemos: [],
    setMemos: memos => set({ memos})
}));