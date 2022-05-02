import './App.css';
import SignIn from './SignIn';
import SignInPwd from './SignInPwd';
import SignUp from './SignUp';
import Logo from '@/assets/generic/logo';
import Layout from '@/components/layout';
import { Route, Routes } from 'react-router-dom';

function App () {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Layout
                        logo={<Logo />}
                        sx={{
                            card: {
                                minWidth: 350, maxWidth: 480
                            }
                        }}
                    />
                }
            >
                <Route index element={<SignIn />} />
                <Route path="signin" element={<SignIn />} />
                <Route path="signin/pwd" element={<SignInPwd />} />
                <Route path="signup" element={<SignUp />} />
            </Route>
        </Routes>
    );
}

export default App;

