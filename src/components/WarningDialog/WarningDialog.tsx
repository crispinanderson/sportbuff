import React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import { connect } from 'react-redux';
import { continueWarningRequest, cancelWarningRequest } from '../../redux/actions/warningservice';


const WarningDialog = ({ dispatch, warning }) => {

    const handleContinue = () => {
        warning.continue.onClick();
        dispatch(continueWarningRequest);
    }
    const handleCancel = () => {
        warning.cancel.onClick();
        dispatch(cancelWarningRequest);
    }

    return (
        <>
            <Dialog open={warning.open} >
                <DialogTitle>{warning.title || ''}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {warning.text}
                    </DialogContentText>
                    {warning.content}
                </DialogContent>
                <DialogActions>
                    {warning.continue.onClick && <Button disabled={warning.continue.disable} onClick={handleContinue} > {warning.continue.text || 'Continue'}</Button>}
                    {warning.cancel.onClick && <Button disabled={warning.cancel.disable} onClick={handleCancel} > {warning.cancel.text || 'Cancel'}</Button>}
                </DialogActions>
            </Dialog>
        </>
    )

}

function mapStateToProps(state: any) {
    return { warning: state.warning };
}

export default connect(mapStateToProps)(WarningDialog)