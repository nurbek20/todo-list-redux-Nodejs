import instance from "./settings";


const registerService=(data)=>{
    return instance.post("users/register", data)
}

const loginService=(data)=>{
    return instance.post("users/login", data)
}

const getMe=()=>{
    return instance.get('users/me')
}

export const authServices={
    registerService,
    loginService,
    getMe
}