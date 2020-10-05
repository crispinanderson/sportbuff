import React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import { connect } from 'react-redux';
import { continueWarningRequest, cancelWarningRequest } from '../../redux/actions/warningservice';


const WarningDialog = ({ dispatch, warning }) => {

    const handleContinue = () => {
        warning.continue.onClick();
        dispatch(continueWarningRequest());
    }
    const handleCancel = () => {
        warning.cancel.onClick();
        dispatch(cancelWarningRequest());
    }

    return (
        <>
            <Dialog open={warning.open} data-testid={'warning-wrapper'}>
                <DialogTitle data-testid={'warning-title'}>{warning.title || ''}</DialogTitle>
                <DialogContent data-testid={'warning-content'}>
                    {warning.text &&
                        <>
                            {warning.text.split('\n').map((entry, i) => {
                                return <DialogContentText key={'dialog_content_text_' + i} data-testid={'warning-text'}>
                                    {entry}
                                </DialogContentText>
                            })}
                        </>}

                    {warning.content}
                </DialogContent>
                <DialogActions>
                    <Button disabled={warning.cancel.disable} onClick={handleCancel} data-testid={'warning-cancel-button'}> {warning.cancel.text || 'Cancel'}</Button>
                    {warning.continue.onClick && <Button disabled={warning.continue.disable} onClick={handleContinue} data-testid={'warning-continue-button'}> {warning.continue.text || 'Continue'}</Button>}
                </DialogActions>
            </Dialog>
        </>
    )

}

function mapStateToProps(state: any) {
    return { warning: state.warning };
}

export default connect(mapStateToProps)(WarningDialog)