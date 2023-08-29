// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable import/no-named-as-default */
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import RoutePaths from 'renderer/constants/RoutePaths.constants';
// import UiLables from 'renderer/constants/UiLables.constants';
// import buttonClickSound from 'renderer/utils/ButtonClick.util';
// import './ForgotPasswordConfirmation.scss';

// interface IProps {
//   productDetails: any;
// }

// const ForgetPasswordConfirmation: React.FC<IProps> = ({
//   productDetails,
// }: IProps) => {
//   const navigate = useNavigate();

//   const [returnLoginPressed, setReturnLoginPressed] = useState(false);

//   return (
//     <div className="forgot_password_confirm_container">
//       <div className="forgot_password_confirm_container_layout fade_in_animation_for_container">
//         <div className="forgot_password_confirm_heading">
//           {UiLables.LABELS.CHECK_YOUR_EMAIL}
//         </div>
//         <div className="forgot_password_confirm_info1">
//           {UiLables.LABELS.FORGOT_PASSWORD_INFO1}
//           {` `}
//           <span className="forgot_password_confirm_info1_email">
//             {productDetails.adminSentEmail}
//           </span>
//         </div>
//         <div className="forgot_password_confirm_info2">
//           {UiLables.LABELS.FORGOT_PASSWORD_INFO2}
//         </div>
//         <div className="forgot_password_confirm_loginbtn">
//           <button
//             onPointerDown={() => {
//               setReturnLoginPressed(true);
//             }}
//             onPointerUp={() => {
//               setReturnLoginPressed(false);
//             }}
//             onPointerOut={() => {
//               setReturnLoginPressed(false);
//             }}
//             className={`${
//               returnLoginPressed ? 'light_blue_btn_pressed' : 'light_blue_btn'
//             }`}
//             type="button"
//             onClick={() => {
//               buttonClickSound();
//               navigate(RoutePaths.LOGIN_CARD);
//             }}
//           >
//             {UiLables.LABELS.RETURN_TO_LOGIN}
//           </button>
//         </div>
//         <div className="forgot_password_confirm_infofooter">
//           <span className="forgot_password_confirm_infofooter_que">
//             {UiLables.LABELS.FORGOT_PASSWORD_INFOFOOTER1}
//           </span>
//           {` `}
//           {UiLables.LABELS.FORGOT_PASSWORD_INFOFOOTER2}
//           {` `}
//           {productDetails.contactHatchSupport}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ForgetPasswordConfirmation;
// import React from "react";
const ForgetPasswordConfirmation = () => {
  return <div>This is Forgot password confirmation screen</div>;
};

export default ForgetPasswordConfirmation;
