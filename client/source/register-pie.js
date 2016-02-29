import {inject}             from 'aurelia-framework';
import {AuthService}        from 'aurelia-auth';

// jshint-ignore
@inject(AuthService)
// jshint-ignore-end
export class Register
{
    constructor(auth)
    {
        this.auth = auth;
        this.loginName = 'JamieDyer';
        this.email = 'jamie@dyer.com';
        this.password = 'snuffle';
        this.signupError = '';
    }

    registerPieEater()
    {
        return this.auth.signup(this.loginName, this.email, this.password)
        .then((response)=>{
            console.log("signed up");
        })
        .catch(error => {
            console.log('Signup error: ' + error.response);
            this.signupError = error.response;
        });
    }
}
