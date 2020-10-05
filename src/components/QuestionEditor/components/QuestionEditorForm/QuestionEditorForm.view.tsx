import React from 'react';
import { decode } from 'he';
import { useStyles } from './useStyles';
import { Paper, FormLabel, Grid, Checkbox, Button, FormGroup, TextField, IconButton } from "@material-ui/core";
import { Delete, Add } from '@material-ui/icons';

export const View = ({ values, handlers }) => {

    const classes = useStyles();

    return (
        <Paper data-testid={'editor-wrapper'} className={classes.paper}>
            <FormGroup className={classes.form}>
                <FormLabel data-testid={'editor-question-label'} className={classes.formLabel}>
                    Question
                </FormLabel>
                <TextField
                    data-testid={'editor-question-input'}
                    className={classes.questionField}
                    variant='outlined'
                    multiline
                    name='question'
                    type='text'
                    value={decode(values.question)}
                    onChange={handlers.question}
                />
                <Grid container>
                    <Grid item xs={10}>
                        <FormLabel data-testid={'editor-answers-label'} className={classes.formLabel}> Answers </FormLabel>
                    </Grid>
                    <Grid item xs={2}>
                        <FormLabel className={classes.formLabel}> isCorrect </FormLabel>
                    </Grid>
                </Grid>
                {values.answers.map((a, i) => {
                    return <Grid container key={'answer_wrapper_' + i}>
                        <Grid item xs={1} >
                            <IconButton data-testid={'editor-answers-delete-button'} disabled={values.disableDelete} onClick={() => handlers.deleteAnswer(i)} > <Delete /> </IconButton>
                        </Grid>
                        <Grid item xs={9} key={'answer_' + i}>
                            <TextField
                                data-testid={'editor-answer-input'}
                                key={'answer_field_' + i}
                                className={classes.questionField}
                                variant='outlined'
                                multiline
                                name={`answers[${i}]`}
                                type='text'
                                value={values.answers[i]}
                                onChange={({ target: { value } }) => handlers.answer(i, value)}
                            />
                        </Grid>
                        <Grid item xs={2} key={'answer_is_correct_' + i}>
                            <Checkbox
                                data-testid={'editor-correct-checkbox'}
                                key={'answer_is_correct_checkbox_' + i}
                                className={classes.questionField}
                                checked={values.correct[i]}
                                onClick={() => { handlers.correct(i) }}
                                name={`correct`}
                            />
                        </Grid>
                    </Grid>
                })}
                {values.showAddButton && <Grid container style={{ marginTop: '10px' }}>
                    <IconButton data-testid={'editor-answers-add-button'} onClick={handlers.addAnswer} > <Add /> </IconButton>
                </Grid>}

                <Grid container spacing={1} style={{ marginTop: '10px' }}>
                    <Grid item xs={2}>
                        <Button
                            data-testid={'editor-undo-button'}
                            variant="contained"
                            color="primary"
                            className={classes.buttons}
                            disabled={!values.edited}
                            onClick={handlers.undo}
                        >
                            Undo
                    </Button>
                    </Grid>
                    <Grid item xs={2} >
                        <Button
                            data-testid={'editor-save-button'}
                            component={Button}
                            variant="contained"
                            color="primary"
                            className={classes.buttons}
                            disabled={!values.edited}
                            onClick={handlers.save}
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