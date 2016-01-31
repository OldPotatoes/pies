import {inject}         from 'aurelia-framework';
import {Router}         from 'aurelia-router';
import {FetchConfig}    from 'aurelia-auth';
import HttpClientConfig from 'aurelia-auth/app.httpClient.config';
import AppRouterConfig  from './routes';

@inject(Router, HttpClientConfig, FetchConfig, AppRouterConfig)
export class App
{
    constructor(router, httpClientConfig, fetchConfig, appRouterConfig)
    {
        console.log('app.js constructor() 1');

        this.router = router;
        this.httpClientConfig = httpClientConfig;
        this.fetchConfig = fetchConfig;
        this.appRouterConfig = appRouterConfig;        

        console.log('app.js constructor() 2');
    }

    activate()
    {
        console.log('app.js activate() 1');
        this.httpClientConfig.configure();
        this.appRouterConfig.configure();
        this.fetchConfig.configure();
        console.log('app.js activate() 2');
    }
}