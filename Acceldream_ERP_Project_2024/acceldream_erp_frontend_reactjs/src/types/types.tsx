export type FormError = {
    username?: string;
    firstname?: string;
    lastname?: string;
    email?: string;
    password?: string;
    mobile?: string;
  };
  export type EditFormError = {
    username?: string;
    firstname?: string;
    lastname?: string;
    email?: string;
    password?: string;
    mobile?: string;
    description?: string;
    // image?: string | null;
    // imagePreview:string;
  };

  export type FormLoginError={
    email?:string;
    password?:string
  }
  