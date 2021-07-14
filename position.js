const bullhorndata = require('./bullhorndata');
const fieldEnum = require('./bhenum');

var data = bullhorndata.findEntity("JobOrder", '143200', "id,description,title");
arr = [143200, 143706];
//var data = bullhorndata.findMultipleEntity("JobOrder", arr, "id,description,title");
//var data = bullhorndata.searchEntity("JobOrder", "id,description,title", "isDeleted:0  AND employmentType:\"Travel Nursing\" AND isOpen:\"true\" AND NOT status:Archive", "&count=10");
//var data = bullhorndata.searchEntity("JobOrder", "id,description,title", "isDeleted:0  AND employmentType:\"Travel Nursing\" AND isOpen:\"true\" AND NOT status:Archive", "&count=10");
//ids = [967277];
//var data = bullhorndata.associateWithEntity("CandidateCertification", 1944398, "certificationFileAttachments", ids);
//ids = [1944398, 1944396];
//var data = bullhorndata.getAllAssociation("CandidateCertification", ids, "certificationFileAttachments", "id");
console.log(data);