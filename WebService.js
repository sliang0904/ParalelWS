// var _ = require('alloy/underscore');
// var Promise = require('bluebird.core.min');

/*exports.serviceCall = function(_data, callingCount) {
	Ti.API.info(Ti.Filesystem.applicationDataDirectory);
	if (Ti.Network.online === true) {
		// return new Promise(function(resolve, reject) {
			// var openNotificationLoader = TiNSURLRequest.createClient({
			var openNotificationLoader = Ti.Network.createHTTPClient({
				timeout : 2500000, // this timeout value is increased just for testing purpose, this needs to be fixed at backend side
				validatesSecureCertificate : false
			});
			openNotificationLoader.setTlsVersion(Titanium.Network.TLS_VERSION_1_1);
			openNotificationLoader.setTimeout(180000);
			//_data.url = Titanium.Network.encodeURIComponent(_data.url);
			openNotificationLoader.open(_data.methodType, _data.url);

			//Set the request headers if any
			if (_data.requestHeaders != undefined) {
				for (var k = 0; k < _data.requestHeaders.length; k++) {
					Ti.API.info('Header: ' + _data.requestHeaders[k].headerName);
					Ti.API.info(' val ' + _data.requestHeaders[k].headerValue);

					openNotificationLoader.setRequestHeader(_data.requestHeaders[k].headerName, _data.requestHeaders[k].headerValue);
				}
			}
			Ti.API.info(Ti.Filesystem.applicationDataDirectory);
			Ti.API.info('Response url: ' + _data.url, ' Body ' + _data.requestBody);

			if (_data.overridePreviousRequest == true && _data.previousRequest != '') {
				_data.previousRequest.abort();
			}

			if (_data.methodType == 'GET') {
				openNotificationLoader.send();
			} else {
				openNotificationLoader.send(_data.requestBody);
			}
			var d = new Date();

			Ti.API.info("Timestamp: " + d.getHours() + "-" + d.getMinutes() + "-" + d.getSeconds());

			openNotificationLoader.onload = function(e) {
				// Ti.API.info("Response Text: " + this.responseText);

				// Alloy.Globals.utils.writeResponseLog('Response url : : ' + _data.url + '->  ' + this.responseText);
				//Ti.API.info("On Load myToken: " + myToken);
				Ti.API.info('status ' + this.status);

				if (this.status === 200 || this.status === 201 || this.status === 204) {

					_data.serviceSuccessCallback(this.responseText);
					// resolve(this.responseText);

				} else {
					_data.serviceFailureCallback(this.responseText, e);
					// reject(e);
				}
			};

			openNotificationLoader.onerror = function(e) {
				Ti.API.info("On Error Response Text: " + this.responseText + JSON.stringify(e));
				_data.serviceFailureCallback(this.responseText, e);
				// reject(e);
			};
		// });
		// return openNotificationLoader;
	} else {
		// alert("please check your network connection.");
		_data.serviceFailureCallback("Error", {});
		// reject("Error");
	}

	function terminateServiceCall() {
		openNotificationLoader.abort();
	}

};

function writeDataToFile(tst) {
	
	var imageDir = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'downloaded_images');
	if (! imageDir.exists()) {
		imageDir.createDirectory();
	}
	// .resolve() provides the resolved native path for the directory.
	var imageFile = Ti.Filesystem.getFile(imageDir.resolve(), 'orderData.txt');
	Ti.API.info("ImageFile path is: " + imageFile.resolve());
	if (imageFile.write(tst) === false) {
		// handle write error
	}
	// dispose of file handles
	imageFile = null;
	imageDir = null;
	
} */


function webServiceRequest(requestData) {
	
	return new Promise(function(resolve, reject){
		
		if (Ti.Network.online === true) {
			
			var xhr = Ti.Network.createHTTPClient({
				timeout : 2500000, // this timeout value is increased just for testing purpose, this needs to be fixed at backend side
				validatesSecureCertificate : false
			});
			xhr.setTlsVersion(Titanium.Network.TLS_VERSION_1_1);
			xhr.setTimeout(180000);
			xhr.open(requestData.methodType, requestData.url);

			//Set the request headers if any
			if (requestData.requestHeaders != undefined) {
				
				for (var k = 0; k < requestData.requestHeaders.length; k++) {
					Ti.API.info('Header: ' + requestData.requestHeaders[k].headerName);
					Ti.API.info(' val ' + requestData.requestHeaders[k].headerValue);
					xhr.setRequestHeader(requestData.requestHeaders[k].headerName, requestData.requestHeaders[k].headerValue);
				}
				
			}
			// Ti.API.info(Ti.Filesystem.applicationDataDirectory);
			Ti.API.info('Response url: ' + requestData.url, ' Body ' + requestData.requestBody);

			if (requestData.methodType == 'GET') {
				xhr.send();
			} else {
				xhr.send(requestData.requestBody);
			}


			xhr.onload = function(e) {
				// Ti.API.info("Response Text: " + this.responseText);
				// Alloy.Globals.utils.writeResponseLog('Response url : : ' + requestData.url + '->  ' + this.responseText);
				Ti.API.info('status ' + this.status);

				if (this.status === 200 || this.status === 201 || this.status === 204) {

					resolve(this.responseText);

				} else {
					reject(this.responseText);
				}
			};

			xhr.onerror = function(e) {
				Ti.API.info("On Error Response Text: " + this.responseText + JSON.stringify(e));
				reject(e);
			};

		} else {
			reject("Error");
		}
		
	});
	
}

exports.promiseWSCallRequest = webServiceRequest;
