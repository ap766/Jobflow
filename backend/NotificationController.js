const cron = require('node-cron');
const Notification = require('../backend/models/JobModel');
const notifier = require('node-notifier');

function scheduleNotifications() {
    console.log("Hello");
    // Schedule a task to run every minute
    cron.schedule('* * * * *', async () => {
        try {
            const dateString = new Date()

            // Create a new Date object from the date string
            const date = new Date(dateString);

            // Use the toISOString() method to convert the date object to ISO 8601 format
            const isoString = date.toISOString();

            console.log(isoString); // Output: "2024-04-03T17:40:00.000Z"

           
            console.log("Executing scheduleNotifications task...");
            // Query the database for events scheduled within the next minute
            const events = await Notification.find({ roundtiming: { $gte: isoString } });
            console.log("Events scheduled within the next minute:", events);
            
            // Get users who have opted in to receive notifications
            const users = await Notification.find({ receiveNotifications: true });

            // Iterate through events
            events.forEach(event => {
                // Check if event has any round timings
                if (event.roundtiming.length > 0) {
                    console.log("hey boi")
                    console.log(event.roundinfo)
                    // Iterate through round timings
                    event.roundtiming.forEach(roundTime => {
                        console.log("hey")
                        const currentTime = Date.now();
                        console.log(currentTime);
                        const eventTime = new Date(roundTime);
                        console.log(eventTime);

                        // Check if event's round timing falls within the next minute
                        if (eventTime >= currentTime && eventTime < currentTime + 60000) {
                            console.log("WOW AMAZING")
                            // Trigger notification for the event round
                            const index = event.roundtiming.indexOf(roundTime);
                            console.log(index)
                            const roundNote = event.roundinfo[index];
                            console.log(roundNote)
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
            // Send notification using node-notifier
            notifier.notify({
                title: event.title,
                message: roundNote
            });
        }
    });
}

module.exports = scheduleNotifications;
