const SEND_MESSAGE = 'SEND-MESSAGE'

let initialState = {
    dialogs: [
        { id: 1, name: 'Dmitriy', avatar: 'https://1avatara.ru/pic/animal/animal0013.jpg'},
        { id: 2, name: 'Andrey', avatar: 'https://1avatara.ru/pic/animal/animal0029.jpg'},
        { id: 3, name: 'Michail', avatar: 'https://1avatara.ru/pic/animal/animal0033.jpg'},
        { id: 4, name: 'Dasha', avatar: 'http://1avatara.ru/pic/animal/animal0024.jpg'}
    ],
    messages: [
        { id: 1, message: 'Hello' }
    ]
}


const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {
        case SEND_MESSAGE:
            let body = action.newMessageBody
            return {
                ...state,
                messages: [...state.messages, { id: 7, message: body }]
            }
        default:
            return state
    }
}
export const sendMessageCreator = (newMessageBody) => {
    return { type: SEND_MESSAGE, newMessageBody}
};

export default dialogsReducer;