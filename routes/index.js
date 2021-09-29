const path = require('path');
const fs = require('fs');
var request = require('request');

var token, token1;
/**
 * Render Config
 * @param req
 * @param res
 */
exports.config = (req, res) => {
  const domain = req.headers.host || req.headers.origin;
  const file = path.join(__dirname, '..', 'public', 'config-template.json');

  const configTemplate = fs.readFileSync(file, 'utf-8');
  const config = JSON.parse(configTemplate.replace(/\$DOMAIN/g, domain));
  res.json(config);
};

/**
 * Render UI
 * @param req
 * @param res
 */

 function stripoemails(){
  var options = {
    'method': 'GET',
    'url': 'https://stripo.email/emailgeneration/v1/emails',
    'headers': {
      'Stripo-Api-Auth': 'eyJhbGciOiJIUzI1NiJ9.eyJzZWN1cml0eUNvbnRleHQiOiJ7XCJhcGlLZXlcIjpcIjRjZGEyNGE2LTFiMTEtNDU5My04ZjJlLTMwOWY5NjY0YmE3ZlwiLFwicHJvamVjdElkXCI6NTEwNzExfSJ9.mGEaLIpIxXeAA8v3tJv-d5S_RycJGCprjgMh31Hm9l4'
    }
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log("in the op")
    console.log(response.body);
    var body2 = JSON.parse(response.body);
    token =  body2["data"];
    
    for(var key in token){
      var n=token[key].name;
      var id=token[key].emailId;
      console.log("name"+n);
      console.log("name"+id);
      var list1=[];
      list1.push({
        name: n,
        value:id,
      })
    }
    console.log()
    console.log("list1==="+JSON.stringify(list1));
    console.log("list1==="+JSON.stringify(list1).length);
    //console.log(response.body.data);
  });

}


exports.ui = async(req, res) => {
console.log("hiiiiiii")


await stripoemails();
console.log("byeee")
  res.render('index', {
    title: 'Custom Activity',
    dropdownOptions: list1,
  });
};
