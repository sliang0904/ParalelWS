function doClick(e) {
	wsCall("azureToken"); //azureToken which is used to authorize the user
}

$.index.open();

var webService = require('Request/WebService');

/*var req1 = {
	url:"https://f339089fe766891ed2c567aeb9921c0b1989b13c.dev.agilent.appcelerator.com/api/dashboard/summary/businessOrder?range=MTD"
};
var req2 = {
	url:"https://f339089fe766891ed2c567aeb9921c0b1989b13c.dev.agilent.appcelerator.com/api/dashboard/summary/revenue?range=MTD"
};
var req3 = {
	url:"https://f339089fe766891ed2c567aeb9921c0b1989b13c.dev.agilent.appcelerator.com/api/dashboard/summary/fieldInvoice?range=MTD"
};
var req4 = {
	url:"https://f339089fe766891ed2c567aeb9921c0b1989b13c.dev.agilent.appcelerator.com/api/dashboard/summary/headcount?range=MTD"
};*/

var req1 = {
	url:"https://httpbin.org/get"
};
var req2 = {
	url:"https://httpbin.org/get"
};
var req3 = {
	url:"https://httpbin.org/get"
};
var req4 = {
	url:"https://httpbin.org/get"
};

async function wsCall(token) {
	var headers = [];
	headers.push({
		headerName: 'Authorization',//Authorization
		headerValue: "Bearer " + token
	});

	var webServiceData = {
		url : "",
		serviceSuccessCallback : function(e) {
			Ti.API.info('serviceSuccessCallback' + JSON.stringify(e));
		},
		serviceFailureCallback : function(e) {
			Ti.API.info('HR TileView failure ' + JSON.stringify(e));
		},
		requestHeaders : headers,
		methodType : 'GET',
		requestBody : ""
	};

	var promises = [];

	webServiceData.url = req1.url;
	promises.push(webService.promiseWSCallRequest(webServiceData));
	webServiceData.url = req2.url;
	promises.push(webService.promiseWSCallRequest(webServiceData));
	webServiceData.url = req3.url;
	promises.push(webService.promiseWSCallRequest(webServiceData));
	webServiceData.url = req4.url;
	promises.push(webService.promiseWSCallRequest(webServiceData));

	var webservicePromises = await Promise.all(promises);
	webservicePromises.forEach(response => {
		Ti.API.info("Reponse Text: " + response);
	})
}

var azureLib = require('com.agilent.libAzure');
function getAccessToken() {
	azureLib = require('com.agilent.libAzure');
    var clientId = "21d74641-a6ec-470e-a940-3a1fa6745157";
    var authorityURL = "https://login.microsoftonline.com/a9c0bc09-8b46-4206-9351-2ba12fb4a5c0";
    var scopes = ["api://21d74641-a6ec-470e-a940-3a1fa6745157/mgmp.apis1"];
    var azureToken = '';
    var idToken = '';
    Ti.API.info("azureLib == " + azureLib);
    azureLib.initiateMSALTokenRequest(clientId, authorityURL, scopes, callback1, function(e) {
    //Ti.API.info("Access token is 111 === >>>>" + JSON.stringify(e.idToken));
    Ti.API.info("Access token is 222 === >>>>" + JSON.stringify(e.responseToken));
    azureToken = e.responseToken ;
    idToken = e.idToken;

      wsCall(azureToken);
  });
  function callback1 (e) {

  }

}
