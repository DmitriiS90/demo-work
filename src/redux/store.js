import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sitebarReducer from "./sitebar-reducer";


let store = {
    _state: {
        profilePage: {
            posts: [
                { id: 1, message: 'Hello', likesCount: ' LIKE 12' },
                { id: 2, message: 'Give me MONEY', likesCount: 'LIKE 32' },
                { id: 3, message: 'OOps', likesCount: 'LIKE 23' },
                { id: 4, message: 'How are you', likesCount: 'LIKE 5' },
                { id: 5, message: 'Who are you', likesCount: 'LIKE 6' },
                { id: 6, message: 'I am fine', likesCount: 'LIKE 3' }
            ],
            newPostText: "holiday INN"
        },
    
        dialogsPage: {
            dialogs: [
                { id: 1, name: 'Dmitriy', avatar: 'https://1avatara.ru/pic/animal/animal0013.jpg'},
                { id: 2, name: 'Andrey', avatar: 'https://1avatara.ru/pic/animal/animal0029.jpg'},
                { id: 3, name: 'Aleksey', avatar: 'https://1avatara.ru/pic/animal/animal0031.jpg'},
                { id: 4, name: 'Vadim', avatar: 'https://1avatara.ru/pic/animal/animal0032.jpg'},
                { id: 5, name: 'Michail', avatar: 'https://1avatara.ru/pic/animal/animal0033.jpg'},
                { id: 6, name: 'Dasha', avatar: 'http://1avatara.ru/pic/animal/animal0024.jpg'}
            ],
            messages: [
                { id: 1, message: 'Hello' },
                { id: 2, message: 'Whats up' },
                { id: 3, message: 'OOps' },
                { id: 4, message: 'How are you' },
                { id: 5, message: 'I am fine' },
                { id: 6, message: 'I am fine' }
            ],
            newMessageBody: '',
        },

        navbar: {
            sitebar: [
                { id: 1, name: 'Dmitriy' },
                { id: 2, name: 'Andrey' },
                { id: 3, name: 'Dasha' }
            ]
        } 
    },
    
    _callsubscribe () {
        alert("state")
    },

    getState() {                   // необходим, что бы не вызывать state напримую
        return this._state;
    },

// удалили фаил render.js, и вернули ф-ю callsubscribe обратно в index.js, теперь нужен callback, т.к. callsubscribe(=rerenderEntireTree) не импортируется в state.js
    subscribe(observer) {                 //subscribe подписчик
        this._callsubscribe = observer;        // переопределии callsubscribe() observer(паттерн) тоже =  callsubscribe(=rerenderEntireTree)
    },

//что б уменьшить количество атрибутов в компоненте методы(ф-ии) кидаем в одну ф-ю dispatch(action) отсылка(действие) action-это объект
    dispatch(action) {
// reducer (преобразователи)-ф-ии уменьшающие if...else, в которых!!! не нужен this это ф-ии получающие state/action
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._state.navbar = sitebarReducer(this._state.navbar, action)
        this._callsubscribe(this._state); 
    },
}


export default store;