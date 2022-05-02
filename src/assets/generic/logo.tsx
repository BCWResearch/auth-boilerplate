import BCWLogoLight from './bcw_logo_color.png';
import BCWLogoDark from './bcw_logo_white.png';
import atom from '@/atoms/atoms';
import { CenteredContext } from '@/components/layout';
import { styled } from '@mui/material/styles';
import {
    useContext,
    useEffect,
    useState
} from 'react';
import { useRecoilValue } from 'recoil';

const ImgLogo = styled(`img`)(({ theme }) => ({
    // flexGrow: 1,
    fontFamily: `Inter, -apple-system, Segoe UI, Helvetica, sans-serif`,
    objectFit: `contain`,
    paddingBottom: theme.spacing(4),
}));

export default function Logo ({ width, height }: { width?: number | string, height?: number | string }) {
    const {
        VITE_LOGO_LIGHT,
        VITE_LOGO_DARK
    } = import.meta.env;

    const darkMode = useRecoilValue(atom.darkMode);
    const isCentered = useContext(CenteredContext);

    const [ logo, setLogo ] = useState<string>(BCWLogoLight);

    useEffect(() => {
        const logoFromURL = darkMode ? VITE_LOGO_DARK : VITE_LOGO_LIGHT;

        if (logoFromURL) {
            setLogo(logoFromURL.toString());
            return;
        }

        setLogo(darkMode ? BCWLogoDark : BCWLogoLight);
    }, [ darkMode ]);

    return (
        <ImgLogo
            src={logo}
            alt="BCW Group"
            width={width ?? 150}
            height={height ?? `auto`}
            style={{ margin: isCentered ? `0 auto` : undefined }}
        />);
}
