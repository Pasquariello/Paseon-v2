import formsService from 'src/services/formServices';

export const FETCH_FORMS = '@forms/fetch-forms';

export function getForms() {
  return async (dispatch) => {
    try {
      const user_id = '5fe978e8cc7faa326371ff65'; // TODO remove hardcoded value

      const formList = [];
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
