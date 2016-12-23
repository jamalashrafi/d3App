var fs = require('fs');
var readline = require('readline');
//taking 3 files
var file1 = fs.readFileSync('India20111.csv');
var file2 = fs.readFileSync('IndiaSC20111.csv');
var file3 = fs.readFileSync('IndiaST20111.csv');



var finalfile = file1 + file2 + file3;
//appending 3 files
fs.appendFile(finalfile);

var rows = [];
var varheader = []; //all headers in varheader
var rows = finalfile.split('\n');
//Getting the header as first row from the document
var varHeader = rows[0].split(',');

var requiredHeader = [];  //all headers required by us in json
var index = []; //index of required headers


//Here we are taking only those headers which are to be added at the end that is literate persons and total,rural and urbans
var sum = 0;
for(var i = 0;i < varHeader.length;i++){
  if(varHeader[i] =='Literate - Persons' || varHeader[i] =='Age-group' || varHeader[i] =='Total/ Rural/ Urban'){
    requiredHeader.push(varHeader[i]);
    index.push(i);
  }
}


var body = [];// Array for the body
var arrAgeGroup = [];
for (var i = 1; i < rows.length-1; i++) {
  body = rows[i].split(',');
  if((arrAgeGroup.indexOf(body[index[1]]) < 0) && (body[index[1]] !== 'All ages') && (body[index[1]] !== 'Age-group')) {
    //to remove the all-ages and age-groups
      arrAgeGroup.push(body[index[1]]);

      console.log(body[index[1]]);
    // }
  }
}

var pr;
var varbody = []; //rest of body/all data except headers
var ageObject={};// object in which the values will be pushed
var arrObj=[];//final Array
for (var k = 0; k < arrAgeGroup.length; k++) {
  for(var i = 1;i < rows.length;i++){
    varbody = rows[i].split(',');
    for(var j = 0;j < requiredHeader.length;j++) {
      if(varbody[index[j+1]] == arrAgeGroup[k] && varbody[index[j]] == 'Total'){
        console.log();
        sum = sum+parseInt(varbody[index[j+2]]);
        ageObject['Age-group']=arrAgeGroup[k];
      }
    }
  }
  ageObject['Literate - Persons']=sum;
  arrObj.push(ageObject);
  ageObject={};
  sum=0;
}
console.log(arrObj);
var jsString=JSON.stringify(arrObj);
fs.writeFileSync('age.json',jsString);