export interface ILoginValidations {
    email: IError;
    password: IError;
  }
  
  interface IError {
    display: boolean;
    message: string;
  }