const mongoose = require('mongoose');
const parse = require('csv-parser');
const fs = require('fs');
const networkData = fs.readFileSync(__dirname + "/networks.json");
const networkJSON = JSON.parse(networkData)

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

const personSchema = {
    name: String,
    img: String,
    role: String,
    bio: String
}

const Person = mongoose.model('Person', personSchema);

const workSchema = {
    title: String,
    description: String,
    img:[String],
    bios: [String],
    video: String
}

const Work = mongoose.model('Work', workSchema);

const networkSchema = {
    title:String,
    url:String,
    overview:String
}

const Network=mongoose.model('Network', networkSchema)

const work_csv = [];
fs.createReadStream(__dirname +'/work_data.csv')
    .pipe(parse())
    .on('data', function(dataRow){
        console.log(dataRow);
        work_csv.push(dataRow);
    })
    .on('end', function(){
        // console.log(csvData);
        Work.insertMany(work_csv, (err)=>{
            if(err){
                console.log(err);
                console.log("db error: data not saved");
            } else {
                console.log("all data saved");
            }
        });
    });

const person_csv = [];
fs.createReadStream(__dirname +'/people_data.csv')
    .pipe(parse())
    .on('data', function(dataRow){
        console.log(dataRow);
        person_csv.push(dataRow);
    })
    .on('end', function(){
        // console.log(csvData);
        Person.insertMany(person_csv, (err)=>{
            if(err){
                console.log(err);
                console.log("db error: data not saved");
            } else {
                console.log("all data saved");
            }
        });
    });

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
            }
        });
    });

const networkList =[]
networkJSON.forEach((resource)=>{
    networkList.push({
            "title":resource['title'],
            "url":resource['url'],
            "overview":resource['overview']
        }
    )
});

Network.insertMany(networkList, (err)=>{
    if(err){
        console.log("data insertion failed!")
        console.log(err)
    }else{
        console.log("All data loaded")
        console.log()
        mongoose.connection.close(); // need to close connection after successful insert
    }
});