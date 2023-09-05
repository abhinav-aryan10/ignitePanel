import './App.scss';
import React, { useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import NavigateToRespectivePath from './components/NavigateToRespectivePath';
import { SpecificPaths } from './constants/Routepaths.constants';
import LoginContainer from './pages/login-container/LoginContainer';
import LoginCard from './components/login/login-card/LoginCard';
import Eula from './components/generic/eula/Eula';
import PrivacyPolicy from './components/generic/privacy-policy/PrivacyPolicy';
import ForgetPasswordConfirmation from './components/login/forgot-password-confirmation/ForgotPasswordConfirmation';
import ForgetPassword from './components/login/forgot-password/ForgotPassword';
import ChangePassword from './components/login/change-password/ChangePassword';
import ChangePasswordConfirmation from './components/login/change-password-confirmation/ChangePasswordConfirmation';

function App() {
  const [productDetails, setProductDetails] = useState({});
  const [loginDetails, setLoginDetails] = useState({});
  const [eulaDetails, setEulaDetails] = useState({});
  const [generalMessage, setGeneralMessage] = useState({});
  const [isLogoutOnAccessPanel, setIsLogoutOnAccessPanel] = useState(true);
  const [displayGearBox, setDisplayGearBox] = useState(false);
  const setLoginDetailsRef = (loginData: any) => {
    setLoginDetails(loginData);
  };

  const setEulaDetailsRef = (eulaData: any) => {
    setEulaDetails(eulaData);
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <NavigateToRespectivePath
              setLoginDetails={setLoginDetails}
              setEulaDetails={setEulaDetails}
              setProductDetails={setProductDetails}
              setGeneralMessage={setGeneralMessage}
              setIsLogoutOnAccessPanel={setIsLogoutOnAccessPanel}
              productDetails={productDetails}
            />
          }
        />
        <Route
          path={SpecificPaths.LOGIN}
          element={
            <LoginContainer
              displayGearBox={displayGearBox}
              productDetails={productDetails}
              loginDetails={loginDetails}
              isLogoutOnAccessPanel={isLogoutOnAccessPanel}
              setLoginDetails={setLoginDetailsRef}
              setIsLogoutOnAccessPanel={setIsLogoutOnAccessPanel}
              setGeneralMessage={setGeneralMessage}
            />
          }
        >
          <Route
            path={SpecificPaths.LOGIN_CARD}
            element={
              <LoginCard
                setLoginDetails={setLoginDetailsRef}
                setEulaDetails={setEulaDetailsRef}
                productDetails={productDetails}
                setGeneralMessage={setGeneralMessage}
                setIsLogoutOnAccessPanel={setIsLogoutOnAccessPanel}
                setDisplayGearBox={setDisplayGearBox}
              />
            }
          />
          <Route path={SpecificPaths.EULA} element={<Eula />} />
          <Route path={SpecificPaths.PRIVACY_POLICY} element={<PrivacyPolicy />} />
          <Route path={SpecificPaths.FORGET_PASSWORD} element={<ForgetPassword />} />
          <Route path={SpecificPaths.FORGET_PASSWORD_CONFIRM} element={<ForgetPasswordConfirmation productDetails={productDetails} />} />
          <Route path={SpecificPaths.CHANGE_PASSWORD} element={<ChangePassword />} />
          <Route path={SpecificPaths.CHANGE_PASSWORD_CONFIRM} element={<ChangePasswordConfirmation />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
