import {inject}         from 'aurelia-framework';
import {AuthService}    from 'aurelia-auth';

@inject(AuthService)
export class Logout
{
    constructor(authService)
    {
        this.authService = authService;
    };

    activate()
    {
        this.authService.logout("#/login-pie")
        .then(response => {
            console.log("Logged Out");
        })
        .catch(error => {
            console.log("Error Logging Out");
        });
    };
}