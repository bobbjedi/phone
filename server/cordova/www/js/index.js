var app = {
	// Application Constructor
	initialize: function () {
		this.bindEvents();
	},
	// Bind Event Listeners
	//
	// Bind any events that are required on startup. Common events are:
	// 'load', 'deviceready', 'offline', and 'online'.
	bindEvents: function () {
		document.addEventListener('deviceready', this.onDeviceReady, false);
	},
	// deviceready Event Handler
	//
	// The scope of 'this' is the event. In order to call the 'receivedEvent'
	// function, we must explicitly call 'app.receivedEvent(...);'
	onDeviceReady: function () {
		app.receivedEvent('deviceready');
	},
	// Update DOM on a Received Event
	receivedEvent: function (id) {
		log('Ready');
	}
};



// const FS = function (pathRoot) {
//  // <preference name="AndroidPersistentFileLocation" value="Compatibility" />
// 	this.init = function () {
// 			return new Promise(resolve => {
// 				window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, fs => {
// 					this.fs_ = fs;
// 					fs.getDirectory(pathRoot || '/none', {create: true, exclusive: false}, dirRoot => {
// 						this.dirRoot = dirRoot;
// 						resolve(true);
// 					}, (e)=>{
// 						log(e);
// 						resolve(false);
// 					});
// 				});
// 			});
// 		},

// 		this.getDir = function (dirName, isCreate) {
// 			return new Promise(resolve => {
// 				this.fs_.getDirectory(dirName, {create: isCreate, exclusive: false}, dir => resolve(dir), log);
// 			});
// 		},

// 		this.downloadFile = function (fileName, fileURL) {
// 			return new Promise(resolve => {
// 				const fileTransfer = new FileTransfer();
// 				log('File path: ' + this.dirRoot.nativeURL + fileName);
// 				fileTransfer.download(fileURL, this.dirRoot.nativeURL + fileName, file => resolve(file), e => {
// 					resolve(null);
// 					log('Error: ' + e);
// 				});
// 			});
// 		},

// 		this.writeFile = function (fileName, data) {
// 			return new Promise(resolve => {
// 				this.dirRoot.getFile(fileName, {create: true, exclusive: false}, fileEntry => {
// 					fileEntry.createWriter(fileWriter => {
// 						fileWriter.onerror = function (e) {
// 							log('Failed file read: ' + e.toString());
// 							resolve(false);
// 						};
// 						fileWriter.onwriteend = function () {
// 							resolve(fileWriter);
// 						}
// 						fileWriter.write(data);
// 					}, log);
// 				}, log);
// 			});
// 		},

// 		this.readFile = function (fileName) {
// 			return new Promise(resolve => {
// 				this.dirRoot.getFile(fileName, null, fileEntry => {
// 					fileEntry.file(function (file) {
// 						const reader = new FileReader();
// 						reader.onloadend = function () {
// 							resolve(this.result);
// 						};
// 						reader.readAsText(file);
// 					}, log);
// 				}, log);
// 			});
// 		}

// };

// const fs = new FS('/lib');
// document.addEventListener('deviceready', async () => {
// 	await fs.init();
// 	log('Write: ' + !!(await fs.writeFile('text/test.txt', 'Test file writed!')));
// 	log('READ: ' + (await fs.readFile('text/test.txt')));
// 	// const file = await fs.downloadFile('img/test.jpg', 'https://im0-tub-ru.yandex.net/i?id=b1cc04226ea9d11b647fcdf48052260a&n=13&exp=1');
// 	// document.getElementById('image').setAttribute('src', file.nativeURL);
// }, false);


function log(str) {
	if(typeof str === 'object'){
		str = JSON.stringify(str);
	}
	const p = document.createElement('p');
	p.innerHTML = str;
	document.getElementById('log').appendChild(p);
}

window.onerror = (e) => {
	log('Error: ' + e);
};
