import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

//MongoCollection -> is imported from Client and Server
export const Devices = new Mongo.Collection('devices');