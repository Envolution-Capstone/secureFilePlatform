
const respondSuccess = (res) => {
  res.status(200).json({
    'status': 'success'
  });
}

const respondData = (res, data)=>{
  res.status(200).json({
    'status': 'success',
    'data': data
  });
};

const respondFile = (res, file) => {
  res.writeHead(200, {
    'Content-disposition': 'attachment;filename=' + file.filename,
    'Content-Length': file.content.length
  });
  res.end(file.content, 'binary');
}

const respondUnAuthorized = (res)=>{
  res.status(403).json({
    'status': 'fail',
    'data': 'User Not Authorized To Access Resource',
  });
};

const respondServerError = (res)=>{
  res.status(500).json({
    'status': 'error',
    'data': 'Unknown Error Occurred On Server',
  });
}

const respondNotFound = (res)=>{
  res.status(404).json({
    'status': 'fail',
    'data': 'Resource Not Found',
  });
}

const respondBadRequest = (res)=>{
  res.status(400).json({
    'status': 'fail',
    'data': 'Bad Request',
  });
}

module.exports = {
  respondUnAuthorized,
  respondData,
  respondFile,
  respondSuccess,
  respondServerError,
  respondNotFound,
  respondBadRequest,
};