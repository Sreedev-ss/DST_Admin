const BettingSession = require('../models/bettingModel');

//create a new betting session
const createBettingSession = async (req, res) => {
    try {
        const newBettingSession = new BettingSession(req.body);
        const savedSession = await newBettingSession.save();
        res.status(201).json({ success: true, message: "Betting Session Successfully Created", savedSession });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error creating betting session', error: error.message });
    }
};

//Get all betting sessions
const getAllBettingSessions = async (req, res) => {
    try {
        const bettingSessions = await BettingSession.find();
        res.status(201).json({ success: true, message: 'All betting sessions', bettingSessions });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error retrieving betting sessions', error: error.message});
    }
};

//upadte a betting session by ID 
const updateBettingSession = async (req, res) => {
    const sessionId = req.params.id;
    try {
        const updatedSession = await BettingSession.findByIdAndUpdate(sessionId, req.body, { new: true });
        if(!updatedSession) {
            return res.status(404).json({ success: false, message: `Betting session not found with this ID ${sessionId}`});
        }
        res.status(201).json({ success: true, message: 'Betting session updated successfully', updatedSession});
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating betting session', error: error.message });
    }
};

//delete a session
const deleteBettingSession = async(req, res) => {
    const sessionId = req.params.id;
    try {
        const deletedSession = await BettingSession.findByIdAndDelete(sessionId);
        if(!deletedSession) {
            return res.status(404).json({ success: false, message: 'Session not found'});
        }
        res.status(201).json({ success: true, message: 'Session deleted successfully', deletedSession });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting session', error: error.message });
    }
};

const getCurrentBets = async (req, res) => {
    try {
        const currentDate = new Date();
        const formattedCurrentDate = currentDate.toISOString();

        const currentBets = await BettingSession.find({ timeRemaining: { $gt: formattedCurrentDate }})
        .populate('user', 'username')
        .populate('event', 'title');
        if(!currentBets || currentBets.length === 0) {
            return res.status(404).json({ success: false, message: 'No current bets found '});
        }
        const formattedBets = currentBets.map(bet => ({
            user: bet.user ? bet.user.username : 'N/A', 
            event: bet.event ? bet.event.title : 'N/A', 
            eventType: bet.eventType,
            nation: bet.nation,
            amount: bet.amount,
            odds: bet.odds,
            timeRemaining: formatTimestamp(bet.timeRemaining),
            createdAt: formatTimestamp(bet.createdAt),
        }));

        res.status(201).json({ success: true, message: 'Current Bets', currentBets });
    } catch(error) {
        res.status(500).json({ success: false, message: 'Error retrieving current bets', error: error.message });
    }
};

function formatTimestamp(timestamp) {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(timestamp).toLocaleString('en-US', options);
}


module.exports = { 
    createBettingSession, 
    getAllBettingSessions, 
    updateBettingSession, 
    deleteBettingSession, 
    getCurrentBets 
};