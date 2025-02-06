import jwt from "jsonwebtoken"

export interface createUserInterface{
    userName:string;
    email:string;
    password:string
}

export interface error{
    status:     number,
    message: string,
    errors:  string,
    stack:   string
}

export interface httpStatusInterface{
    [key:number]:string;
}

export interface UserInput {
    userName: string;
    firstName:string;
    lastName:string;
    email: string;
    user_designation: string;
    approval_manager: string;
    company_dealer_name: string;
    branch: string;
    address: string;
    state: string;
    city: string;
    pin: string;
    country: string;
    module: string;
    mobile?: string;
    description?: string;
  }

  export interface OtpVerifyInput{
    email: string;
    mobile?: string;
    otp:string;
  }

  export interface EditUserInput {
    userName: string;
    email: string;
    mobile?: string;
    description?: string;
    image?:any
  }

  export interface InputJobList{
    currentPage:number,
    itemPerPage:number
  }

  export interface InputAdminJobList{
    currentPage:number,
    itemPerPage:number,
    value:string
  }

  export interface BaseContext {
    req: Express.Request;
    res: Express.Response;
    user: string | jwt.JwtPayload | null; // or any other type you expect for the user
    msg:string
  }

  export interface LoginInput{
     email: string;
      password: string;
    }

    export interface ResetPassword{
      currentPassword:string;
      newPassword:string;
      confirmNewPassword:string;
    }