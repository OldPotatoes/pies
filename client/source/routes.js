//import {AuthorizeStep} from 'paulvanbladel/aureliauth';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {AuthorizeStep} from 'aurelia-auth';

// jshint-ignore
@inject(Router)
// jshint-ignore-end
export default class
{
    constructor(router)
    {
        console.log('routes.js constructor() 1');
        this.router = router;
    }

    configure()
    {
        console.log('routes.js configure() 1');
        var appRouterConfig = function(config)
        {
            config.title = 'Testbed App';

            // Here, we hook into the authorize extensibility point
            // to add a route filter so that we can require authentication
            // on certain routes
            config.addPipelineStep('authorize', AuthorizeStep);

            config.map([
                {   route: ['','welcome'], moduleId: 'welcome',      title: 'Welcome',        nav: true },             //, name: 'welcome'
                {   route: 'register-pie', moduleId: 'register-pie', title: 'Register',       nav: false },            //, name: 'register-pie', authRoute: true
                {   route: 'login-pie',    moduleId: 'login-pie',    title: 'Login',          nav: false },            //, name: 'login-pie', authRoute: true
                {   route: 'pick-pie',     moduleId: 'pick-pie',     title: 'Pick a Pie',     nav: true },
//                {   route: 'pies',         moduleId: 'pies',         title: 'Available Pies', nav: true },             //, name: 'pies'
                {   route: 'securepies',   moduleId: 'securepies',   title: 'Secure Pies',    nav: true,  auth: true }, //, name: 'securepies'
                {   route: 'add-pie',      moduleId: 'add-pie',      title: 'Add Pie',        nav: true,  auth: true },
                {   route: 'logout-pie',   moduleId: 'logout-pie',   title: 'Logout',         nav: false, authRoute: true } //, name: 'logout'
/*              ,
                {   route: 'users',        moduleId: 'users',        title: 'Github Users',  name: 'users',        nav: true },
                {   route: 'child-router', moduleId: 'child-router', title: 'Child Router',  name: 'child-router', nav: true }
*/
            ]);
        };

        // The router is configured with what we specify in the appRouterConfig
        this.router.configure(appRouterConfig);
    }
}
