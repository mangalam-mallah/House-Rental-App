const auth = (role = 'renter', id = '64d6fe84e76e1f001234abcd') => (req, res, next) => {
  req.user = {
    _id: id, 
    name: 'Test User',
    email: 'test@example.com',
    role: role, 
  };
  next();
};

export default auth;
