import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

const Login = () => {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <div className="mb-4 px-4">
                        <CardTitle>Sign in to WATERBONIA</CardTitle>
                        <CardDescription >
                            Enter your email below to login to your account
                        </CardDescription>
                    </div>
                    <CardContent className="mb-4">
                        <form>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="example@gmail.com"
                                        required
                                        className="p-4"
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        required
                                        className="p-4"
                                    />
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex-col bg-white">
                        <Button variant="default" type="submit" className="w-full py-4">Login</Button>
                        <Link to="/reset-password" className="mt-4 text-sm underline-offset-4 hover:underline">
                            Forgot your password?
                        </Link>
                    </CardFooter>
                </CardHeader>
            </Card>
        </div>
    )
}

export default Login