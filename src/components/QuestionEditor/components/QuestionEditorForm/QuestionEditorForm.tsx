import { Paper, FormLabel, Grid, Checkbox, Button, FormGroup, TextField } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { Controller } from "./Controller";
import { View } from "./View";



interface Values {
  question: string
}

export function QuestionEditorForm(props) {

  return <Controller ViewComponent={View} {...props} />

}

function mapStateToProps(state: any) {
  return { edit: state.quiz.edit };
}

export default connect(mapStateToProps)(QuestionEditorForm)
