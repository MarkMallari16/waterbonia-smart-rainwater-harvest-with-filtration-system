import { supabase } from "@/lib/supabase"

export const signInWithGoogle = async (): Promise<never> => {
    throw new Error("Google sign-in is not configured for this application.")
}

export const registerWithEmail = async (email: string, password: string): Promise<void> => {
    const { error } = await supabase.auth.signUp({
        email,
        password,
    })

    if (error) throw error
}
