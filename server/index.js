const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const adminRouter = require('./routes/adminRoutes');
const userRoute = require('./routes/userRoutes');
const superadminRoute = require('./routes/superAdminRoute');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const httpStatus = require('./constants/httpStatus')

const app = express();
const httpMsg = httpStatus()
dotenv.config();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(logger('dev'))
app.use(cors());

app.use('/api/admin', adminRouter);
app.use("/api/user", userRoute);
app.use("/api/superadmin", superadminRoute);

app.use((req, res) => {
    res.send({ code: 404, error: httpMsg[404] })
})


const PORT = process.env.PORT || 7000;

app.listen(PORT, console.log(`Server running at ${PORT}`));


