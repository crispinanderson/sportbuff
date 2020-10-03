
import * as warningService from '../actions/warningservice';

interface WarningButtonState {
    onClick: () => any | null,
    text: string | null,
    disable: boolean | null,
}

export interface WarningState {
    open: boolean,
    title: string | null,
    text: string | null,
    continue: WarningButtonState,
    cancel: WarningButtonState
}

const initialState: WarningState = {
    open: false,
    title: null,
    text: null,
    continue: {
        onClick: () => { },
        text: null,
        disable: false
    },
    cancel: {
        onClick: () => { },
        text: null,
        disable: false
    },
};

export function warningReduxReducer(state = initialState, action) {

    switch (action.type) {
        case warningService.Types.SHOW_WARNING_REQUEST:
            return {
                ...state,
                open: true,
                ...action.payload,
                continue: {
                    ...state.continue,
                    ...action.payload.continue
                },
                cancel: {
                    ...state.cancel,
                    ...action.payload.cancel
                }
            };

        case warningService.Types.CANCEL_WARNING_REQUEST:
        case warningService.Types.CONTINUE_WARNING_REQUEST:
            return {
                ...initialState
            }

        default: return state;
    }
}