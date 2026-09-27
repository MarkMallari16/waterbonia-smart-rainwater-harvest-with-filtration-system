export const signInWithGoogle = async (): Promise<never> => {
    throw new Error("Google sign-in is not configured for this application.")
}

export const registerWithEmail = async (...credentials: [string, string]): Promise<never> => {
    void credentials
    throw new Error("Email registration is not configured for this application.")
}
