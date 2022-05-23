import atom from '@/atoms/atoms';
import Button from '@/components/button';
import GoogleLoginButton from '@/components/googleLogin';
import { CenteredContext, UseSSOContext } from '@/components/layout';
import MicrosoftLoginButton from '@/components/microsoftLogin/microsoftLogin';
import OrDivider from '@/components/orDivider';
import TextField from '@/components/textfield';
import useInterval from '@/hooks/useInterval';
import { validateEmail } from '@/utils/validateEmail';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React, {
    useContext,
    useState
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

export default function SignIn () {
    const navigate = useNavigate();
    const isCentered = useContext(CenteredContext);
    const { useGoogle, useMicrosoft } = useContext(UseSSOContext);

    const [ isLoading, setIsLoading ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState(``);
    const [ email, setEmail] = useRecoilState(atom.email);

    const handleContinue = () => {
        setIsLoading(true);
        setErrorMessage(``);

        if (!email) {
            setErrorMessage(`Please enter an email address.`);
            return;
        }

        const isValidEmail = validateEmail(email);
        console.log(`isValidEmail`, isValidEmail);

        if (!isValidEmail) {
            setErrorMessage(`Please enter a valid email address.`);
            return;
        }

        /* TODO: Implement login api handler
         * Ensure that there is proper server-side email validation exists
         * since javascript can be easily disabled in the browser
         */

        // setIsLoading(false);
        // if (response.status === 404) {
        //     setErrorMessage(`No account exists for this email. Please check your spelling or create an account.`);
        // }
        // navigate(`/signin/pwd`);
    };

    const handleCreateAccountNavigation = () => {
        navigate(`/signup`);
    };

    // Remove upon proper handleContinue is implemented
    useInterval(
        () => {
            setIsLoading(false);

            if (!errorMessage) {
                navigate(`/signin/pwd`);
            }
        },
        isLoading ? 1000 : null,
    );

    return (
        <Stack spacing={4}>
            <Typography variant="h4" component="h1" textAlign={isCentered ? `center` : `left`}>
                Sign In
            </Typography>
            <TextField
                error={errorMessage !== ``}
                label="Email"
                variant="outlined"
                value={email}
                type="email"
                helperText={errorMessage}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Stack spacing={2}>
                <Button
                    sx={{ height: 56 }}
                    loading={isLoading}
                    onClick={handleContinue}
                >
                            Continue
                </Button>
                <Button
                    variant="outlined"
                    sx={{ height: 56 }}
                    onClick={handleCreateAccountNavigation}
                >
                    Create account
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
        </Stack>
    );
}
