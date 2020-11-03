# Data-Encapsulator
A plugin for IOTA DataMarketPlace to sell confidential data in trusted &amp; anonymous way. 

## Install
### IPFS
Download [IPFS CLI](https://docs.ipfs.io/install/command-line/)
```
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin "[\"*\"]"
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Credentials "[\"true\"]"
ipfs daemon
```
### NPM Modules
Install npm modules

```
npm i
```

## Run

### One-Command-Tangle
For now, We are using private [node](https://github.com/iota-community/one-command-tangle) to run our project.

### Run Server

```
npm start
```


## Content
- [x] ipfs endpoints
- [x] create boilerplate for sequelize database
- [x] create service IOTA MAM, IOTA transactions
- [x] create service for data marketplace deployments data
- [ ] create IOTA endpoints
- [x] finish code of conduct
- [x] integrate sonarqube  
- [ ] schema to validate all calls

follow our progress on [pivotalTracker](https://www.pivotaltracker.com/n/projects/2465210)


