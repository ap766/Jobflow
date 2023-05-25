
from typing import Final
from telegram import Update
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes
TOKEN: Final="5917622146:AAEZjjW4nPmn4nGhHOkp3UVsqXhQExGTHNU"
BOT_USERNAME: Final = 'ap766_1_bot'

# Lets us use the /start command
async def start_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("🎉 Hey there, JobFlow enthusiast! Tired of juggling countless job applications? Leave the chaos behind and let us be your trusty application sidekick!\n 💼🤖With JobFlow, bid farewell to sticky notes and scattered emails. We'll help you track every application step, from submission to interview, all in one organized place. 🚀\nNo more application amnesia or missed deadlines! Get ready for a streamlined job hunting experience that will make you say, 'I've got this!' 💪\nSo buckle up, job seeker extraordinaire, and let's conquer the job market, one application at a time! 🌟📝\nWelcome to JobFlow, where organized applications and job success await! 😄💼")

async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text('Try typing anything and I will do my best to respond!')

async def custom_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text('This is a custom command, you can ad')

def handle_response(text: str) -> str:
    # Create your own response logic
    processed: str = text.lower()

    if 'hello' in processed:
        return 'Hey there!'

    if 'how are you' in processed:
        return 'I\'m good!'

    if 'help me keep track of my jon' in processed:
        return 'yesss!'

    return 'I don\'t understand'

async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    # Get basic info of the incoming message
    message_type: str = update.message.chat.type
    text: str = update.message.text

    # Print a log for debugging
    print(f'User ({update.message.chat.id}) in {message_type}: "{text}"')

    # React to group messages only if users mention the bot directly
    if message_type == 'group':
        # Replace with your bot username
        if BOT_USERNAME in text:
            new_text: str = text.replace(BOT_USERNAME, '').strip()
            response: str = handle_response(new_text)
        else:
            return  # We don't want the bot respond if it's not mentioned in the group
    else:
        response: str = handle_response(text)

    # Reply normal if the message is in private
    print('Bot:', response)
    await update.message.reply_text(response)


# Log errors
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
