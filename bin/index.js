#!/usr/bin/env node
const fs = require('fs')
const fsPath = require('path')
const initFirebase = require('./lib/initFirebaseConnexion')
const updateFirebase = require('./lib/updateFirebase')


function run(argv) {
    // initialize console program
    const cli = require('./lib/cli')(argv)

    // load config file
    const { path, firebase, mapper } = require('./lib/loadConfig')(cli.config)
    const ref = initFirebase(firebase)


    // Check if directory
    fs.lstat(path, async (err, stats) => {
	    if(err) {
	    	console.error('Error during path analysis:')
	        return console.log(err); //Handle error
	    }
	    
	    if (stats.isFile()) {
    	    readData(ref, mapper, path)	    		
	    }
	    else if (stats.isDirectory()) {
	    	// Get all csv files, and loop over to push data to firebase
	    	fs.readdir(path, function(err, items) {
			    console.log('List of files detected: ', items);			 
			    for (var i=0; i<items.length; i++) {
			    	const filePath = fsPath.join(path, items[i])
			        readData(ref, mapper, filePath)
			    }
			});
	    }
	});
}

async function readData(ref, mapper, filePath) {
	const data = await require('./lib/loadCSV')(filePath)
	updateFirebase(ref, data, mapper)
}

run(process.argv)
