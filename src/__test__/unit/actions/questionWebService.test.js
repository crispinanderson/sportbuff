import { Types, getQuestionsRequest, getQuestionsSuccess, getQuestiondFailure, setQuestionEditedRequest, saveQuestionRequest, editQuestionRequest, deleteQuestionRequest } from '../../../redux/actions/questionwebservice'

describe('questionWebService- ', () => {
    describe('getQuestionsRequest: ', () => {
        test('calls correct action', () => {
            const expectedAction = Types.GET_QUESTIONS_REQUEST
            expect(getQuestionsRequest().type).toBe(expectedAction)
        })
        test('payload is undefined', () => {
            expect(getQuestionsRequest().payload).toBe(undefined)
        })
    })
    describe('getQuestionsSuccess: ', () => {
        test('calls correct action', () => {
            const expectedAction = Types.GET_QUESTIONS_SUCCESS
            expect(getQuestionsSuccess().type).toBe(expectedAction)
        })
        test('payload is passed', () => {
            const data = { someItem: true }
            expect(getQuestionsSuccess(data).payload).toEqual({ someItem: true })
        })
    })
    describe('getQuestionsFailure: ', () => {
        test('calls correct action', () => {
            const expectedAction = Types.GET_QUESTIONS_FAILURE
            expect(getQuestiondFailure().type).toBe(expectedAction)
        })
        test('payload is passed', () => {
            const data = { someItem: true }
            expect(getQuestiondFailure(data).payload).toEqual({ someItem: true })
        })
    })
    describe('deleteQuestionRequest: ', () => {
        test('calls correct action', () => {
            const expectedAction = Types.DELETE_QUESTION_REQUEST
            expect(deleteQuestionRequest().type).toBe(expectedAction)
        })
        test('payload is contains index', () => {
            expect(deleteQuestionRequest(1).payload).toEqual({ index: 1 })
        })
    })
    describe('editQuestionRequest: ', () => {
        test('calls correct action', () => {
            const expectedAction = Types.EDIT_QUESTION_REQUEST
            expect(editQuestionRequest().type).toBe(expectedAction)
        })
        test('payload is contains index', () => {
            expect(editQuestionRequest(1).payload).toEqual({ index: 1 })
        })
    })
    describe('saveQuestionRequest: ', () => {
        test('calls correct action', () => {
            const expectedAction = Types.SAVE_QUESTION_REQUEST
            expect(saveQuestionRequest().type).toBe(expectedAction)
        })
        test('payload is passed', () => {
            const data = { someItem: true }
            expect(saveQuestionRequest(1, data).payload).toEqual({ index: 1, data: { someItem: true } })
        })
    })
    describe('setQuestionEditedRequest: ', () => {
        test('calls correct action', () => {
            const expectedAction = Types.SET_QUESTION_EDITED_REQUEST
            expect(setQuestionEditedRequest().type).toBe(expectedAction)
        })
        test('payload is undefined', () => {
            expect(setQuestionEditedRequest().payload).toBe(undefined)
        })
    })


})
