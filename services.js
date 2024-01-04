const _ = require("lodash");
const axios = require("axios");


const apiPath = 'https://refer-test.ucsfhealth.org/webruntime/api/apex/execute';

function getCommonParams(params) {
    return {
        // method: _.get(params, 'method', ''),
        // cacheable: _.get(params, 'cacheable', true),
        // isContinuation: _.get(params, 'isContinuation', false),
        // namespace: _.get(params, 'namespace', ""),
        // asGuest: _.get(params, 'asGuest', true),
        // htmlEncode: _.get(params, 'htmlEncode', false),
        // language: _.get(params, 'language', 'en-US'),
        // classname: _.get(params, 'classname', '@udd/01p6u0000006Hot')
    };
}

function formatResponse(response) {
    const formattedResponse = [];
    _.forEach(response.returnValue, data => {
        console.log(data);
        formattedResponse.push({
            label: _.get(data, 'label', ''),
            id: _.get(data, 'value', ''),
            meta: _.get(data, 'meta', ''),
            icon: _.get(data, 'icon', ''),
        });
    });
    return formattedResponse;

}

async function getProviderList(params) {

    const commonParams = getCommonParams(params);
    const reqParams = {
        // ...commonParams,
        isContinuation: _.get(params, 'isContinuation', false),
        namespace: _.get(params, 'namespace', ""),
        method: "getRecords",
        params: JSON.stringify({
            "lstConfigs": [
                {
                    strName: "Contact",
                    strWhereClause: "PDM_Provider_NPI__c != null",
                    lstSearchFields: [
                        "PDM_Provider_NPI__c",
                        "FirstName",
                        "LastName",
                        "Name"
                    ],
                    strLabelField: "Name",
                    strValueField: "Id",
                    lstMetaFields: [
                        "PDM_Provider_NPI__c"
                    ],
                    strIconURL: "standard-sprite/svg/symbols.svg#contact",
                }
            ],
            strSearchTerm: _.get(params, 'term', '')
        })
    }

    try {
        const response = await axios.get(apiPath, { params: reqParams });
        console.log("RESPONSE: ", response);
        const formattedResponse = formatResponse(response.data);
        console.log("OVO SAM VRATIO: ", formattedResponse);
        return formattedResponse;
    } catch (e) {
        console.log(e);
        return {};
    }
}

async function getProviderDetails(params) {

    const commonParams = getCommonParams(params);
    const reqParams = {
        ...commonParams,
        method: "getProviderData",
        "cacheable": false,
        "classname": '@udd/01p6u0000006Hp8',
        params: JSON.stringify({
            "contactID": _.get(params, 'id', '')
        })
    }

    try {
        const response = await axios.post(apiPath, reqParams,
            { headers: { 'content-type': 'application/json' } }
        );

        return _.get(response, 'data.returnValue', {});
    } catch (e) {
        console.log(e);
    }
}

async function getSpecialties(params) {

    const commonParams = getCommonParams(params);
    const reqParams = {
        ...commonParams,
        method: "getRecords",
        params: JSON.stringify({
            
                "lstConfigs": [
                    {
                        "strName": "Department_List__mdt",
                        "strWhereClause": "Display_Label__c != ''",
                        "lstSearchFields": [
                            "Display_Label__c"
                        ],
                        "strLabelField": "Display_Label__c",
                        "strValueField": "Display_Label__c",
                        "lstMetaFields": [
                            "Department_Number__c"
                        ],
                        "strIconURL": "standard-sprite/svg/symbols.svg#contact"
                    }
                ],
                "strSearchTerm":  _.get(params, 'term', '')
            
        })
}

try {
    const response = await axios.get(apiPath, { params: reqParams });
    const formattedResponse = formatResponse(response.data);
    console.log(formattedResponse);
    return formattedResponse;
} catch (e) {
    console.log(e);
    return {};
}
}

//dodaj error handleing try catch i console logovanje
async function getPera(){
    const url = `https://refer-test.ucsfhealth.org/webruntime/api/apex/execute?language=en-US&asGuest=true&htmlEncode=false`;
    const requestParams = {"namespace":"","classname":"@udd/01p6u0000006Hp8","method":"getProviderData","isContinuation":false,"params":JSON.stringify({"contactID":"0036u00000bPWT9AAO"}),"cacheable":false};
    const { data } = await axios.post(url, requestParams,
            { headers: { 'content-type': 'application/json' } }
        );

    console.log(data);

    return data;
}

async function getProviderDataTestOldWay2(params) {
    console.log('i ovaj se metda zvala');
    console.log('params=', params);

    const url = `https://refer-test.ucsfhealth.org/webruntime/api/apex/execute?language=en-US&asGuest=true&htmlEncode=false`;
    const requestParams = {"namespace":"","classname":"@udd/01p6u0000006Hp8","method":"getProviderData","isContinuation":false,"params": JSON.stringify({"contactID": params}) ,"cacheable":false};
    const { data } = await axios.post(url, requestParams,
            { headers: { 'content-type': 'application/json' } }
        );

    console.log(data);

    return data.returnValue;
    // const url = `https://refer-test.ucsfhealth.org/webruntime/api/apex/execute?language=en-US&asGuest=true&htmlEncode=false`;
    // const requestParams = {"namespace":"","classname":"@udd/01p6u0000006Hp8","method":"getProviderData","isContinuation":false,"params":JSON.stringify({"contactID":"0036u00000bPWT9AAO"}),"cacheable":false};
    // const { data } = await axios.post(url, requestParams,
    //         { headers: { 'content-type': 'application/json' } }
    //     );

    // console.log(data);

    // return data;


    //ovo je ovaj bokijev deo
    // const url = `https://refer-test.ucsfhealth.org/webruntime/api/apex/execute?language=en-US&asGuest=true&htmlEncode=false`;
    // const requestParams = {"namespace":"","classname":"@udd/01p6u0000006Hp8","method":"getProviderData","isContinuation":false,"params":JSON.stringify({"contactID":"0036u00000bPWT9AAO"}),"cacheable":false};
    // const { data } = await axios.post(url, requestParams,
    //         { headers: { 'content-type': 'application/json' } }
    //     );

    const commonParams = getCommonParams(params);
    const reqParams = {
        ...commonParams,
        method: "getProviderData",
        "cacheable": false,
        "classname": '@udd/01p6u0000006Hp8',
        params: JSON.stringify({
            "contactId": _.get(params, 'contactId', '')
        })
        
    }

    console.log('commonParams', commonParams);
    console.log('reqParams', reqParams);

    // try {
    //     const response = await axios.post(apiPath + '?language=en-US&asGuest=true&htmlEncode=false', reqParams,
    //         { headers: { 'content-type': 'application/json' } }
    //     );

    //     return _.get(response, 'data.returnValue', {});
    // } catch (e) {
    //     console.log(e);
    // }
}

async function getProviderData(params) {

    console.log('i ovaj se metda zvala');
    console.log('params=', params);
    // const url = `https://refer-test.ucsfhealth.org/webruntime/api/apex/execute?language=en-US&asGuest=true&htmlEncode=false`;
    // const requestParams = {"namespace":"","classname":"@udd/01p6u0000006Hp8","method":"getProviderData","isContinuation":false,"params":JSON.stringify({"contactID":"0036u00000bPWT9AAO"}),"cacheable":false};
    // const { data } = await axios.post(url, requestParams,
    //         { headers: { 'content-type': 'application/json' } }
    //     );

    
    // console.log(data);

    // return data;


    //ovo je ovaj bokijev deo
    // const url = `https://refer-test.ucsfhealth.org/webruntime/api/apex/execute?language=en-US&asGuest=true&htmlEncode=false`;
    // const requestParams = {"namespace":"","classname":"@udd/01p6u0000006Hp8","method":"getProviderData","isContinuation":false,"params":JSON.stringify({"contactID":"0036u00000bPWT9AAO"}),"cacheable":false};
    // const { data } = await axios.post(url, requestParams,
    //         { headers: { 'content-type': 'application/json' } }
    //     );

    const commonParams = getCommonParams(params);
    const reqParams = {
        ...commonParams,
        method: "getProviderData",
        "cacheable": false,
        "classname": '@udd/01p6u0000006Hp8',
        params: JSON.stringify({
            "contactId": _.get(params, 'contactId', '')
        })
        
    }

    console.log('commonParams', commonParams);
    console.log('reqParams', reqParams);

    // try {
    //     const response = await axios.post(apiPath + '?language=en-US&asGuest=true&htmlEncode=false', reqParams,
    //         { headers: { 'content-type': 'application/json' } }
    //     );

    //     return _.get(response, 'data.returnValue', {});
    // } catch (e) {
    //     console.log(e);
    // }
}

//sad ja dodajem ovo
async function getProviderContactList(searchTerm){
    console.log("test pre poziva");
    // const url = `https://refer-test.ucsfhealth.org/webruntime/api/apex/execute?cacheable=true&classname=%40udd%2F01p6u0000006Hot&isContinuation=false&method=getRecords&namespace=&params=%7B%22lstConfigs%22%3A%5B%7B%22strName%22%3A%22Contact%22%2C%22strWhereClause%22%3A%22PDM_Provider_NPI__c+%21%3D+null%22%2C%22lstSearchFields%22%3A%5B%22PDM_Provider_NPI__c%22%2C%22FirstName%22%2C%22LastName%22%2C%22Name%22%5D%2C%22strLabelField%22%3A%22Name%22%2C%22strValueField%22%3A%22Id%22%2C%22lstMetaFields%22%3A%5B%22PDM_Provider_NPI__c%22%5D%2C%22strIconURL%22%3A%22standard-sprite%2Fsvg%2Fsymbols.svg%23contact%22%7D%5D%2C%22strSearchTerm%22%3A%22sa%22%7D&language=en-US&asGuest=true&htmlEncode=false`;



    const url = `https://refer-test.ucsfhealth.org/webruntime/api/apex/execute?cacheable=true&classname=%40udd%2F01p6u0000006Hot&isContinuation=false&method=getRecords&namespace=&params=%7B%22lstConfigs%22%3A%5B%7B%22strName%22%3A%22Contact%22%2C%22strWhereClause%22%3A%22PDM_Provider_NPI__c+%21%3D+null%22%2C%22lstSearchFields%22%3A%5B%22PDM_Provider_NPI__c%22%2C%22FirstName%22%2C%22LastName%22%2C%22Name%22%5D%2C%22strLabelField%22%3A%22Name%22%2C%22strValueField%22%3A%22Id%22%2C%22lstMetaFields%22%3A%5B%22PDM_Provider_NPI__c%22%5D%2C%22strIconURL%22%3A%22standard-sprite%2Fsvg%2Fsymbols.svg%23contact%22%7D%5D%2C%22strSearchTerm%22%3A%22` + searchTerm +`%22%7D&language=en-US&asGuest=true&htmlEncode=false`;
   
   
   
   
   
   
   
    // const url = `https://refer-test.ucsfhealth.org/webruntime/api/apex/execute`
//    `params=%7B%22lstConfigs%22%3A%5B%7B%22strName%22%3A%22Contact%22%2C%22strWhereClause%22%3A%22PDM_Provider_NPI__c+%21%3D+null%22%2C%22lstSearchFields%22%3A%5B%22PDM_Provider_NPI__c%22%2C%22FirstName%22%2C%22LastName%22%2C%22Name%22%5D%2C%22strLabelField%22%3A%22Name%22%2C%22strValueField%22%3A%22Id%22%2C%22lstMetaFields%22%3A%5B%22PDM_Provider_NPI__c%22%5D%2C%22strIconURL%22%3A%22standard-sprite%2Fsvg%2Fsymbols.svg%23contact%22%7D%5D%2C%22strSearchTerm%22%3A%22sa%22%7D`;
    const requestParams = ""
    //%40udd%2F01p6u0000006Hot
    //  const requestParams = {"namespace":"","classname":"@udd/01p6u0000006Hot","method":"getRecords","isContinuation":false, "cacheable" :true, "language":"en-US","asGuest": true,"htmlEncode":false,
    //  "params":JSON.stringify({"contactID":"0036u00000bPWT9AAO"})
    //  "params":JSON.stringify({"lstConfigs":[{"strName":"Contact","strWhereClause":"PDM_Provider_NPI__c != null","lstSearchFields":["PDM_Provider_NPI__c","FirstName","LastName","Name"],"strLabelField":"Name","strValueField":"Id","lstMetaFields":["PDM_Provider_NPI__c"],"strIconURL":"standard-sprite/svg/symbols.svg#contact"}],"strSearchTerm":"sa"})
    //  ,"cacheable":false};
    // const requestParams = {"namespace":"","classname":"@udd/01p6u0000006Hp8","method":"getProviderData","isContinuation":false,"params":JSON.stringify({"contactID":"0036u00000bPWT9AAO"}),"cacheable":false};
    const { data } = await axios.get(url, requestParams,
            { headers: { 'content-type': 'application/json' } }
        );

    console.log(data);

    var formatedData = [];
    
    

    data.returnValue.forEach(element => {
        formatedData.push({
             label: element.label,
             meta : element.meta, 
             value: element.value
        });
    });

    // return data.returnValue;
    return formatedData;
}

//sad ja dodajem ovo
//ovo se poziva kad se kuca u Referring Provider Specialty
async function getProviderSpecialty(searchTerm){
    console.log('searchterm',searchTerm);

    const url = `https://refer-test.ucsfhealth.org/webruntime/api/apex/execute?cacheable=true&classname=%40udd%2F01p6u0000006Hot&isContinuation=false&method=getRecords&namespace=&params=%7B%22lstConfigs%22%3A%5B%7B%22strName%22%3A%22Department_List__mdt%22%2C%22strWhereClause%22%3A%22Display_Label__c+%21%3D+%27%27%22%2C%22lstSearchFields%22%3A%5B%22Display_Label__c%22%5D%2C%22strLabelField%22%3A%22Display_Label__c%22%2C%22strValueField%22%3A%22Display_Label__c%22%2C%22lstMetaFields%22%3A%5B%22Department_Number__c%22%5D%2C%22strIconURL%22%3A%22standard-sprite%2Fsvg%2Fsymbols.svg%23contact%22%7D%5D%2C%22strSearchTerm%22%3A${searchTerm}%7D&language=en-US&asGuest=true&htmlEncode=false`;
 
    // const url = `https://refer-test.ucsfhealth.org/webruntime/api/apex/execute?cacheable=true&classname=@udd/01p6u0000006Hot&isContinuation=false&method=getRecords&`

    // const url = `https://refer-test.ucsfhealth.org/webruntime/api/apex/execute?cacheable=true&classname=@udd/01p6u0000006Hot&isContinuation=false&method=getRecords&`

    
    //ovaj je bokijev
    // const url = `https://refer-test.ucsfhealth.org/webruntime/api/apex/execute?language=en-US&asGuest=true&htmlEncode=false`;
    
    const requestParams = "";
    // const requestParams = {"namespace":"","classname":"@udd/01p6u0000006Hot","method":"getRecords","isContinuation":false,"params": JSON.stringify({"lstConfigs":[{"strName":"Department_List__mdt","strWhereClause":"Display_Label__c+!=+''","lstSearchFields":["Display_Label__c"],"strLabelField":"Display_Label__c","strValueField":"Display_Label__c","lstMetaFields":["Department_Number__c"],"strIconURL":"standard-sprite/svg/symbols.svg#contact"}],"strSearchTerm": searchTerm }),"cacheable":true};
    const { data } = await axios.get(url,
            { headers: { 'content-type': 'application/json' } }
        );


    //%40udd%2F01p6u0000006Ho
    //  "params":JSON.stringify({"contactID":"0036u00000bPWT9AAO"})
    //  "params":JSON.stringify({"lstConfigs":[{"strName":"Contact","strWhereClause":"PDM_Provider_NPI__c != null","lstSearchFields":["PDM_Provider_NPI__c","FirstName","LastName","Name"],"strLabelField":"Name","strValueField":"Id","lstMetaFields":["PDM_Provider_NPI__c"],"strIconURL":"standard-sprite/svg/symbols.svg#contact"}],"strSearchTerm":"sa"})
    //  ,"cacheable":false};
    // const requestParams = {"namespace":"","classname":"@udd/01p6u0000006Hp8","method":"getProviderData","isContinuation":false,"params":JSON.stringify({"contactID":"0036u00000bPWT9AAO"}),"cacheable":false};

    console.log(data);

    var formatedData = [];
    
    

    data.returnValue.forEach(element => {
        formatedData.push({
             label: element.label,
             meta : element.meta, 
             value: element.value
        });
    });

    // return data.returnValue;
    return formatedData;
}


async function createReferralLog(){

}


//sad ja dodajem ovo
//ovo se poziva kad se kuca u Referring Provider Specialty
async function getRecordsCheck(){
    const url = `https://refer-test.ucsfhealth.org/webruntime/api/apex/execute?cacheable=true&classname=%40udd%2F01p6u0000006Hot&isContinuation=false&method=getRecords&namespace=&params=%7B%22lstConfigs%22%3A%5B%7B%22strName%22%3A%22Department_List__mdt%22%2C%22strWhereClause%22%3A%22Display_Label__c+%21%3D+%27%27+and+External__c+%3D+false%22%2C%22lstSearchFields%22%3A%5B%22Display_Label__c%22%5D%2C%22strLabelField%22%3A%22Display_Label__c%22%2C%22strValueField%22%3A%22Display_Label__c%22%2C%22lstMetaFields%22%3A%5B%22Department_Number__c%22%5D%2C%22strIconURL%22%3A%22standard-sprite%2Fsvg%2Fsymbols.svg%23contact%22%7D%5D%2C%22strSearchTerm%22%3A%22%22%7D&language=en-US&asGuest=true&htmlEncode=false`;
    const requestParams = ""
    //%40udd%2F01p6u0000006Hot
    //  const requestParams = {"namespace":"","classname":"@udd/01p6u0000006Hot","method":"getRecords","isContinuation":false, "cacheable" :true, "language":"en-US","asGuest": true,"htmlEncode":false,
    //  "params":JSON.stringify({"contactID":"0036u00000bPWT9AAO"})
    //  "params":JSON.stringify({"lstConfigs":[{"strName":"Contact","strWhereClause":"PDM_Provider_NPI__c != null","lstSearchFields":["PDM_Provider_NPI__c","FirstName","LastName","Name"],"strLabelField":"Name","strValueField":"Id","lstMetaFields":["PDM_Provider_NPI__c"],"strIconURL":"standard-sprite/svg/symbols.svg#contact"}],"strSearchTerm":"sa"})
    //  ,"cacheable":false};
    // const requestParams = {"namespace":"","classname":"@udd/01p6u0000006Hp8","method":"getProviderData","isContinuation":false,"params":JSON.stringify({"contactID":"0036u00000bPWT9AAO"}),"cacheable":false};
    const { data } = await axios.get(url, requestParams,
            { headers: { 'content-type': 'application/json' } }
        );

    console.log(data);

    var formatedData = [];
    
    

    data.returnValue.forEach(element => {
        formatedData.push({
             label: element.label,
             meta : element.meta, 
             value: element.value
        });
    });

    // return data.returnValue;
    return data;
}








//svaku funkciju koju definises mora da je dstavis u module.exports 
//sad kad preimenjuejs egetpera() dodaj ga opet
module.exports = { getProviderList, getProviderDetails, getSpecialties, getPera, getProviderContactList, getProviderSpecialty,getRecordsCheck, getProviderData, getProviderDataTestOldWay2};
