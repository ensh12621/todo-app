'use server'

//import Image from "next/image";
import Header from "./ui/Header";
import HorizontalDivider from "./ui/HorizontalDivider";
import StickerList from "./StickerList";
import { redirect } from "next/navigation";
import isJwtStored from "./lib/member-api";
import MemoInitializer from "./MemoProvider";
import { getMemoList } from "./lib/memo-api2";
//import { getMemoList, getMemoList2 } from "./lib/memo-api";


export default async function Home() {
  const isStored = await isJwtStored();
  if (!isStored){
    redirect("/login")
  }

  // TODO: 처음부터 memo-api2.ts에서 다시 시작
  const memoList = await getMemoList();

  return (
    <div className="p-5 w-full">

      <MemoInitializer  initialValue={memoList} />

      <Header
        text="스티커 메모"
      />

      <HorizontalDivider />

      <StickerList
        // memoList={memoList2}
      />
    </div>
  );
}
