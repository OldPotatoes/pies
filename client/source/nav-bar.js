import {bindable}       from 'aurelia-framework';       // Why?
import {inject}			from 'aurelia-framework';
import {AuthService}	from 'aurelia-auth';

// jshint-ignore
@inject(AuthService)
// jshint-ignore-end
export class NavBar
{

//_isAuthenticated = false;       // Why?
//@bindable router = null;        // Why?

    constructor(authService)
    {
        this.authService = authService;
    }

    get isAuthenticated()
    {
        return this.authService.isAuthenticated();
    }
}
