// INSERT DATA source: https://stackoverflow.com/questions/59439017/inserting-multiple-values-in-mysql-using-nodejs-is-causing-parsing-errors
// let sql ="INSERT INTO gametypes (strGameType, intTeamSize, intMaxPlayers, intMinPlayers) Values ? ";
//         var gametype ="Solo Zonewars";
//         var teamSize =1;
//         var maxPlayers = 16;
//         var minPlayers = 10;
//         var values = [
//                [gametype, teamSize, maxPlayers, minPlayers]
//         ];

//     console.log("connected as id '" + connection.threadId);

//     connection.query(sql, [values], function(err, result, fields) {
//         connection.release();
//         if(!err) {
//             console.log(result);
//         }else console.log(err);
//     });


// source: https://www.npmjs.com/package/prompt
var prompt = require('prompt');

// Start the prompt
prompt.start();

// Get two properties from the user: username and email
prompt.get(['firstname', 'lastname', 'phone', 'address1', 'address2'], function(err, result) {
    // Log the results.
    console.log('Command-line input received:');
    console.log('  firstname: ' + result.firstname);
    console.log('  lastname: ' + result.lastname);
    console.log('  phone: ' + result.phone);
    console.log('  address1: ' + result.address1);
    console.log('  address2: ' + result.address2);
});