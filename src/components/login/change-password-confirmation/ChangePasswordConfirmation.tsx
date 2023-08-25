/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-named-as-default */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '../../../constants/Routepaths.constants';
import { UiLables } from '../../../constants/UiLables.constants';
import buttonClickSound from '../../../utils/ButtonClick.util';
import './ChangePasswordConfirmation.scss';
import React from 'react';

interface IProps {
  // setEulaDetails: (data: any) => void;
  // productDetails: any;
}

const ChangePasswordConfirmation: React.FC<IProps> = ({} // setEulaDetails,
// productDetails,
: IProps) => {
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId');
  const eulaLatestVersion = localStorage.getItem('eulaLatestVersion');
  let userIndex: any;

  let acceptedEulaUserDetails: any = localStorage.getItem('acceptedEulaUserDetails');

  if (acceptedEulaUserDetails) {
    acceptedEulaUserDetails = JSON.parse(acceptedEulaUserDetails);
  } else {
    acceptedEulaUserDetails = [];
  }

  const [continuePressed, setContinuePressed] = useState(false);

  const routeAfterContinue = () => {
    userIndex = acceptedEulaUserDetails.findIndex((element: any) => element.userId === userId);
    if (userIndex !== -1) {
      if (acceptedEulaUserDetails[userIndex].eulaVersion === eulaLatestVersion) {
        navigate(RoutePaths.DYNAMIC_LOADER);
      } else {
        navigate(RoutePaths.EULA);
      }
    } else {
      navigate(RoutePaths.EULA);
    }
  };

  return (
    <div className='change_password_confirm_container'>
      <div className='change_password_confirm_container_layout fade_in_animation_for_container'>
        <div className='change_password_confirm_heading'>{UiLables.LABELS.PASSWORD_UPDATED}</div>
        <div className='change_password_confirm_info1'>{UiLables.LABELS.CHANGE_PASSWORD_CONFIRM_INFO}</div>
        <div className='change_password_confirm_info2'>
          {UiLables.LABELS.CHANGE_PASSWORD_CONFIRM_SECTION.FIRST}
          {` `}
          <span className='change_password_confirm_info2_continue'>{UiLables.LABELS.CHANGE_PASSWORD_CONFIRM_SECTION.CONTINUE}</span>
          {` `}
          {UiLables.LABELS.CHANGE_PASSWORD_CONFIRM_SECTION.LAST}
        </div>
        <div className='change_password_confirm_loginbtn'>
          <button
            onPointerDown={() => {
              setContinuePressed(true);
            }}
            onPointerUp={() => {
              setContinuePressed(false);
            }}
            onPointerOut={() => {
              setContinuePressed(false);
            }}
            className={`${continuePressed ? 'light_blue_btn_pressed' : 'light_blue_btn'}`}
            type='button'
            onClick={() => {
              buttonClickSound();
              routeAfterContinue();
            }}
          >
            {UiLables.LABELS.CHANGE_PASSWORD_CONFIRM_SECTION.CONTINUE}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordConfirmation;
