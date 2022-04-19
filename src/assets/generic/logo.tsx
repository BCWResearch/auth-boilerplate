import BCWLogoLight from './bcw_logo_color.png';
import BCWLogoDark from './bcw_logo_white.png';
import atom from '@/atoms/atoms';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

const ImgLogo = styled(`img`)(() => ({
    // flexGrow: 1,
    fontFamily: `Inter, -apple-system, Segoe UI, Helvetica, sans-serif`,
    objectFit: `contain`,
}));

export default function Logo ({ height }: { height?: number | string}) {
    const darkMode = useRecoilValue(atom.darkMode);
    const {
        VITE_LOGO_LIGHT,
        VITE_LOGO_DARK
    } = import.meta.env;

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
            height={ height ?? 40 }
        />
    );
}

