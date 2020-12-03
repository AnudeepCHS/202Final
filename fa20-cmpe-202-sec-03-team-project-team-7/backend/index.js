/* eslint-disable no-console */
const app = require('./app');
//  Connect database
const connectDB = require('./config/db');

const signupUser = require('./routes/user/signup');
const loginUser = require('./routes/user/login');
const signupAdmin = require('./routes/admin/signup');
const loginAdmin = require('./routes/admin/login');
const listings = require('./routes/user/listings');
const applications = require('./routes/user/applications');
const favHomes = require('./routes/user/favHomes');
const favSearches = require('./routes/user/favSearches');
const users = require('./routes/user/user');

connectDB();

/*  Routes for Users */
app.use('/user/login', loginUser);
app.use('/user/signup', signupUser);
app.use('/user/listings', listings);
app.use('/user/applications', applications);
app.use('/user/favHomes', favHomes);
app.use('/user/favSearches', favSearches);
app.use('/user/user', users);
/*  Routes for Admins */
app.use('/admin/login', loginAdmin);
app.use('/admin/signup', signupAdmin);

//  Connection to a port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Application started listening to port ${PORT} successfully.`);
});