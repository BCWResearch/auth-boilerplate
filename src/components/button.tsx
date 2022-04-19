import LoadingButton, { LoadingButtonProps } from "@mui/lab/LoadingButton";

export default function Button (props: LoadingButtonProps) {

    return (
        <LoadingButton
            size={props.size ?? `large`}
            variant="contained"
            sx={{
                borderRadius: 36,
                boxShadow: `unset`,
                fontWeight: 600,
                textTransform: `capitalize`,
            }}
            {...props}
        >
            {props.children}
        </LoadingButton>
    );
}
