import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './device.html';

Template.device.events({
    'click .device'() {
        // Set the checked property to the opposite of its current value
        console.log(this.name + ' clicked')
        Meteor.call('connectToDevice', this.index);
    }
})
