import { SignUp } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="flex items-center justify-center h-screen">
            <SignUp path="/signup" signInUrl="/signin" forceRedirectUrl={"/dashboard"} />
        </div>
    )
}