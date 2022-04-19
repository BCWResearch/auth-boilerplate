import atom from '@/atoms/atoms';
import Button from '@/components/button';
import { CenteredContext } from '@/components/layout';
import TextField from '@/components/textfield';
import useInterval from '@/hooks/useInterval';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React, {
    useContext,
    useEffect,
    useState
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

export default function RecoverPwd () {
    const navigate = useNavigate();
    const isCentered = useContext(CenteredContext);

    const [ isLoading, setIsLoading ] = useState(false);
    const [ password, setPassword] = useState(``);
    const [ confirmPassword, setConfirmPassword ] = useState(``);
    const [ errorMessage, setErrorMessage ] = useState({
        password: ``,
        confirmPassword: ``,
        general: ``,
    });
    const email = useRecoilValue(atom.email);

    const handleContinue = () => {
        setIsLoading(true);
        setErrorMessage({
            password: ``,
            confirmPassword: ``,
            general: ``
        });

        if (!password) {
            setErrorMessage((errorMessage) => ({
                ...errorMessage,
                password: `Please enter a new password.`
            }));
            return;
        }

        if (!confirmPassword) {
            setErrorMessage((errorMessage) => ({
                ...errorMessage,
                confirmPassword: `Please confirm your new password.`
            }));
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage((errorMessage) => ({
                ...errorMessage,
                general: `Your passwords do not match.`
            }));
            return;
        }

        /* TODO: Implement password reset api handler
         * Ensure that there is proper server-side password validation exists
         * since javascript can be easily disabled in the browser
         */


        // const isValidPassword = validatePassword(password);
        // console.log(`isValidPassword`, isValidPassword);

        // if (!isValidPassword) {
        //     setErrorMessage(`Please enter a valid password.`);
        //     return;
        // }

        // setIsLoading(false);
        // navigate(`/signin/pwd`);
    };

    // Remove upon proper handleContinue is implemented
    useInterval(
        () => {
            setIsLoading(false);
            navigate(`/signin`);
        },
        isLoading ? 1000 : null,
    );

    useEffect(() => {
        console.log(errorMessage);
    }, [errorMessage]);

    useEffect(() => {
        if (!email) {
            navigate(`/recover`, { replace: true });
        }
    }, [ email, navigate ]);

    return (
        <Stack spacing={4}>
            <Typography variant="h4" component="h1" textAlign={isCentered ? `center` : `left`}>
                Recover
            </Typography>
            <Stack spacing={2}>
                <TextField
                    error={errorMessage.password !== `` || errorMessage.general !== ``}
                    helperText={errorMessage.password}
                    label="Enter a new password"
                    variant="outlined"
                    value={password}
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                    error={errorMessage.password !== `` || errorMessage.confirmPassword !== `` || errorMessage.general !== ``}
                    helperText={errorMessage.confirmPassword}
                    label="Confirm your password"
                    variant="outlined"
                    value={confirmPassword}
                    type="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onKeyDownEnter={ handleContinue }
                />
            </Stack>
            <Stack spacing={2}>
                <Button
                    sx={{ height: 56 }}
                    loading={isLoading}
                    onClick={handleContinue}
                >
                    Submit
                </Button>
            </Stack>
        </Stack>
    );
}
