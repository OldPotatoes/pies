import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';

@inject(HttpClient)
export class Add
{
    constructor(http)
    {
        this.http = http;
        this.name = '';
        this.adjective = '';
        this.pieError = '';
    }

    createPie()
    {
        var pie =
        {
            adjective:  this.adjective,
            name:       this.name
        };

        console.log('pie.adjective = ' + pie.adjective);
        console.log('pie.name = ' + pie.name);

        return this.http.put('http://127.0.0.1:8081/api/pies/#')
            .then(response => {
                var content = response.content;
                console.log('content = ' + content);
            })
            .catch(error => {
                console.log('Error putting pie: ' + error);
            });
    }
}
