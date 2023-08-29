// /* eslint-disable jsx-a11y/no-autofocus */
// /* eslint-disable import/no-named-as-default */
// /* eslint-disable jsx-a11y/label-has-associated-control */
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import ErrorMessagePopup from '../../generic/validation-tooltip/ValidationTooltip';
// import { emailMaxLength } from '../../../configs/Login.config';
// import { RoutePaths } from '../../../constants/Routepaths.constants';
// import UiLables from '../../../constants/UiLables.constants';
// import { sendResetPasswordLink } from '../../../utils/AwsCognito.util';
// import buttonClickSound from '../../../utils/ButtonClick.util';
// import Regex from '../../../utils/Regex.util';
// import './ForgotPassword.scss';
// import React from 'react';

// const validateInputsObject = {
//   email: {
//     display: false,
//     message: ''
//   }
// };

function ForgetPassword() {
  // const navigate = useNavigate();

  // const [emailAddress, setEmailAddress] = useState('');
  // const [validateInputs, setValidateInputs] = useState(validateInputsObject);
  // const [sendLinkPressed, setSendLinkPressed] = useState(false);
  // const [sendLinkInprogress, setIsSendLinkInprogress] = useState(false);
  // const [returnLoginPressed, setReturnLoginPressed] = useState(false);

  // const checkValidations = () => {
  //   if (emailAddress !== '' && !sendLinkInprogress) {
  //     buttonClickSound();
  //     setIsSendLinkInprogress(true);
  //     if (!Regex.email.test(emailAddress)) {
  //       setValidateInputs({
  //         email: {
  //           display: true,
  //           message: UiLables.VALIDATIONS.EMAIL_NOT_VALID
  //         }
  //       });
  //       setIsSendLinkInprogress(false);
  //     } else {
  //       // TO DO: Send Link API call will happen here\
  //       // TO DO: Call cognito forgot password
  //       sendResetPasswordLink({ email: emailAddress })
  //         .then((res: any) => {
  //           if (res.status === 'success') {
  //             setValidateInputs({
  //               email: {
  //                 display: false,
  //                 message: ''
  //               }
  //             });
  //             navigate(RoutePaths.FORGET_PASSWORD_CONFIRM);
  //             setIsSendLinkInprogress(false);
  //           }
  //         })
  //         .catch(() => {
  //           // log.error(error);
  //           setValidateInputs({
  //             email: {
  //               display: true,
  //               message: UiLables.VALIDATIONS.EMAIL_INCORRECT
  //             }
  //           });
  //           setIsSendLinkInprogress(false);
  //           setTimeout(() => {
  //             document.getElementById('emailInputToSendLink')?.focus();
  //           });
  //         });
  //     }
  //   }
  // };

  // const focusSendLinkButton = (keyEvent: { key: string; preventDefault: () => void }) => {
  //   if (keyEvent.key === 'Enter') {
  //     if (emailAddress !== '') {
  //       checkValidations();
  //     }
  //     keyEvent.preventDefault();
  //   }
  // };

  // return (
  //   <div className='forgot_password_container'>
  //     <div className='forgot_password_container_layout fade_in_animation_for_container'>
  //       <div className='forgot_password_heading'>{UiLables.LABELS.RESET_YOUR_PASSWORD}</div>
  //       <div className='forgot_password_info'>{UiLables.LABELS.RESET_PASSOWPRD_INFO}</div>
  //       <div className='forgot_password_inputs'>
  //         <div className='forgot_password_input_email'>
  //           <label className='forgot_password_input_label'>{UiLables.LABELS.EMAIL_ADDRESS}</label>
  //           <input
  //             autoFocus
  //             id='emailInputToSendLink'
  //             tabIndex={0}
  //             className={`${validateInputs.email.display ? 'forgot_password_input_box_error' : ''} forgot_password_input_box`}
  //             type='text'
  //             maxLength={emailMaxLength}
  //             placeholder={UiLables.LABELS.EMAIL_PLACEHOLDER}
  //             onKeyDown={focusSendLinkButton}
  //             onChange={(event) => {
  //               setEmailAddress(event.target.value);
  //               setValidateInputs(validateInputsObject);
  //             }}
  //             value={emailAddress}
  //           />
  //           {validateInputs.email.display && validateInputs.email.message !== '' ? (
  //             <span className='forgot_password_input_error'>
  //               <ErrorMessagePopup errorMessage={validateInputs.email.message} />
  //             </span>
  //           ) : (
  //             <></>
  //           )}
  //         </div>
  //       </div>
  //       <div className='forgot_password_send_link_btn'>
  //         <button
  //           disabled={emailAddress === ''}
  //           id='sendLinkButton'
  //           onPointerDown={() => {
  //             setSendLinkPressed(true);
  //           }}
  //           onPointerUp={() => {
  //             setSendLinkPressed(false);
  //           }}
  //           onPointerOut={() => {
  //             setSendLinkPressed(false);
  //           }}
  //           className={`${sendLinkPressed ? 'light_blue_btn_pressed' : 'light_blue_btn'} ${emailAddress === '' ? 'btn_disabled' : ''} ${
  //             sendLinkInprogress ? 'btn_deactivated' : ''
  //           }`}
  //           type='button'
  //           onClick={checkValidations}
  //         >
  //           {UiLables.LABELS.SEND_ME_A_LINK}
  //         </button>
  //       </div>
  //       <div className='forgot_passowrd_loginpage_btn'>
  //         <button
  //           onPointerDown={() => {
  //             setReturnLoginPressed(true);
  //           }}
  //           onPointerUp={() => {
  //             setReturnLoginPressed(false);
  //           }}
  //           onPointerOut={() => {
  //             setReturnLoginPressed(false);
  //           }}
  //           className={`${returnLoginPressed ? 'thick_purple_btn_pressed' : 'thick_purple_btn'}`}
  //           type='button'
  //           onClick={() => {
  //             buttonClickSound();
  //             navigate(RoutePaths.LOGIN_CARD);
  //           }}
  //         >
  //           {UiLables.LABELS.RETURN_TO_LOGIN}
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  // );

  return(
    <div>Forgot Pw</div>
  )
}

export default ForgetPassword;
