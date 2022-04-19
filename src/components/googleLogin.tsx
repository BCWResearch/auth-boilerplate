import { useTheme } from "@mui/material/styles";
import React from "react";
import {
    GoogleLogin,
    GoogleLoginResponse,
    GoogleLoginResponseOffline
} from "react-google-login";

export default function GoogleLoginButton ({ isCompact }: { isCompact?: boolean }) {
    const theme = useTheme();
    
    const { VITE_GOOGLE_CLIENT_ID } = import.meta.env;

    async function transferLogin (code: string) {
        const headers = new Headers();
        headers.append(`Accept`, `application/json`);
        headers.append(`Content-Type`, `application/json`);
        
        const res = await fetch(`/transfer`, {
            body: JSON.stringify({ code }),
            headers,
            method: `POST`,
        });
        await res.text();

        if (res.ok) {
            // history.push(`/continue`);
            return true;
        }

        return false;
    }

    async function responseGoogle (response: GoogleLoginResponse | GoogleLoginResponseOffline) {
        if (response.code) {
            await transferLogin(response.code);
            return;
        }

        console.error(response ?? `Google SSO (npm:react-google-login) did not return a response.`);
    }

    return (
        VITE_GOOGLE_CLIENT_ID ?
            <GoogleLogin
                clientId={VITE_GOOGLE_CLIENT_ID}
                accessType="online"
                cookiePolicy={`single_host_origin`}
                buttonText={isCompact === undefined || !isCompact ? `Sign in with Google` : `Google` }
                theme={theme.palette.mode}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
            /> :
            <React.Fragment />
    );
}

