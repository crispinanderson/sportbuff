import { Paper, FormLabel, Grid, Checkbox, Button, FormGroup, TextField } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
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

export function QuestionEditorForm(props) {

  const { dispatch, edit } = props;
  const classes = useStyles();

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
  const handleUndo = () => { };

  return (
    <Paper className={classes.paper}>
      <FormGroup>
        <FormLabel className={classes.formLabel}>
          Question
                </FormLabel>
        <TextField
          className={classes.questionField}
          variant='outlined'
          multiline
          name='question'
          type='text'
          value={question}
          onChange={handleQuestion}
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
              <TextField
                key={'answer_field_' + i}
                className={classes.questionField}
                variant='outlined'
                multiline
                name={`answers[${i}]`}
                type='text'
                value={answers[i]}
                onChange={({ target: { value } }) => handleAnswer(i, value)}
              />
            </Grid>
            <Grid item xs={2} key={'answer_is_correct_' + i}>
              <Checkbox
                key={'answer_is_correct_checkbox_' + i}
                className={classes.questionField}
                checked={correct[i]}
                onClick={() => { handleCheckboxes(i) }}
                name={`correct`}
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
            <Button
              component={Button}
              variant="contained"
              color="primary"
              className={classes.buttons}
              disabled={!edited}
              onClick={handleSave}
            >
              Save
        </Button>
          </Grid>
          <Grid item xs={8}></Grid>
        </Grid>

      </FormGroup>
    </Paper >
  );

}

function mapStateToProps(state: any) {
  return { edit: state.quiz.edit };
}

export default connect(mapStateToProps)(QuestionEditorForm)
