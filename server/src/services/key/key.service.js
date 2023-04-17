const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');
const  parent = 'projects/halogen-eon-383017';
const crypto = require('crypto');

class KeyService {
  



/*
logic behind class.

on login and or group creation call  SecretCheck(entityId) with the id for the group or user
this will check to see if a secret is created with that id.


accessSecretVersion(entityId,identifier) is used within the getKey(entityId) and the getIV(entityId) functions to access the proper data storage to be returned


deleteSecret(entityId) used to delete a secret, will crash if passing in id of secret that doesnt exist.
should only be used on group deletion.

*/



client;

  constructor() {

    this.client = new SecretManagerServiceClient();
  }
    




 createSecret = async(entityId)=> {
  const name=entityId;
  const [secret] = await this.client.createSecret({
    parent: parent,
    secretId: entityId,
    secret: {
      name: name,    
      labels: {
        secretmanager: entityId,
      },
      replication: {
        automatic: {},
      },
    },
  });
  console.log(`Created secret ${secret.name}`);
}



  addEntity = async (entityId) => {
    this.SecretCheck(entityId.toLowerCase());
    return true;
  };


   deleteSecret= async (entityId) =>{ //pas in id and will delete
    let name = "projects/halogen-eon-383017/secrets/"+entityId;
    await client.deleteSecret({
      name: name,
    });
    console.log(`Deleted secret ${name}`);
  }





   testExist= async(entityId) =>{
    let temp=[];
    const [secrets] = await this.client.listSecrets({
      parent: parent,
    })
    
    secrets.forEach(secret => {
      temp.push(String(secret.labels.secretmanager));
    })
   

return temp.includes(String(entityId))
 }


 SecretCheck = async (entityId) =>{ //the check to see if a user/group has a key
  const found = await this.testExist(entityId);
 
  if(found){
    console.log("Secret already exists");
  }else{
    await this.createSecret(entityId);
  }
 
if(!found){
  let key=crypto.randomBytes(32);
  let payload = Buffer.from(key, 'utf8');
  this.addSecretVersion(entityId.toLowerCase(),payload);
  let iv=crypto.randomBytes(16);
   payload = Buffer.from(iv, 'utf8');
   this.addSecretVersion(entityId.toLowerCase(),payload);
}



}





   addSecretVersion= async (entityId,payload) =>{//payload will be the key then next call is the iv
    const parent = "projects/halogen-eon-383017/secrets/"+entityId;
  
    const [version] = await this.client.addSecretVersion({
      parent: parent,
      payload: {
        data: payload,
      },
    });
  
    console.log(`Added secret version ${version.name}`);
  }



   accessSecretVersion= async (entityId,identifier) =>{
    let payload;
      if(identifier==="key"){
        const name = "projects/halogen-eon-383017/secrets/"+entityId.toLowerCase()+"/versions/1";
        const [version] = await this.client.accessSecretVersion({
          name: name,
        });
      
        // Extract the payload as a string.
         payload = version.payload.data;
      }else if(identifier==="iv"){
        const name = "projects/halogen-eon-383017/secrets/"+entityId.toLowerCase()+"/versions/2";
        const [version] = await this.client.accessSecretVersion({
          name: name,
        });
      
        // Extract the payload as a string.
        payload = version.payload.data;
      }
    return payload;
    }



    getIV = async (entityId) =>{
      const iv = await this.accessSecretVersion(entityId.toLowerCase(),"iv");
      console.log("printing within getIV() ", iv);
      return iv;
      }



  getKey = async (entityId) => {
    const key = await this.accessSecretVersion(entityId.toLowerCase(),"key");
    console.log("printing within getKey() ", key);
    return key;
  };
};



module.exports = {
  KeyService,
};