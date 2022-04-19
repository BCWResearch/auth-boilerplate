import atoms from "@/atoms/atoms";
import { User } from "@microsoft/microsoft-graph-types";
import {
    AuthError,
    AuthResponse,
    UserAgentApplication
} from "msal";
import React, { useEffect } from "react";
import MicrosoftLogin from "react-microsoft-login";
import {
    atom,
    useRecoilState,
    useRecoilValue
} from "recoil";

export const msalState = atom<UserAgentApplication | undefined>({
    key: `MsalState`,
    default: undefined,
});

export default function MicrosoftLoginButton ({ isCompact }: { isCompact?: boolean }) {
    const darkMode = useRecoilValue(atoms.darkMode);
    const [ msalInstance, setMsalInstance ] = useRecoilState(msalState);
    
    const { VITE_MS_CLIENT_ID } = import.meta.env;

    useEffect(() => {
        const transferLogin = async () => {
            const headers = new Headers();
            headers.append(`Accept`, `application/json`);
            headers.append(`Content-Type`, `application/json`);
            
            const res = await fetch(`/transfer`, {
                body: JSON.stringify({ msalInstance }),
                headers,
                method: `POST`,
            });
            await res.text();

            if (res.ok) {
                // history.push(`/continue`);
                return true;
            }
    
            return false;
        };

        if (msalInstance) {
            if (msalInstance.getAccount() !== null)
                transferLogin();
        } else {
            console.log(`MS SSO (npm:react-microsoft-login): no accounts found.`);
        }
    }, [ msalInstance ]);

    function responseMicrosoft (error: AuthError | null, authData?: AuthResponse | (AuthResponse & User), instance?: UserAgentApplication) {
        console.log(error, authData, instance);

        if (!error && authData && instance) {
            setMsalInstance(instance);
            return;
        }

        console.error(error || `MS SSO (npm:react-microsoft-login) did not return a response.`);
    }

    return VITE_MS_CLIENT_ID ?
        <MicrosoftLogin
            clientId={VITE_MS_CLIENT_ID}
            buttonTheme={darkMode ? `dark${isCompact ? `_short` : ``}` : `light${isCompact ? `_short` : ``}`}
            authCallback={responseMicrosoft}
        /> :
        <React.Fragment />;
}































































