const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');
const  parent = 'projects/halogen-eon-383017';
const crypto = require('crypto');

class KeyService {
  

 client = new SecretManagerServiceClient();




 createSecret = async(entityId)=> {
  const name=entityId;
  const [secret] = await client.createSecret({
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
    const [secrets] = await client.listSecrets({
      parent: parent,
    })
    
    secrets.forEach(secret => {
      temp.push(String(secret.labels.secretmanager));
    })
   

return temp.includes(String(entityId))
 }


 SecretCheck = async (entityId) =>{ //the check to see if a user/group has a key
  const found = await testExist(entityId);
 
  if(found){
    console.log("Secret already exists");
  }else{
    createSecret(entityId)
  }
}





   addSecretVersion= async (entityId,payload) =>{//payload will be the key then next call is the iv
    const parent = "projects/halogen-eon-383017/secrets/"+entityId;
  
    const [version] = await client.addSecretVersion({
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
        const name = "projects/halogen-eon-383017/secrets/"+entityId+"/versions/1";
        const [version] = await client.accessSecretVersion({
          name: name,
        });
      
        // Extract the payload as a string.
         payload = version.payload.data.toString('hex');
      }else if(identifier==="iv"){
        const name = "projects/halogen-eon-383017/secrets/"+entityId+"/versions/2";
        const [version] = await client.accessSecretVersion({
          name: name,
        });
      
        // Extract the payload as a string.
        payload = version.payload.data.toString('hex');
      }
    return payload;
    }







  getKey = async (entityId) => {
    const key = await accessSecretVersion(entityId,"key");
    console.log("printing within getKey() ", key);
    return key;
  };
};
 getIV = async (entityId) =>{
  const iv = await accessSecretVersion(entityId,"iv");
  console.log("printing within getIV() ", iv);
  return iv;
  }


module.exports = {
  KeyService,
};