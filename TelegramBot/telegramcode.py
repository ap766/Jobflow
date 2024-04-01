from typing import Final
from telegram import Update
from telegram.ext import CommandHandler, MessageHandler, filters, Application, ContextTypes

TOKEN: Final = "5917622146:AAEZjjW4nPmn4nGhHOkp3UVsqXhQExGTHNU"
BOT_USERNAME: Final = 'ap766_1_bot'


# Command to handle /start
async def start_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("🎉 Hey there, JobFlow enthusiast! Tired of juggling countless job applications? Leave the chaos behind and let us be your trusty application sidekick!\n 💼🤖With JobFlow, bid farewell to sticky notes and scattered emails. We'll help you track every application step, from submission to interview, all in one organized place. 🚀\nNo more application amnesia or missed deadlines! Get ready for a streamlined job hunting experience that will make you say, 'I've got this!' 💪\nSo buckle up, job seeker extraordinaire, and let's conquer the job market, one application at a time! 🌟📝\nWelcome to JobFlow, where organized applications and job success await! 😄💼")


# Command to handle /help
async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text('Try typing anything and I will do my best to respond!')


# Command to handle /custom
async def custom_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text('This is a custom command, you can add your logic here!')


# Function to handle incoming messages
async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    # Get basic info of the incoming message
    message_type: str = update.message.chat.type
    text: str = update.message.text

    # Print a log for debugging
    print(f'User ({update.message.chat.id}) in {message_type}: "{text}"')

    # Create your own response logic
    processed: str = text.lower()

    if 'hello' in processed:
        response: str = 'Hey there!'
    elif 'how are you' in processed:
        response: str = 'I\'m good!'
    elif 'help me keep track of my job' in processed:
        response: str = 'Yes, sure!'

    else:
        response: str = 'I don\'t understand'

    # Reply to the user
    print('Bot:', response)
    await update.message.reply_text(response)


# Function to handle errors
async def error(update: Update, context: ContextTypes.DEFAULT_TYPE):
    print(f'Update {update} caused error {context.error}')


# Run the program
if __name__ == '__main__':
    app = Application.builder().token(TOKEN).build()

    # Commands
    app.add_handler(CommandHandler('start', start_command))
    app.add_handler(CommandHandler('help', help_command))
    app.add_handler(CommandHandler('custom', custom_command))

    # Messages
    app.add_handler(MessageHandler(filters.TEXT, handle_message))

    # Log all errors
    app.add_error_handler(error)

    print('Polling...')
    # Run the bot
    app.run_polling(poll_interval=5)
