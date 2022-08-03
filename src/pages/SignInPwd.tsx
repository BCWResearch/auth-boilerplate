import { UserService } from '@/api/api';
import atom from '@/atoms/atoms';
import Button from '@/components/button';
import { CenteredContext } from '@/components/layout';
import TextField from '@/components/textfield';
import useInterval from '@/hooks/useInterval';
import Alert from '@mui/material/Alert';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { AxiosError, AxiosResponse } from 'axios';
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
    const [ errorMessage, setErrorMessage ] = useState(``);
    const email = useRecoilValue(atom.email);

    const handleContinue = () => {
        setIsLoading(true);

        if (!email) {
            setErrorMessage(`An email was not provided. Please go back and try again.`);
            return;
        }

        if (!password) {
            setErrorMessage(`Please enter a password.`);
            return;
        }

        UserService.signIn({
            email,
            password
        }).then((response: AxiosResponse) => {
            console.log(`Request to /login received a response: `, response);

            UserService.success().then((response: AxiosResponse) => {
                console.log(`Request to /success received a response: `, response);
            }).catch((reason: AxiosError) => {
                setErrorMessage(`Request to /success returned an error, please check the console.`);
                console.error(reason);
            });
        }).catch((reason: AxiosError) => {
            setErrorMessage(`Request to /login returned an error, please check the console.`);
            console.error(reason);
        });
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
            {
                errorMessage &&
                    <Alert severity="error" icon={false}>
                        { errorMessage }
                    </Alert>
            }
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
                disabled
                component="button"
                variant="subtitle2"
                color="inherit"
                align={isCentered ? `center` : `left`}
                sx={{ cursor: `not-allowed` }}
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



