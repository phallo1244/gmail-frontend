export const tokenKey =  sessionStorage.getItem('token')


export const isLogin = () => {
    if (tokenKey) {
        return true;
    }

    return false;
}

export const headers = {
    authorization: `Bearer ${tokenKey}`
}

export  const apiUrl  = 'https://gmail-app.signalgas.io/api/auth';
export  const mailUrl  = 'https://gmail-app.signalgas.io/api/mail';