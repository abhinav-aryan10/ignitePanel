/* eslint-disable react/button-has-type */
/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import './LoginContainer.scss';
import { RoutePaths } from '../../../src/constants/Routepaths.constants';
import buttonClickSound from '../../utils/ButtonClick.util';
import { licenseTypeFree, licenseTypePaid } from '../../constants/Login.constants';
import React from 'react';

// const gearIcon = require('renderer/assets/icons/gear.png');

interface IProps {
  displayGearBox: boolean;
  productDetails: any;
  loginDetails: any;
  isLogoutOnAccessPanel: boolean;
  setLoginDetails: (data: any) => void;
  setIsLogoutOnAccessPanel: (data: boolean) => void;
  setGeneralMessage: (data: any) => void;
}

// const LoginClietIcon = require('renderer/assets/images/wps_moon_logo.png');

const LoginContainer: React.FC<IProps> = ({
  displayGearBox,
  // productDetails,
  loginDetails,
  isLogoutOnAccessPanel,
  setLoginDetails,
  setIsLogoutOnAccessPanel,
  setGeneralMessage
}: IProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [accessPanelStatus, setAccessPanelStatus] = useState(false);
  const checkUpgradePopupDisplayedOrNot = sessionStorage.getItem('upgradePopupDisplayed');
  const closeAccessPanelWithAnimation = () => {
    document.getElementById('accessPanelContainer')?.classList.add('top_to_bottom_animation_for_accesspanel');
  };

  const setAccessPanel = (clickEvent: { detail: number }) => {
    if (clickEvent.detail !== 0) {
      buttonClickSound();
      if (accessPanelStatus) {
        closeAccessPanelWithAnimation();
      } else {
        setAccessPanelStatus(!accessPanelStatus);
      }
    }
  };

  const setAccessPanelOnEnter = (keyEvent: { key: string }) => {
    if (keyEvent.key === 'Enter') {
      buttonClickSound();
      if (accessPanelStatus) {
        closeAccessPanelWithAnimation();
      } else {
        setAccessPanelStatus(!accessPanelStatus);
      }
    }
  };

  const setPath = (navigatePath: string) => {
    navigate(navigatePath);
  };
  const onCorrectButtonsOrder = () => {
    let userDetails: any = localStorage.getItem('userDetail');
    userDetails = userDetails ? JSON.parse(userDetails) : '';
    let licenseType = userDetails?.payload?.data?.user[0]?.licenseType;
    if (licenseType) {
      licenseType = licenseType.toLowerCase();
    }
    if ((isLogoutOnAccessPanel && licenseType === licenseTypePaid) || checkUpgradePopupDisplayedOrNot === '1') {
      // handleNavigateToInsights('');
      navigate(RoutePaths.DASHBOARD);
    } else if ((isLogoutOnAccessPanel && licenseType === licenseTypeFree) || checkUpgradePopupDisplayedOrNot !== '1') {
      setGeneralMessage({
        errorCode: 'UPGRADE_1001',
        PrimaryBtnFn: '',
        SecondaryBtnFn: continueToUseApp
      });
      setPath(RoutePaths.GENERAL_MESSAGE);
      // handleNavigateToInsights('');
    } else {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userIdToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userIdtokenExpiry');
      localStorage.removeItem('email');
      localStorage.removeItem('userId');
      setLoginDetails({});
      navigate(RoutePaths.LOGIN_CARD);
      sessionStorage.removeItem('upgradePopupDisplayed');

      setIsLogoutOnAccessPanel(true);
    }
  };
  const continueToUseApp = () => {
    sessionStorage.setItem('upgradePopupDisplayed', '1');
    navigate(RoutePaths.DASHBOARD);
    onCorrectButtonsOrder();
  };

  return (
    <div className='login_container'>
      {RoutePaths.EULA === location.pathname ||
      RoutePaths.PRIVACY_POLICY === location.pathname ||
      RoutePaths.GENERAL_MESSAGE === location.pathname ||
      RoutePaths.DYNAMIC_LOADER === location.pathname ? (
        <></>
      ) : (
        <div className='login_container_icon'>
          {/* <img draggable='false' className='login_container_icon_img' src={LoginClietIcon} alt='Login Client' /> */}
        </div>
      )}
      <Outlet />
      {Object.keys(loginDetails).length !== 0 && RoutePaths.GENERAL_MESSAGE === location.pathname && displayGearBox ? (
        <div>
          <div>
            {accessPanelStatus ? (
              <div id='accessPanelContainer' className='login_container_access_panel bottom_to_top_animation_for_accesspanel'></div>
            ) : (
              <></>
            )}
          </div>
          <button
            type='button'
            className='login_container_gear'
            onKeyDown={setAccessPanelOnEnter}
            onClick={setAccessPanel}
            style={accessPanelStatus ? { pointerEvents: 'none' } : {}}
          >
            {/* <img draggable='false' src={gearIcon} alt='gear' className={accessPanelStatus ? 'login_container_gear_img_small' : ''} /> */}
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default LoginContainer;
