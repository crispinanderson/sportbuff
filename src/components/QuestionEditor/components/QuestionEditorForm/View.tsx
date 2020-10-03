import React, { useState, useEffect } from 'react';
import { useStyles } from './useStyles';
import { Paper, FormLabel, Grid, Checkbox, Button, FormGroup, TextField } from "@material-ui/core";

export const View = ({ values, handlers }) => {

    const classes = useStyles();

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
                    value={values.question}
                    onChange={handlers.question}
                />
                <Grid container>
                    <Grid item xs={10}>
                        <FormLabel className={classes.formLabel}> Answers </FormLabel>
                    </Grid>
                    <Grid item xs={2}>
                        <FormLabel className={classes.formLabel}> isCorrect </FormLabel>
                    </Grid>
                </Grid>
                {values.answers.map((a, i) => {
                    return <Grid container key={'answer_wrapper_' + i}>
                        <Grid item xs={10} key={'answer_' + i}>
                            <TextField
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
                                key={'answer_is_correct_checkbox_' + i}
                                className={classes.questionField}
                                checked={values.correct[i]}
                                onClick={() => { handlers.correct(i) }}
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
                            disabled={!values.edited}
                            onClick={handlers.undo}
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