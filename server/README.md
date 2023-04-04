
#  Backend API

All responses are in the form:
```json
{
	"status" : "success" | "fail" | "error",
	"data" : {*data form dependent on route*}
}
```

# 1. Files

### /file GET

**Function:** Returns information about files for user logged in
**Parameters:** 
- authtoken header (automatically set when user logs in)

**Returns:** array of files
-  `{id : string, groupid: string, filename : string, size : number}[]`

---
### /file POST

**Function:** Uploads A File to FireStore
**Parameters:**
- Auth Token
- as form-data: `{ filename : string, file : file}`

**Returns:** No Data

---
### /file/:id GET

**Function:** Returns file content as a download
**Parameters:** 
- Auth Token

**Returns:** File as binary attachment

---
### /file/:id DELETE
**Function:** Deletes a File
**Parameters:** 
- Auth Token

**Returns:** No Data

---
# 2. Groups

### /group/:id GET
**Function:** Returns group info
**Parameters:** 
- Auth Token

**Returns:**  Group Info
```json
{ 
	"createdBy": string, 
	"members": {id: string, admin: bool}[] ,
	"name" : string
}
```

---

### /group POST
**Function:** Creates a new Group 
**Parameters:** 
- Auth Token
- `{ "name": string }`

**Returns:** New Group Id
```json
{ "id" : string }
```

---

### /group/:groupid PUT
**Function:** Updates a groups info
**Parameters:** 
- Auth Token
- `{ "name": string?}`

**Returns:** No Data

---

### /group/:groupid DELETE
**Function:** Deletes a group
**Parameters:** 
- Auth Token

**Returns:** No Data

---

### /group/:groupid/files GET
**Function:** Gets information on all of the files the group has
**Parameters:** 
- None

**Returns:**
-  `{id : string, groupid: string, filename : string, size : number}[]`

---

### /group/:groupid/files/ POST
**Function:** Uploads a file to the group
**Parameters:**
- Auth Token
- as form-data: `{ filename : string, file : file}`

**Returns:** No Data

---

### /group/:groupid/files/:fileid GET
**Function:** Downloads a group file
**Parameters:**
- Auth Token

**Returns:** File as Binary Attachment

---

### /group/:groupid/files/:fileid PUT
**Function:** Updates a file
**Parameters:**
- Auth Token
- as form-data: `{ filename : string, file : file}`

**Returns:** No Data

---

### /group/:groupid/files/:fileid DELETE
**Function:** Deletes a group file
**Parameters:** 
- Auth Token

**Returns:** No Data

---

### /group/:groupid/members GET
**Function:** Returns a list of all members
**Parameters:**
- Auth Token

**Returns:** 
- `{ "name": string, "id": string, "admin": bool  }[]`

---

### /group/:groupid/members/:memberid GET
**Function:** Gets info of member with id memberid
**Parameters:** 
- Auth Token

**Returns:**
- `{ "name": string, "id": string, "admin": bool  }`

---

### /group/:groupid/members/:memberemail POST
**Function:** Sends an invite to the group to a users
**Parameters:** 
- Auth Token

**Returns:** No Data

---

### /group/:groupid/members/:memberid PUT
**Function:** Updates a members group access
**Parameters:** 
- Auth Token

**Returns:** No Data

---

### /group/:groupid/members/:memberid DELETE
**Function:** Removes a member from a group
**Parameters:** 
- Auth Token

**Returns:** No Data

---

# 3. Users

### /users/:userid GET
**Function:** Gets the users information
**Parameters:** 
- Auth Token

**Returns:** User info
```json
{ "id": string, "name": string }[]
```

---

### /users/:userid/groups GET
**Function:** Gets the users groups
**Parameters:** 
- Auth Token

**Returns:** User info
```json
{ "id": string, "name": string }[]
```

---


### /users/:userid/invites GET
**Function:** Gets the users current invites
**Parameters:** 
- Auth Token

**Returns:** List of invites
```json
{ "id": string, "name": string }[]
```

---

### /users/:userid/accept/:groupid POST
**Function:** Accepts a Group Invite
**Parameters:** 
- Auth Token

**Returns:** No Data

---

### /users/:userid/decline/:groupid POST
**Function:** Declines a Group Invite
**Parameters:** 
- Auth Token

**Returns:** No Data

---