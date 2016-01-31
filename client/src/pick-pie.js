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
        this.pieNumber = '';
    }

    pickAPie()
    {
        return this.http.get('http://127.0.0.1:8081/api/pies/:' + pieNumber)
            .then(response => {
                var content = response.content;
                console.log('Pie = ' + content);

                this.availablePies = content;
            })
            .catch(error => {
                console.log('Error getting quote');
            });
    }
}
