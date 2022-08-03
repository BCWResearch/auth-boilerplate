import ThemeToggle from "./themeToggle/themeToggle";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import {
    Breakpoint,
    styled,
    SxProps,
    Theme,
    useTheme
} from "@mui/material/styles";
import React, { createContext } from "react";
import { Outlet } from "react-router-dom";

const Background = styled(`div`)(({ theme }) => ({
    position: `fixed`,
    top: `-20%`,
    left: 0,
    pointerEvents: `none`,
    width: `100%`,
    height: `120%`,
    background: `radial-gradient(circle, rgba(45,132,235,0.2) 0%, rgba(255,255,255,0.1) 100%)`,
    zIndex: -2,
    ...(theme.palette.mode === `light` && { backgroundColor: `rgba(247,248,250, 1)`, }),
    ...(theme.palette.mode === `dark` && { backgroundColor: `rgba(0,0,0, 1)`, }),
}));

export const CenteredContext = createContext<boolean>(false);

interface IUseSSOContext {
    useMicrosoft: boolean;
    useGoogle: boolean;
}
export const UseSSOContext = createContext<IUseSSOContext>({
    useMicrosoft: false,
    useGoogle: false,
});

interface Props {
    centered?: boolean;
    children?: React.ReactNode;
    maxWidth?: false | Breakpoint;
    logo?: string | JSX.Element;
    sx?: {
        pageWrap?: SxProps<Theme>;
        card?: SxProps<Theme>;
    }
    useSSO?: {
        ms?: boolean;
        google?: boolean;
    }
}

export default function Layout (props: Props) {
    const {
        centered,
        children,
        maxWidth,
        logo,
        sx,
        useSSO,
    } = props;

    const theme = useTheme();
    const isCentered = centered ?? false;
    const useMicrosoft = useSSO?.ms ? useSSO.ms : false;
    const useGoogle = useSSO?.google ? useSSO.google : false;

    return (
        <Stack
            justifyContent={`space-around`}
            sx={{
                height: `100vh`,
                ...sx?.pageWrap
            }}
        >
            <CenteredContext.Provider value={isCentered}>
                <UseSSOContext.Provider
                    value={{
                        useMicrosoft,
                        useGoogle
                    }}
                >
                    <Container maxWidth={maxWidth ?? false} sx={{ ...sx?.card }}>
                        <Card variant="outlined" sx={{ borderRadius: `12px` }}>
                            <CardContent sx={{ p: `${theme.spacing(6, 5)} !important` }}>
                                <Stack spacing={1}>
                                    { logo }
                                    <Outlet />
                                </Stack>
                            </CardContent>
                        </Card>
                        <Stack
                            direction="row"
                            justifyContent={`flex-end`}
                            sx={{ p: theme.spacing(1, 0) }}
                        >
                            <ThemeToggle />
                        </Stack>
                    </Container>
                    {/* <Background /> */}
                </UseSSOContext.Provider>
            </CenteredContext.Provider>
        </Stack>
    );
}
