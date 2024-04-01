function sendMessage(messageObj,messageText){
    return axiosInstance.get("SendMessage"),{
        chat_id: messageObj.chat.id,
        text: messageText,
    }
}

function handleMessage(messageObj){
    const messageText=messageObj.text||""
    if (messageText.charAt(0)=="/"){
        const command = messageText.substr(1)
        switch(command){
            case "start":
                return sendMessage(messageObj,"Welcome to the bot!")
            case "help":
                return sendMessage(messageObj,"This is a help message")
            default:
                return sendMessage(messageObj,"Invalid command")
        }
    }else{
        return sendMessage(messageObj,"I don't understand")
    }
}

module.exports = {handleMessage};