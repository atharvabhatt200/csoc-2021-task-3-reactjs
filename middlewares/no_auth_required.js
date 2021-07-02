import { displaySuccessToast } from '../components/Toast'

var flag = true;

export const noAuthReq = (token) => {
    if (flag) {
        console.log('Welcome Back!');
        flag = !flag;
    }    
}


