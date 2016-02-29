import {inject}             from 'aurelia-framework';
import {computedFrom}       from 'aurelia-framework';
import {ObserverLocator}    from 'aurelia-framework';

// jshint-ignore
@inject(ObserverLocator)
// jshint-ignore-end
export class Welcome
{
    constructor(observerLocator) {
        this.observerLocator = observerLocator;
        this.heading = 'Welcome to Pies!';
        this.firstName = 'John';
        this.lastName = 'Doe';
    }

    //Getters can't be observed with Object.observe, so they must be dirty checked.
    //However, if you tell Aurelia the dependencies, it no longer needs to dirty check the property.
    // jshint-ignore
    @computedFrom('firstName', 'lastName')
    // jshint-ignore-end
    get fullName()
    {
        return `${this.firstName} ${this.lastName}`;
    }

    activate()
    {
//        this.subscription = this.observerLocator.getObserver(this,'lastName')
//        .subscribe((newValue,oldValue)=>{
//            console.log(`new value : ${newValue}  old value : ${oldValue}`);
//        });

        this.subscription = this.observerLocator.getObserver(this,'lastName');

        var dispose = this.subscription.subscribe(lastNameChanged);
    }

    deactivate()
    {
        //this.subscription(); // disposing the subscription
    }

    submit()
    {
        alert(`Welcome, ${this.fullName}!`);
    }
}

function lastNameChanged(newValue, oldValue)
{
    console.log(`new value : ${newValue}  old value : ${oldValue}`);
}
