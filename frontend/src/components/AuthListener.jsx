import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthListener = () => {
    const authTokens = useSelector((state) => state.auth.authTokens);
    const navigate = useNavigate();

    useEffect(() => {
        if (!authTokens) {
            navigate('/login');
        }
    }, [authTokens, navigate]);

    return null;
};

export default AuthListener;
