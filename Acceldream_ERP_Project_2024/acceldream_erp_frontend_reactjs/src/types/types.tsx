export type FormError = {
    username?: string;
    firstname?: string;
    lastname?: string;
    email?: string;
    mobile?: string;
    company_dealer_name?:string;
    branch?:string;
    address?:string;
    state?:string;
    city?:string;
    country?:string;
    pin?:string;
    module?:string;
    user_designation?:string;
    approval_manager?:string;
  };
  export type EditFormInput = {
    userName?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    mobile?: string;
    description?: string;
    image?: string | null;
    imagePreview:string;
  };
  export type EditFormError = {
    userName?: string;
    firstName?: string;
    lastName?: string;
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
  