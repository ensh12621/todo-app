'use server'

import { cookies } from "next/headers";
import { apiUrl } from "./config";


const jwtRetention = 1000 * 30;


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


export async function getJwtAndRefreshKey() {
    const jwt = await getCookie("jwt");
    const refresh = await getCookie("refresh");

    return {
        jwt: jwt,
        refresh: refresh
    }
}


export async function getCookie(key: string) {

    const cookieStore = await cookies();
    const cookie = cookieStore.get(key);
    if (!cookie)
        return null;
    return cookie.value;
}


export type withFunctionType = (headers: Record<string, string>) => void;


export interface apiWithJsonDataAndJwtParams {
    uri: string
    data: object
    method: "POST" | "GET" | "PUT" | "DELETE"
    withHeaders: withFunctionType[];
}

export const withJsonReceived: withFunctionType = async (headers) => {
    headers["Content-Type"] = "application/json"
};

export const withJwtAsync: withFunctionType = async (headers) => {
    let jwt = await getCookie("jwt");
    if (jwt)
        headers["Authorization"] = `Bearer ${jwt}`;

};

interface apiWithJwtTemplateParams {
    uri: string;
    data: object;
    method: "POST" | "GET" | "PUT" | "DELETE";

}


export async function apiWithJwtTemplate({ uri, data, method }: apiWithJwtTemplateParams) {


    const params: apiWithJsonDataAndJwtParams = {
        uri: uri,
        data: data,
        method: method,
        withHeaders: [withJsonReceived, withJwtAsync]
    };

    const result = await apiWithJsonDataAndJwt(params);

    if (result && result.status == 200) {
        return {
            status: result.status,
            data: result.data
        }
    } else {
        if (result && result.status == 403) {
            // todo: refresh 
            console.log("jwt refreshing..");
            await refreshJwt();
            await apiWithJsonDataAndJwt(params);

        } else {
            return {
                status: result?.status,
                data: "error"
            };
        }


    }
}





export async function apiWithJsonDataAndJwt({ uri, data, method, withHeaders }: apiWithJsonDataAndJwtParams) {


    const headers: Record<string, string> = {};

    for (const withHeader of withHeaders) {
        await withHeader(headers);
    }

    const config: RequestInit = {
        method: method,
        body: JSON.stringify(data),
        headers
    };

    console.log(`\n\n`);
    console.log(`url: -> ${uri}`)
    console.log(`------------data`);
    console.log(data);
    console.log(`------------data end`);
    console.log('------------header');
    console.log(headers);
    console.log('------------header end');
    console.log(`\n\n`);


    try {
        const response = await fetch(`${apiUrl}${uri}`, config)
        if (response.status !== 200) {
            console.log("error not 200 - " + response.status);
            return { status: response.status, data: null };
        }

        const responseData = await response.json();
        return { status: 200, data: responseData };

    } catch (error) {
        console.log(`apiWithJsonDataAndJwt() - error`);
        console.log(error);

        //throw error;
    }

}



export async function refreshJwt() {

    const refreshToken = await getCookie("refresh");

    const params: apiWithJsonDataAndJwtParams = {
        uri: "/member/refresh-JWT",
        data: { refreshToken: refreshToken },
        method: "POST",
        withHeaders: [withJsonReceived, withJwtAsync]

    };

    const result = await apiWithJsonDataAndJwt(params);
    if (result) {

        setCookie("jwt", result.data.jwt, jwtRetention);

        console.log(`refreshJWT - result status -> ${result.status}`);
        console.log(`refreshJWT - result payload -> ${result.data.jwt}`);




    }
}
