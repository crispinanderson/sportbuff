import { Paper, FormLabel, Grid, Checkbox, Button } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { useState } from "react";
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { saveQuestionRequest } from '../../../redux/actions/questionwebservice';

interface Values {
  question: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      textAlign: 'left'
    },
    formLabel: {
      padding: '10px'
    },
    paper: {
      padding: '20px'
    },
    questionField: {
      padding: '10px',
      width: 'calc(100% - 40px)'
    },
    buttons: {
      width: '100%'
    },

  }),
);

export function QuestionEditorForm({ dispatch, edit }) {

  const classes = useStyles();
  const handleSubmit = (values) => console.log('submitted', values)

  const initAnswers = [
    edit.correct_answer,
    ...edit.incorrect_answers.map((a) => a)
  ];
  const [answers, setAnswers] = useState(initAnswers);

  const initCorrect = [true, ...Array(edit.incorrect_answers.length).fill(false)]
  const [correct, setCorrect] = useState(initCorrect);
  const handleCheckboxes = (i) => {
    setCorrect(correct.map((v, index) => index === i));
    if (!edited) {
      setEdited(true)
    }
  };

  const [edited, setEdited] = useState(false);

  const handleSave = () => {
    dispatch(saveQuestionRequest(edit.index, edit))
  };
  const handleUndo = () => { };

  return (
    <Paper className={classes.paper}>
      <Formik
        initialValues={{
          question: edit.question,
          answers: [...answers],
          correct: [...correct]
        }}
        validate={(values) => {
          const errors: Partial<Values> = {};
          if (!values.question) {
            errors.question = 'Required'
          }
          if (!edited) {
            setEdited(true)
          }
        }}
        onSubmit={handleSubmit}
      >
        {({ submitForm, isSubmitting }) => (
          <Form className={classes.form}>
            <FormLabel className={classes.formLabel}>
              Question
                </FormLabel>
            <Field
              className={classes.questionField}
              component={TextField}
              variant='outlined'
              multiline
              name='question'
              type='text'
            />
            <Grid container>
              <Grid item xs={10}>
                <FormLabel className={classes.formLabel}> Answers </FormLabel>
              </Grid>
              <Grid item xs={2}>
                <FormLabel className={classes.formLabel}> isCorrect </FormLabel>
              </Grid>
            </Grid>
            {answers.map((a, i) => {
              return <Grid container key={'answer_wrapper_' + i}>
                <Grid item xs={10} key={'answer_' + i}>
                  <Field
                    key={'answer_field_' + i}
                    className={classes.questionField}
                    component={TextField}
                    variant='outlined'
                    multiline
                    name={`answers[${i}]`}
                    type='text'
                  />
                </Grid>
                <Grid item xs={2} key={'answer_is_correct_' + i}>
                  <Field
                    key={'answer_is_correct_checkbox_' + i}
                    className={classes.questionField}
                    component={Checkbox}
                    variant='outlined'
                    checked={correct[i]}
                    onClick={() => { handleCheckboxes(i) }}
                    name={`correct`}
                    type='checkbox'
                  />
                </Grid>
              </Grid>
            })}

            <Grid container spacing={1}>
              <Grid item xs={2}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.buttons}
                  disabled={!edited}
                  onClick={handleUndo}
                >
                  Undo
        </Button>
              </Grid>
              <Grid item xs={2}>
                <Field
                  component={Button}
                  variant="contained"
                  color="primary"
                  className={classes.buttons}
                  disabled={!edited}
                  /* onClick={handleSave} */
                  type='submit'
                >
                  Save
        </Field>
              </Grid>
              <Grid item xs={8}></Grid>
            </Grid>

          </Form>
        )}
      </Formik>


    </Paper >
  );

}

export default QuestionEditorForm