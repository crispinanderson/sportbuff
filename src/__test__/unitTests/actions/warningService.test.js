import { Types, showWarningRequest, continueWarningRequest, cancelWarningRequest } from '../../../redux/actions/warningservice'
const data = { title: 'warning title' }

describe('warningService- ', () => {
    describe('showWarningRequest: ', () => {
        test('calls correct action', () => {
            const expectedAction = Types.SHOW_WARNING_REQUEST
            expect(showWarningRequest(data).type).toBe(expectedAction)
        })
        test('payload is passed', () => {
            expect(showWarningRequest(data).payload).toEqual(data)
        })
    })

    describe('continueWarningRequest: ', () => {
        test('calls correct action', () => {
            const expectedAction = Types.CONTINUE_WARNING_REQUEST
            expect(continueWarningRequest(data).type).toBe(expectedAction)
        })
        test('payload is undefined', () => {
            expect(continueWarningRequest(data).payload).toBe(undefined)
        })
    })

    describe('cancelWarningRequest: ', () => {
        test('calls correct action', () => {
            const expectedAction = Types.CANCEL_WARNING_REQUEST
            expect(cancelWarningRequest(data).type).toBe(expectedAction)
        })
        test('payload is undefined', () => {
            expect(cancelWarningRequest(data).payload).toBe(undefined)
        })
    })


})
