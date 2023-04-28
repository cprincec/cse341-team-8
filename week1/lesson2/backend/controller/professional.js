const mongodb = require('../db/connect')
const Double = mongodb.Double;
const data = require('../professional.json');

// This function simplifies the number of text I have to write 
// when interacting with mongodb.
// It saves me from having to type something like this:
// mongodb.getDb().db('webservices').collection('users')
function returnCollection(dbname, collection) {
    let db = mongodb.getDb().db(dbname);
    let col = db.collection(collection);
    return col;
}

async function getProfessional(req, res) {
    let col = returnCollection();
    let professionals = await col.find();
    professionals.toArray().then((professionals) => {
        console.log("showing result", professionals);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(professionals[0]);
    })
}

async function addProfessional(req, res) {
    let col = returnCollection();
    try {
        await col.insertOne(data[0]); 
    } catch (error) {
        console.log(error);
    }   
}





// This is me practicing how to interact with mongodb.
async function createCollection() {
    await mongodb.getDb().db('webservices').createCollection("students", {
        validator: {
           $jsonSchema: {
              bsonType: "object",
              title: "Student Object Validation",
              required: [ "address", "major", "name", "year" ],
              properties: {
                 name: {
                    bsonType: "string",
                    description: "'name' must be a string and is required"
                 },
                 year: {
                    bsonType: "int",
                    minimum: 2017,
                    maximum: 3017,
                    description: "'year' must be an integer in [ 2017, 3017 ] and is required"
                 },
                 gpa: {
                    bsonType: [ "double", "int", "string"],
                    description: "'gpa' must be a double if the field exists"
                 }
              }
           }
        }
     } )
     console.log("creating collection");
}

async function addStudent(req, res) {
    console.log("in function");
    try {
        let col = returnCollection("webservices", "students")
        console.log("hey");
        await col.insertOne( {
            name: "Alice",
            year: 2019,
            major: "History",
            gpa: 3.0,
            address: {
               city: "NYC",
               street: "33rd Street"
            }
         } )
         
         console.log("works");
         
         console.log(col);
    } catch (error) {
        res.send(error);       
    }
}

module.exports = { getProfessional, addProfessional, createCollection, addStudent };