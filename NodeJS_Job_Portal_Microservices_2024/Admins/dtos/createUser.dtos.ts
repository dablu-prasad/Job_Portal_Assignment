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

export interface CreateJob{
    jobId:String,
    jobTitle:String,
    jobExperience:String,
    jobDescription:String,
    adminId:String
}

export interface BaseContext {
    req: Express.Request;
    res: Express.Response;
    admin: string | jwt.JwtPayload | null; // or any other type you expect for the user
    msg:string
  }

  export interface InputJobById { ID: string,value:string }