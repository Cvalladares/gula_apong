# gula_apong
This repository is part of _gula apong_ project for ICT4D class by VU Amsterdam.
It is a hybrid application written using Ionic 1 and Cordova frameworks.

## Project setup
Pull the project and run `bower install` to download dependencies.

We use Pouchdb and Couchdb to store data locally on mobile device and replicate it to remote database when there is network connection available.
For instructions about how to install and configure the database you can check [this link](https://pouchdb.com/guides/).

The project was checked on Couchdb 1.7.1. After installing the database, access [http://localhost:5984/_utils](http://localhost:5984/_utils) to access the database UI.
A dialog will pop up and will ask you to change the password.
Next, you will need to setup CORS (Cross-origin resource sharing). Use your database admin username and password for the second command
```bash
npm install -g add-cors-to-couchdb
add-cors-to-couchdb -u USER -p PASSWORD
```

#### Setting up the Mobile Develpment Environment

Upon pulling the repostory,  certain requirements are necessary in order to properly set up the development environment. For this project, we used Webstorm as our development environment, though it may not be necessary to use this environment to further develop the project.  Also, we have multiple dependencies that must be taken care of.

First, we must install all node dependencies:
```bash
npm install
```
Furthermore, we must install bower dependencies for the web development.
```bash
bower install
```
Also, it is necessary to have [jdk-8](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) given that cordova has a dependency on this version of java.  Also, it is necessary for an android API-Level 23 to be used, though we have not tested with higher api levels.  

Also, it is necessary to install android, ios, and webbrowsers as platforms for deployment. To verify if any of these platforms are already installed, use the following:
```bash
cordova platforms ls
```
The following are necessary to develop an android application.  We use cordova-android version 6.2.2 as this is a stable version whci hsi also compatible with our other dependencies in the project (Android API Level 23, for example).  The default version (6.1.1) is not stable and will not allow android compilation
```bash
cordova platform add android@6.2.2
ionic resources
```
Furthermore, when compiling the project to andoid, the following commands must be executed:

```bash
cordova prepare android
cordova compile android
```
These commands generate an APK file which can be used to emulate your project in an android emulator, or to deploy on an android device.  The generated files can be found in the following folder in your project directory:

platforms/android/build/outputs/apk

#### Deployment and Emulation
For us to be able to emulate our project in Android, it was necessary for us to install android studio and to start an android virtual device via android studio.  The Android SDK can also be downloaded via android studio, and from there we downloaded the Android API level 23.  Once the Android Virtual Device has been created, then *it is necessary to start the android virtual device via android studio* as there is a bug that does not allow ionic to start the android device via ionic.  To bypass this, start the Android Virtual Device and then launch the application by executing the following command:

```bash
ionic run android
```
For a detailed tutorial, please use the following [Cordova Emulation Tutorial](https://cordova.apache.org/docs/en/3.1.0/guide/cli/index.html).   With regards to deployment,  an APK can be generated for android applications. This can be done by following this tutorial [Ionic Deployment Tutorial](https://ionicframework.com/docs/v1/guide/publishing.html).  Following this tutorial, the output will be stored in the 


#### Plugin versions
You can see dependencies and versions in _bower.json_. Command line tools are listed in table below.

| tool | version |
|---|---|
| Ionic | 2.2.1 |
| Cordova | 6.5.0 |
| Nodejs | 10.4.1 |
| bower | 1.8.0 |


#### Setup data (manually)
Create databases for user _user_1_farm_, _user_1_production_, _user_1_profile_.

Create user in __users_ table
```bash
http -v PUT http://admin:admin@localhost:5984/_users/org.couchdb.user:1 name=1 type=user roles:='[]' password=password
```

Create databases for a user manually
```
http -v PUT http://admin:admin@localhost:5984/user_1_farm
http -v PUT http://admin:admin@localhost:5984/user_1_production
http -v PUT http://admin:admin@localhost:5984/user_1_profile
```

Set newly created user as database owner
```bash
echo "{\"admins\": {\"names\": [\"1\"], \"roles\": [\"admins\"] }, \"members\": {\"names\": [\"1\"], \"roles\": [\"admins\"]}}" | http PUT http://admin:admin@localhost:5984/user_1_production/_security
echo "{\"admins\": {\"names\": [\"1\"], \"roles\": [\"admins\"] }, \"members\": {\"names\": [\"1\"], \"roles\": [\"admins\"]}}" | http PUT http://admin:admin@localhost:5984/user_1_farm/_security
echo "{\"admins\": {\"names\": [\"1\"], \"roles\": [\"admins\"] }, \"members\": {\"names\": [\"1\"], \"roles\": [\"admins\"]}}" | http PUT http://admin:admin@localhost:5984/user_1_profile/_security
```
