<p align="center">
<img src="client/src/assets/12dww.png">
</p>

# Authors

- [Rolland Goodenough](https://github.com/GoodenoughR) - Computer Science
- [Donald Tran](https://github.com/DonaldTran11)       - Cyber Security
- [Tyler Huckeba](https://github.com/tuscontyler)      - Software Design & Development
- [Spencer Wirth](https://github.com/snw30)            - Cyber Security

[test](https://github.com/Envolution-Capstone/secureFilePlatform#running)

# Project Description
For teams, organizations, and businesses alike, Envolution’s Secure Document Sharer is a
practical and secure solution for sharing documents between multiple users. The purpose of this product is to provide a way to share files with a group in a secure manner. The product allows
users to upload and share files into a secure environment, with the ability to see files in
groups/clusters based on individual user permissions.

Project Structure Overview
============================

<details><summary><b>Client-Side</b></summary>

    .
    ├── public                
    ├── src                   
    │   ├── assets
    │   │      └── # image/asset files
    │   ├── components
    │   │   ├── Documents
    │   │   │   ├── DocumentTable.js
    │   │   │   └── DocumentUploadModal.js
    │   │   ├── Groups
    │   │   │   ├── GroupInfo.js
    │   │   │   ├── GroupInvites
    │   │   │   ├── GroupModal.js
    │   │   │   ├── GroupSelector.js
    │   │   │   ├── GroupsListModal.js
    │   │   │   └── InviteUserModal.js
    │   │   ├── AlertsButton.js
    │   │   ├── Header.js
    │   │   ├── MuiStyle.js
    │   │   └── Sidebar.js 
    │   ├── firebase
    │   │   └── firebase.js
    │   ├── pages
    │   │   ├── MyDrive.js
    │   │   └── ShareWithMe.js
    │   ├── requests
    │   │   └── client.js
    │   ├── styles
    │   │   └── # JavaScript styled-components files
    │   ├── util
    │   │   ├── files
    │   │   │   ├── fileUpload.js
    │   │   │   └── files.js
    │   │   ├── groups
    │   │   │   └── groups.js
    │   │   └── user
    │   │       └── login.js
    │   ├── App.js 
    │   ├── GlobalStyles.js
    │   ├── index.css
    │   └── index.js   
    ├── package-lock.json                  
    └── package.json                

</details>
<details><summary><b>Server-Side</b></summary>

    .
    ├── src   
    │   ├── configuration
    │   │   └── setup.js
    │   ├── firebase 
    │   │   └── firebase.js
    │   ├── logging 
    │   │   └── firebase.js
    │   ├── middleware/authentication 
    │   │   └── checkAuth.js
    │   ├── repos 
    │   │   ├── file
    │   │   │   └── file.repo.js
    │   │   ├── group
    │   │   │   └── group.repo.js
    │   │   └── user
    │   │       └── user.repo.js
    │   ├── routes
    │   │   ├── file.routes.js
    │   │   ├── group.routes.js
    │   │   └── user.routes.js
    │   ├── services 
    │   │   ├── encryption
    │   │   │   └── encryption.service.js
    │   │   ├── file
    │   │   │   └── file.service.js
    │   │   ├── group
    │   │   │   └── group.service.js
    │   │   ├── key
    │   │   │   └── key.service.js
    │   │   └── user
    │   │       └── user.service.js
    │   ├── util 
    │   │   ├── file_upload.js
    │   │   └── responses.js
    │   └── app.js
    ├── .env
    ├── README.md
    ├── package-lock.json
    ├── package.json
    └── service-accountt-credentials.json  
    
</details>

# Project Setup

### Requirements

This software requires the following programs:

    1. NodeJS
    2. npm (comes with `NodeJS`)

### With Make:

If you have `Make` installed, setup is easy:

    1. run the command `make setup` in the base directory

### Without Make:

If you do not have `Make` installed:

    1. enter the `server/` directory and run `npm install -y --force --silent`
    2. enter the `client/` directory and run `npm install -y --force --silent`


# Running

### With Make:

    1. run the command `make run` in the base directory

### Without Make:

    1. enter the `server/` directory and run `npm start`
    2. enter the `client/` directory and run `npm start`


# Product Features
> Product features are split into separate sections with their respective functionalities

### Personal File Storage:

<details><summary>Downloading Files</summary>
Personal files can be downloaded by clicking on the row a file is on.
</details>

<details><summary>Deleting Files</summary>
Personal files can be deleted by right clicking on the files row and clicking `delete` on the context menu that pops up.
</details>

### Shared File Storage:

<details><summary>Downloading Files</summary>
Group files can be downloaded by clicking on the row a file is on.
</details>
    
<details><summary>Deleting Files</summary>
Only group admins can delete group files.
Group files can be deleted by right clicking on the files row and clicking `delete` on the context menu that pops up.
</details>

### File Upload

<details><summary>Personal File Upload</summary>

Personal Files are uploaded through the `Upload New File` button.
On the file upload screen:
    
    1. Select the file to upload
    2. click the `submit` button

 </details>
 
<details><summary>Group File Upload</summary>

Group Files are uploaded through the `Upload New File` button.
The important distinction between personal files and shared files is selecting the group to share with. 

On the file upload screen:
    1. Select the file to upload
    2. Select a group to share the file with from the drop down
    3. click the `submit` button
    
</details>

### Groups

<details><summary>Creating a Group</summary>

Creating a group is done through the `Create Group` button on the left sidebar.

On the Create Group screen:
    1. input the group name
    2. add any users you want to invite
    3. click `create group`
 </details>

<details><summary>Inviting Users</summary>

Inviting users is done through the `Invite User` button on the left sidebar.
Only group admins can invite users to groups.

On the Invite User Screen
    1. Select the group to invite a user to
    2. enter the users email
    3. click `invite user`
 </details>

<details><summary>Viewing Group Info</summary>

Group info can be viewed through the `View Groups` button on the left sidebar.
</details>


# Database
This project utilizes a cloud-hosted NoSQL database through Google's Firebase.

# Troubleshooting

<details><summary><b>Ensure that there are no missing npm modules</b></summary>
If the software doesn't run, try installing all of the required NPM modules:

    In `/server/`:
    run `npm install -y --force --silent`

    In `/client/`:
    run `npm install -y --force --silent`
</details>


<details><summary><b>Ensure that the correct NodeJS version is being used</b></summary>
Having an out-of-date versiona of Node JS can cause issues.
Follow https://nodejs.org/en/download/current for getting the newest version.
</details>

<details><summary><b>Ensure that you are not missing the .env and Service Credential files</b></summary>

The server requires `.env` and `service-account-credentials.json` files to be in the `/server/` directory.
These files should be on the repo *(though if this were a real product they would not be)*
If the files are missing, copy and paste the following in to the respective file in `/server/`.
```
// .env
PORT=9000
APIKEY="AIzaSyA7ROErICF1bCa4earw2UoglBq_POrwBrA"
AUTHDOMAIN="file-storage-e6537.firebaseapp.com"
PROJECTID="file-storage-e6537"
STORAGEBUCKET="file-storage-e6537.appspot.com"
MESSAGINGSENDERID="68930784514"
APPID="1:68930784514:web:65d2623bfbc3da3f27c61b"

// service-account-credentials.json
{
  "type": "service_account",
  "project_id": "file-storage-e6537",
  "private_key_id": "c473669f0358a8f8d842e1cc3a9df8cad81c26a3",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCxZ/b6JELEZwn1\nj/OfphMg77X2bMIs98TOjN1Y0Lh/rvANWpRfAjbiwRqgEKMiBvjDLwwtzaJC0n3F\nukNKDflANJcIFahcEiiji1qAkruT1eyeBhA+MvGIJcC/ng6t0oSZw1BQ5nU7WCf5\ncmFdNXueWkhLSmLZoWguGXBjgNA4tnmVqDTr3Ed0v3HQxAoz2JYVtt5cnQyql5Rx\nuYAx7TaaOQFMUPxvlnpYDLTGjTulsRWcuu4AdkXJyLSwTMFV6xpME+gLF5BOHeEK\nPX1f2aYSpP8S4QL//nSIMf09NguCO0QnlsXafsshT0BGiL49HZQMvrc+g2O2kY+e\nR1ytM9BRAgMBAAECggEACGF48Wg1H0Ie3lLml2wpCy1H01Rf9+/chEVzT3bMwHtr\nK7ZTvAlGvn+Q2m7uxfS+W7olQSStvapj9qtN8nmmhLn3SJJ9WZwh/1fd9qT354v7\nmZt/uPB/KIdgC61T1DJVwU3QxYGdmCgZ+1bD8rtME7cAI05oTQ+q9EKPZKP5MjSY\nSFAxdej9oGdQw//rqfPqnciTVPOp986teM6La+fvS+VNCEth8KyagDEWlVY3empF\nls8gT6ZDNIlWOtIfI8FP8hglTjYciZUumRki8c6k9iznbjHWv7itpmWtCas97/K5\nbNHSTMnpJiA6GJe5L+r55kj8z+wgClJH/QGGmxCRYQKBgQDz3QWDLt0xumKCzQQM\nLHW7rwgVHsTzFLvPT7NLNwNO5+e6MxIICXjPCLwq6sBcKhR5UdwKjoUMg+AR1JC9\n/LvoF0jkZhueZrIISYDLLI2ydMWOH9O871svohwvCqNKXazB95C85c4ua8Mx/tKF\nZjp5o09wmH0fN5z4drGbivQFBwKBgQC6PDwD68KYluUbD5mnN7XS++rj5+6uIrRO\nGxO/sTW2bc2QD/Nb6zKTGW+68JJDUSGSR9WzQcVUKcAOVr5/OWUiDG8dlCoFxjRE\nDtDeRwKgh+ObsMwJvVYXVPEjlcZiSOJnw+5LOHng1yt1Z/mMN8h+MaFLNCtQiAZC\niq9BFb/B5wKBgG6+lrxGUgk9PXNtK0NkBWtgR2lf+czyQ4AYD7I+n2/7/M4gVzXz\nJzvOGbXbudOhAH8/34+jvWQ7l0xBniHJXoQ93spqXGyI8py01Jpv90FtqjGq3ntU\nr7JoCiiKyjEBbW0AwmgmbIXERnaz5GLUVAXdVjwp49iDZvOm421howONAoGARItQ\n53yJddHr5wbZ3cLSaCISNOmzXmIljK3ImgAmLcvCIejNACLTzXJKPjq3CpG80nMg\nA0cM0so/BsgEexzrzRlYeEGFKfTmXbo6Q+VM4TrCmhX7MwZ9vj6kNh21E42RzvE9\nLnBN42QueZrYLTSG1XN80woTeyNlcm5KzKCtoDcCgYEAti4+UZ8r2DnRrCoQ/TE1\nJzbJ1oRcYCA7UKcF8Vxj3WtAXTnNuksoJDX1yVkvIU3/03qB959M826CTb1Qc2sW\nzx1WHz2TnBIT+QPbHXX8Kp2J1cZ+Fw8rW4+OUNcmL1TSl/zJQtc8Ke924tD6e44y\nA4pMqJxQiCVQbnEDcvS2LEQ=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-bjgpc@file-storage-e6537.iam.gserviceaccount.com",
  "client_id": "115410691965466141057",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-bjgpc%40file-storage-e6537.iam.gserviceaccount.com"
}
```
</details>

