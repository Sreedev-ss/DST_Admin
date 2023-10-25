const BettingSession = require('../models/bettingModel');
const Event = require('../models/eventModel');

//create new event
const createEvent = async(req, res) => {
    try {
        const existingEvent = await Event.findOne({
            title: req.body.title,
            date: req.body.date,
        });
        if(existingEvent) {
            return res.status(400).json({ error: 'Event with the same title and date already exists' });
        }
        const newEvent = new Event(req.body);
        const savedEvent = await newEvent.save();
        res.status(201).json({success: true, message: 'Event added successfully', savedEvent});
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error creating event', error: error.message });
    }
};

//get all events
const getAllEvents = async(req, res) => {
    try {
        const events = await Event.find();
        res.status(201).json({ success: true, events });
    } catch(error) {
        res.status(500).json({ success: false, message: 'Error retrieving events', error: error.message });
    }
};

//get a single event by ID
const getEventById = async (req, res) => {
    const eventId = req.params.id;
    try {
        const event = await Event.findById(eventId);
        if(!event) {
            return res.status(404).json({ error: 'Event not found '});
        }
        res.status(201).json({ success:true, event});
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error retrieving event', error: error.message});
    }
};

//update an event by id
const updateEvent = async (req, res) => {
    const eventId = req.params.id;
    try {
        const updatedEvent = await Event.findByIdAndUpdate(eventId, req.body, { new: true });
        if(!updatedEvent) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(201).json({ success: true, message:' Event updated successfully', updatedEvent});
    } catch (error) {
        res.status(500).json({ success:false, message: 'Error updating event', error: error.message });
    }
};

//Delete an event by ID 
const deleteEvent= async (req, res) => {
    const eventId = req.params.id;
    try {
        const deletedEvent = await Event.findByIdAndDelete(eventId);
        if(!deletedEvent) {
            return res.status(404).json({ message: `Cannot find by any event with ID ${eventId}` });
        }
        res.status(201).json({ success: true, message: "Event Deleted Successfully", deletedEvent});
    } catch (error) {
        res.status(500).json({ message: 'Error deleting event', error: error.message });
    }
};

//updatedEventOutcome after match
const updateEventOutcome = async (req, res) => {
    const eventId = req.params.id;
    const { outcome } = req.body;
    try {
        const event = await Event.findByIdAndUpdate( eventId, { outcome }, { new: true});
        if( !event) {
            return res.status(404).json({ success: false, message: `Event not found with this ID ${eventId}`});
        }
        const updateBettingSessions = await BettingSession.updateMany(
            { event: eventId, selectedOutcome: outcome },
            { $set: { isWin: true } }
        );
        res.status(201).json({ success: true, message: 'Event outcome updated', event});
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating event outcome', error:error.message });
    }
};


module.exports = { 
    createEvent, 
    getAllEvents, 
    getEventById, 
    updateEvent, 
    deleteEvent, 
    updateEventOutcome 
};