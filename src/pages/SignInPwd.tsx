import atom from '@/atoms/atoms';
import Button from '@/components/button';
import { CenteredContext } from '@/components/layout';
import TextField from '@/components/textfield';
import useInterval from '@/hooks/useInterval';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React, {
    useContext,
    useEffect,
    useState
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

export default function SignInPwd () {
    const navigate = useNavigate();
    const isCentered = useContext(CenteredContext);

    const [ isLoading, setIsLoading ] = useState(false);
    const [ password, setPassword] = useState(``);
    const email = useRecoilValue(atom.email);

    const handleContinue = () => {
        setIsLoading(true);
    };

    const handleRecoverAccountNavigation = () => {
        navigate(`/recover`);
    };

    useInterval(
        () => {
            setIsLoading(false);
        },
        isLoading ? 1000 : null,
    );

    useEffect(() => {
        console.log(isLoading);
    }, [isLoading]);

    useEffect(() => {
        if (!email) {
            navigate(`/signin`, { replace: true });
        }
    }, [ email, navigate ]);

    return (
        <Stack spacing={4}>
            <Typography variant="h4" component="h1" textAlign={isCentered ? `center` : `left`}>
                Welcome
            </Typography>
            <TextField
                isAccountButton
                disabled
                variant="outlined"
                sx={{ height: 56 }}
                value={email}
                type="email"
            />
            <TextField
                label="Enter your password"
                variant="outlined"
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                onKeyDownEnter={ handleContinue }
            />
            <Link
                component="button"
                variant="subtitle2"
                color="inherit"
                align={isCentered ? `center` : `left`}
                onClick={handleRecoverAccountNavigation}
            >
                Forgot Password?
            </Link>
            <Stack spacing={2}>
                <Button
                    sx={{ height: 56 }}
                    loading={isLoading}
                    onClick={handleContinue}
                >
                    Continue
                </Button>
            </Stack>
        </Stack>
    );
}
