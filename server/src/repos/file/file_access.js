db.collection("myfiles").onSnapshot(snapshot => {
  setFiles(snapshot.docs.map(doc=>({
      id:doc.id,
      data:doc.data() 
  })))
})