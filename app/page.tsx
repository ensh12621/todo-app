'use server'

//import Image from "next/image";
import Header from "./ui/Header";
import HorizontalDivider from "./ui/HorizontalDivider";
import StickerList from "./StickerList";
import { getMemoList } from "@/app/lib/memo-api";

import {cookies} from "next/headers";
import { redirect } from "next/navigation";


export default async function Home() {
  
  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt");
  if(!jwt)
    redirect("/login/");

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
