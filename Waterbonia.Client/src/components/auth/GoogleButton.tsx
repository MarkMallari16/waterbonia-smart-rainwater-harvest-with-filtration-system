import { useState } from "react";
import { Button } from "../ui/button"
import { supabase } from './../../lib/supabase';
import googleLogo from '@/assets/google.png';

const GoogleButton = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleGoogleSignIn = async () => {
    setIsSubmitting(true)

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      console.error(error)
      setIsSubmitting(false)
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      disabled={isSubmitting}
      onClick={() => void handleGoogleSignIn()}
      className="w-full py-4"
    >
      <img
        src={googleLogo}
        alt="Google"
        className="size-4"
      />

      {isSubmitting
        ? "Signing in with Google..."
        : "Continue with Google"}
    </Button>
  )
}
export default GoogleButton