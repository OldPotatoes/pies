import {inject}         from 'aurelia-framework';
import {Router}         from 'aurelia-router';
import {FetchConfig}    from 'aurelia-auth';
import HttpClientConfig from 'aurelia-auth/app.httpClient.config';
import AppRouterConfig  from './routes';

// jshint-ignore
@inject(Router, HttpClientConfig, FetchConfig, AppRouterConfig)
// jshint-ignore-end
export class App
{

    constructor(router, httpClientConfig, fetchConfig, appRouterConfig)
    {
        this.router = router;
        this.httpClientConfig = httpClientConfig;
        this.fetchConfig = fetchConfig;
        this.appRouterConfig = appRouterConfig;        
    }


    activate()
    {
        this.httpClientConfig.configure();
        this.appRouterConfig.configure();
        this.fetchConfig.configure();
    }
}