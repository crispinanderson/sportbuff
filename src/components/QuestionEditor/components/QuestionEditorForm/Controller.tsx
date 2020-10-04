import React, { useState, useEffect } from 'react';
import { saveQuestionRequest, setQuestionEditedRequest, editQuestionRequest } from '../../../../redux/actions/questionwebservice';
import { showWarningRequest } from '../../../../redux/actions/warningservice';

export const Controller = ({ ViewComponent, edit, dispatch }) => {

    /* const [edited, setEdited] = useState(false); */

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

    const inputsAreValid = () => {
        if (answers.filter((a) => a.length).length < answers.length) return false;
        if (question.split(' ').length < 2) return false
        return true;
    }

    const handleSave = () => {
        if (inputsAreValid()) {
            dispatch(showWarningRequest({
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
        else {
            dispatch(showWarningRequest({
                title: 'There are issues with your edit.',
                text: 'Please check your question and answers, you cannot have empty answers and your question must be at least 2 words long.',
                cancel: {
                    text: 'close'
                }
            }))
        }

    };

    const handleUndo = () => {
        dispatch(showWarningRequest({
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

    const values = { question, answers, correct, edited: edit.edited };
    const handlers = { question: handleQuestion, answer: handleAnswer, correct: handleCheckboxes, save: handleSave, undo: handleUndo }

    return (<ViewComponent
        values={values}
        handlers={handlers}
    />)
}