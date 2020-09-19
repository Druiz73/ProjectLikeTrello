const messages = [];
const createMessage = dailyNote => {
    let index = messages.findIndex(i => i.userId === dailyNote.userId);
    if(index >= 0) {
        messages[index] = dailyNote;
        return messages
    } else {
        messages.push(dailyNote);
        return messages;
    }
}

const getMessagesInRoom = room => messages.filter(dailyNote => dailyNote.roomId === room);


module.exports = {
    createMessage,
    getMessagesInRoom
}