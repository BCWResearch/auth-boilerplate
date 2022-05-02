import Button from '@/components/button';
import GoogleLoginButton from '@/components/googleLogin';
import { CenteredContext, UseSSOContext } from '@/components/layout';
import MicrosoftLoginButton from '@/components/microsoftLogin/microsoftLogin';
import OrDivider from '@/components/orDivider';
import TextField from '@/components/textfield';
import useInterval from '@/hooks/useInterval';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React, {
    useContext,
    useEffect,
    useState
} from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignIn () {
    const navigate = useNavigate();
    const isCentered = useContext(CenteredContext);
    const { useGoogle, useMicrosoft } = useContext(UseSSOContext);

    const [ isLoading, setIsLoading ] = useState(false);
    const [ password, setPassword ] = useState(``);
    const [ email, setEmail] = useState(``);

    const handleContinue = () => {
        setIsLoading(true);
    };

    const handleSignInNavigation = () => {
        navigate(`/signin`);
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

    return (
        <Stack spacing={4}>
            <Typography variant="h4" component="h1" textAlign={isCentered ? `center` : `left`}>
                Sign Up
            </Typography>
            <TextField
                label="Email"
                variant="outlined"
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                label="Password"
                variant="outlined"
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <Stack spacing={2}>
                <Button
                    sx={{ height: 56 }}
                    loading={isLoading}
                    onClick={handleContinue}
                >
                    Submit
                </Button>
            </Stack>
            {
                ( useGoogle || useMicrosoft) &&
                <React.Fragment>
                    <OrDivider />
                    <Stack alignItems={`center`} spacing={2}>
                        { useMicrosoft && <MicrosoftLoginButton /> }
                        { useGoogle && <GoogleLoginButton /> }
                    </Stack>
                </React.Fragment>
            }
            <Divider />
            <Link
                component="button"
                variant="subtitle2"
                color="inherit"
                onClick={handleSignInNavigation}
            >
                Already have an account? Sign In
            </Link>
        </Stack>
    );
}
