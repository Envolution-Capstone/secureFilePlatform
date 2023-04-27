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
    * [Install gcloud CLI](https://github.com/Envolution-Capstone/secureFilePlatform#install-gcloud-cli)
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

Clone the repository into your IDE. The recommended IDE to use is Visual Studio Code, as the software was developed with Visual Studio Code and this entire installation tutorial will be based off of Visual Studio Code.

Before Running the application there are several set-up steps that must be followed, starting with ensuring that all project dependencies and requirements are present and working. 

### Requirements

This software requires the following programs:

    1. NodeJS
    2. npm (comes with `NodeJS`)
    3. gcloud CLI

To install NodeJS, the most convenient way is to install via a package manager at the following link. Simply follow the instructions on the package manager and you will have NodeJS installed, along with npm:
[Download Node.js (nodejs.dev)](https://nodejs.dev/en/download/)

Now with NodeJS installed, you can install the project dependencies.

### With Make:

If you have `Make` installed, setup is easy:

    1. run the command `make setup` in the base directory

### Without Make:

If you do not have `Make` installed:

    1. enter the `server/` directory and run `npm install -y --force --silent`
    2. enter the `client/` directory and run `npm install -y --force --silent`

### Install gcloud CLI:

To install gcloud CLI, all you have to do is to install the Google Cloud CLI, and then initialize the glcoud CLI. The instructions to install gcloud CLI can be found through the gcloud CLI documentation link:
https://cloud.google.com/sdk/docs/install#deb

Select the correct operating system you utilize and follow the installation instructions. Once you have installed gcloud CLI, the last thing you need to do is initialize gcloud CLI by running the following command through your terminal or command prompt:

   gcloud init

# Running
Once you have finished installing all necessary requirements as well as setting up the database (it is already preset for you), you can run the program through two methods:

### With Make:

    1. run the command `make run` in the base directory

### Without Make:

    1. enter the `server/` directory and run `npm start`
    2. enter the `client/` directory and run `npm start`


# Product Features
> Product features are split into separate sections with their respective functionalities

### Personal File Storage:
Users can upload files from their local machine to their personal file storage on the web-application. Furthermore, the user may download the file uploaded as well as delete the file from their drives.

<details><summary>Personal File Upload</summary>

```
   1.	The user navigates to the “My Drive” view of the web application through the navigation button on the web-application       sidebar.
   2.	The user clicks on the “Upload New File” button from the web-application sidebar.
   3.	The user clicks “Choose File” to choose a file from their local machine.
   4.	The user clicks “Submit” to upload to file to their personal drive.
```
</details>
<details><summary>Personal File Download</summary>

```
   1.	To download files from their personal drive, the user clicks on the respective file in their My Drive document table       view.
```
</details>
<details><summary>Personal File Deletion</summary>
   
```
   1.	To delete files from their personal drive, the user right clicks on the file to bring up the “Delete” menu option and       then click “Delete” to delete the file.
```
</details>

### Shared File Storage:
Users can upload files from their local machine to their shared file storage on the web-application. Furthermore, the user may download the file uploaded. 

<details><summary>Shared File Upload</summary>
   
```  
   1.	The user navigates to the “Shared With Me” view of the web application through the navigation button on the web-           application sidebar.
   2.	The user clicks on the “Upload New File” button from the web-application sidebar.
   3.	The user clicks “Choose File” to choose a file from their local machine.
   4.	The user selects a group to share to the file to from the “Select A Group To Share With” drop down menu.
   5.	The user clicks “Submit” to upload to file to the selected group drive.
```
</details>
<details><summary>Shared File Download</summary>
   
```
   1.	To download files from their group drive, the user clicks on the respective file in their Shared With Me document           table view.
```
</details>

### Groups
By clicking on the “Create Group” button, users are able to create groups. When groups are created, other users can be invited to the group and the user who created the group becomes the group admin and can administer the group. Users can also view all of the groups they belong to.

<details><summary>Creating a Group</summary>

```
   1.	The User clicks on the "Create Group" button.
   2.	The User enters in the name of the group.
   3.	The User may enter in the email addresses of users they would like to initially invite to the group when it is             created.
   4.	The User clicks “Create Group” button to create the group.
```
 </details>
<details><summary>Inviting Users</summary>

Inviting users is done through the `Invite User` button on the left sidebar.
Only group admins can invite users to groups.

On the Invite User Screen:
   
    1. Select the group to invite a user to
    2. enter the users email
    3. click `invite user`
 </details>
 <details><summary>Group and Group Member Viewing</summary>

```
   1.	The User clicks on the “View Group” button.
   2.	The User clicks on the “eye” icon next to the respective group they would like to view the group members of.
```
</details>

### Admin Priviledges
Admins of groups has extra privileges within their respective groups. Group admins have the ability to kick other members from the group as well as delete files from the group drive.

<details><summary>Shared File Deletion</summary>

```
   1.	To delete files from their shared group drive, the user must be the admin to group in which the file was shared to.         If so, the user right clicks on the file to bring up the “Delete” menu option and then click “Delete” to delete the         file.
```
 </details>
 
<details><summary>Kick Member</summary>

```
   1.	The admin clicks on the ‘View Groups” button on the sidebar to view all of the groups they belong to.
   2.	The admin chooses the group that they are the admin to by clicking on the “eye” icon next to it.
   3.	The admin clicks on the “X” button next to the name of the user within the group that they would like to kick.
```
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

