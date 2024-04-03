const cron = require('node-cron');
const Notification = require('../backend/models/JobModel');
const notifier = require('node-notifier');

function scheduleNotifications() {
    console.log("Hello")
    // Schedule a task to run every minute
    cron.schedule('* * * * *', async () => {
        try {
            // Query the database for events scheduled within
            // the next minute
            console.log(Notification)

            const events = await Notification.find({ roundtiming: { $gte: new Date(), $lt: new Date(Date.now() + 60000) } });
            console.log(events)
            // Get users who have opted in to receive notifications
            const users = await Notification.find({ receiveNotifications: true });
            console.log(users)
            
            // Iterate through events
            events.forEach(event => {
                // Check if event has any round timings
                if (event.roundtiming.length > 0) {
                    // Iterate through round timings
                    event.roundtiming.forEach((roundTime, index) => {
                        const currentTime = Date.now();
                        const eventTime = new Date(roundTime).getTime(); // Assuming roundtiming contains event timings

                        // Check if event's round timing falls within the next minute
                        if (eventTime >= currentTime && eventTime < currentTime + 60000) {
                            // Trigger notification for the event round
                            const roundNote = event.roundnotes[index]; // Assuming roundnotes contains notes related to each round timing
                            sendNotification(event, roundTime, roundNote, users);
                        }
                    });
                }
            });
        } catch (error) {
            console.error('Error:', error);
        }
    });
}

function sendNotification(event, roundTime, roundNote, users) {
    console.log(`Sending notification for event "${event.title}" at time "${roundTime}" with note "${roundNote}"`);

    // Iterate through users who have opted in to receive notifications
    users.forEach(user => {
        // Implement logic to send notification to each user
        // Check if user has opted in to receive notifications
        if (user.receiveNotifications) {
            // Example: notifier.notify({ title: event.title, message: roundNote });
        }
    });
}

module.exports = scheduleNotifications;
