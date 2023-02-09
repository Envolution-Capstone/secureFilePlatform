
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



module.exports = {
  respondUnAuthorized,
  respondData,
  respondSuccess,
};