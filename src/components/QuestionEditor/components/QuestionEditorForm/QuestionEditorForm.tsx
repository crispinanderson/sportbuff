import React from "react";
import { connect } from 'react-redux';
import { Controller } from "./Controller";
import { View } from "./View";

function QuestionEditorForm(props) {
  return <Controller ViewComponent={View} {...props} />
}

function mapStateToProps(state: any) {
  return { edit: state.quiz.edit };
}

export default connect(mapStateToProps)(QuestionEditorForm)
