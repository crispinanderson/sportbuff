import React, { useState, useEffect } from 'react';
import { saveQuestionRequest, setQuestionEditedRequest, editQuestionRequest } from '../../../../redux/actions/questionwebservice';
import { showWarningRequest } from '../../../../redux/actions/warningservice';

export const Controller = ({ ViewComponent, edit, dispatch }) => {

    const initAnswers = () => [
        edit.correct_answer,
        ...edit.incorrect_answers.map((a) => a)
    ];

    const [answers, setAnswers] = useState(initAnswers());
    const handleAnswer = (index, value) => {
        if (!edit.edited) dispatch(setQuestionEditedRequest())
        setAnswers(answers.map((answer, i) => i === index ? value : answer))
    }

    const initCorrect = () => [true, ...Array(edit.incorrect_answers.length).fill(false)]
    const [correct, setCorrect] = useState(initCorrect());
    const handleCheckboxes = (i) => {

        /* !! NOTE !! 
        Checkboxes can only ever have one correct answer 
        The spec asks for a min. one correct one incorrect answer 
        but the api probably doesnt support multiple correct answers.
        since we receive a single correct_answer and an array of incorrect_answers */

        setCorrect(correct.map((v, index) => index === i));
        if (!edit.edited) dispatch(setQuestionEditedRequest())
    };

    const [question, setQuestion] = useState(edit.question);
    const handleQuestion = ({ target }) => {
        if (!edit.edited) dispatch(setQuestionEditedRequest())
        setQuestion(target.value)
    }

    const resetEditor = () => {
        setQuestion(edit.question)
        setAnswers(initAnswers())
        setCorrect(initCorrect())
    }

    useEffect(() => {
        if (edit.edited) {
            dispatch(showWarningRequest({
                title: 'You have unsaved changes?',
                text: 'Do you want to load this booking, you will loose your changes',
                continue: {
                    onClick: resetEditor
                }
            }))
        }
        else {
            resetEditor()
        }
    }, [edit.index])

    const validationWarnings = () => {
        const warnings: string[] = [];
        if (answers.filter((a) => a.length).length < answers.length) warnings.push('Your answers cannot be empty.');
        if (question.split(' ').length < 2) warnings.push('Your question must contain at least 2 words');
        if (question.slice(-1) !== '?') warnings.push('Your question must end with a question mark');
        return warnings;
    }

    const handleSave = () => {
        const warnings = validationWarnings();
        if (warnings.length) {
            return dispatch(showWarningRequest({
                title: 'There are problems with your edit.',
                text: warnings.join('\n'),
                cancel: {
                    text: 'close'
                }
            }))
        }
        else {
            return dispatch(showWarningRequest({
                title: 'Save your changes?',
                text: 'Overwrite and save the changes, this cannot be undone!',
                continue: {
                    text: 'save',
                    onClick: () => {
                        dispatch(saveQuestionRequest(edit.index, {
                            ...edit,
                            question,
                            correct_answer: answers.filter((a, i) => correct[i])[0],
                            incorrect_answers: answers.filter((a, i) => !correct[i])
                        }))
                    }
                }
            }))
        }

    };

    const handleUndo = () => {
        return dispatch(showWarningRequest({
            title: 'Undo changes?',
            text: 'Do you really want to undo all the changes!',
            continue: {
                text: 'undo',
                onClick: () => {
                    dispatch(editQuestionRequest(edit.index))
                    resetEditor();
                }
            }
        }))

    };

    const showAddAnswer = answers.length < 5;
    const handleAddAnswer = () => {
        setAnswers([...answers, ''])
        setCorrect([...correct, false])
    }

    const disableDelete = answers.length < 3;
    const handleDeleteAnswer = (index) => {
        return dispatch(showWarningRequest({
            title: 'Delete Answer?',
            text: 'Do you really want to delete this answer?',
            continue: {
                text: 'delete',
                onClick: () => {
                    setAnswers([...answers.slice(0, index), ...answers.slice(index + 1)])
                    setCorrect([...correct.slice(0, index), ...correct.slice(index + 1)])
                }
            }
        }))

    }

    const values = { question, answers, correct, edited: edit.edited, disableDelete, showAddButton: showAddAnswer };
    const handlers = { question: handleQuestion, answer: handleAnswer, correct: handleCheckboxes, save: handleSave, undo: handleUndo, addAnswer: handleAddAnswer, deleteAnswer: handleDeleteAnswer }

    return (<ViewComponent
        values={values}
        handlers={handlers}
    />)
}