// module imports
import React from "react";
import axios from "axios";

// custom module imports
import { REQUEST_LOGIN } from "./types";
import startApiRequest from "../api/startApiRequest";
import finishApiRequest from "../api/finishApiRequest";
import SweetAlertWrapper from "../../components/SweetAlertWrapper/SweetAlertWrapper";
import { apiRoutes } from "../../constants/apiConstants";

export const signup = response => {
  return {
    type: REQUEST_LOGIN,
    payload: response
  };
};

export default function requestSignup(email, password, name) {
  return dispatch => {
    console.log("Dispatching startApiRequest from requestLogin");
    dispatch(startApiRequest());

    axios
      .post(apiRoutes.users.signup, {
        email,
        password,
        name
      })
      .then(
        response => {
          const statusCode = response.status;

          let responseUiComponent;

          switch (statusCode) {
            case 200:
              responseUiComponent = (
                <SweetAlertWrapper success title="Success">
                  {response.data.message}
                </SweetAlertWrapper>
              );
              break;
            case 400:
              responseUiComponent = (
                <SweetAlertWrapper danger title="Fail">
                  {response.data.error}
                </SweetAlertWrapper>
              );
              break;
          }

          console.log("Dispatching finishApiRequest from requestSignup succes");

          dispatch(finishApiRequest(response, true, responseUiComponent));
          dispatch(signup(response));
        },
        error => {
          // const statusCode = error.response.status;
          const defaultErrorMessage =
            "Error, Something went wrong. Please try again";

          const responseUiComponent = (
            <SweetAlertWrapper danger title="Fail">
              {error &&
              error.response &&
              error.response.data &&
              error.response.data.message
                ? error.response.data.message
                : error.response.data.error
                ? error.response.data.error
                : defaultErrorMessage}
            </SweetAlertWrapper>
          );
          console.log("Dispatching finishApiRequest from requestLogin error");

          dispatch(finishApiRequest(error.response, true, responseUiComponent));
        }
      );
  };
}