// /* eslint-disable jsx-a11y/no-autofocus */
// /* eslint-disable import/no-named-as-default */
// /* eslint-disable jsx-a11y/label-has-associated-control */
import log from 'loglevel';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorMessagePopup from '../../generic/validation-tooltip/ValidationTooltip';
import { passwordMaxLength, passwordMinLength } from '../../../constants/Login.constants';
import { RoutePaths } from '../../../constants/Routepaths.constants';
import { UiLables } from '../../../constants/UiLables.constants';
import { changePassword, loginUser, resetPassword, updateUserDetails } from '../../../services/Auth.service';
import { defaultTemporaryPassword } from '../../../services/BaseUrl';
import { logoutUser } from '../../../utils/AwsCognito.util';
import buttonClickSound from '../../../utils/ButtonClick.util';
import './ChangePassword.scss';
import React from 'react';

const showPasswordIcon = require('../../../assets/icons/show_password.png');
const dontShowPasswordIcon = require('../../../assets/icons/dont_show_password.png');

const validateInputsObject = {
  passwordNew: {
    display: false,
    message: ''
  },
  passwordConfirm: {
    display: false,
    message: ''
  }
};

const ChangePassword: React.FC = () => {
  const navigate = useNavigate();

  const [validateInputs, setValidateInputs] = useState(validateInputsObject);
  const [passwordNew, setPasswordNew] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isChangePasswordInprogress, setIsChangePasswordInprogress] = useState(false);
  const [changePasswordPressed, setChangePasswordPressed] = useState(false);
  const [isShowPasswordNewEnabled, setIsShowPasswordNewEnabled] = useState(true);
  const [isShowPasswordConfirmEnabled, setIsShowPasswordConfirmEnabled] = useState(true);

  const checkValidations = () => {
    logoutUser();

    if (passwordNew !== '' && passwordConfirm !== '' && !isChangePasswordInprogress) {
      buttonClickSound();
      setIsChangePasswordInprogress(true);
      const trimmedPasswordNew = passwordNew.trim();
      const trimmedPasswordConfirm = passwordConfirm.trim();
      const isPasswordConfirmAtleatMin = trimmedPasswordConfirm.length >= passwordMinLength;
      const isPasswordNewAtleatMin = trimmedPasswordNew.length >= passwordMinLength;
      if (!(isPasswordConfirmAtleatMin && isPasswordNewAtleatMin)) {
        if (!isPasswordConfirmAtleatMin && !isPasswordNewAtleatMin) {
          setValidateInputs({
            passwordNew: {
              display: true,
              message: UiLables.VALIDATIONS.MIN_PASSWORD_ERROR
            },
            passwordConfirm: {
              display: true,
              message: ''
            }
          });
        } else {
          setValidateInputs({
            passwordNew: {
              display: true,
              message: !isPasswordNewAtleatMin ? UiLables.VALIDATIONS.MIN_PASSWORD_ERROR : ''
            },
            passwordConfirm: {
              display: true,
              message: !isPasswordConfirmAtleatMin ? UiLables.VALIDATIONS.MIN_PASSWORD_ERROR : ''
            }
          });
        }
        setIsChangePasswordInprogress(false);
        document.getElementById('passwordNewInput')?.focus();
      } else if (trimmedPasswordNew !== trimmedPasswordConfirm) {
        setValidateInputs({
          passwordNew: {
            display: true,
            message: ''
          },
          passwordConfirm: {
            display: true,
            message: UiLables.VALIDATIONS.PASSWORD_MATCH_ERROR
          }
        });
        setIsChangePasswordInprogress(false);
        document.getElementById('passwordNewInput')?.focus();
      } else {
        loginUser({
          email: localStorage.getItem('email'),
          password: sessionStorage.getItem('temporaryPassword') || defaultTemporaryPassword
        }).then(() => {
          // TO DO: Change password API call will happen here
          changePassword({
            passwordNew: trimmedPasswordNew,
            passwordConfirm: trimmedPasswordConfirm
          })
            .then((res: any) => {
              if (res && res.status === 'SUCCESS') {
                updateUserDetails({ reset_required: 0, password: passwordNew })
                  .then(() => {
                    sessionStorage.removeItem('temporaryPassword');
                    setValidateInputs({
                      passwordNew: {
                        display: false,
                        message: ''
                      },
                      passwordConfirm: {
                        display: false,
                        message: ''
                      }
                    });
                    navigate(RoutePaths.CHANGE_PASSWORD_CONFIRM);
                    setIsChangePasswordInprogress(false);
                  })
                  .catch((error) => {
                    log.error(error);
                    resetPassword({
                      passwordConfirm: trimmedPasswordConfirm,
                      passwordToReset: String(sessionStorage.getItem('temporaryPassword'))
                    })
                      .then(() => {
                        if (sessionStorage.getItem('temporaryPassword') !== 'hatch123') {
                          logoutUser();
                          localStorage.removeItem('userIdToken');
                          localStorage.removeItem('refreshToken');
                          localStorage.removeItem('userIdtokenExpiry');
                          localStorage.removeItem('email');
                          localStorage.removeItem('accessToken');
                          localStorage.removeItem('userId');
                          localStorage.removeItem('sub');
                          sessionStorage.removeItem('temporaryPassword');
                          sessionStorage.removeItem('upgradePopupDisplayed');
                        } else {
                          sessionStorage.removeItem('temporaryPassword');
                        }
                        return 1;
                      })
                      .catch((resetError) => {
                        log.error(resetError);
                        sessionStorage.removeItem('temporaryPassword');
                        return 0;
                      });
                    navigate(RoutePaths.GENERAL_MESSAGE, {
                      state: {
                        errorCode: 'API-1001',
                        P2: error.response.status,
                        P3: error.message
                      }
                    });
                  });
              }
            })
            .catch((error) => {
              log.error(error);
              setValidateInputs({
                passwordNew: {
                  display: true,
                  message: ''
                },
                passwordConfirm: {
                  display: true,
                  message: UiLables.VALIDATIONS.API_ERROR
                }
              });
              document.getElementById('passwordNewInput')?.focus();
              setIsChangePasswordInprogress(false);
              sessionStorage.removeItem('temporaryPassword');
            });
        });
      }
    }
  };

  const focusPasswordConfirmInput = (keyEvent: { key: string }) => {
    if (keyEvent.key === 'Enter') {
      document.getElementById('passwordConfirmInput')?.focus();
    }
  };

  const focusChangePasswordButton = (keyEvent: { key: string; preventDefault: () => void }) => {
    if (keyEvent.key === 'Enter') {
      document.getElementById('changePasswordButton')?.focus();
      checkValidations();
      keyEvent.preventDefault();
    }
  };

  return (
    <div className="change_password_container">
      <div className="change_password_container_layout fade_in_animation_for_container">
        <div className="change_password_container_heading">
          {UiLables.LABELS.SET_A_NEW_PASSWORD}
        </div>
        <div className="change_password_container_inputs">
          <div className="change_password_container_input_email">
            <label className="change_password_container_input_label">
              {UiLables.LABELS.NEW_PASSWORD}
            </label>
            {isShowPasswordNewEnabled ? (
              <input
                autoFocus
                id="passwordNewInput"
                className={`${
                  validateInputs.passwordNew.display
                    ? 'change_password_container_input_box_error'
                    : ''
                } change_password_container_input_box`}
                type="password"
                maxLength={passwordMaxLength}
                placeholder={UiLables.LABELS.NEWPASSWORD_PLACEHOLDER}
                onKeyDown={focusPasswordConfirmInput}
                onChange={(event) => {
                  setPasswordNew(event.target.value);
                  setValidateInputs(validateInputsObject);
                }}
                value={passwordNew}
              />
            ) : (
              <input
                autoFocus
                id="passwordNewInput"
                className={`${
                  validateInputs.passwordNew.display
                    ? 'change_password_container_input_box_error'
                    : ''
                } change_password_container_input_box`}
                type="text"
                maxLength={passwordMaxLength}
                placeholder={UiLables.LABELS.NEWPASSWORD_PLACEHOLDER}
                onKeyDown={focusPasswordConfirmInput}
                onChange={(event) => {
                  setPasswordNew(event.target.value);
                  setValidateInputs(validateInputsObject);
                }}
                value={passwordNew}
              />
            )}
            <button
              type="button"
              id="passwordRevealButton"
              className="change_password_container_input_password_showicon"
              onClick={() => {
                setIsShowPasswordNewEnabled(!isShowPasswordNewEnabled);
              }}
            >
              {isShowPasswordNewEnabled ? (
                <img
                  draggable="false"
                  src={showPasswordIcon}
                  alt="Show Password"
                />
              ) : (
                <img
                  draggable="false"
                  src={dontShowPasswordIcon}
                  alt="Don't Show Password"
                />
              )}
            </button>
            {validateInputs.passwordNew.display &&
            validateInputs.passwordNew.message !== '' ? (
              <span className="change_password_container_input_error">
                <ErrorMessagePopup
                  errorMessage={validateInputs.passwordNew.message}
                />
              </span>
            ) : (
              <></>
            )}
          </div>
          <div className="change_password_container_input_password">
            <label className="change_password_container_input_label">
              {UiLables.LABELS.CONFIRM_PASSWORD}
            </label>
            {isShowPasswordConfirmEnabled ? (
              <input
                id="passwordConfirmInput"
                className={`${
                  validateInputs.passwordConfirm.display
                    ? 'change_password_container_input_box_error'
                    : ''
                } change_password_container_input_box`}
                type="password"
                maxLength={passwordMaxLength}
                placeholder={UiLables.LABELS.CONFIRMPASSWORD_PLACEHOLDER}
                onKeyDown={focusChangePasswordButton}
                onChange={(event) => {
                  setPasswordConfirm(event.target.value);
                  setValidateInputs(validateInputsObject);
                }}
                value={passwordConfirm}
              />
            ) : (
              <input
                id="passwordConfirmInput"
                className={`${
                  validateInputs.passwordConfirm.display
                    ? 'change_password_container_input_box_error'
                    : ''
                } change_password_container_input_box`}
                type="text"
                maxLength={passwordMaxLength}
                placeholder={UiLables.LABELS.CONFIRMPASSWORD_PLACEHOLDER}
                onKeyDown={focusChangePasswordButton}
                onChange={(event) => {
                  setPasswordConfirm(event.target.value);
                  setValidateInputs(validateInputsObject);
                }}
                value={passwordConfirm}
              />
            )}
            <button
              type="button"
              id="passwordRevealButton"
              className="change_password_container_input_password_showicon"
              onClick={() => {
                setIsShowPasswordConfirmEnabled(!isShowPasswordConfirmEnabled);
              }}
            >
              {isShowPasswordConfirmEnabled ? (
                <img
                  draggable="false"
                  src={showPasswordIcon}
                  alt="Show Password"
                />
              ) : (
                <img
                  draggable="false"
                  src={dontShowPasswordIcon}
                  alt="Don't Show Password"
                />
              )}
            </button>
            {validateInputs.passwordConfirm.display &&
            validateInputs.passwordConfirm.message !== '' ? (
              <span className="change_password_container_input_error">
                <ErrorMessagePopup
                  errorMessage={validateInputs.passwordConfirm.message}
                />
              </span>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="change_password_container_login_bt">
          <button
            disabled={passwordNew === '' || passwordConfirm === ''}
            id="changePasswordButton"
            onPointerDown={() => {
              setChangePasswordPressed(true);
            }}
            onPointerUp={() => {
              setChangePasswordPressed(false);
            }}
            onPointerOut={() => {
              setChangePasswordPressed(false);
            }}
            className={`${
              changePasswordPressed
                ? 'light_blue_btn_pressed'
                : 'light_blue_btn'
            } ${
              passwordNew === '' || passwordConfirm === '' ? 'btn_disabled' : ''
            } ${isChangePasswordInprogress ? 'btn_deactivated' : ''}`}
            type="button"
            onClick={checkValidations}
          >
            {UiLables.LABELS.CHANGE_PASSWORD}
          </button>
        </div>
      </div>
    </div>
  );
};



export default ChangePassword;
