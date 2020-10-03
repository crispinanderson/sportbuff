import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        form: {
            textAlign: 'left'
        },
        formLabel: {
            padding: '10px'
        },
        paper: {
            padding: '20px'
        },
        questionField: {
            padding: '10px',
            width: 'calc(100% - 40px)'
        },
        buttons: {
            width: '100%'
        },

    }),
);