import { cookies } from "next/headers";

export async function setCookie(key: string, value: string, maxAge: number) {

    const cookieStore = await cookies();

    cookieStore.set(key, value, {
        httpOnly: true,
        secure: false, // 아직 https 인증서 없으니..
        sameSite: "lax",
        maxAge: maxAge,
        path: "/"
    });
}