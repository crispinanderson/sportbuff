import React from 'react';
import { render, fireEvent, screen } from '../../test-utils';
import QuestionEditorForm from '../../../components/QuestionEditor/components/QuestionEditorForm/QuestionEditorForm';
import { mockQuizState } from '../../mocks/quiz.mock';

// --> DISPATCHES & VALIDATION NEED TO BE IN INTEGRATION TESTS AS TIED TO WARNINGS DIALOG <--

describe('QuestionEditorForm - ', () => {

    const { withEdit } = mockQuizState;

    test('Renders the neccesary components', () => {

        render(<QuestionEditorForm />, { initialState: { quiz: withEdit } })

        expect(screen.getByTestId('editor-wrapper')).toBeInTheDocument()
        expect(screen.getByTestId('editor-question-label')).toBeInTheDocument()
        expect(screen.getByTestId('editor-question-input')).toBeInTheDocument()
        expect(screen.getByTestId('editor-answers-label')).toBeInTheDocument()
        expect(screen.getAllByTestId('editor-answer-input').length).toBe(withEdit.edit.incorrect_answers.length + 1)
        expect(screen.getAllByTestId('editor-correct-checkbox').length).toBe(withEdit.edit.incorrect_answers.length + 1)
        expect(screen.getAllByTestId('editor-answers-delete-button').length).toBe(withEdit.edit.incorrect_answers.length + 1)
        expect(screen.getByTestId('editor-answers-add-button')).toBeInTheDocument()
        expect(screen.getByTestId('editor-save-button')).toBeInTheDocument()
        expect(screen.getByTestId('editor-undo-button')).toBeInTheDocument()
    })

    test('Question data is displayed in editor-question-input', () => {
        render(<QuestionEditorForm />, { initialState: { quiz: withEdit } })

        //material ui wraps text several elements deep so seacrh that the string appears within the inner html
        expect(screen.getByTestId('editor-question-input').innerHTML.includes(withEdit.edit.question)).toBe(true)
    })

    test('Answer data is displayed in editor-answer-input[s]', () => {
        render(<QuestionEditorForm />, { initialState: { quiz: withEdit } })

        const answerInputs = screen.getAllByTestId('editor-answer-input');
        let answers = [withEdit.edit.correct_answer, ...withEdit.edit.incorrect_answers];
        let foundAnswers = 0;

        answerInputs.forEach((input, i) => {
            if (input.innerHTML.includes(answers[i]))++foundAnswers
        })
        expect(foundAnswers).toBe(withEdit.edit.incorrect_answers.length + 1)
    })

    //Brittle test should look at better way to test
    test('Only one answer can be correct', () => {
        render(<QuestionEditorForm />, { initialState: { quiz: withEdit } })

        const answerCheckboxes = screen.getAllByTestId('editor-correct-checkbox');

        const numCorrect = answerCheckboxes.filter((elem, i) => {
            return Array.from(elem.classList).includes('Mui-checked')
        }).length;

        expect(numCorrect).toBe(1)
    })

    test('Only one answer can be correct - after select correct and clicked item to have Mui-checked class', () => {
        render(<QuestionEditorForm />, { initialState: { quiz: withEdit } })

        const answerCheckboxes = () => screen.getAllByTestId('editor-correct-checkbox');
        fireEvent.click(answerCheckboxes()[1]);

        const numCorrect = answerCheckboxes().filter((elem, i) => {
            return Array.from(elem.classList).includes('Mui-checked')
        }).length;

        expect(numCorrect).toBe(1)
        expect(Array.from(answerCheckboxes()[1].classList).includes('Mui-checked')).toBe(true)
    })

    test('save and undo buttons are disabled when edit.edited = false', () => {
        render(<QuestionEditorForm />, {
            initialState: {
                quiz: {
                    ...withEdit,
                    edit: {
                        ...withEdit.edit,
                        edited: false
                    }
                }
            }
        })
        const saveClasslist = Array.from(screen.getByTestId('editor-save-button').classList);
        const undoClasslist = Array.from(screen.getByTestId('editor-undo-button').classList);
        expect(saveClasslist.includes('Mui-disabled')).toBe(true);
        expect(undoClasslist.includes('Mui-disabled')).toBe(true);
    })

    test('save and undo buttons are enabled when edit.edited = true', () => {
        render(<QuestionEditorForm />, { initialState: { quiz: withEdit } })
        const saveClasslist = Array.from(screen.getByTestId('editor-save-button').classList);
        const undoClasslist = Array.from(screen.getByTestId('editor-undo-button').classList);
        expect(saveClasslist.includes('Mui-disabled')).toBe(false);
        expect(undoClasslist.includes('Mui-disabled')).toBe(false);
    })


    test('add button is not rendered when answers.length = 5', () => {
        render(<QuestionEditorForm />, {
            initialState: {
                quiz: {
                    ...withEdit,
                    edit: {
                        ...withEdit.edit,
                        incorrect_answers: [...withEdit.edit.incorrect_answers, '5th answer']
                    }
                }
            }
        })

        expect(screen.queryByTestId('editor-answers-add-button')).toBe(null);
    })

    test('answers delete buttons are disabled when answers.length = 2', () => {
        render(<QuestionEditorForm />, {
            initialState: {
                quiz: {
                    ...withEdit,
                    edit: {
                        ...withEdit.edit,
                        incorrect_answers: ['incorrect']
                    }
                }
            }
        })

        const btns = screen.getAllByTestId('editor-answers-delete-button');
        Array.from(btns).forEach((btn) => {
            const classlist = Array.from(btn.classList)
            expect(classlist.includes('Mui-disabled')).toBe(true);
        })

    })
})

