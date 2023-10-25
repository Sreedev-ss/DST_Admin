const express = require("express");


const { createAdmin, adminLogin } = require('../controllers/adminControllers');
const { createEvent, 
    getAllEvents, 
    getEventById, 
    updateEvent, 
    deleteEvent, 
    updateEventOutcome } = require('../controllers/eventControllers');

const { createBettingSession, 
    getAllBettingSessions, 
    updateBettingSession, 
    deleteBettingSession, 
    getCurrentBets } = require('../controllers/bettingSessionControllers');
    
const { totalUsers, 
    totalInvestedInBet, 
    totalRevenue, 
    totalInvestmentToday, 
    totalInvestmentThisMonth, 
    totalInvestmentThisYear, 
    totalInvestmentByDay, 
    totalInvestmentByMonth, 
    totalInvestmentByYear, 
    totalRevenueToday, 
    totalRevenueThisMonth, 
    totalRevenueThisYear, 
    totalRevenueByDay,
    totalRevenueByMonth,
    totalRevenueByYear,
    profitLoss} = require("../controllers/dashboardController");

const router = express.Router();

//events
router.post('/createEvent', createEvent);
router.get('/getAllEvents', getAllEvents);
router.get('/getEventById/:id', getEventById);
router.patch('/updateEvent/:id', updateEvent);
router.delete('/deleteEvent/:id', deleteEvent);
router.patch('/updateEventOutcome/:id', updateEventOutcome);

//bets
router.post('/createBettingSession', createBettingSession);
router.get('/getAllBettingSessions', getAllBettingSessions);
router.patch('/updateBettingSession/:id', updateBettingSession);
router.delete('/deleteBettingSession/:id', deleteBettingSession);
router.get('/getCurrentBets', getCurrentBets);

//admin
router.post('/createAdmin', createAdmin);
router.post('/adminlogin',adminLogin)

//dashboard
router.get('/totalUsers', totalUsers)
router.get('/totalInvestedInBet', totalInvestedInBet)
router.get('/totalRevenue', totalRevenue)
router.get('/totalInvestmentToday', totalInvestmentToday)
router.get('/totalInvestmentThisMonth', totalInvestmentThisMonth)
router.get('/totalInvestmentThisYear', totalInvestmentThisYear)
router.get('/totalInvestmentByDay', totalInvestmentByDay)
router.get('/totalInvestmentByMonth', totalInvestmentByMonth)
router.get('/totalInvestmentByYear', totalInvestmentByYear)
router.get('/totalRevenueToday', totalRevenueToday)
router.get('/totalRevenueThisMonth', totalRevenueThisMonth)
router.get('/totalRevenueThisYear', totalRevenueThisYear)
router.get('/totalRevenueByDay', totalRevenueByDay)
router.get('/totalRevenueByMonth', totalRevenueByMonth)
router.get('/totalRevenueByYear', totalRevenueByYear)
router.get('/profitLossBySport', profitLoss)


module.exports = router;