'use server'

//import Image from "next/image";
import Header from "./ui/Header";
import HorizontalDivider from "./ui/HorizontalDivider";
import StickerList from "./StickerList";
import { getMemoList } from "@/app/lib/memo-api";

export default async function Home() {
  
  const memoList2 = await getMemoList();

  return (
    <div className="p-5 w-full">

      <Header
        text="스티커 메모"
      />

      <HorizontalDivider />

      <StickerList
        memoList={memoList2}
      />
    </div>
  );
}
