import config   from './auth-config';

export function configure(aurelia)
{
    console.log('test-bed.js 1');
    // Here we provide configuration for our application and can
    // bring in the configuration settings we put within auth-config.js
    // that will tell the aureliauth plugin the specific settings
    // for our application's authentication context.
    aurelia.use
        .standardConfiguration()
        .developmentLogging()
        .plugin('aurelia-animator-css')
        .plugin('aurelia-auth', (baseConfig) => {
            console.log('test-bed.js aurelia-auth 1');
            baseConfig.configure(config);
        });

    console.log('test-bed.js 2');
    aurelia.start().then(a => a.setRoot());
    console.log('test-bed.js 3');
}
