<p align="center">
<img src="client/src/assets/12dww_1_70.png">
</p>

Table of contents
=================
<!--ts-->
* [Authors](https://github.com/Envolution-Capstone/secureFilePlatform#authors)
* [Project Description](https://github.com/Envolution-Capstone/secureFilePlatform#project-description)
* [Project Structure Overview](https://github.com/Envolution-Capstone/secureFilePlatform#project-structure-overview)
* [Project Setup](https://github.com/Envolution-Capstone/secureFilePlatform#project-setup)
    * [Requirements](https://github.com/Envolution-Capstone/secureFilePlatform#requirements)
    * [With Make](https://github.com/Envolution-Capstone/secureFilePlatform#with-make)
    * [Without Make](https://github.com/Envolution-Capstone/secureFilePlatform#without-make)
* [Running](https://github.com/Envolution-Capstone/secureFilePlatform#running)
    * [With Make](https://github.com/Envolution-Capstone/secureFilePlatform#with-make-1)
    * [Without Make](https://github.com/Envolution-Capstone/secureFilePlatform#without-make-1)
 * [Product Features](https://github.com/Envolution-Capstone/secureFilePlatform#product-features)
    * [Personal File Storage](https://github.com/Envolution-Capstone/secureFilePlatform#personal-file-storage)
    * [Shared File Storage](https://github.com/Envolution-Capstone/secureFilePlatform#shared-file-storage)
    * [File Upload](https://github.com/Envolution-Capstone/secureFilePlatform#file-upload)
    * [Groups](https://github.com/Envolution-Capstone/secureFilePlatform#groups)
 * [Database](https://github.com/Envolution-Capstone/secureFilePlatform#database)
 * [Troubleshooting](https://github.com/Envolution-Capstone/secureFilePlatform#troubleshooting)
<!--te-->

# Authors

- [Rolland Goodenough](https://github.com/GoodenoughR) - Computer Science
- [Donald Tran](https://github.com/DonaldTran11)       - Cyber Security
- [Tyler Huckeba](https://github.com/tuscontyler)      - Software Design & Development
- [Spencer Wirth](https://github.com/snw30)            - Cyber Security

# Project Description
For teams, organizations, and businesses alike, Envolution’s Secure Document Sharer is a
practical and secure solution for sharing documents between multiple users. The purpose of this product is to provide a way to share files with a group in a secure manner. The product allows
users to upload and share files into a secure environment, with the ability to see files in
groups/clusters based on individual user permissions.

Project Structure Overview
============================

### Client-Side

    .
    ├── public                
    ├── src                   
    │   ├── assets
    │   │      └── # image/asset files
    │   ├── components
    │   │   ├── Documents
    │   │   │   ├── DocumentTable.js         # Table for displaying files and fetching files from backend
    │   │   │   └── DocumentUploadModal.js   # Modal window allowing the user to select file for upload and initiate upload process
    │   │   ├── Groups
    │   │   │   ├── GroupInfo.js             # Displays information about a group, its members, and allows admins to remove a member from the group
    │   │   │   ├── GroupInvites             # Renders a lit of group invites fetched from backened API, provides buttons for accepting/declining invite
    │   │   │   ├── GroupModal.js            # Renders modal that allows users to create a group and invite others to it.
    │   │   │   ├── GroupSelector.js         # Renders a dropdown menu populated with the names of the user's groups
    │   │   │   ├── GroupsListModal.js       # Modal for displaying a list of the user's groups and the members of a selected group
    │   │   │   └── InviteUserModal.js       # Renders a modal for inviting a user to a group
    │   │   ├── AlertsButton.js        # Displays notification containing list of group invites with options to accept or decline them
    │   │   ├── Header.js              # Component for header that includes logo, search bar, and user profile
    │   │   ├── MuiStyle.js            # Style object 
    │   │   └── Sidebar.js             # Renders sidebar with options for uploading file, creating/managing groups, and navigating to different views within the app
    │   ├── firebase
    │   │   └── firebase.js            # Firebase configuration
    │   ├── pages
    │   │   ├── MyDrive.js             # Renders the header and the document table 
    │   │   └── ShareWithMe.js         # Fetches and displays all the files shared with the user and allows the user to interact with them
    │   ├── requests
    │   │   └── client.js              # Sends HTTP requests to a local backend server and returns the response.
    │   ├── styles
    │   │   └── # JavaScript styled-components files
    │   ├── util
    │   │   ├── files
    │   │   │   ├── fileUpload.js      # Functionality for uploading a file to server using backend requests
    │   │   │   └── files.js           # Makes a GET request to the specified route for getting files and returns the response data
    │   │   ├── groups
    │   │   │   └── groups.js          # Requests to backend API to get information about user groups including their files
    │   │   └── user
    │   │       └── login.js           # Enables sign-in/sign-out functionality and sends user information to the backend
    │   ├── App.js                     # Handles user authentication and displays different pages based on the user's login status     
    │   ├── GlobalStyles.js            # Global styles
    │   ├── index.css                  # Styling for the index.js file
    │   └── index.js                   # Renders the application
    ├── package-lock.json                  
    └── package.json                


### Server-Side

    .
    ├── src   
    │   ├── configuration
    │   │   └── setup.js                  # Initializes instances of different services for user, file, group, encryption, and key
    │   ├── firebase 
    │   │   └── firebase.js               # Firebase configuration
    │   ├── logging 
    │   │   └── logging.js                # Styling for debugging and logging errors
    │   ├── middleware/authentication 
    │   │   └── checkAuth.js              # Checks for valid auth token in request header and verifies it using Firebase Auth Admin SDK
    │   ├── repos 
    │   │   ├── file
    │   │   │   └── file.repo.js          # Methods for interacting with Firebase database and performs CRUD operations for files
    │   │   ├── group
    │   │   │   └── group.repo.js         # Methods for handling CRUD operations for groups, members, and group files
    │   │   └── user
    │   │       └── user.repo.js          # CRUD operations specifically for users, such as deletion of user information and group invitations
    │   ├── routes
    │   │   ├── file.routes.js            # Creates file routes along with other helper functions and middleware for handling file operations
    │   │   ├── group.routes.js           # Creates routes for group CRUD operations
    │   │   └── user.routes.js            # Creates routes for user related requests, which utilizes middleware and authentication
    │   ├── services 
    │   │   ├── encryption
    │   │   │   └── encryption.service.js    # Encryption and decryption using the AES-256 algorithm with initialization vector and key service for encryption keys
    │   │   ├── file
    │   │   │   └── file.service.js          # Methods for getting, creating, and deleting files
    │   │   ├── group
    │   │   │   └── group.service.js         # Methods for creating, updating, and deleting groups, group files, and group members
    │   │   ├── key
    │   │   │   └── key.service.js           # Methods for create, delete, and access secrets using Google Cloud Secret Manager API
    │   │   └── user
    │   │       └── user.service.js          # Handles user-related operations
    │   ├── util 
    │   │   ├── file_upload.js               # Handles file upload
    │   │   └── responses.js                 # Handles error responses
    │   └── app.js
    ├── .env                                 # contains Firebase configuration and port number
    ├── README.md
    ├── package-lock.json
    ├── package.json
    └── service-accountt-credentials.json  
    


# Project Setup

### Requirements

This software requires the following programs:

    1. NodeJS
    2. npm (comes with `NodeJS`)
    3. gcloud CLI

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
> NOTE: For the security of our web application, we would NEVER expose our Firebase configuration nor include the .env file in a real-world application. However, since this project is purely for demonstration purposes and is privated, we have included the .env file for the Firebase database configuration already for ease of use. 

This project utilizes a cloud-hosted NoSQL database through Google's Firebase, therefore, it is not neccessary to setup the database through SQL commands. This project is currently set up using our group's own Firebase project configuration, therefore, the database connection is established by utilizing our Firebase configuration object containing keys and identifiers for our app:

```
  apiKey: "AIzaSyA7ROErICF1bCa4earw2UoglBq_POrwBrA",
  authDomain: "file-storage-e6537.firebaseapp.com",
  projectId: "file-storage-e6537",
  storageBucket: "file-storage-e6537.appspot.com",
  messagingSenderId: "68930784514",
  appId: "1:68930784514:web:65d2623bfbc3da3f27c61b"
```
The Firebase configuration is to be utilized within a .env file in the /server/ directory.

If you want to set up and utilize your own Firebase database, follow the official [Firebase documentation](https://firebase.google.com/docs/web/setup) for adding Firebase to a web application. 

Once your Firebase project is created and the application is registered, navigate to your project settings through your Firebase console on your web browser, scroll down to SDK setup and configuration, select 'Config' and copy and paste your Firebase configuration into a .env file on the /sever/ directory.

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

