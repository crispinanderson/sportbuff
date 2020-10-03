
export const Types = {
  SHOW_WARNING_REQUEST: 'SHOW_WARNING_REQUEST',
  CANCEL_WARNING_REQUEST: 'CANCEL_WARNING_REQUEST',
  CONTINUE_WARNING_REQUEST: 'CONTINUE_WARNING_REQUEST'
};

export const showWarningRequest = (data) => ({
  type: Types.SHOW_WARNING_REQUEST,
  payload: data
});

export const continueWarningRequest = (data) => ({
  type: Types.CONTINUE_WARNING_REQUEST
});

export const cancelWarningRequest = (data) => ({
  type: Types.CANCEL_WARNING_REQUEST
});




