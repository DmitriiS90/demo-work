const SEND_MESSAGE = 'SEND-MESSAGE'

export type InitialStateType = typeof initialState

type DialogsType = {
    id: number
    name: string
    avatar: string
}
type MessagesType = {
    id: number
    message: string
}
let initialState = {
    dialogs: [
        { id: 1, name: 'Dmitriy', avatar: 'https://1avatara.ru/pic/animal/animal0013.jpg'},
        { id: 2, name: 'Andrey', avatar: 'https://1avatara.ru/pic/animal/animal0029.jpg'},
        { id: 3, name: 'Michail', avatar: 'https://1avatara.ru/pic/animal/animal0033.jpg'},
        { id: 4, name: 'Dasha', avatar: 'http://1avatara.ru/pic/animal/animal0024.jpg'}
    ] as Array<DialogsType>,
    messages: [
        { id: 1, message: 'Hello' }
    ] as Array<MessagesType>
}


const dialogsReducer = (state = initialState, action: any): InitialStateType => {

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

type SendMessageCreatorActionType = {
    type: typeof SEND_MESSAGE
    newMessageBody: string
}

export const sendMessageCreator = (newMessageBody:string): SendMessageCreatorActionType => {
    return { type: SEND_MESSAGE, newMessageBody}
};

export default dialogsReducer;