/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-unresolved */
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../../../constants/Routepaths.constants";
import UiLables from "../../../constants/UiLables.constants";
import "./ValidationTooltip.scss";
// import React from "react";

interface IProps {
  errorMessage: string;
}

const ErrorMessagePopup: React.FC<IProps> = ({ errorMessage }: IProps) => {
  const navigate = useNavigate();
  const errorMessageSplit = errorMessage.split(" ");
  const lastWord = errorMessageSplit[errorMessageSplit.length - 1];

  const navigateToForgetPassword = () => {
    navigate(RoutePaths.FORGET_PASSWORD);
  };

  return (
    <div className="error_message_popup_container">
      {lastWord === "or" ? (
        <div className="error_message_popup_box fade_in_animation_for_container">
          {errorMessage}
          <button
            type="button"
            className="error_message_popup_box_link"
            onClick={navigateToForgetPassword}
          >
            {UiLables.VALIDATIONS.PASSWORD_INCORRECT2}
          </button>
          .
        </div>
      ) : (
        <div className="error_message_popup_box fade_in_animation_for_container">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default ErrorMessagePopup;
