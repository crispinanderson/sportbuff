
export const mockWarning = {
    title: 'Warning title',
    text: 'warning text',
    continue: {
        text: 'apply',
        onClick: () => { }
    }
}

export const initialState = {
    open: false,
    title: null,
    text: null,
    continue: {
        onClick: null,
        text: null,
    },
    cancel: {
        onClick: () => { },
        text: null
    },
}