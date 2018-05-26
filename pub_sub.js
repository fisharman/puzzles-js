// http://dev.housetrip.com/2014/09/15/decoupling-javascript-apps-using-pub-sub-pattern/

class EventBus {
    constructor(){
        this.topics = new Map();
        this.subscribe = this.subscribe.bind(this);
        this.public = this.publish.bind(this);
    }

    subscribe (topic, listener) {
        if(!this.topics.has(topic))
            this.topics.set(topic,[]);      
        
            this.topics.get(topic).push(listener);
    }

    publish (topic, data) {
        if(!this.topics.has(topic) || this.topics.get(topic).length < 1)
            return;

        this.topics.get(topic).forEach(listener => {
            listener(data || {});
        })
    }
}
/*
let eventBus = new EventBus ();
eventBus.subscribe('foo', console.log);
eventBus.publish('foo', 'hi');
*/

class Mailer {
    constructor(eventBus){
        this.eventBus = eventBus;
        eventBus.subscribe('order/new', this.sendPurchaseEmail);
        this.sendPurchaseEmail = this.sendPurchaseEmail.bind(this);
    }

    sendPurchaseEmail (userEmail) {
        console.log('Sent email to ' + userEmail);
    }
}

class Order {
    constructor(eventBus, params){
        this.eventBus = eventBus;
        this.params = params;
        this.saveOrder = this.saveOrder.bind(this);
    }

    saveOrder () {
        this.eventBus.publish('order/new', this.params.userEmail)
    }
}

let eventBus = new EventBus();
let mailer = new Mailer(eventBus);
let order = new Order(eventBus, {userEmail: 'john@gmail.com'});
order.saveOrder();