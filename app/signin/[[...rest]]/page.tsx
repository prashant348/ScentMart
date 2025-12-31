import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="flex items-center justify-center h-screen">
            <SignIn path="/signin" signUpUrl="/signup" forceRedirectUrl={"/dashboard"} />
        </div>
    )
}