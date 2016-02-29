import {inject}         from 'aurelia-framework';
import {AuthService}    from 'aurelia-auth';

// jshint-ignore
@inject(AuthService)
// jshint-ignore-end
export class Logout
{
    constructor(authService)
    {
        this.authService = authService;
    }

    activate()
    {
        this.authService.logout("#/login-pie")
        .then(response => {
            console.log("Logged Out");
        })
        .catch(error => {
            console.log("Error Logging Out");
        });
    }
}