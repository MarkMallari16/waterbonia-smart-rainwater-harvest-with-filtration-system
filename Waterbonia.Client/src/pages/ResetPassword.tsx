import { useState } from "react"
import type { FormEvent } from "react"
import { Link } from "react-router-dom"
import { IconDropletBolt } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const ResetPassword = () => {
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const trimmedEmail = email.trim()

        if (!trimmedEmail) {
            setError("Email is required.")
            return
        }

        if (!emailPattern.test(trimmedEmail)) {
            setError("Enter a valid email address.")
            return
        }

        setError("")
        setIsSubmitting(true)
        await new Promise((resolve) => setTimeout(resolve, 600))
        setIsSubmitting(false)
        setIsSubmitted(true)
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-8">
            <Card className="w-full max-w-md bg-white shadow-sm ring-slate-200/80">
                <CardHeader className="px-6 pt-8 sm:px-8">
                    <div className="mb-4">
                        <CardTitle className="inline-flex h-10 items-center text-xl text-sky-500">
                            <IconDropletBolt className="mr-2 size-6" />
                            WATERBONIA
                        </CardTitle>
                        <CardDescription className="mt-3 text-sm leading-6">
                            Enter your email address and we&apos;ll send you a link to reset your password.
                        </CardDescription>
                    </div>
                    <h1 className="font-heading text-2xl font-semibold tracking-tight text-slate-950">Reset Password</h1>
                </CardHeader>
                <CardContent className="px-6 sm:px-8">
                    {isSubmitted ? (
                        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm leading-6 text-emerald-800" role="status">
                            If an account exists with this email, a password reset link has been sent.
                        </div>
                    ) : (
                        <form id="reset-password-form" onSubmit={handleSubmit} noValidate>
                            <div className="grid gap-2">
                                <Label htmlFor="reset-email">Email</Label>
                                <Input
                                    id="reset-email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={(event) => {
                                        setEmail(event.target.value)
                                        if (error) setError("")
                                    }}
                                    placeholder="example@gmail.com"
                                    autoComplete="email"
                                    aria-invalid={Boolean(error)}
                                    aria-describedby={error ? "reset-email-error" : undefined}
                                    className="p-4"
                                    disabled={isSubmitting}
                                />
                                {error && <p id="reset-email-error" className="text-sm text-destructive" role="alert">{error}</p>}
                            </div>
                        </form>
                    )}
                </CardContent>
                <CardFooter className="flex-col gap-3 bg-white px-6 pb-8 pt-4 sm:px-8">
                    {!isSubmitted && (
                        <Button form="reset-password-form" type="submit" disabled={isSubmitting} className="w-full bg-sky-500 py-4 hover:bg-sky-600">
                            {isSubmitting ? "Sending..." : "Send Reset Link"}
                        </Button>
                    )}
                    <Link to="/" className="text-sm text-slate-600 underline-offset-4 hover:text-slate-950 hover:underline">
                        Back to Login
                    </Link>
                </CardFooter>
            </Card>
        </main>
    )
}

export default ResetPassword