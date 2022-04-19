import { styled } from "@mui/material/styles";
import MuiTextField, { OutlinedTextFieldProps } from "@mui/material/TextField";


const StyledTextField = styled(MuiTextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': { borderRadius: 36 },
    '& .MuiOutlinedInput-input': { paddingLeft: theme.spacing(3) },
    '& .MuiInputLabel-root': { marginLeft: theme.spacing(1) },
    '& .MuiOutlinedInput-notchedOutline': { paddingLeft: theme.spacing(2) },
}));

interface Props extends OutlinedTextFieldProps {
    type?: React.HTMLInputTypeAttribute;
}

export default function TextField (props: Props) {
    const { type } = props;

    return (
        <>
            <StyledTextField
                {...props}
                type={type}
                variant="outlined"
            />
        </>);
}































