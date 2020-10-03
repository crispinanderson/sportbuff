import { Grid, Paper } from "@material-ui/core";
import React from "react";
import { connect } from 'react-redux';

const styles = {
  wrapper: {

  }
}

export function QuestionEditor({ dispatch, edit }) {

  return (
    <Grid item xs={7}>
      <h1>Editor</h1>
      {edit &&
        <Paper>

        </Paper>}

    </Grid>

  );

}

function mapStateToProps(state: any) {
  return { edit: state.quiz.edit };
}


export default connect(mapStateToProps)(QuestionEditor)