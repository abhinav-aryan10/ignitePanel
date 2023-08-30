import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import log from 'loglevel';
import { RoutePaths } from '../constants/Routepaths.constants';
import getProductDetails, { getUserDetails } from '../services/Auth.service';
import exitToDesktopUtil from '../utils/ExitToDesktop.util';
import getExploreWpsDetails from '../services/exploreWps.service';
import { logoutUser } from '../utils/AwsCognito.util';

interface IProps {
  setLoginDetails: (data: any) => void;
  setEulaDetails: (data: any) => void;
  setProductDetails: (data: any) => void;
  setGeneralMessage: (data: any) => void;
  setIsLogoutOnAccessPanel: (data: any) => void;
  productDetails: any;
}

const NavigateToRespectivePath: React.FC<IProps> = ({
  setLoginDetails,
  // setEulaDetails,
  setGeneralMessage,
  setProductDetails,
  setIsLogoutOnAccessPanel // productDetails
}: IProps) => {
  const navigate = useNavigate();

  const previousAccessToken = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : '';
  let acceptedEulaUserDetails: any = localStorage.getItem('acceptedEulaUserDetails');

  if (acceptedEulaUserDetails) {
    acceptedEulaUserDetails = JSON.parse(acceptedEulaUserDetails);
  } else {
    acceptedEulaUserDetails = [];
  }

  const userId = localStorage.getItem('userId');
  const eulaLatestVersion = localStorage.getItem('eulaLatestVersion');
  const userIndex = acceptedEulaUserDetails.findIndex((element: any) => element.userId === userId);
  const setPath = (navigatePath: string) => {
    navigate(navigatePath);
  };

  const continueToLoginCard = () => {
    setPath(RoutePaths.LOGIN_CARD);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userIdToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userIdtokenExpiry');
    localStorage.removeItem('email');
    localStorage.removeItem('userId');
    sessionStorage.removeItem('upgradePopupDisplayed');
    setLoginDetails({});
  };

  const tryAgain = () => {
    if (window.navigator.onLine) {
      navigate(-1);
    } else {
      setGeneralMessage({
        errorCode: 'A-1001',
        PrimaryBtnFn: exitToDesktopUtil,
        SecondaryBtnFn: tryAgain
      });
      setPath(RoutePaths.GENERAL_MESSAGE);
    }
  };

  const handleNetworkChange = () => {
    if (navigator.onLine) {
      getProductDetails()
        .then((res) => {
          if (res) {
            setProductDetails(res.payload.data);
            // localStorage.setItem('applicationVersion', JSON.stringify(applicationVersion));
            localStorage.setItem('applicationVersion', '3.0.0');
            localStorage.setItem(
              'productDetails',
              JSON.stringify({
                productId: res.payload.data.id,
                version: res.payload.data.latestVersion,
                eulaContent: res.payload.data.eula.content
              })
            );

            if (previousAccessToken !== '') {
              getUserDetails()
                .then((userRes) => {
                  if (userRes) {
                    localStorage.setItem('userDetail', JSON.stringify(userRes));
                    setLoginDetails(userRes);
                    if (userRes.payload.data.license.success !== true) {
                      setGeneralMessage({
                        errorCode: 'R-1002',
                        PrimaryBtnFn: exitToDesktopUtil,
                        SecondaryBtnFn: logout
                      });
                      setIsLogoutOnAccessPanel(false);
                      setPath(RoutePaths.GENERAL_MESSAGE);
                    } else if (userRes.payload.data.user[0].resetRequired === 1) {
                      setPath(RoutePaths.CHANGE_PASSWORD);
                    } else if (userIndex !== -1) {
                      if (acceptedEulaUserDetails[userIndex].eulaVersion === eulaLatestVersion) {
                        getExploreWpsDetails()
                          .then((exploreRes: any) => {
                            localStorage.setItem('gameDetails', JSON.stringify(exploreRes));
                          })
                          .catch((error) => {
                            log.error(error);
                            if (error.response.status === 422) {
                              logoutUser();
                              localStorage.removeItem('userIdToken');
                              localStorage.removeItem('refreshToken');
                              localStorage.removeItem('userIdtokenExpiry');
                              localStorage.removeItem('email');
                              localStorage.removeItem('accessToken');
                              localStorage.removeItem('userId');
                              localStorage.removeItem('sub');
                              sessionStorage.removeItem('upgradePopupDisplayed');
                              setGeneralMessage({
                                errorCode: 'API_EMAIL_UPDATE_1001',
                                PrimaryBtnFn: continueToLoginCard,
                                SecondaryBtnFn: ''
                              });
                              setPath(RoutePaths.GENERAL_MESSAGE);
                            } else {
                              navigate(RoutePaths.GENERAL_MESSAGE, {
                                state: {
                                  errorCode: 'API-1001',
                                  P2: error.response.status,
                                  P3: error.message
                                }
                              });
                            }
                          });
                      } else {
                        setGeneralMessage({
                          errorCode: 'R-1003'
                        });
                        setIsLogoutOnAccessPanel(false);
                        setPath(RoutePaths.GENERAL_MESSAGE);
                        // navigate(RoutePaths.GENERAL_MESSAGE);
                      }
                    } else {
                      navigate(RoutePaths.EULA);
                    }
                  } else {
                    logout();
                    setPath(RoutePaths.LOGIN_CARD);
                  }
                })
                .catch((error) => {
                  log.error(error);
                  console.log(error, 'user details error message ');
                  if (error.response.status === 422) {
                    logoutUser();
                    localStorage.removeItem('userIdToken');
                    localStorage.removeItem('refreshToken');
                    localStorage.removeItem('userIdtokenExpiry');
                    localStorage.removeItem('email');
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('userId');
                    localStorage.removeItem('sub');
                    sessionStorage.removeItem('upgradePopupDisplayed');
                    setGeneralMessage({
                      errorCode: 'API_EMAIL_UPDATE_1001',
                      PrimaryBtnFn: continueToLoginCard,
                      SecondaryBtnFn: ''
                    });
                    setPath(RoutePaths.GENERAL_MESSAGE);
                  } else {
                    navigate(RoutePaths.GENERAL_MESSAGE, {
                      state: {
                        errorCode: 'API-1001',
                        P2: error.response.status,
                        P3: error.message
                      }
                    });
                  }
                });
            } else {
              // TO DO: disable value proposition screen
              // setPath(RoutePaths.VALUE_PROPOSION);
              logout();
              setPath(RoutePaths.LOGIN_CARD);
            }
          }
        })
        .catch((error) => {
          log.error(error);
          if (error.response.status === 422) {
            logoutUser();
            localStorage.removeItem('userIdToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('userIdtokenExpiry');
            localStorage.removeItem('email');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('userId');
            localStorage.removeItem('sub');
            sessionStorage.removeItem('upgradePopupDisplayed');
            setGeneralMessage({
              errorCode: 'API_EMAIL_UPDATE_1001',
              PrimaryBtnFn: continueToLoginCard,
              SecondaryBtnFn: ''
            });
            setPath(RoutePaths.GENERAL_MESSAGE);
          } else {
            navigate(RoutePaths.GENERAL_MESSAGE, {
              state: {
                errorCode: 'API-1001',
                P2: error.response.status,
                P3: error.message
              }
            });
          }
        });
    } else {
      console.log('No internet');
      setGeneralMessage({
        errorCode: 'A-1001',
        PrimaryBtnFn: exitToDesktopUtil,
        SecondaryBtnFn: tryAgain
      });
      setPath(RoutePaths.GENERAL_MESSAGE);
    }
  };

  useEffect(() => {
    handleNetworkChange();
  }, []);
  window.addEventListener('offline', () => {
    handleNetworkChange();
  });
  return <div className='navigate_to_respective_component_container' />;
};

export default NavigateToRespectivePath;
