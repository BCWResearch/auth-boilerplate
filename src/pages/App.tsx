import './App.css';
import Pin from './Pin';
import Recover from './Recover';
import RecoverPwd from './RecoverPwd';
import SignIn from './SignIn';
import SignInPwd from './SignInPwd';
import SignUp from './SignUp';
import Logo from '@/assets/generic/logo';
import Layout from '@/components/layout';
import {
    Route,
    Routes,
    useLocation
} from 'react-router-dom';

const WIDTH: Record<string, { minWidth: number, maxWidth: number }> = {
    default: {
        minWidth: 350, maxWidth: 480
    },
    "/pin": {
        minWidth: 400, maxWidth: 600
    },
};

export default function App () {
    const { pathname } = useLocation();
    console.log(pathname);
    console.log(WIDTH[pathname]);

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Layout
                        logo={<Logo />}
                        sx={{ card: WIDTH[pathname] ?? WIDTH.default }}
                    />
                }
            >
                <Route index element={<SignIn />} />
                <Route path="signin" element={<SignIn />} />
                <Route path="signin/pwd" element={<SignInPwd />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="recover" element={<Recover />} />
                <Route path="recover/pwd" element={<RecoverPwd />} />
                <Route path="pin" element={<Pin />} />
            </Route>
        </Routes>
    );
}
