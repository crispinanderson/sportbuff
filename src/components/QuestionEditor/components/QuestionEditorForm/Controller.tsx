import React, { useState, useEffect } from 'react';
import { saveQuestionRequest } from '../../../../redux/actions/questionwebservice';

export const Controller = ({ ViewComponent, edit, dispatch }) => {

    const [edited, setEdited] = useState(false);

    const initAnswers = () => [
        edit.correct_answer,
        ...edit.incorrect_answers.map((a) => a)
    ];

    const [answers, setAnswers] = useState(initAnswers());
    const handleAnswer = (index, value) => {
        if (!edited) setEdited(true)
        setAnswers(answers.map((answer, i) => i === index ? value : answer))
    }

    const initCorrect = () => [true, ...Array(edit.incorrect_answers.length).fill(false)]
    const [correct, setCorrect] = useState(initCorrect());
    const handleCheckboxes = (i) => {
        setCorrect(correct.map((v, index) => index === i));
        if (!edited) setEdited(true)
    };

    const [question, setQuestion] = useState(edit.question);
    const handleQuestion = ({ target }) => {
        if (!edited) setEdited(true)
        setQuestion(target.value)
    }

    useEffect(() => {
        setQuestion(edit.question)
        setAnswers(initAnswers())
        setCorrect(initCorrect())
    }, [edit.index])


    const handleSave = () => {
        dispatch(saveQuestionRequest(edit.index, {
            question,
            correct_answer: answers.filter((a, i) => correct[i])[0],
            incorrect_answers: answers.filter((a, i) => !correct[i])
        }))
    };

    const handleUndo = () => {
        setQuestion(edit.question)
        setAnswers(initAnswers())
        setCorrect(initCorrect())
        setEdited(false);
    };

    const values = {
        question,
        answers,
        correct,
        edited
    }

    const handlers = {
        question: handleQuestion,
        annswer: handleAnswer,
        correct: handleCheckboxes,
        save: handleSave,
        undo: handleUndo
    }

    return (<ViewComponent
        values={values}
        handlers={handlers}
    />)
}