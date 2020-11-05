import React from 'react';
import styles from './MyPosts.module.css';
import Post from './Post/Post';
import { Field, reduxForm } from 'redux-form';
import { required, maxLengthCreator } from '../../../utils/validators/validator';
import { Textarea } from '../../common/FormsControl/FormsControl';

let maxLength10 = maxLengthCreator(10);

const MyPosts = React.memo( (props) => {

    let PostsElements = props.posts
    .map( p => <Post key={p.id} message={p.message} likesCount={'LIKE',p.likesCount}/>)

    let onAddPost = (values) => {
        props.addPost(values.newPostText)
    }
   
    return (
        <div className={styles.postsBlock}>
            <h3>My post</h3>
            <MyPostFormRedux onSubmit={onAddPost}/>
            <div className={styles.posts}>

                {PostsElements}

            </div>
        </div>
    )
})

const MyPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} 
                       placeholder='Post message'
                       name='newPostText' 
                       validate={[required, maxLength10]}/>            
            </div>
            <div>
                <button>POST</button>
            </div>
        </form>
    )
}
const MyPostFormRedux = reduxForm({
    form: 'profileAddNewPostForm'
}) (MyPostForm)

export default MyPosts;