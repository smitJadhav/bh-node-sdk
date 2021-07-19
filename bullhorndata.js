require('dotenv').config();
const { http, https } = require('follow-redirects');
var url = require('url');
var async = require('async');
const bhRestAuthorizeUrl = process.env.bh_rest_authorizeurl;

const authCodeOptions = {
    //host: 'auth-west9.bullhornstaffing.com',
    host: url.parse(bhRestAuthorizeUrl).hostname,
    path: '/oauth/authorize?client_id=3d86f308-6e9b-4bc6-a8d8-b3b153a43c74&username=api.cchdev&password=cchATS!2020&action=Login&response_type=code',
    method: 'GET'
}

const accessCodeOptions = {
    host: 'auth-west9.bullhornstaffing.com',
    path: '/oauth/token?grant_type=authorization_code'
        + '&client_id=3d86f308-6e9b-4bc6-a8d8-b3b153a43c74'
        + '&client_secret=u7EPzqUpUI4wxCbxujIAQBlI',
    method: 'POST'
}

const bhTokenOptions = {
    host: 'rest99.bullhornstaffing.com',
    path: '/rest-services/login?version=*',
    method: 'GET'
}

// This function retuens the auth code
const authCode = () => {

    return new Promise(function (resolve, reject) {
        const req = https.request(authCodeOptions, res => {

            // reject on bad status
            if (res.statusCode < 200 || res.statusCode >= 300) {
                return reject(new Error('statusCode=' + res.statusCode));
            }
            console.log(`statusCode: ${res.statusCode}`)
            console.log(res.responseUrl)

            var code;
            // resolve on end
            //res.on('end', function () {
                try {
                    var q = url.parse(res.responseUrl, true, true);
                    code = q.search.split('&')[0].substring(6);
                    console.log('code : '+code);
                } catch (e) {
                    reject(e);
                }

                resolve(code);
            //});
        });
        // reject on request error
        req.on('error', function (err) {
            reject(err);
        });
        // IMPORTANT
        req.end();
    });
}

// This function retuns access token
const accessToken = (code) => {

    return new Promise(function (resolve, reject) {

        accessCodeOptions.path = accessCodeOptions.path + '&code=' + code;
        console.log(accessCodeOptions);

        const req = https.request(accessCodeOptions, res => {
            // reject on bad status
            if (res.statusCode < 200 || res.statusCode >= 300) {
                return reject(new Error('statusCode=' + res.statusCode));
            }
            console.log(`statusCode: ${res.statusCode}`)
            var data = "";
            res.on('data', (d) => {
                data += d;
            });

            var accessToken;
            // resolve on end
            res.on('end', function () {
                try {
                    let json = JSON.parse(data);
                    console.log(json.access_token);
                    accessToken = json.access_token;
                } catch (e) {
                    reject(e);
                }

                resolve(accessToken);
            });
        });
        // reject on request error
        req.on('error', function (err) {
            reject(err);
        });
        // IMPORTANT
        req.end();
    });

}

const bhRestToken = (accessToken) => {

    return new Promise(function (resolve, reject) {

        bhTokenOptions.path = bhTokenOptions.path + '&access_token=' + accessToken;
        console.log(bhTokenOptions);

        const req = https.request(bhTokenOptions, res => {
            // reject on bad status
            if (res.statusCode < 200 || res.statusCode >= 300) {
                return reject(new Error('statusCode=' + res.statusCode));
            }
            console.log(`statusCode: ${res.statusCode}`)
            var data = "";
            res.on('data', (d) => {
                data += d;
            });

            //var bhRestToken;
            //var restUrl;
            // resolve on end
            var json;
            res.on('end', function () {
                try {
                    json = JSON.parse(data);
                    console.log(json);
                    //bhRestToken = json.BhRestToken;
                    //restUrl = json.restUrl;
                } catch (e) {
                    reject(e);
                }

                resolve(json);
            });
        });
        // reject on request error
        req.on('error', function (err) {
            reject(err);
        });
        // IMPORTANT
        req.end();
    });
}

const findBhEntity = (entityType, id, fields, bhRestToken, restUrl) => {

    return new Promise(function (resolve, reject) {

        var urlPart = "entity/" + entityType + "/" + id + "?fields=" + fields + "&BhRestToken=" + bhRestToken;
        
        console.log(restUrl + urlPart);

        const req = https.get(restUrl + urlPart , res => {
            // reject on bad status
            if (res.statusCode < 200 || res.statusCode >= 300) {
                return reject(new Error('statusCode=' + res.statusCode));
            }
            console.log(`statusCode: ${res.statusCode}`)
            let data = '';
            res.on('data', (d) => {
                data += d;
            });

            var json
            // resolve on end
            res.on('end', function () {
                try {
                    json = JSON.parse(data);
                    console.log(json);
                } catch (e) {
                    reject(e);
                }

                resolve(json);
            });
        });
        // reject on request error
        req.on('error', function (err) {
            reject(err);
        });
        // IMPORTANT
        req.end();
    });

}

const searchBhEntity = (entityType, fields, query, searchParams, bhRestToken, restUrl) => {

    return new Promise(function (resolve, reject) {

        var urlPart = "search/"+ entityType +"?fields="+ fields +"&query="+ query + searchParams +"&BhRestToken="+ bhRestToken;

        console.log(restUrl + urlPart);

        const req = https.get(restUrl + urlPart , res => {
            // reject on bad status
            if (res.statusCode < 200 || res.statusCode >= 300) {
                return reject(new Error('statusCode=' + res.statusCode));
            }
            console.log(`statusCode: ${res.statusCode}`)
            let data = '';
            res.on('data', (d) => {
                data += d;
            });

            var json
            // resolve on end
            res.on('end', function () {
                try {
                    json = JSON.parse(data);
                    console.log(json);
                } catch (e) {
                    reject(e);
                }
                resolve(json);
            });
        });
        // reject on request error
        req.on('error', function (err) {
            reject(err);
        });
        // IMPORTANT
        req.end();
    });

}

const queryBhEntity = (entityType, where, fields, queryParams, bhRestToken, restUrl) => {

    return new Promise(function (resolve, reject) {

        var urlPart = "query/"+ entityType +"?where="+ where +"&fields="+ fields + queryParams +"&BhRestToken="+ bhRestToken;

        console.log(restUrl + urlPart);

        const req = https.get(restUrl + urlPart , res => {
            // reject on bad status
            if (res.statusCode < 200 || res.statusCode >= 300) {
                return reject(new Error('statusCode=' + res.statusCode));
            }
            console.log(`statusCode: ${res.statusCode}`)
            let data = '';
            res.on('data', (d) => {
                data += d;
            });

            var json
            // resolve on end
            res.on('end', function () {
                try {
                    json = JSON.parse(data);
                    console.log(json);
                } catch (e) {
                    reject(e);
                }
                resolve(json);
            });
        });
        // reject on request error
        req.on('error', function (err) {
            reject(err);
        });
        // IMPORTANT
        req.end();
    });
}

const associateWithBhEntity = (entityType, entityId, associationName, associationIds, bhRestToken, restUrl) => {
    
    return new Promise(function (resolve, reject) {
//entity/{entityType}/{entityId}/{associationName}/{associationIds}?BhRestToken={bhRestToken}

        var urlPart = "entity/"+ entityType +"/"+ entityId +"/"+ associationName +"/"+ associationIds +"?BhRestToken="+ bhRestToken;

        console.log(restUrl + urlPart);

        const options = {
            host: url.parse(restUrl).hostname,
            path: url.parse(restUrl).pathname + urlPart,
            method: 'PUT'
        }

        console.log(options);

        const req = https.request(options , res => {
            // reject on bad status
            if (res.statusCode < 200 || res.statusCode >= 300) {
                return reject(new Error('statusCode=' + res.statusCode));
            }
            console.log(`statusCode: ${res.statusCode}`)
            let data = '';
            res.on('data', (d) => {
                data += d;
            });

            var json
            // resolve on end
            res.on('end', function () {
                try {
                    json = JSON.parse(data);
                    console.log(json);
                } catch (e) {
                    reject(e);
                }
                resolve(json);
            });
        });
        // reject on request error
        req.on('error', function (err) {
            reject(err);
        });
        // IMPORTANT
        req.end();
    });
}

const getBhAssociation = (entityType, entityId, associationName, fields, bhRestToken, restUrl) => {
    
    return new Promise(function (resolve, reject) {
        //entity/{entityType}/{entityId}/{associationName}?fields={fields}&BhRestToken={bhRestToken}&showTotalMatched=true
        var urlPart = "entity/"+ entityType +"/"+ entityId +"/"+ associationName +"?fields="+ fields +"&BhRestToken="+ bhRestToken +"&showTotalMatched=true";

        console.log(restUrl + urlPart);
        const req = https.request(restUrl + urlPart , res => {
            // reject on bad status
            if (res.statusCode < 200 || res.statusCode >= 300) {
                return reject(new Error('statusCode=' + res.statusCode));
            }
            console.log(`statusCode: ${res.statusCode}`)
            let data = '';
            res.on('data', (d) => {
                data += d;
            });

            var json
            // resolve on end
            res.on('end', function () {
                try {
                    json = JSON.parse(data);
                    console.log(json);
                } catch (e) {
                    reject(e);
                }
                resolve(json);
            });
        });
        // reject on request error
        req.on('error', function (err) {
            reject(err);
        });
        // IMPORTANT
        req.end();
    });
}

const getBhRestToken = async () => {

    var code = await authCode();
    console.log("Code : " + code);
  
    var accToken = await accessToken(code);
    console.log("Access Token : "+ accToken);

    var bhToken = await bhRestToken(accToken);
    console.log("BH Token : "+ bhToken.BhRestToken);
    return bhToken;
}

const findEntity = async (entityType, id, fields) => {

    var bhToken = await getBhRestToken();

    var data = await findBhEntity(entityType, id, fields, bhToken.BhRestToken, bhToken.restUrl);

    return data;
}

const findMultipleEntity = async (entityType, ids, fields) => {
    console.log("input ids ******" + ids);
    var commaSepIds = ids.join(",");
    console.log("comma sep ids " + commaSepIds);
    var bhToken = await getBhRestToken();
    var data = await findBhEntity(entityType, commaSepIds, fields, bhToken.BhRestToken, bhToken.restUrl);
    return data;
}

const queryEntity = async (entityType, where, fields, queryParams) => {

    var bhToken = await getBhRestToken();

    var data = await queryBhEntity(entityType, where, fields, queryParams, bhToken.BhRestToken, bhToken.restUrl);

    return data;
}

const searchEntity = async (entityType, fields, query, searchParams) => {

    var bhToken = await getBhRestToken();

    var data = await searchBhEntity(entityType, fields, query, searchParams, bhToken.BhRestToken, bhToken.restUrl);

    return data;
}

const associateWithEntity = async (entityType, entityId, associationName, associationIds) => {

    var bhToken = await getBhRestToken();

    var data = await associateWithBhEntity(entityType, entityId, associationName, associationIds, bhToken.BhRestToken, bhToken.restUrl);

    return data;
}

const getAssociation = async (entityType, entityId, associationName, fields) => {

    var bhToken = await getBhRestToken();

    var data = await getBhAssociation(entityType, entityId, associationName, fields, bhToken.BhRestToken, bhToken.restUrl);

    return data;
}

const getAllAssociation = async (entityType, entityIds, associationName, fields) => {

    var bhToken = await getBhRestToken();

    var multipleResponses = [];

    for(let i = 0; i < entityIds.length; i++){
        let data = await getBhAssociation(entityType, entityIds[i], associationName, fields, bhToken.BhRestToken, bhToken.restUrl);
        multipleResponses.push(data);
    }
    return multipleResponses;
}

module.exports = { findEntity, searchEntity, findMultipleEntity, queryEntity, associateWithEntity, getAssociation, getAllAssociation }