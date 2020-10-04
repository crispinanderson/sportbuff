import { questionReduxReducer as reducer } from './quiz.reducer'
import { Types } from '../../actions/questionwebservice';
import { mockStateWithEdit, mockApiResponse, mockStateNullEdit } from './quiz.reducer.mocks';


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
                reducer(mockStateWithEdit, {
                    type: Types.GET_QUESTIONS_SUCCESS,
                    payload: mockApiResponse
                })
            ).toMatchObject(
                {
                    ...mockStateWithEdit,
                    questions: [
                        {
                            category: "Sports",
                            correct_answer: "Philadelphia Flyers",
                            difficulty: "medium",
                            incorrect_answers: ["New York Rangers", "Toronto Maple Leafs", "Boston Bruins"],
                            question: "Which of these teams is a member of the NHL era?",
                            type: "multiple",
                        },
                        ...mockStateWithEdit.questions,
                    ]
                }
            )
        })

        test('when state is pre-filled, null edit', () => {
            expect(
                reducer(mockStateNullEdit, {
                    type: Types.GET_QUESTIONS_SUCCESS,
                    payload: mockApiResponse
                })
            ).toMatchObject(
                {
                    ...mockStateNullEdit,
                    questions: [
                        {
                            category: "Sports",
                            correct_answer: "Philadelphia Flyers",
                            difficulty: "medium",
                            incorrect_answers: ["New York Rangers", "Toronto Maple Leafs", "Boston Bruins"],
                            question: "Which of these teams is a member of the NHL era?",
                            type: "multiple",
                        },
                        ...mockStateNullEdit.questions,
                    ]
                }
            )
        })
    })



    describe('should handle DELETE_QUESTION_REQUEST: ', () => {
        test('when state is pre-filled, delete item at index 0', () => {
            expect(
                reducer(mockStateWithEdit, {
                    type: Types.DELETE_QUESTION_REQUEST,
                    payload: { index: 0 }
                })
            ).toMatchObject(
                {
                    ...mockStateWithEdit,
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
                reducer(mockStateWithEdit, {
                    type: Types.DELETE_QUESTION_REQUEST,
                    payload: { index: 1 }
                })
            ).toMatchObject(
                {
                    ...mockStateWithEdit,
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
                reducer(mockStateNullEdit, {
                    type: Types.EDIT_QUESTION_REQUEST,
                    payload: { index: 0 }
                })
            ).toMatchObject(
                {
                    ...mockStateNullEdit,
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
                reducer(mockStateWithEdit, {
                    type: Types.EDIT_QUESTION_REQUEST,
                    payload: { index: 1 }
                })
            ).toMatchObject(
                {
                    ...mockStateWithEdit,
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
        test('when state is mockStateWithEdit', () => {
            expect(
                reducer(mockStateWithEdit, {
                    type: Types.SAVE_QUESTION_REQUEST,
                    payload: { index: 0, data: { ...mockStateWithEdit.edit } }
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
                ...mockStateWithEdit,
                edit: {
                    ...mockStateWithEdit.edit,
                    edited: false
                }
            }, {
                    type: Types.SET_QUESTION_EDITED_REQUEST
                })
        ).toMatchObject(
            {
                ...mockStateWithEdit,
                edit: {
                    ...mockStateWithEdit.edit,
                    edited: true
                }
            }
        )
    })

})