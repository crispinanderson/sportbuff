
export const mockWarning = {
    title: 'Warning title',
    text: 'warning text',
    continue: {
        text: 'apply',
        onClick: () => { }
    }
}

export const warningInitialState = {
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