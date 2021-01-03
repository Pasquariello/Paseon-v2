import submissionService from 'src/services/ submissionService';

export const FETCH_FORM_SUBMISSIONS = '@forms/fetch-form-submissions';

export function getSubmissionData(form_id) {
  return async (dispatch) => {
    try {
      const data = await submissionService.getSubmissionData(form_id); 
      console.log('DATA', data)
      dispatch({
        type: FETCH_FORM_SUBMISSIONS,
        payload: data
      });
    } catch (error) {
      throw error;
    }
  };
}
