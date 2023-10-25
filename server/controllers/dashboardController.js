const User = require('../models/userModel')
const Bet = require('../models/bettingModel')
const FinancialData = require('../models/financialDataModel');
const BettingSession = require('../models/bettingModel');


const BetInvestment = async (startDate, endDate) => {
    const totalInvestment = await Bet.aggregate([
        {
            $match: {
                createdAt: { $gte: startDate, $lte: endDate },
            },
        },
        {
            $group: {
                _id: null,
                total: { $sum: '$amount' },
            },
        },
    ]);

    return totalInvestment
}
const WinTotal = async (startDate, endDate) => {
    const totalWinnings = await FinancialData.aggregate([
        {
            $match: {
                transactionType: 'win',
                createdAt: { $gte: startDate, $lte: endDate },
            },
        },
        {
            $group: {
                _id: null,
                total: { $sum: '$amount' },
            },
        },
    ]);

    return totalWinnings
}


const totalUsers = async (req, res) => {
    try {
        const totalUsersCount = await User.countDocuments()
        const activeUsersCount = await User.countDocuments({ accountStatus: 'active' })
        const bannedUsersCount = await User.countDocuments({ accountStatus: 'banned' })
        const suspendedUsersCount = await User.countDocuments({ accountStatus: 'suspended' })
        res.json({ totalUsersCount, activeUsersCount, bannedUsersCount, suspendedUsersCount })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching total users', error: error.message });
    }
}


const totalInvestedInBet = async (req, res) => {
    try {
        const totalInvested = await Bet.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: '$amount' }
                }
            }
        ])

        const totalInvestedAmount = totalInvested.length > 0 ? totalInvested[0].total : 0
        res.json({ totalInvested: totalInvestedAmount });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching total invested in bet', error: error.message });
    }
}

const totalRevenue = async (req, res) => {
    try {
        const totalStakes = await Bet.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: '$amount' }
                }
            }
        ])

        const totalPayouts = await FinancialData.aggregate([
            {
                $match: { transactionType: 'win' }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: '$amount' }
                }
            }
        ])
        
        const totalStakesAmount = totalStakes.length > 0 ? totalStakes[0].total : 0;
        const totalPayoutsAmount = totalPayouts.length > 0 ? totalPayouts[0].total : 0;

        const revenue = totalStakesAmount - totalPayoutsAmount;
        res.json({ revenue })

    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching total revenue', error: error.message });
    }
}

const totalInvestmentToday = async (req, res) => {
    try {
        const today = new Date()
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth();
        const currentDay = today.getDate();

        const startDate = new Date(currentYear, currentMonth, currentDay, 0, 0, 0);
        const endDate = new Date(currentYear, currentMonth, currentDay, 23, 59, 59);
        const totalInvestment = await BetInvestment(startDate, endDate)
        const totalInvestmentAmount = totalInvestment.length > 0 ? totalInvestment[0].total : 0;

        res.json({ totalInvestmentToday: totalInvestmentAmount });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching total investment today', error: error.message });
    }
}

const totalInvestmentThisMonth = async (req, res) => {
    try {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        const startDate = new Date(year, month, 1, 0, 0, 0);
        const endDate = new Date(year, month + 1, 0, 23, 59, 59);

        const totalInvestment = await BetInvestment(startDate, endDate)
        const totalInvestmentAmount = totalInvestment.length > 0 ? totalInvestment[0].total : 0;

        res.json({ totalInvestmentThisMonth: totalInvestmentAmount });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching total investment this month', error: error.message });
    }
}

const totalInvestmentThisYear = async (req, res) => {
    try {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();

        const startDate = new Date(currentYear, 0, 0, 0, 0);
        const endDate = new Date(currentYear, 11, 0, 23, 59, 59);
        const totalInvestment = await BetInvestment(startDate, endDate)
        const totalInvestmentAmount = totalInvestment.length > 0 ? totalInvestment[0].total : 0;

        res.json({ totalInvestmentThisYear: totalInvestmentAmount });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching total investment this year', error: error.message });
    }
}

const totalInvestmentByDay = async (req, res) => {
    try {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();

        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        const dailyTotals = [];

        for (let day = 1; day <= daysInMonth; day++) {
            const startDate = new Date(currentYear, currentMonth, day, 0, 0, 0);
            const endDate = new Date(currentYear, currentMonth, day, 23, 59, 59);

            const totalInvestment = await BetInvestment(startDate, endDate)

            const totalInvestmentAmount = totalInvestment.length > 0 ? totalInvestment[0].total : 0;

            dailyTotals.push({
                day: day,
                totalInvestment: totalInvestmentAmount,
            });
        }

        res.json({ dailyTotals });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching total investment by day', error: error.message });
    }
}

const totalInvestmentByMonth = async (req, res) => {
    try {

        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();

        const monthlyTotals = [];

        for (let month = 0; month < 12; month++) {
            const startDate = new Date(currentYear, month, 1, 0, 0, 0);
            const endDate = new Date(currentYear, month + 1, 0, 23, 59, 59);

            const totalInvestment = await BetInvestment(startDate, endDate)

            const totalInvestmentAmount = totalInvestment.length > 0 ? totalInvestment[0].total : 0;

            monthlyTotals.push(
                totalInvestmentAmount,
            );
        }

        res.json({ monthlyTotals });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching total investment by month', error: error.message });
    }
}

const totalInvestmentByYear = async (req, res) => {
    try {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();

        const yearlyTotals = [];

        for (let i = 4; i >= 0; i--) {
            const year = currentYear - i;
            const startDate = new Date(year, 0, 1, 0, 0, 0);
            const endDate = new Date(year, 11, 31, 23, 59, 59);

            const totalInvestment = await BetInvestment(startDate, endDate)
            const totalInvestmentAmount = totalInvestment.length > 0 ? totalInvestment[0].total : 0;

            yearlyTotals.push({
                year: year,
                totalInvestment: totalInvestmentAmount,
            });
        }

        res.json({ yearlyTotals });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching total investment by year', error: error.message });
    }
}

const totalRevenueToday = async (req, res) => {
    try {
        const today = new Date()
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth();
        const currentDay = today.getDate();

        const startDate = new Date(currentYear, currentMonth, currentDay, 0, 0, 0);
        const endDate = new Date(currentYear, currentMonth, currentDay, 23, 59, 59);

        const totalBets = await BetInvestment(startDate, endDate)
        const totalWinnings = await WinTotal(startDate, endDate)

        const totalBetsAmount = totalBets.length > 0 ? totalBets[0].total : 0;
        const totalWinningsAmount = totalWinnings.length > 0 ? totalWinnings[0].total : 0;

        const totalRevenue = totalBetsAmount - totalWinningsAmount;
        res.json({ totalRevenue });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching total revenue today', error: error.message });
    }
}

const totalRevenueThisMonth = async (req, res) => {
    try {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        const startDate = new Date(year, month, 1, 0, 0, 0);
        const endDate = new Date(year, month + 1, 0, 23, 59, 59);

        const totalBets = await BetInvestment(startDate, endDate)
        const totalWinnings = await WinTotal(startDate, endDate)

        const totalBetsAmount = totalBets.length > 0 ? totalBets[0].total : 0;
        const totalWinningsAmount = totalWinnings.length > 0 ? totalWinnings[0].total : 0;

        const totalRevenue = totalBetsAmount - totalWinningsAmount;

        res.json({ totalRevenue });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching total revenue of this month', error: error.message });
    }
}

const totalRevenueThisYear = async (req, res) => {
    try {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();

        const startDate = new Date(currentYear, 0, 0, 0, 0);
        const endDate = new Date(currentYear, 11, 0, 23, 59, 59);

        const totalBets = await BetInvestment(startDate, endDate)
        const totalWinnings = await WinTotal(startDate, endDate)

        const totalBetsAmount = totalBets.length > 0 ? totalBets[0].total : 0;
        const totalWinningsAmount = totalWinnings.length > 0 ? totalWinnings[0].total : 0;

        const totalRevenue = totalBetsAmount - totalWinningsAmount;
        res.json({ totalRevenue });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching total revenue of this year', error: error.message });
    }
}

const totalRevenueByDay = async (req, res) => {
    try {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();

        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        const dailyRevenue = [];

        for (let day = 1; day <= daysInMonth; day++) {
            const startDate = new Date(currentYear, currentMonth, day, 0, 0, 0);
            const endDate = new Date(currentYear, currentMonth, day, 23, 59, 59);

            const totalBets = await BetInvestment(startDate, endDate)
            const totalWinnings = await WinTotal(startDate, endDate)

            const totalBetsAmount = totalBets.length > 0 ? totalBets[0].total : 0;
            const totalWinningsAmount = totalWinnings.length > 0 ? totalWinnings[0].total : 0;

            const totalRevenue = totalBetsAmount - totalWinningsAmount;

            dailyRevenue.push({
                day: day,
                totalRevenue: totalRevenue,
            });
        }

        res.json({ dailyRevenue })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching total revenue by day', error: error.message });
    }
}

const totalRevenueByMonth = async (req, res) => {
    try {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();

        const monthlyRevenue = [];

        for (let month = 0; month < 12; month++) {
            const startDate = new Date(currentYear, month, 1, 0, 0, 0);
            const endDate = new Date(currentYear, month + 1, 0, 23, 59, 59);

            const totalBets = await BetInvestment(startDate, endDate)
            const totalWinnings = await WinTotal(startDate, endDate)

            const totalBetsAmount = totalBets.length > 0 ? totalBets[0].total : 0;
            const totalWinningsAmount = totalWinnings.length > 0 ? totalWinnings[0].total : 0;

            const totalRevenue = totalBetsAmount - totalWinningsAmount;


            monthlyRevenue.push(
                totalRevenue,
            );
        }

        res.json({ monthlyRevenue })

    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching total revenue by month', error: error.message });
    }
}

const totalRevenueByYear = async (req, res) => {
    try {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();

        const yearlyRevenue = [];

        for (let i = 4; i >= 0; i--) {
            const year = currentYear - i;
            const startDate = new Date(year, 0, 1, 0, 0, 0);
            const endDate = new Date(year, 11, 31, 23, 59, 59);

            const totalBets = await BetInvestment(startDate, endDate)
            const totalWinnings = await WinTotal(startDate, endDate)

            const totalBetsAmount = totalBets.length > 0 ? totalBets[0].total : 0;
            const totalWinningsAmount = totalWinnings.length > 0 ? totalWinnings[0].total : 0;

            const totalRevenue = totalBetsAmount - totalWinningsAmount;
            yearlyRevenue.push({
                year: year,
                totalRevenue: totalRevenue,
            });
        }

        res.json({ yearlyRevenue });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching total revenue by year', error: error.message });
    }
}

const profitLoss = async (req,res) => {
    try {
        const totalStakesBySport = await BettingSession.aggregate([
            {
              $group: {
                _id: '$eventType',
                totalStakes: { $sum: '$amount' },
              },
            },
          ]);
          
          const totalPayoutsBySport = await FinancialData.aggregate([
            {
              $match: { transactionType: 'win' },
            },
            {
              $lookup: {
                from: 'bettingsessions',
                localField: '_id',
                foreignField: 'associatedFinancialTransaction',
                as: 'bettingSession',
              },
            },
            {
              $unwind: '$bettingSession',
            },
            {
              $group: {
                _id: '$bettingSession.eventType',
                totalPayouts: { $sum: '$amount' },
              },
            },
          ]);
          
          const sportRevenue = totalStakesBySport.map((sportStakes) => {
            const totalPayoutsForSport = totalPayoutsBySport.find((sportPayouts) => sportPayouts._id === sportStakes._id);
            const sportName = sportStakes._id;
            const totalStakes = sportStakes.totalStakes || 0;
            const totalPayouts = (totalPayoutsForSport && totalPayoutsForSport.totalPayouts) || 0;
            const revenue = totalStakes - totalPayouts;
            return {
              sportName,
              revenue,
            };
          });
          
          res.json({sportRevenue})
          
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching profit and loss', error: error.message });
    }
}


module.exports = {
    totalUsers,
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
    profitLoss
};