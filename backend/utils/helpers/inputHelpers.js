export const checkPassword = (password) => {
    
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    
    return password.match(passwordRegex);
    // if(!passwordRegex.test(password)) {
    //     return false
    // }
    // else{
    //     return true
    // }
}

export const checkEmail = (email) => {
    
    const emailRegex =  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return email.match(emailRegex);
}