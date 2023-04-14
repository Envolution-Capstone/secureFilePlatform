# Envolution Secure File Sharing

1. Setup
2. Running the Software
3. Features
4. Frequently Asked Questions
5. Troubleshooting

# 1. Setup

## 1.1 Requirements
This software requires the following programs:
1. `NodeJS`
2. `npm` (comes with `NodeJS`)

## 1.1.1 With `Make`:

If you have `Make` installed, setup is easy.

1. run the command `make setup` in the base directory

## 1.1.2 Without `Make`:

If you do not have `Make` installed:

1. enter the `server/` directory and run `npm install -y --force --silent`
2. enter the `client/` directory and run `npm install -y --force --silent`

---
# 2 Running

## 2.1 With `Make`:

1. run the command `make run` in the base directory

## 2.2 Without `Make`:

1. enter the `server/` directory and run `npm start`
2. enter the `client/` directory and run `npm start`

---
# 3. Features

## 3.1 My Files

My Files is the page that allows users to view/download their personal files.

### 3.1.1 Downloading Files

Personal files can be downloaded by clicking on the row a file is on.

### 3.1.2 Deleting Files

Personal files can be deleted by right clicking on the files row and clicking `delete` on the context menu that pops up.

## 3.2 Shared With Me

Shared with me is the page that allows users to view/download files that are shared with the groups they are in.

### 3.2.1 Downloading Files

Group files can be downloaded by clicking on the row a file is on.

### 3.2.2 Deleting Files

Only group admins can delete group files.

Group files can be deleted by right clicking on the files row and clicking `delete` on the context menu that pops up.


## 3.3 File Upload

### 3.3.1 Personal File Upload

Personal Files are uploaded through the `Upload New File` button.

On the file upload screen:
1. Select the file to upload
2. click the `submit` button

### 3.3.2 Group File Upload

Group Files are uploaded through the `Upload New File` button.

The important distinction between personal files and shared files is selecting the group to share with. 

On the file upload screen:
1. Select the file to upload
2. Select a group to share the file with from the drop down
3. click the `submit` button

## 3.4 Groups

Users can create groups and invite other users to groups they are admins in.

### 3.4.1 Creating a Group

Creating a group is done through the `Create Group` button on the left sidebar.

On the Create Group screen:
1. input the group name
2. add any users you want to invite
3. click `create group`

### 3.4.2 Inviting Users

Inviting users is done through the `Invite User` button on the left sidebar.

Only group admins can invite users to groups.

On the Invite User Screen
1. Select the group to invite a user to
2. enter the users email
3. click `invite user`

### 3.4.3 Viewing Group Info

Group info can be viewed through the `View Groups` button on the left sidebar.

---
# 4. Frequently Asked Questions



---
# 5. Troubleshooting

## 5.1 Common Issues

### 5.1.1. Missing NPM modules

If the software doesn't run, try installing all of the required NPM modules.

In `/server/`:
run `npm install -y --force --silent`

In `/client/`:
run `npm install -y --force --silent`

### 5.1.2. Incorrect Node JS version

Having an out-of-date versiona of Node JS can cause issues.

Follow https://nodejs.org/en/download/current for getting the newest version.

### 5.1.3. Missing .env or Service Credentials

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
---