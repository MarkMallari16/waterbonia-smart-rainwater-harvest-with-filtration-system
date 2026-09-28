import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import { IconDropletBolt } from "@tabler/icons-react"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { Separator } from "@/components/ui/separator"
import { signInWithGoogle } from "@/services/authService"
import googleLogo from "@/assets/google.png"

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState("")
    const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false)

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const userEmail = "renewaterbonia@gmail.com";
        const userPass = "passMama";

        if (email == userEmail && password == userPass) {
            navigate("/dashboard");
        } else {
            setError("Invalid email or password");
        }
    }
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        if (error) setError("")
    }

    const handleGoogleSignIn = async () => {
        setError("")
        setIsGoogleSubmitting(true)
        try {
            await signInWithGoogle()
        } catch (googleError) {
            setError(googleError instanceof Error ? googleError.message : "Unable to connect to Google. Please try again.")
        } finally {
            setIsGoogleSubmitting(false)
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <div className="mb-4 px-4">
                        <CardTitle className="text-xl inline-flex h-10 items-center text-sky-500">
                            <span className="pe-2 text-black">Sign in to</span>
                            <IconDropletBolt className="h-6 w-6 text-sky-500" />
                            WATERBONIA
                        </CardTitle>
                        <CardDescription >
                            Enter your email below to login to your account
                        </CardDescription>
                    </div>
                    <CardContent className="mb-4">
                        <form onSubmit={handleLogin}>
                            <div className="flex flex-col gap-6">

                                <div className="grid gap-2">
                                    <Label htmlFor="email">
                                        Email
                                    </Label>

                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={
                                            handleEmailChange
                                        }
                                        required
                                        className="p-4"
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password">
                                        Password
                                    </Label>

                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={
                                                handlePasswordChange
                                            }
                                            required
                                            className="p-4 pr-11"
                                        />
                                        <Button type="button" variant="ghost" size="icon" className="absolute right-1" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? "Hide password" : "Show password"}>
                                            {showPassword ? <EyeOff /> : <Eye />}
                                        </Button>
                                    </div>
                                </div>

                                {error && <p className="text-sm text-destructive" role="alert">{error}</p>}
                                <Button
                                    type="submit"
                                    disabled={isGoogleSubmitting}
                                    className="w-full bg-sky-500 py-4 hover:bg-sky-600"
                                >
                                    Login
                                </Button>

                                <Link
                                    to="/reset-password"
                                    className="text-center text-sm underline-offset-4 hover:underline"
                                >
                                    Forgot your password?
                                </Link>

                                <div className="flex items-center gap-3 text-xs text-slate-500"><Separator className="flex-1" />or continue with<Separator className="flex-1" /></div>

                                <Button type="button" variant="outline" disabled={isGoogleSubmitting} onClick={() => void handleGoogleSignIn()} className="w-full py-4">
                                    <img
                                        src={googleLogo}
                                        alt="Google"
                                        className="size-4"
                                    />
                                    {isGoogleSubmitting ? "Connecting to Google..." : "Continue with Google"}
                                </Button>

                                <p className="text-center text-sm text-slate-600">Don&apos;t have an account? <Link to="/register" className="text-sky-600 underline-offset-4 hover:underline">Create an account</Link></p>

                            </div>
                        </form>
                    </CardContent>
                </CardHeader>
            </Card>
        </div>
    )
}

export default Login