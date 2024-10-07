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