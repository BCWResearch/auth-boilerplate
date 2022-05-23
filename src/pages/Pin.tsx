import Button from '@/components/button';
import { CenteredContext } from '@/components/layout';
import useInterval from '@/hooks/useInterval';
import { validateEmail } from '@/utils/validateEmail';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React, {
    useContext,
    useState
} from 'react';
import AuthCode from 'react-auth-code-input';
import { useNavigate } from 'react-router-dom';

;

export default function Pin ({ flow = `signin`, callback }: { flow:  `recover` | `signin`, callback?: string }) {
    const { VITE_APP_DESTINATION_ENDPOINT } = import.meta.env;

    const navigate = useNavigate();
    const isCentered = useContext(CenteredContext);

    const [ isLoading, setIsLoading ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState(``);
    const [ authCode, setAuthCode ] = useState(``);

    const handleContinue = () => {
        setIsLoading(true);
        setErrorMessage(``);

        if (!authCode) {
            setErrorMessage(`Enter the 2FA code ${flow === `signin` ? `from your authentication app` : `sent to your email`}.`);
            return;
        }

        const isValidEmail = validateEmail(authCode);
        console.log(`isValidEmail`, isValidEmail);

        if (!authCode) {
            setErrorMessage(`Please enter your 2FA code.`);
            return;
        }

        /* TODO: Implement 2fa api handler */

        // setIsLoading(false);
        // if (response.status === 404) {
        //     setAuthCode(``);
        //     setErrorMessage(`Please enter your 2FA again.`);
        // }

        navigate(callback ? (flow === `signin` ? VITE_APP_DESTINATION_ENDPOINT : `/recover)`): `/`);
    };

    const handleAuthCode = (res: string) => {
        setAuthCode(res);
    };

    const handleChipClick = () => {
        console.log(`handleChipClick`);
        return;
    };

    // Remove upon proper handleContinue is implemented
    useInterval(
        () => {
            setIsLoading(false);
        },
        isLoading ? 1000 : null);

    return (
        <Stack spacing={4}>
            <Stack spacing={2}>
                <Typography variant="h4" component="h1" textAlign={isCentered ? `center` : `left`}>
                    { flow === `signin` ? `Sign in` : `Recover` }
                </Typography>
                <Typography variant="body1" textAlign={isCentered ? `center` : `left`}>
                    { flow === `signin` ?
                        `Enter the sign-in 2FA code from your authenticator app.` :
                        `To help keep your account safe, we want to make sure that it’s really you.`
                    }
                </Typography>
            </Stack>
            <AuthCode
                allowedCharacters='numeric'
                isPassword={true}
                containerClassName='auth-container'
                inputClassName='input'
                onChange={handleAuthCode}
            />
            <Stack spacing={2} alignItems="center">
                <Button
                    fullWidth
                    sx={{ height: 56 }}
                    loading={isLoading}
                    onClick={handleContinue}
                >
                        Continue
                </Button>
                <Button
                    variant="text"
                    size="small"
                    color="inherit"
                    endIcon={<QuestionMarkIcon />}
                    onClick={handleChipClick}
                >
                    Help
                </Button>
            </Stack>
        </Stack>
    );
}

