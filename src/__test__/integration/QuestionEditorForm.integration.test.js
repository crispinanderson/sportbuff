import React from 'react';
import { render, fireEvent, screen } from '../test-utils';
import Layout from '../../components/Layout'
import { mockQuizState } from '../mocks/quiz.mock';
import { warningInitialState } from '../mocks/warning.mock';

describe('QuestionEditorForm.integration - ', () => {

    const { withEdit, withoutEdit } = mockQuizState;

    test('When new state is passed - warning "Edit Booking?"', () => {
        render(<Layout />, { initialState: { quiz: withEdit, warning: warningInitialState } });
        expect(screen.getByTestId('warning-wrapper')).toBeInTheDocument();
        expect(screen.getByTestId('warning-title').textContent).toBe('Edit Booking?');

        //Accept the warning and continue
        fireEvent.click(screen.getByTestId('warning-continue-button'));

        //Warning dialog closed
        expect(screen.queryByTestId('warning-continue-button')).toBeNull();

        //Question data is loaded into editor-question --> is material-ui TextField textArea
        const question = screen.getByTestId('editor-question-input').childNodes[0].childNodes[0].textContent;
        expect(question).toBe('Which of these teams is a member of the NHL era?');
    })

    describe('Save and undo button are clickable - ', () => {
        beforeEach(() => {
            render(<Layout />, { initialState: { quiz: withoutEdit, warning: warningInitialState } });
            //Select a question
            fireEvent.click(screen.getAllByTestId('question-list-edit-button')[0]);
        })

        test('but not initially!!', () => {
            //Save button is disabled
            const classlist = Array.from(screen.getByTestId('editor-save-button').classList);
            expect(classlist.includes('Mui-disabled')).toBe(true)
        })

        test('when the question is edited', () => {
            //Edit the question
            fireEvent.input(screen.getByTestId('editor-question-input').childNodes[0].childNodes[0], { target: { value: 'Edited my question?' } });

            //Save button is not disabled
            const classlist = Array.from(screen.getByTestId('editor-save-button').classList);
            expect(classlist.includes('Mui-disabled')).toBe(false)
        })

        test('when an answer is edited', () => {
            //Edit the question
            fireEvent.input(screen.getAllByTestId('editor-answer-input')[0].childNodes[0].childNodes[0], { target: { value: 'Edited my answer!' } });

            //Save button is not disabled
            const classlist = Array.from(screen.getByTestId('editor-save-button').classList);
            expect(classlist.includes('Mui-disabled')).toBe(false)
        })

        test('when the correct answer is changed', () => {
            //change the correct answer
            const correctBtn = screen.getAllByTestId('editor-correct-checkbox')[1].childNodes[0].childNodes[0]
            fireEvent.click(correctBtn);

            //Save button is not disabled
            const classlist = Array.from(screen.getByTestId('editor-save-button').classList);
            expect(classlist.includes('Mui-disabled')).toBe(false)
        })

        test('when an answer is deleted', () => {
            //Delete an aswer
            const deleteBtn = screen.getAllByTestId('editor-answers-delete-button')[0];
            fireEvent.click(deleteBtn);

            //Confirm the delete
            fireEvent.click(screen.getByTestId('warning-continue-button'))

            //Save button is not disabled
            const classlist = Array.from(screen.getByTestId('editor-save-button').classList);
            expect(classlist.includes('Mui-disabled')).toBe(false)
        })
    })

    describe('When delete answer is pressed - ', () => {

        beforeEach(() => {
            render(<Layout />, { initialState: { quiz: withEdit, warning: warningInitialState } });
            //Accept the warning and continue
            fireEvent.click(screen.getByTestId('warning-continue-button'));
            //Edit the question
            fireEvent.input(screen.getByTestId('editor-question-input').childNodes[0].childNodes[0], { target: { value: 'Edited' } });

        })

        test('the correct warning is shown', () => {
            const deleteBtn = screen.getAllByTestId('editor-answers-delete-button')[1];

            //Click delete answer
            fireEvent.click(deleteBtn);

            //Check the warning title
            const warningTitle = screen.getByTestId('warning-title').childNodes[0];
            expect(warningTitle.textContent).toBe('Delete Answer?');
        })

    })

    describe('When question is edited: ', () => {
        beforeEach(() => {
            render(<Layout />, { initialState: { quiz: withEdit, warning: warningInitialState } });
            //Accept the warning and continue
            fireEvent.click(screen.getByTestId('warning-continue-button'));
            //Edit the question
            fireEvent.input(screen.getByTestId('editor-question-input').childNodes[0].childNodes[0], { target: { value: 'Edited' } });

        })

        test('then the textContent should be "Edited"', () => {
            expect(screen.getByTestId('editor-question-input').childNodes[0].childNodes[0].textContent).toBe('Edited');
        })

        test('on save - warnings are shown with correct warning-text', () => {

            //Save the edit
            fireEvent.click(screen.getByTestId('editor-save-button'));

            //Check the warning text
            let warnings = screen.getAllByTestId('warning-text');
            expect(Array.from(warnings).map((e) => e.textContent)).toMatchObject(['Your question must contain at least 2 words', 'Your question must end with a question mark']);

            //Cancel the warning
            fireEvent.click(screen.getByTestId('warning-cancel-button'));

            //Edit the question
            fireEvent.input(screen.getByTestId('editor-question-input').childNodes[0].childNodes[0], { target: { value: 'Edited my question' } });

            //Save the edit
            fireEvent.click(screen.getByTestId('editor-save-button'));

            //Check the warning text
            warnings = screen.getAllByTestId('warning-text');
            expect(Array.from(warnings).map((e) => e.textContent)).toMatchObject(['Your question must end with a question mark']);

            //Cancel the warning
            fireEvent.click(screen.getByTestId('warning-cancel-button'));

            //Edit the question
            fireEvent.input(screen.getByTestId('editor-question-input').childNodes[0].childNodes[0], { target: { value: 'Edited my question?' } });

            //Save the edit
            fireEvent.click(screen.getByTestId('editor-save-button'));

            //Check the warning text
            const warningTitle = screen.getByTestId('warning-title').childNodes[0];
            expect(warningTitle.textContent).toBe('Save your changes?');
        })

        test('on save, after correct answer deleted - warning is shown with correct warning-text', () => {

            //Edit the question - has no errors
            fireEvent.input(screen.getByTestId('editor-question-input').childNodes[0].childNodes[0], { target: { value: 'Edited my question?' } });

            const deleteBtn = screen.getAllByTestId('editor-answers-delete-button')[0];

            //Click delete on the correct answer
            fireEvent.click(deleteBtn);

            //Check the warning title
            const warningTitle = screen.getByTestId('warning-title').childNodes[0];
            expect(warningTitle.textContent).toBe('Delete Answer?');

            //Confirm delete
            screen.getByTestId('warning-continue-button').click();

            //Save the edit
            fireEvent.click(screen.getByTestId('editor-save-button'));

            //Check the warning text
            let warnings = screen.getAllByTestId('warning-text');
            expect(Array.from(warnings).map((e) => e.textContent)).toMatchObject(['You must have one correct answer.']);

        })

        test('on undo - warnings are shown with correct warning-text, text is reverted', () => {

            //Edit the question
            fireEvent.input(screen.getByTestId('editor-question-input').childNodes[0].childNodes[0], { target: { value: 'Edited my question?' } });

            //Save the edit
            fireEvent.click(screen.getByTestId('editor-undo-button'));

            //Check the warning text
            const warningTitle = screen.getByTestId('warning-title').childNodes[0];
            expect(warningTitle.textContent).toBe('Undo changes?');

            //Undo changes
            fireEvent.click(screen.getByTestId('warning-continue-button'));

            //Question is reverted
            const question = screen.getByTestId('editor-question-input').childNodes[0].childNodes[0].textContent;
            expect(question).toBe('Which of these teams is a member of the NHL era?')
        })
    })





})

