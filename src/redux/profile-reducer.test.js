const { default: profileReducer, addPostActionCreator, deletePost } = require("./profile-reducer");


let state = {                     
    posts: [
        { id: 1, message: 'Hello', likesCount: ' LIKE 12' },
        { id: 2, message: 'Give me MONEY', likesCount: 'LIKE 32' },
        { id: 3, message: 'OOps', likesCount: 'LIKE 23' },
        { id: 4, message: 'How are you', likesCount: 'LIKE 5' },
        { id: 5, message: 'Who are you', likesCount: 'LIKE 6' },
        { id: 6, message: 'I am fine', likesCount: 'LIKE 3' }
    ]
}

test('new post should be added', () => {
    //1.test.data
    let action = addPostActionCreator('This is The TEST');

    //2.action
    let newState = profileReducer(state, action)

    //3.expectation          //проверка(expect) массив должен добавить 7 эл - This is The TEST
    expect(newState.posts.length).toBe(7)
});

test('message of new post should be correct', () => {
    //1.test.data
    let action = addPostActionCreator('This is The TEST');

    //2.action
    let newState = profileReducer(state, action)

    //3.expectation          //проверка(expect) массив должен добавить 7 эл - This is The TEST
    expect(newState.posts[6].message).toBe('This is The TEST')
});

test('length should be decrement ', () => {
    //1.test.data
    let action = deletePost(1)

    //2.action
    let newState = profileReducer(state, action)

    //3.expectation          //проверка(expect) массив должен добавить 7 эл - This is The TEST
    expect(newState.posts.length).toBe(5)
});