import './App.css';
import Logo from '@/assets/generic/logo';
import Button from '@/components/button';
import GoogleLoginButton from '@/components/googleLogin';
import Layout from '@/components/layout';
import MicrosoftLoginButton from '@/components/microsoftLogin/microsoftLogin';
import OrDivider from '@/components/orDivider';
import TextField from '@/components/textfield';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

function App () {
    return (
        <Layout
            logo={<Logo />}
            sx={{
                card: {
                    minWidth: 350,
                    maxWidth: 480,
                }
            }}
        >
            <Stack spacing={3}>
                <Typography variant="h6" component="h1" textAlign={`center`}>
                    Sign Up
                </Typography>
                <Stack spacing={1}>
                    <TextField label="Email" variant="outlined" />
                    <TextField label="Password" type="password" variant="outlined" />
                </Stack>
                <Button>
                    Submit
                </Button>
                <OrDivider />
                <Stack alignItems={`center`} spacing={2}>
                    <MicrosoftLoginButton />
                    <GoogleLoginButton />
                </Stack>
                <Stack direction="row" justifyContent={`space-between`}>
                    <Link
                        href="#"
                        variant="subtitle2"
                    >
                        Forgot Password?
                    </Link>
                    <Link
                        href="#"
                        variant="subtitle2"
                    >
                        Sign In
                    </Link>
                </Stack>
            </Stack>
        </Layout>
    );
}

export default App;

