//Import npm-Package
import noble from 'noble';
import { Meteor } from 'meteor/meteor';

//Specific Service UID to filter
var GATDeviceUID = Array('1111');
//Meteor mongo collection
import {Devices} from './devices';

//cleanup collection before start
Devices.remove({});

//store found physical devices and all data
var PhyDevices = [];

//Define methods which can be invoked from remote
Meteor.methods({
    //Calls local function
    connectToDevice: function(number) {
        lConnectToDevice(number);
    }
})

//--------state handling-----------------------------------------

if(noble.state == 'poweredOn'){
    console.log('1 -- scanning...');
    noble.startScanning([], true);

    //noble.startScanning(GATDeviceUID, true);
}

noble.on('stateChange', function (state) {
    console.log("Status " + state);
    if(state == 'poweredOn') {
        console.log('scanning...');
        noble.startScanning([], true);
    } else {
        noble.stopScanning;
    }
})


noble.on('discover', Meteor.bindEnvironment(function (peripheral){
    addToKnownDevices(peripheral);
}));

//-------- end state handling-----------------------------------------


//----------operative functions------------------------------------
function addToKnownDevices (peripheral) {
    if(PhyDevices.indexOf(peripheral) == -1){
        PhyDevices.push(peripheral);
        var deviceIndex = PhyDevices.indexOf(peripheral);

        peripheral.connect(function(){
            console.log("2 -- UUID First: " + peripheral.uuid);
        });

        console.log("3 -- " + peripheral.advertisement.serviceUuids);
        Devices.insert({
            name: peripheral.advertisement.localName,
            uuid: peripheral.uuid,
            rssi: peripheral.rssi,
            index: deviceIndex,
            lastupdate: new Date()
        });

        console.log("4 -- Pushed " + peripheral.advertisement.localName + " with index " + deviceIndex);

    }

    //update if anything new is detected
    Devices.update({uuid: peripheral.uuid}, {
        $set: {
            rssi: peripheral.rssi,
            name: peripheral.advertisement.localName,
            lastupdate: new Date()
        }
    })

}

//Local Function for Connecting
function lConnectToDevice(number){
    var device = PhyDevices[number];
    console.log("5 -- Connectable: " + device.connectable);
    if(device.connectable){
        device.connect(function(error) {
            console.log("6 -- Connected to UUID: " + device.uuid);
        });
    }

}




