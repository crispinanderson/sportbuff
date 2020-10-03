import { Grid } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from "react";
import { connect } from 'react-redux';
import { QuestionEditorForm } from "./components/QuestionEditorForm";


export function QuestionEditor(props) {

  return (
    <Grid item xs={7}>
      <h1>Editor</h1>
      {props.edit && <QuestionEditorForm {...props} />}

    </Grid>

  );

}

function mapStateToProps(state: any) {
  return { edit: state.quiz.edit };
}

export default connect(mapStateToProps)(QuestionEditor)