import submissionService from 'src/services/ submissionService';

export const FETCH_FORM_SUBMISSIONS = '@forms/fetch-form-submissions';
export const FETCH_FORM_SUBMISSIONS_COUNT = '@forms/fetch-form-submissions-count';

export function getSubmissionData(form_id) {
  return async (dispatch) => {
    try {
      const data = await submissionService.getSubmissionData(form_id); 
      dispatch({
        type: FETCH_FORM_SUBMISSIONS,
        payload: data
      });
    } catch (error) {
      throw error;
    }
  };
}

export function getFormSubmissionCount() {
  return async (dispatch) => {
    try {
      const data = await submissionService.getFormSubmissionCount(); 
      dispatch({
        type: FETCH_FORM_SUBMISSIONS_COUNT,
        payload: data
      });
    } catch (error) {
      throw error;
    }
  };
}
