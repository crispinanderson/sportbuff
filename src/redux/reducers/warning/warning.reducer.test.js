import { warningReduxReducer as reducer } from './warning.reducer';
import { Types } from '../../actions/warningservice';
import { warningMockRequestData, initialState } from './warning.mocks';


describe('warning reducer - ', () => {
    it('should return the initial state', () => {
        //toMatchObject fails becaus of cancel.onClick function using toBe with JSON.stringify as equality validator
        expect(JSON.stringify(reducer(undefined, {}))).toBe(JSON.stringify(initialState))
    })

    test('should handle SHOW_WARNING_REQUEST: ', () => {
        expect(JSON.stringify(reducer(undefined, {
            type: Types.SHOW_WARNING_REQUEST,
            payload: warningMockRequestData
        })
        )).toBe(JSON.stringify({ ...initialState, ...warningMockRequestData, open: true }))
    })

    test('should handle CANCEL_WARNING_REQUEST: ', () => {
        expect(JSON.stringify(reducer({ ...initialState, ...warningMockRequestData, open: true }, {
            type: Types.CANCEL_WARNING_REQUEST
        })
        )).toBe(JSON.stringify(initialState))
    })

    test('should handle CONTINUE_WARNING_REQUEST: ', () => {
        expect(JSON.stringify(reducer({ ...initialState, ...warningMockRequestData, open: true }, {
            type: Types.CONTINUE_WARNING_REQUEST
        })
        )).toBe(JSON.stringify(initialState))
    })

})