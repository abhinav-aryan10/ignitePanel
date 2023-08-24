import { defaultTemporaryPassword } from '../services/BaseUrl';

/* eslint-disable prefer-promise-reject-errors */
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

/* This function might be helpful after API gateway integration */
// function asyncAuthenticateUser(cognitoUser, cognitoAuthenticationDetails) {
//   return new Promise(function (resolve, reject) {
//     cognitoUser.authenticateUser(cognitoAuthenticationDetails, {
//       onSuccess: resolve,
//       onFailure: reject,
//       newPasswordRequired: resolve,
//     });
//   });
// }
/*
DOCS:
 Check if user is part of the user pool.
 On success
 ------ return access token and user details.
 ------ resolve({ status: 'logged-in', data }) resolves the promise and sends
        logged-in string and response login data to LoginCard
 On failure
 -------  reject({ rejectErrorCode: '400', rejectError }) rejects the promise
 -------  and send 400 error code and sends the error why it rejected to LoginCard
 On newPasswordRequired
 -------  resolve({ status: 're-login' }) resolves and sends re-login indicating
 -------  user to relogin again
*/

// Staging
const poolData = {
  UserPoolId: 'us-east-1_P0YaAdTXE',
  ClientId: '7akrqreb1vu3o4rb653022190k',
};

// // QA
// const poolData = {
//   UserPoolId: 'us-east-1_unqLppMJI',
//   ClientId: 'ettnt5m9dlkggpd9sahv561bt',
// };

// // Prod
// const poolData = {
//   UserPoolId: 'us-east-1_8Voes6qM6',
//   ClientId: '66gflm34amgm91nkq6ef9u449f',
// };

// const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

export default async function getApiAccessToken(requestBody: any) {
  // const user = new AmazonCognitoIdentity.CognitoUser({
  //   Username: requestBody.email,
  //   Pool: userPool,
  // });

  const userPoolDetail = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  const user = new AmazonCognitoIdentity.CognitoUser({
    Username: requestBody.email,
    Pool: userPoolDetail,
  });

  return new Promise((resolve, reject) => {
    user.authenticateUser(
      new AmazonCognitoIdentity.AuthenticationDetails({
        Username: requestBody.email,
        Password: requestBody.password,
      }),
      {
        onSuccess: (res: any) => {
          // TO DO: Need to be removed after successfull API integration
          const data = {
            email: '',
            userName: '',
            token: '',
            idToken: '',
            refreshToken: '',
            exp: '',
            sub: '',
          };

          // console.log('data resp from cognito', res);

          // console.log('User dets');
          // console.log(cognitoUserDetails.user);

          data.token = res.getAccessToken().getJwtToken();
          data.idToken = res.getIdToken().getJwtToken();
          data.refreshToken = res.getRefreshToken().getToken();
          data.exp = res.getIdToken().payload.exp;
          data.userName = res.getIdToken().payload.name;
          data.email = res.getIdToken().payload.email;
          data.sub = res.getIdToken().payload.sub;

          resolve({ status: 'logged-in', data });
        },
        onFailure: (rejectError: any) => {
          reject({
            rejectErrorCode: rejectError.code,
            rejectError: rejectError.message,
          });
          // reject({
          //   rejectErrorCode: 'InternalFailure',
          //   rejectError: 'Internal Server error',
          // });
        },
        newPasswordRequired: (userAttributes: any, requiredAttributes: any) => {
          delete userAttributes.email_verified;
          delete userAttributes.email;
          delete userAttributes.name;

          user.completeNewPasswordChallenge('Test@123', userAttributes, {
            onFailure: (err: any) => console.log(err),
            onSuccess: (res: any) => console.log(res),
          });
          resolve({ status: 're-login' });
        },
      }
    );
  });
}

export async function refreshTokenUtil() {
  let userEmail = localStorage.getItem('email') as string;

  if (userEmail === '' || userEmail === undefined) {
    userEmail = localStorage.getItem('userEmail') as string;
  }
  const userPoolDetail = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  const user = new AmazonCognitoIdentity.CognitoUser({
    Username: userEmail,
    Pool: userPoolDetail,
  });

  return new Promise((resolve, reject) => {
    const refreshToken = localStorage.getItem('refreshToken') as string;

    const refreshtokenObject = new AmazonCognitoIdentity.CognitoRefreshToken({
      RefreshToken: refreshToken,
    });

    user.refreshSession(refreshtokenObject, function (err: any, session: any) {
      if (err) {
        reject({ status: err.message });
      }
      if (session) {
        const idToken = session.getIdToken().getJwtToken();

        const accessToken = session.getAccessToken().getJwtToken();
        const expiry = session.getIdToken().payload.exp;

        localStorage.removeItem('accessToken');
        localStorage.setItem('accessToken', accessToken);
        localStorage.removeItem('userIdToken');
        localStorage.setItem('userIdToken', idToken);
        localStorage.removeItem('userIdtokenExpiry');
        localStorage.setItem('userIdtokenExpiry', expiry);

        resolve({ status: 'success' });
      }
    });
  });
}

export async function logoutUser() {
  const userEmail = localStorage.getItem('email') as string;
  const userPoolDetail = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  const user = new AmazonCognitoIdentity.CognitoUser({
    Username: userEmail,
    Pool: userPoolDetail,
  });

  return new Promise((resolve, reject) => {
    console.log('logging out');
    user.signOut();
    resolve({ status: 'success' });
  });

  // TODO: remove , it is to check if session is ended
  // setTimeout(() => {
  //   console.log('is session valid or not');

  //   user.getSession(function (err: any, session: any) {
  //     if (err) {
  //       // console.log(`session validity: ${session.isValid()}`);
  //       console.log(err.message || JSON.stringify(err));
  //       return;
  //     }
  //     console.log(`session validity: ${session.isValid()}`);
  //   });
  // }, 5000);
}

export async function sendResetPasswordLink(userEmail: any) {
  const userPoolDetail = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  const user = new AmazonCognitoIdentity.CognitoUser({
    Username: userEmail.email,
    Pool: userPoolDetail,
  });

  return new Promise((resolve, reject) => {
    user.forgotPassword({
      onSuccess: (data: any) => {
        // successfully initiated reset password request
        console.log(
          `CodeDeliveryData from forgotPassword: ${JSON.stringify(data)}`
        );
        resolve({ status: 'success' });
      },
      onFailure: (err: any) => {
        console.log(err.message || JSON.stringify(err));
        reject({ status: err.message });
      },
    });
  });
}

export async function changeTemporaryPassword(requestBody: any) {
  const userPoolDetail = new AmazonCognitoIdentity.CognitoUserPool(poolData);
  return new Promise((resolve, reject) => {
    const currentUser = userPoolDetail.getCurrentUser();

    let oldPassword = String(sessionStorage.getItem('temporaryPassword')) || ''; // Random password
    // In case of persistant login
    if (oldPassword === '' || oldPassword === null || oldPassword === 'null') {
      oldPassword = defaultTemporaryPassword;
      // persistant login set hatch123 to session storage so reset can be called
      sessionStorage.setItem('temporaryPassword', defaultTemporaryPassword);
    }
    if (currentUser) {
      currentUser.getSession((err: any, session: any) => {
        if (err) {
          console.log(err);
          reject({ status: err.message });
        } else {
          currentUser.changePassword(
            oldPassword,
            requestBody.passwordConfirm,
            (error: any, result: any) => {
              if (error) {
                reject({ status: error.message });
              } else {
                resolve({ status: result });
              }
            }
          );
        }
      });
    }
  });
}

export async function resetTemporaryPassword(requestBody: any) {
  const userPoolDetail = new AmazonCognitoIdentity.CognitoUserPool(poolData);
  return new Promise((resolve, reject) => {
    const currentUser = userPoolDetail.getCurrentUser();

    if (currentUser) {
      currentUser.getSession((err: any, session: any) => {
        if (err) {
          console.log(err);
          reject({ status: err.message });
        } else {
          currentUser.changePassword(
            requestBody.passwordConfirm,
            requestBody.passwordToReset,
            (error: any, result: any) => {
              if (error) {
                reject({ status: error.message });
              } else {
                resolve({ status: result });
              }
            }
          );
        }
      });
    }
  });
}
