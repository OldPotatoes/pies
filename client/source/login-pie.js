import {inject} from 'aurelia-framework';
import {AuthService} from 'aurelia-auth';

// jshint-ignore
@inject(AuthService)
// jshint-ignore-end
export class Login
{
    constructor(authService, http)
    {
        this.authService = authService;
        this.email = 'jamie@ace.com';
        this.password = 'snuffle';
        this.loginError = '';
    }

    loginPieEater()
    {
        var user =
        {
            email: this.email,
            password: this.password
        };
        
        console.log('user.email = ' + user.email);
        console.log('user.password = ' + user.password);

        return this.authService.login(this.email, this.password)
        .then(response => {
            console.log('Login response: ' + response);
        })
        .catch(error => {
            console.log('Login error: ' + error);
            this.loginError = error.response;
        });
    }
}
