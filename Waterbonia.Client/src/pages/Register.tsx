import { useState } from "react"
import type { FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"
import { IconDropletBolt } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { registerWithEmail } from "@/services/authService"
import GoogleButton from "@/components/auth/GoogleButton"

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const Register = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [error, setError] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const trimmedEmail = email.trim()

        if (!trimmedEmail) return setError("Email is required.")
        if (!emailPattern.test(trimmedEmail)) return setError("Enter a valid email address.")
        if (!password) return setError("Password is required.")
        if (password.length < 8) return setError("Password must be at least 8 characters.")
        if (!confirmPassword) return setError("Please confirm your password.")
        if (password !== confirmPassword) return setError("Passwords do not match.")

        setError("")
        setIsSubmitting(true)
        try {
            await registerWithEmail(trimmedEmail, password)
            navigate("/verify-email")
        } catch (registrationError) {
            setError(registrationError instanceof Error ? registrationError.message : "Unable to create your account. Please check your information and try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    const disabled = isSubmitting

    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-8">
            <Card className="w-full max-w-md bg-white shadow-sm ring-slate-200/80">
                <CardHeader className="px-6 pt-8 sm:px-8">
                    <CardTitle className="inline-flex h-10 items-center text-xl text-sky-500">
                        <IconDropletBolt className="mr-2 size-6" />
                        WATERBONIA
                    </CardTitle>
                    <CardDescription className="text-sm leading-6">Create your Waterbonia account</CardDescription>
                    <h1 className="font-heading text-2xl font-semibold tracking-tight text-slate-950">Create Account</h1>
                </CardHeader>
                <CardContent className="px-6 sm:px-8">
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="grid gap-5">
                            <div className="grid gap-2">
                                <Label htmlFor="register-email">Email</Label>
                                <Input id="register-email" type="email" placeholder="Enter your email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} disabled={disabled} className="p-4" aria-invalid={Boolean(error)} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="register-password">Password</Label>
                                <div className="relative">
                                    <Input id="register-password" type={showPassword ? "text" : "password"} placeholder="Enter your password" autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} disabled={disabled} className="p-4 pr-11" />
                                    <Button type="button" variant="ghost" size="icon" className="absolute right-1" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? "Hide password" : "Show password"}>
                                        {showPassword ? <EyeOff /> : <Eye />}
                                    </Button>
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="confirm-password">Confirm Password</Label>
                                <div className="relative">
                                    <Input id="confirm-password" type={showConfirmPassword ? "text" : "password"} placeholder="Confirm your password" autoComplete="new-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} disabled={disabled} className="p-4 pr-11" />
                                    <Button type="button" variant="ghost" size="icon" className="absolute right-1" onClick={() => setShowConfirmPassword((visible) => !visible)} aria-label={showConfirmPassword ? "Hide password" : "Show password"}>
                                        {showConfirmPassword ? <EyeOff /> : <Eye />}
                                    </Button>
                                </div>
                            </div>
                            {error && <p className="text-sm text-destructive" role="alert">{error}</p>}
                            <Button type="submit" disabled={disabled} className="w-full bg-sky-500 py-4 hover:bg-sky-600">
                                {isSubmitting ? "Creating account..." : "Create Account"}
                            </Button>
                            <div className="flex items-center gap-3 text-xs text-slate-500"><Separator className="flex-1" />or continue with<Separator className="flex-1" /></div>
                            <GoogleButton />
                        </div>
                    </form>

                    <div className="flex justify-center gap-1  px-6 pb-4 pt-4 text-center sm:px-8">
                        <p className="text-sm text-slate-600">Already have an account?</p>
                        <Link to="/login" className="text-sm text-sky-600 underline-offset-4 hover:underline">Sign in</Link>
                    </div>
                </CardContent>
            </Card>
        </main>
    )
}

export default Register
