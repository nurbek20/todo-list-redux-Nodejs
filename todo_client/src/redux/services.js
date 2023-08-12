import {
  getMeAction,
  showLoadingAction,
  showErrorAction,
  hiddenLoadingAction,
  hiddenErrorAction,
} from "./auth-action/auth-action";
import { authServices } from "../http/auth-services";


export const getMeReduxServices = () => {
  return async (dispatch) => {
    dispatch(showLoadingAction());
    try {
      const res = await authServices.getMe();
      dispatch(getMeAction(res.data));
      dispatch(hiddenLoadingAction());
      dispatch(hiddenErrorAction());
    } catch (e) {
      console.log(e);
      dispatch(showErrorAction());
      dispatch(hiddenLoadingAction());
    }
  };
};


