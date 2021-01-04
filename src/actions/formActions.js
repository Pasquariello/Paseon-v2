import formsService from 'src/services/formServices';

export const FETCH_FORMS = '@forms/fetch-forms';
export const FETCH_SINLGE_FORM ='@forms/fetch-single-form';

export function getForms() {
  return async (dispatch) => {
    try {
      const user_id = '5fe978e8cc7faa326371ff65'; // TODO remove hardcoded value

      const data = await formsService.getForms(user_id); 
      dispatch({
        type: FETCH_FORMS,
        payload: data
      });
    } catch (error) {
      throw error;
    }
  };
}

export function getSingleForm(form_id) {
  return async (dispatch) => {
    try {
      const data = await formsService.getSingleForm(form_id); 
      console.log('DATA', data)
      dispatch({
        type: FETCH_SINLGE_FORM,
        payload: data
      });
    } catch (error) {
      throw error;
    }
  };
}
