import BCWLogoLight from '@/assets/generic/bcw_logo_color.png';
import atom from '@/atoms/atoms';
import Overrides from '@/theme/overrides';
import Palette from '@/theme/palette';
import Typography from '@/theme/typography';
import {
    createTheme,
    responsiveFontSizes,
    StyledEngineProvider,
    ThemeProvider as MuiThemeProvider
} from '@mui/material/styles';
import { usePalette } from '@universemc/react-palette';
import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';

export default function ThemeProvider ({ children }: { children: JSX.Element }) {
    const darkMode = useRecoilValue(atom.darkMode);
    const { VITE_LOGO_LIGHT } = import.meta.env;

    const imageUrl = VITE_LOGO_LIGHT ?? BCWLogoLight;
    
    const { data } = usePalette(VITE_LOGO_LIGHT ? `https://cors-anywhere.herokuapp.com/${imageUrl}` : BCWLogoLight);

    const theme = useMemo(() => {
        const shape = { borderRadius: 12 };
        
        const basicTheme = createTheme({
            components: Overrides(darkMode),
            palette: Palette(data, darkMode),
            shape,
            typography: Typography()
        });
        
        return responsiveFontSizes(basicTheme);
    }, [data, darkMode]);

    return (
        <StyledEngineProvider injectFirst>
            <MuiThemeProvider theme={theme}>
                {children}
            </MuiThemeProvider>
        </StyledEngineProvider>);
}































