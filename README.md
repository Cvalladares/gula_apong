# gula_apong
This repository is part of _gula apong_ project for ICT4D class by VU Amsterdam.
It is a hybrid application written using Ionic 1 and Cordova frameworks.

## Project setup
Pull the project and run `bower install` to download dependencies.

We use Pouchdb and Couchdb to store data locally on mobile device and replicate it to remote database when there is network connection available.
For instructions about how to install and configure database you can check [this link](https://pouchdb.com/guides/).

Project was checked on Couchdb 1.7.1. After installing the database access [http://localhost:5984/_utils](http://localhost:5984/_utils) to access database UI.
Dialog will pop up and ask you to change the password.
Next, you will need to setup CORS. Use your database admin username and password for the second command
```bash
npm install -g add-cors-to-couchdb
add-cors-to-couchdb -u USER -p PASSWORD
```

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

Set newly created user as database owner
```bash
echo "{\"admins\": {\"names\": [\"1\"], \"roles\": [\"admins\"] }, \"members\": {\"names\": [\"1\"], \"roles\": [\"admins\"]}}" | http PUT http://admin:admin@localhost:5984/user_1_production/_security
```