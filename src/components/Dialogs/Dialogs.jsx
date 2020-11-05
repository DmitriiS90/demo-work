import React from 'react';
import styles from './Dialogs.module.css'
import { Redirect } from 'react-router-dom';
import DialogItem from './DialogItem/DialogItem';
import MessageItem from './MessageItem/MessageItem';
import { Field, reduxForm } from 'redux-form';
import { Textarea } from '../common/FormsControl/FormsControl';
import { maxLengthCreator, required } from '../../utils/validators/validator';

const Dialogs = (props) => {

    let state = props.dialogsPage;

    let dialogsElements = state.dialogs.map( (d) => <DialogItem avatar={d.avatar} name={d.name} key={d.id} id={d.id}/>);
    let messagesElements = state.messages.map( (m) => <MessageItem message={m.message} key={m.id}/>);

    let newMessageBody = state.newMessageBody; 

    let addNewMessage = (values) => {
        props.sendMessage(values.newMessageBody)
    }

    if (props.isAuth == false) return <Redirect to={'/login'} />

    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogsItems}>
                {dialogsElements}
            </div>
           
            <div className={styles.messages}>
                <div>{messagesElements}</div>
                <MessageFormRedux onSubmit={addNewMessage}/>
            </div>
        </div>
    )
}

const max10 = maxLengthCreator(10);

const MessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea}
                       validate={[required, max10]}
                       name='newMessageBody' 
                       placeholder='Enter your message'/>
            </div>

            <div><button>SEND</button></div>
        </form>
    )
}

const MessageFormRedux = reduxForm({
    form:'dialogMessageForm'
})(MessageForm)


export default Dialogs;