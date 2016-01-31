import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';

@inject(HttpClient)
export class Pies
{
    constructor(http)
    {
        this.http = http;
        this.heading = 'Available Pies';
        this.availablePies = '';
    }

    activate()
    {
        return this.http.get('http://127.0.0.1:8081/pies')
            .then(response => {
                var content = response.content;
                console.log('content 1 = ' + content[0].name);
                console.log('content 2 = ' + content[1].name);
                console.log('content 3 = ' + content[2].name);

                this.availablePies = content;
            })
            .catch(error => {
                console.log('Error getting quote');
            });
    }
}
