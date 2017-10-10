# SinemaTVSen Front End Source Code

## Installation

 * Clone Project,
 * Install [Nodejs](https://nodejs.org/en/),
 * Open Command Line or Terminal to Install [Bower](https://bower.io/), [Cordova](https://cordova.apache.org/) & [Ionic Framework](http://ionicframework.com/) with npm globally, 
 ```
 	npm install -g bower cordova ionic
 ```
 
 * Enter the project directory and install required libraries using npm & bower,
 ```
	cd /path/to/project
    npm install
    bower install
 ```
 
 * Restore the Ionic state defined within project with command below,
 ```
 	ionic state restore
 ```

 * Add android platform to the project. If added before, skip this part,
 ```
 	ionic platform add android
 ```
 
## Dev-Env Configurations

 Depended on where this project will be, there will be some configurations to make. 
 
For serving project on browser & debugging on live reload,

 * Open Terminal
 ```
 	cd /path/to/project
 	ionic serve
 ```
 
 * Every change made below ```./www/``` will refresh the browser for live reload.
 
For deploying the project to an android device, 


 * Open Terminal
 
 * For building the .app
 ```
 	ionic build android
 ```
 
Output file path will be shown on Terminal.
 
 * For running the project on Android Device
 ```
 	ionic run android
 ``` 
 
 * Check device for fingerprint verifications. Track Terminal for further informations-
