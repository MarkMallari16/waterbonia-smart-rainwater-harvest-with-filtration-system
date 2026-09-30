import { useRef, useState } from "react"
import { ArrowLeft, CheckCircle2, Loader2, Mail } from "lucide-react"
import { Link } from "react-router-dom"
import { IconDropletBolt } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type ResendStatus = "idle" | "loading" | "success" | "error"

const VerifyEmail = () => {
    const [resendStatus, setResendStatus] = useState<ResendStatus>("idle")
    const resendTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

    const handleResend = async () => {
        if (resendStatus === "loading") return

        setResendStatus("loading")

        try {
            await new Promise<void>((resolve) => {
                resendTimer.current = setTimeout(resolve, 850)
            })
            setResendStatus("success")
            resendTimer.current = setTimeout(() => setResendStatus("idle"), 2500)
        } catch {
            setResendStatus("error")
        }
    }

    const isResending = resendStatus === "loading"

    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-8 dark:bg-slate-950">
            <Card className="w-full max-w-lg border border-slate-200/80 bg-white shadow-sm dark:border-white/10 dark:bg-slate-900">
                <CardHeader className="items-center px-6 pb-2 pt-8 text-center sm:px-10 sm:pt-10">
                    <CardTitle className="inline-flex items-center text-xl text-sky-500">
                        <IconDropletBolt className="mr-2 size-6" />
                        WATERBONIA
                    </CardTitle>
                    <div className="mt-7 flex justify-center">
                        <div className=" flex size-14 items-center justify-center rounded-full bg-sky-100 text-sky-500 dark:bg-sky-500/15 dark:text-sky-400">
                            <Mail className="size-7" aria-hidden="true" />
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="px-6 pb-8 sm:px-10 sm:pb-10">
                    <div className="text-center">
                        <h1 className="font-heading text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">Check your email</h1>
                        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-600 dark:text-slate-400">
                            We sent a verification link to your email address. Please check your inbox and click the link to verify your Waterbonia account.
                        </p>
                    </div>

                    <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-center text-sm font-medium text-slate-700 dark:border-white/10 dark:bg-slate-950/70 dark:text-slate-300">
                        m••••••@gmail.com
                    </div>

                    <div className="mt-6 space-y-3">
                        <Button type="button" disabled={isResending} onClick={() => void handleResend()} className="h-11 w-full bg-sky-500 text-white hover:bg-sky-600">
                            {isResending && <Loader2 className="animate-spin" aria-hidden="true" />}
                            {resendStatus === "loading" ? "Sending..." : resendStatus === "success" ? "Email sent" : "Resend verification email"}
                        </Button>

                        {resendStatus === "success" && (
                            <p className="flex items-center justify-center gap-2 text-sm text-emerald-600 dark:text-emerald-400" role="status">
                                <CheckCircle2 className="size-4" aria-hidden="true" />
                                Verification email sent! Please check your inbox.
                            </p>
                        )}
                        {resendStatus === "error" && (
                            <p className="text-center text-sm text-destructive" role="alert">
                                We couldn&apos;t resend the verification email. Please try again.
                            </p>
                        )}
                    </div>

                    <div className="mt-7 border-t border-slate-200 pt-5 text-sm dark:border-white/10">
                        <p className="font-medium text-slate-700 dark:text-slate-300">Didn&apos;t receive the email?</p>
                        <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-500 dark:text-slate-400">
                            <li>Check your spam or junk folder.</li>
                            <li>Make sure the email address is correct.</li>
                            <li>Try sending the verification email again.</li>
                        </ul>
                    </div>

                    <Link to="/login" className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-sky-600 underline-offset-4 hover:underline dark:text-sky-400">
                        <ArrowLeft className="size-4" aria-hidden="true" />
                        Back to Login
                    </Link>
                </CardContent>
            </Card>
        </main>
    )
}

export default VerifyEmail