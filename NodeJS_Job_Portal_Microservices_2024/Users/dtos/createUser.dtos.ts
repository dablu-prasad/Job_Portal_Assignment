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
    email: string;
    password: string;
    mobile?: string;
    description?: string;
  }

  export interface EditUserInput {
    userName: string;
    email: string;
    mobile?: string;
    description?: string;
    image?:any
  }