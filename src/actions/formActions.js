import formsService from 'src/services/formServices';

export const FETCH_FORMS = '@forms/fetch-forms';
export const FETCH_SINLGE_FORM ='@forms/fetch-single-form';
export const POST_FORM ='@forms/post-form';
export const DELETE_FORM ='@forms/delete-form';

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

export function createForm(formData) {
  return async (dispatch) => {
    try {
      const data = await formsService.createForm(formData); 
      console.log('DATA', data)
      dispatch({
        type: POST_FORM,
        payload: data
      });
    } catch (error) {
      throw error;
    }
  };
}

export function deleteForm(formId) {
  return async (dispatch) => {
    try {
      const data = await formsService.deleteForm(formId); 
    
      dispatch({
        type: DELETE_FORM,
        payload: {
          ...data,
          id: formId
        },
      });
    } catch (error) {
      throw error;
    }
  };
}

