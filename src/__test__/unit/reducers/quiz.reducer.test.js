import { questionReduxReducer as reducer } from '../../../redux/reducers/quiz/quiz.reducer'
import { Types } from '../../../redux/actions/questionwebservice';
import { mockQuizState } from '../../mocks/quiz.mock';
import { mockApiResponse } from '../../mocks/api.mock'


describe('quiz reducer - ', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            questions: [],
            edit: null
        })
    })

    describe('should handle GET_QUESTIONS_SUCCESS: ', () => {

        test('when state is initialQuizState', () => {
            expect(
                reducer(undefined, {
                    type: Types.GET_QUESTIONS_SUCCESS,
                    payload: mockApiResponse
                })
            ).toMatchObject(
                {
                    edit: null,
                    questions: [{
                        category: "Sports",
                        correct_answer: "Philadelphia Flyers",
                        difficulty: "medium",
                        incorrect_answers: ["New York Rangers", "Toronto Maple Leafs", "Boston Bruins"],
                        question: "Which of these teams is a member of the NHL era?",
                        type: "multiple",
                    }]
                }
            )
        })

        test('when state is pre-filled, with edit', () => {
            expect(
                reducer(mockQuizState.withEdit, {
                    type: Types.GET_QUESTIONS_SUCCESS,
                    payload: mockApiResponse
                })
            ).toMatchObject(
                {
                    ...mockQuizState.withEdit,
                    questions: [
                        {
                            category: "Sports",
                            correct_answer: "Philadelphia Flyers",
                            difficulty: "medium",
                            incorrect_answers: ["New York Rangers", "Toronto Maple Leafs", "Boston Bruins"],
                            question: "Which of these teams is a member of the NHL era?",
                            type: "multiple",
                        },
                        ...mockQuizState.withEdit.questions,
                    ]
                }
            )
        })

        test('when state is pre-filled, null edit', () => {
            expect(
                reducer(mockQuizState.withoutEdit, {
                    type: Types.GET_QUESTIONS_SUCCESS,
                    payload: mockApiResponse
                })
            ).toMatchObject(
                {
                    ...mockQuizState.withoutEdit,
                    questions: [
                        {
                            category: "Sports",
                            correct_answer: "Philadelphia Flyers",
                            difficulty: "medium",
                            incorrect_answers: ["New York Rangers", "Toronto Maple Leafs", "Boston Bruins"],
                            question: "Which of these teams is a member of the NHL era?",
                            type: "multiple",
                        },
                        ...mockQuizState.withoutEdit.questions,
                    ]
                }
            )
        })
    })



    describe('should handle DELETE_QUESTION_REQUEST: ', () => {
        test('when state is pre-filled, delete item at index 0', () => {
            expect(
                reducer(mockQuizState.withEdit, {
                    type: Types.DELETE_QUESTION_REQUEST,
                    payload: { index: 0 }
                })
            ).toMatchObject(
                {
                    ...mockQuizState.withEdit,
                    questions: [
                        {
                            category: "Random",
                            correct_answer: "Some Answer",
                            difficulty: "medium",
                            incorrect_answers: ["No answer", "Don't know", "Fred Flintstone"],
                            question: "What is the answer to some question?",
                            type: "multiple",
                        }
                    ]
                }
            )
        })
        test('when state is pre-filled, delete item at index 1', () => {
            expect(
                reducer(mockQuizState.withEdit, {
                    type: Types.DELETE_QUESTION_REQUEST,
                    payload: { index: 1 }
                })
            ).toMatchObject(
                {
                    ...mockQuizState.withEdit,
                    questions: [
                        {
                            category: "Sports",
                            correct_answer: "Philadelphia Flyers",
                            difficulty: "medium",
                            incorrect_answers: ["New York Rangers", "Toronto Maple Leafs", "Boston Bruins"],
                            question: "Which of these teams is a member of the NHL era?",
                            type: "multiple",
                        }
                    ]
                }
            )
        })
    })

    describe('should handle EDIT_QUESTION_REQUEST: ', () => {
        test('when state has null edit, edit item at index 0', () => {
            expect(
                reducer(mockQuizState.withoutEdit, {
                    type: Types.EDIT_QUESTION_REQUEST,
                    payload: { index: 0 }
                })
            ).toMatchObject(
                {
                    ...mockQuizState.withoutEdit,
                    edit: {
                        category: "Sports",
                        correct_answer: "Philadelphia Flyers",
                        difficulty: "medium",
                        edited: false,
                        incorrect_answers: ["New York Rangers", "Toronto Maple Leafs", "Boston Bruins"],
                        index: 0,
                        question: "Which of these teams is a member of the NHL era?",
                        type: "multiple"
                    }
                }
            )
        })
        test('when state is pre-filled, edit item at index 1', () => {
            expect(
                reducer(mockQuizState.withEdit, {
                    type: Types.EDIT_QUESTION_REQUEST,
                    payload: { index: 1 }
                })
            ).toMatchObject(
                {
                    ...mockQuizState.withEdit,
                    edit: {
                        index: 1,
                        edited: false,
                        category: "Random",
                        correct_answer: "Some Answer",
                        difficulty: "medium",
                        incorrect_answers: ["No answer", "Don't know", "Fred Flintstone"],
                        question: "What is the answer to some question?",
                        type: "multiple",
                    }
                }
            )
        })
    })

    describe('should handle SAVE_QUESTION_REQUEST: ', () => {
        test('when state is mockQuizState.withEdit', () => {
            expect(
                reducer(mockQuizState.withEdit, {
                    type: Types.SAVE_QUESTION_REQUEST,
                    payload: { index: 0, data: { ...mockQuizState.withEdit.edit } }
                })
            ).toMatchObject(
                {
                    questions: [
                        {
                            category: "Sports",
                            correct_answer: "The Philadelphia Flyers",
                            difficulty: "medium",
                            incorrect_answers: ["New York Rangers", "Toronto Maple Leafs", "Boston Bruins"],
                            question: "Which of these teams is a member of the NHL era?",
                            type: "multiple",
                        },
                        {
                            category: "Random",
                            correct_answer: "Some Answer",
                            difficulty: "medium",
                            incorrect_answers: ["No answer", "Don't know", "Fred Flintstone"],
                            question: "What is the answer to some question?",
                            type: "multiple",
                        }
                    ],
                    edit: {
                        category: "Sports",
                        correct_answer: "The Philadelphia Flyers",
                        difficulty: "medium",
                        edited: false,
                        incorrect_answers: ["New York Rangers", "Toronto Maple Leafs", "Boston Bruins"],
                        index: 0,
                        question: "Which of these teams is a member of the NHL era?",
                        type: "multiple"
                    }
                }
            )
        })
    })

    describe('should handle SET_QUESTION_EDITED_REQUEST', () => {
        expect(
            reducer({
                ...mockQuizState.withEdit,
                edit: {
                    ...mockQuizState.withEdit.edit,
                    edited: false
                }
            }, {
                    type: Types.SET_QUESTION_EDITED_REQUEST
                })
        ).toMatchObject(
            {
                ...mockQuizState.withEdit,
                edit: {
                    ...mockQuizState.withEdit.edit,
                    edited: true
                }
            }
        )
    })

})