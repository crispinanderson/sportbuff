import React from "react";
import { connect } from 'react-redux';
import { Controller } from "./QuestionEditorForm.controller";
import { View } from "./QuestionEditorForm.view";

function QuestionEditorForm(props) {
  return <Controller ViewComponent={View} {...props} />
}

function mapStateToProps(state: any) {
  return { edit: state.quiz.edit };
}

export default connect(mapStateToProps)(QuestionEditorForm)
