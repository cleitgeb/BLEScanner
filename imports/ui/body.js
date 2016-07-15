/**
 * Created by cleitgeb on 08.07.16.
 */

import {Devices} from '../api/devices'
import { ReactiveDict } from 'meteor/reactive-dict';
import './body.html';
import './device.js';

var lineCnt = 1;
var collectionSize;
var firstRun = true;
var runCnt = 1;



Template.body.onCreated(function bodyOncreated() {
    this.state = new ReactiveDict();
    Meteor.subscribe('devices');
});

Template.body.helpers({
    devices() {
        collectionSize = Devices.find({}).count()
        return Devices.find({});
    },

    deviceIndexNewLine(){
        if(lineCnt > Devices.find({}).count()){
            lineCnt++
            console.log(lineCnt);
            return true;
        }

    },

    deviceIndexNewLine3() {
        console.log ('RunConunt: ' + runCnt + ' collectionSize:  ' + collectionSize + 'Realcollection: ' +Devices.find({}).count()  + 'Linecount: ' + lineCnt )
        if((collectionSize != Devices.find({}).count()) || (firstRun == true)) {
            collectionSize = Devices.find({}).count();

            runCnt++
            lineCnt++;

            if(runCnt >= collectionSize){
                firstRun = false;
                console.log('Firstrun false' + runCnt);
            }
            if (lineCnt >= 2) {
                lineCnt = 0;
                console.log('Returning true' + lineCnt)
                return true;
            }

            console.log('Return false' + lineCnt)
            return false;
        }
    },

    deviceIndexNewLine2() {
        var ret = '';
        if(collectionSize != Devices.find({}).count()){
            collectionSize = Devices.find({}).count();
            lineCnt++
            console.log(lineCnt)
            if(lineCnt % 2 == 0){
                console.log(collectionSize + 'Returning true...');
                ret = 3;
                return 3;

            }
        }
        console.log('Returnvalue: ' + ret);
        return ret;
    },

    deviceCnt() {
        return Devices.find({}).count();
    }
});