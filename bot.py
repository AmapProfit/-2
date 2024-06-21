from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Updater, CommandHandler, CallbackContext

def start(update: Update, context: CallbackContext) -> None:
    update.message.reply_text('Привет! Это бот-игра Tower Bloxx. Введи /game чтобы начать.')

def game(update: Update, context: CallbackContext) -> None:
    keyboard = [
        [InlineKeyboardButton("Start Tower Bloxx", url="https://yourgameurl.com")]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    update.message.reply_text('Нажми кнопку ниже, чтобы начать игру:', reply_markup=reply_markup)

def main() -> None:
    updater = Updater("YOUR_API_TOKEN", use_context=True)
    dispatcher = updater.dispatcher

    dispatcher.add_handler(CommandHandler("start", start))
    dispatcher.add_handler(CommandHandler("game", game))

    updater.start_polling()
    updater.idle()

if __name__ == '__main__':
    main()
