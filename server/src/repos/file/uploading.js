storage.ref(`files/${file.name}`).put(file).then(snapshot => {
  console.log(snapshot)
  storage.ref("files").child(file.name).getDownloadURL().then(url => {
      db.collection("myfiles").add({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          filename: file.name,
          fileURL: url,
          size: snapshot._delegate.bytesTransferred
      })
      setUploading(false);
      setFile(null);
      setOpen(false)
  })
})