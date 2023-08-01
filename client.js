const soap = require('soap');
const url = 'http://soapapp:8000/PartLookup?wsdl';


function getPart(xml) {
    return new Promise ((resolve, reject) => {
        soap.createClient(url, function (err, client) {
            if (err) {
                console.log(err);
                return reject(err);
            }
            console.log(client.describe());
            client.MyService.MyPort.PartLookup(xml, function(err, result, rawResponse, soapHeader, rawRequest) {
                console.log('SOAP: ', result);
                return resolve(result)
            })
        });
    });
}

const getPartInfo =  async(part) => {
    try {
        console.log(part);
        const info = await getPart(part);
        return info;
    } catch (error) {
        return error;
    }
}

getPartInfo({partnumber: '1234567890'});
module.exports = getPartInfo;