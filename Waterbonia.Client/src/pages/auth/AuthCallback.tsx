import { supabase } from '@/lib/supabase';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const AuthCallback = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const handleCallback = async () => {
            const { data, error } = await supabase.auth.getSession();

            if (error) {
                console.error(error);
                navigate("/login");
                return;
            }

            if (data.session) {
                navigate("/dashboard");
            } else {
                navigate("/login");
            }
        };

        handleCallback();
    }, [navigate]);


    return (
        <div>Signing you in...</div>
    )
}

export default AuthCallback