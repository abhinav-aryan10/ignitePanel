import './App.scss';
// import { useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { MemoryRouter as Routes, Route, BrowserRouter } from 'react-router-dom';
import NavigateToRespectivePath from './components/NavigateToRespectivePath';
import { RoutePaths } from './constants/Routepaths.constants';
import LoginContainer from './pages/login-container/LoginContainer';
import LoginCard from './components/login/login-card/LoginCard';
import Eula from './components/generic/eula/Eula';
import PrivacyPolicy from './components/generic/privacy-policy/PrivacyPolicy';
import ForgetPasswordConfirmation from './components/login/forgot-password-confirmation/ForgotPasswordConfirmation';
import ForgetPassword from './components/login/forgot-password/ForgotPassword';
import ChangePassword from './components/login/change-password/ChangePassword';
import ChangePasswordConfirmation from './components/login/change-password-confirmation/ChangePasswordConfirmation';

function App() {
  // const [productDetails, setProductDetails] = useState({});
  // const [loginDetails, setLoginDetails] = useState({});
  // const [eulaDetails, setEulaDetails] = useState({});
  // const [generalMessage, setGeneralMessage] = useState({});
  // const [isLogoutOnAccessPanel, setIsLogoutOnAccessPanel] = useState(true);
  // const [displayGearBox, setDisplayGearBox] = useState(false);
  // const setLoginDetailsRef = (loginData: any) => {
  //   setLoginDetails(loginData);
  // };

  // const setEulaDetailsRef = (eulaData: any) => {
  //   setEulaDetails(eulaData);
  // };
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<NavigateToRespectivePath />} />
        <Route path={RoutePaths.LOGIN} element={<LoginContainer />}>
          <Route
            path={RoutePaths.LOGIN_CARD}
            element={
              <LoginCard
              // setLoginDetails={setLoginDetailsRef}
              // setEulaDetails={setEulaDetailsRef}
              // productDetails={productDetails}
              // setGeneralMessage={setGeneralMessage}
              // setIsLogoutOnAccessPanel={setIsLogoutOnAccessPanel}
              // setDisplayGearBox={setDisplayGearBox}
              />
            }
          />
          <Route path={RoutePaths.EULA} element={<Eula />} />
          <Route path={RoutePaths.PRIVACY_POLICY} element={<PrivacyPolicy />} />
          <Route path={RoutePaths.FORGET_PASSWORD} element={<ForgetPassword />} />
          <Route path={RoutePaths.FORGET_PASSWORD_CONFIRM} element={<ForgetPasswordConfirmation />} />
          <Route path={RoutePaths.CHANGE_PASSWORD} element={<ChangePassword />} />
          <Route path={RoutePaths.CHANGE_PASSWORD_CONFIRM} element={<ChangePasswordConfirmation />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
