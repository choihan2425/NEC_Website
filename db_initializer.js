const mongoose = require('mongoose');
const parse = require('csv-parser');
const fs = require('fs');

mongoose.connect('mongodb://127.0.0.1:27017/necDB',
    {useNewUrlParser: true}, function () {
        console.log("db connection successful");
    });

const eventSchema = {
    title: String,
    date: String,
    path: String,
    overview: String
}

const Event = mongoose.model('Event', eventSchema);

// const eventList = []


// read the csv file and save the info into the list
const csvData =[];
fs.createReadStream(__dirname +'/data_events.csv')
    .pipe(parse())
    .on('data', function(dataRow){
        console.log(dataRow);
        csvData.push(dataRow);
    })
    .on('end', function(){
        // console.log(csvData);
        Event.insertMany(csvData, (err)=>{
            if(err){
                console.log(err);
                console.log("db error: data not saved");
            } else {
                console.log("all data saved");
                mongoose.connection.close();
            }
        });
    });
