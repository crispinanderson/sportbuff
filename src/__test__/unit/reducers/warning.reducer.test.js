import { warningReduxReducer as reducer } from '../../../redux/reducers/warning/warning.reducer';
import { Types } from '../../../redux/actions/warningservice';
import { mockWarning, warningInitialState } from '../../mocks/warning.mock';


describe('warning reducer - ', () => {
    it('should return the initial state', () => {
        //toMatchObject fails becaus of cancel.onClick function using toBe with JSON.stringify as equality validator
        expect(JSON.stringify(reducer(undefined, {}))).toBe(JSON.stringify(warningInitialState))
    })

    test('should handle SHOW_WARNING_REQUEST: ', () => {
        expect(JSON.stringify(reducer(undefined, {
            type: Types.SHOW_WARNING_REQUEST,
            payload: mockWarning
        })
        )).toBe(JSON.stringify({ ...warningInitialState, ...mockWarning, open: true }))
    })

    test('should handle CANCEL_WARNING_REQUEST: ', () => {
        expect(JSON.stringify(reducer({ ...warningInitialState, ...mockWarning, open: true }, {
            type: Types.CANCEL_WARNING_REQUEST
        })
        )).toBe(JSON.stringify(warningInitialState))
    })

    test('should handle CONTINUE_WARNING_REQUEST: ', () => {
        expect(JSON.stringify(reducer({ ...warningInitialState, ...mockWarning, open: true }, {
            type: Types.CONTINUE_WARNING_REQUEST
        })
        )).toBe(JSON.stringify(warningInitialState))
    })

})