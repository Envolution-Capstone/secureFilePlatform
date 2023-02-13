
const respondSuccess = (res) => {
  res.status(200).json({
    'status': 'success'
  });
}

const respondData = (res, data)=>{
  res.status(200).json({
    'status': 'success',
    data
  });
};

const respondUnAuthorized = (res)=>{
  res.status(403).json({
    'status': 'fail',
    'data': 'User Not Authorized To Access Resource',
  });
};

const respondServerError = (res)=>{
  res.status(500).json({
    'status': 'fail',
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
  respondSuccess,
  respondServerError,
  respondNotFound,
  respondBadRequest,
};