import LoginForm from "@/components/login-form"

export default function LoginPage() {
    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-black relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-slate-900 via-zinc-900 to-black z-0" />
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[120px]" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/20 blur-[120px]" />

            {/* Content */}
            <div className="relative z-10 w-full max-w-md p-4 animate-in fade-in zoom-in duration-500">
                <LoginForm />
            </div>
        </div>
    )
}
