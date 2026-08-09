import LoginForm from "./login-form";
import LoginSuccessAlarm from "./LoginSuccessAlarm";

// app/login/page.tsx (서버 컴포넌트)

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page({ searchParams }: PageProps) {

    const params = await searchParams;
    const isSuccess = params.signupSucess; // "true"

    

    return (
        <div className="w-screen h-screen relative">

            <LoginForm />
            {isSuccess && <LoginSuccessAlarm />}
        </div>
    );
}