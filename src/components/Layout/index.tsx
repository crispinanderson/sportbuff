import React from 'react';
import { Grid } from '@material-ui/core';
import QuestionsList from '../QuestionList'
import QuestionEditor from '../QuestionEditor';
import WarningDialog from '../WarningDialog/WarningDialog';



function Layout() {

    return (
        <>
            <Grid container spacing={1}>
                <QuestionEditor />
                <QuestionsList />
            </Grid>
            <WarningDialog />
        </>
    );
}

export default Layout;
