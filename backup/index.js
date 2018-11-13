// In your index.js 
const fs = require('fs');

const firestoreService = require('firestore-export-import');
const serviceAccount = require('./serviceAccountKey.json');
const databaseURL =  "https://heimspiel-reservierung.firebaseio.com"


// Initiate Firebase App
firestoreService.initializeApp(serviceAccount, databaseURL);

// Start exporting your data
firestoreService
  .backups()
  .then(data => 
    fs.writeFile('./backup.json', JSON.stringify(data), 'utf8', function(
      err
  ) {
      if (err) {
          return console.log(err);
      }
      console.log('The file was saved!');
  }));

     
