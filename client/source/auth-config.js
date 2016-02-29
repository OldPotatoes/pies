/*var configForDevelopment =
{
    providers:
    {
        google:
        {
            clientId: '239531826023-ibk10mb9p7ull54j55a61og5lvnjrff6.apps.googleusercontent.com'
        },
        linkedin:
        {
            clientId:'778mif8zyqbei7'
        },
        facebook:
        {
            clientId:'1452782111708498'
        }
    }
};

var configForProduction =
{
    providers:
    {
        google:
        {
            clientId: '239531826023-3ludu3934rmcra3oqscc1gid3l9o497i.apps.googleusercontent.com'
        },
        linkedin:
        {
            clientId:'7561959vdub4x1'
        },
        facebook:
        {
            clientId:'1653908914832509'
        }

    }
};

var config;

if (window.location.hostname === 'localhost')
{
    console.log('Running in development mode');
    config = configForDevelopment;
}
else
{
    console.log('Running in production mode');
    config = configForProduction;
}*/

console.log('auth-config.js');

var config =
{
    // Our Node API is being served from localhost:8081
    baseUrl: 'http://localhost:8081',

    // The API specifies that new users register at the POST /register endpoint.
    signupUrl: 'register',

    // Logins happen at the POST /login endpoint.
    loginUrl: 'login',

    // The API serves its tokens with a key of id_token which differs from aureliauth's standard.
    tokenName: 'id_token',

    // Once logged in, we want to redirect the user to the get pies view.
    //loginRedirect: '#/api/pies',
    loginRedirect: '#/welcome',
};

export default config;
