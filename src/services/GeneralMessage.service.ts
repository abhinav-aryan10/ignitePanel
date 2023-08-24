/* eslint-disable no-restricted-syntax */
/* eslint-disable no-else-return */
/* eslint-disable import/no-unresolved */

import Errors from '../constants/Error.constants';
import UiLables from '../constants/UiLables.constants';
import CognitoErrors from '../constants/CognitoError.constants';

export default function GeneralMessageService(
  errorCode: string,
  serverErrorCode?: string,
  serverErrorMessage?: string
) {
  if (
    errorCode === Errors.CHILD_FACING_ERROR ||
    errorCode === Errors.ELECTRON_ERROR2
  ) {
    return {
      Header: UiLables.MESSAGES.CHILD_FACING_ERROR.HEADER,
      Subheader: UiLables.MESSAGES.CHILD_FACING_ERROR.SUBHEADER,
      P1: UiLables.MESSAGES.CHILD_FACING_ERROR.P1,
      P2: UiLables.MESSAGES.CHILD_FACING_ERROR.P2,
      P3: UiLables.MESSAGES.CHILD_FACING_ERROR.P3,
      NavLink: '',
      PrimaryBtn: '',
      SecondaryBtn: '',
    };
  } else if (errorCode === Errors.GAME_ERROR) {
    return {
      Header: UiLables.MESSAGES.GAME_ERROR.HEADER,
      Subheader: UiLables.MESSAGES.CHILD_FACING_ERROR.SUBHEADER,
      P1: UiLables.MESSAGES.GAME_ERROR.P1,
      P2: UiLables.MESSAGES.GAME_ERROR.P2,
      P3: UiLables.MESSAGES.GAME_ERROR.P3,
      NavLink: '',
      PrimaryBtn: UiLables.MESSAGES.NO_INTERNET_ERROR.PRIMARYBTN,
      SecondaryBtn: UiLables.MESSAGES.NO_INTERNET_ERROR.SECONDARYBTN,
    };
  } else if (errorCode === Errors.NO_INTERNET) {
    return {
      Header: UiLables.MESSAGES.NO_INTERNET_ERROR.HEADER,
      Subheader: UiLables.MESSAGES.NO_INTERNET_ERROR.SUBHEADER,
      P1: UiLables.MESSAGES.NO_INTERNET_ERROR.P1,
      P2: UiLables.MESSAGES.NO_INTERNET_ERROR.P2,
      P3: UiLables.MESSAGES.NO_INTERNET_ERROR.P3,
      NavLink: '',
      PrimaryBtn: UiLables.MESSAGES.NO_INTERNET_ERROR.PRIMARYBTN,
      SecondaryBtn: UiLables.MESSAGES.NO_INTERNET_ERROR.SECONDARYBTN,
    };
  } else if (errorCode === Errors.LICENSE_EXPIRE) {
    return {
      Header: UiLables.MESSAGES.LICENSE_EXPIRE.HEADER,
      Subheader: UiLables.MESSAGES.LICENSE_EXPIRE.SUBHEADER,
      P1: UiLables.MESSAGES.LICENSE_EXPIRE.P1,
      P2: UiLables.MESSAGES.LICENSE_EXPIRE.P2,
      P3: '',
      NavLink: '',
      PrimaryBtn: UiLables.MESSAGES.LICENSE_EXPIRE.PRIMARYBTN,
      SecondaryBtn: UiLables.MESSAGES.LICENSE_EXPIRE.SECONDARYBTN,
    };
  } else if (errorCode === Errors.EULA_UPDATE) {
    return {
      Header: UiLables.MESSAGES.EULA_UPDATE.HEADER,
      Subheader: UiLables.MESSAGES.EULA_UPDATE.SUBHEADER,
      P1: UiLables.MESSAGES.EULA_UPDATE.P1,
      P2: UiLables.MESSAGES.EULA_UPDATE.P2,
      P3: '',
      NavLink: '',
      PrimaryBtn: '',
      SecondaryBtn: '',
    };
  } else if (errorCode === Errors.UPDATE_AVAILABLE) {
    return {
      Header: UiLables.MESSAGES.UPDATE_AVAILABLE_ERROR.HEADER,
      Subheader: UiLables.MESSAGES.UPDATE_AVAILABLE_ERROR.SUBHEADER,
      P1: UiLables.MESSAGES.UPDATE_AVAILABLE_ERROR.P1,
      P2: UiLables.MESSAGES.UPDATE_AVAILABLE_ERROR.P2,
      P3: UiLables.MESSAGES.UPDATE_AVAILABLE_ERROR.P3,
      NavLink: '',
      PrimaryBtn: UiLables.MESSAGES.UPDATE_AVAILABLE_ERROR.PRIMARYBTN,
      SecondaryBtn: '',
    };
  } else if (errorCode === Errors.API_ERROR_EMAIL_UPDATE) {
    return {
      Header: UiLables.MESSAGES.API_ERROR_EMAIL_UPDATE.HEADER,
      Subheader: UiLables.MESSAGES.API_ERROR_EMAIL_UPDATE.SUBHEADER,
      P1: UiLables.MESSAGES.API_ERROR_EMAIL_UPDATE.P1,
      P2: UiLables.MESSAGES.API_ERROR_EMAIL_UPDATE.P2,
      P3: UiLables.MESSAGES.API_ERROR_EMAIL_UPDATE.P3,
      PrimaryBtn: UiLables.MESSAGES.API_ERROR_EMAIL_UPDATE.PRIMARYBTN,
      SecondaryBtn: UiLables.MESSAGES.API_ERROR_EMAIL_UPDATE.SECONDARYBTN,
    };
  } else if (errorCode === Errors.UPDATE_IS_DOWNLOADING) {
    return {
      Header: UiLables.MESSAGES.UPDATE_IS_DOWNLOADING_ERROR.HEADER,
      Subheader: UiLables.MESSAGES.UPDATE_IS_DOWNLOADING_ERROR.SUBHEADER,
      P1: UiLables.MESSAGES.UPDATE_IS_DOWNLOADING_ERROR.P1,
      P2: '',
      P3: '',
      NavLink: '',
      PrimaryBtn: '',
      SecondaryBtn: '',
    };
  } else if (errorCode === Errors.CLASSLINK_USER_NOT_FOUND) {
    return {
      Header: UiLables.MESSAGES.CLASSLINK_USER_NOT_FOUND.HEADER,
      Subheader: UiLables.MESSAGES.CLASSLINK_USER_NOT_FOUND.SUBHEADER,
      P1: UiLables.MESSAGES.CLASSLINK_USER_NOT_FOUND.P1,
      P2: UiLables.MESSAGES.CLASSLINK_USER_NOT_FOUND.P2,
      P3: UiLables.MESSAGES.CLASSLINK_USER_NOT_FOUND.P3,
      PrimaryBtn: UiLables.MESSAGES.CLASSLINK_USER_NOT_FOUND.PRIMARYBTN,
      SecondaryBtn: UiLables.MESSAGES.CLASSLINK_USER_NOT_FOUND.SECONDARYBTN,
    };
  } else if (errorCode === Errors.CLEVER_USER_NOT_FOUND) {
    return {
      Header: UiLables.MESSAGES.CLEVER_USER_NOT_FOUND.HEADER,
      Subheader: UiLables.MESSAGES.CLEVER_USER_NOT_FOUND.SUBHEADER,
      P1: UiLables.MESSAGES.CLEVER_USER_NOT_FOUND.P1,
      P2: UiLables.MESSAGES.CLEVER_USER_NOT_FOUND.P2,
      P3: UiLables.MESSAGES.CLEVER_USER_NOT_FOUND.P3,
      PrimaryBtn: UiLables.MESSAGES.CLEVER_USER_NOT_FOUND.PRIMARYBTN,
      SecondaryBtn: UiLables.MESSAGES.CLEVER_USER_NOT_FOUND.SECONDARYBTN,
    };
  } else if (errorCode === Errors.CLASSLINK_LEAD_TEACHER_NOT_ALLOWED) {
    return {
      Header: UiLables.MESSAGES.CLASSLINK_LEAD_TEACHER_NOT_ALLOWED.HEADER,
      Subheader: UiLables.MESSAGES.CLASSLINK_LEAD_TEACHER_NOT_ALLOWED.SUBHEADER,
      P1: UiLables.MESSAGES.CLASSLINK_LEAD_TEACHER_NOT_ALLOWED.P1,
      P2: UiLables.MESSAGES.CLASSLINK_LEAD_TEACHER_NOT_ALLOWED.P2,
      P3: UiLables.MESSAGES.CLASSLINK_LEAD_TEACHER_NOT_ALLOWED.P3,
      PrimaryBtn:
        UiLables.MESSAGES.CLASSLINK_LEAD_TEACHER_NOT_ALLOWED.PRIMARYBTN,
      SecondaryBtn:
        UiLables.MESSAGES.CLASSLINK_LEAD_TEACHER_NOT_ALLOWED.SECONDARYBTN,
    };
  } else if (errorCode === Errors.UPGRADE_INFO) {
    return {
      Header: UiLables.MESSAGES.UPGRADE_INFO.HEADER,
      Subheader: UiLables.MESSAGES.UPGRADE_INFO.SUBHEADER,
      P1: UiLables.MESSAGES.UPGRADE_INFO.P1,
      P2: UiLables.MESSAGES.UPGRADE_INFO.P2,
      P3: UiLables.MESSAGES.UPGRADE_INFO.P2,
      PrimaryBtn: UiLables.MESSAGES.UPGRADE_INFO.PRIMARYBTN,
      SecondaryBtn: UiLables.MESSAGES.UPGRADE_INFO.SECONDARYBTN,
    };
  } else if (errorCode === Errors.AWS_COGNITO_ERROR) {
    let uiErrorCode;
    let uiErrorMessage;
    for (const [key, value] of Object.entries(CognitoErrors)) {
      if (serverErrorCode === key) {
        uiErrorCode = value.code;
        uiErrorMessage = value.UiMessage;
        break;
      } else {
        uiErrorCode = '400';
        uiErrorMessage =
          'You do not have sufficient access to perform this action.';
        break;
      }
    }
    return {
      Header: UiLables.MESSAGES.AWS_COGNITO_ERROR.HEADER,
      Subheader: UiLables.MESSAGES.AWS_COGNITO_ERROR.SUBHEADER,
      P1: UiLables.MESSAGES.AWS_COGNITO_ERROR.P1,
      P2: `Error Code ${uiErrorCode}`,
      P3: `${uiErrorMessage}`,
      NavLink: '',
      PrimaryBtn: UiLables.MESSAGES.AWS_COGNITO_ERROR.PRIMARYBTN,
      SecondaryBtn: UiLables.MESSAGES.AWS_COGNITO_ERROR.SECONDARYBTN,
    };
  } else if (errorCode === Errors.API_ERROR) {
    if (serverErrorCode === '') {
      serverErrorCode = '400';
    }
    if (serverErrorMessage === '') {
      serverErrorMessage =
        'You do not have sufficient access to perform this action.';
    }
    return {
      Header: UiLables.MESSAGES.API_FAILED.HEADER,
      Subheader: UiLables.MESSAGES.API_FAILED.SUBHEADER,
      P1: UiLables.MESSAGES.API_FAILED.P1,
      P2: `Error Code ${serverErrorCode}`,
      P3: `${serverErrorMessage}`,
      NavLink: '',
      PrimaryBtn: UiLables.MESSAGES.API_FAILED.PRIMARYBTN,
      SecondaryBtn: UiLables.MESSAGES.API_FAILED.SECONDARYBTN,
    };
  } else {
    return {
      Header: UiLables.MESSAGES.CHILD_FACING_ERROR.HEADER,
      Subheader: `Error Code: ${errorCode}`,
      P1: UiLables.MESSAGES.CHILD_FACING_ERROR.P1,
      P2: UiLables.MESSAGES.CHILD_FACING_ERROR.P2,
      P3: UiLables.MESSAGES.CHILD_FACING_ERROR.P3,
      NavLink: '',
      PrimaryBtn: '',
      SecondaryBtn: '',
    };
  }
}
