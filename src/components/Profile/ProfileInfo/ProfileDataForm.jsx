import React from 'react';
import style from './ProfileInfo.module.css';
import { Field, reduxForm } from 'redux-form';
import { Input, Textarea } from '../../common/FormsControl/FormsControl';
import styles from './../../common/FormsControl/FormsControl.module.css'

const ProfileDataForm = ({ handleSubmit, profile, error }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div><button>save</button></div>
            {error &&
                <div className={styles.formSummaryError}>
                    {error}
                </div>}
            <div>
                <b>Full name:</b> <Field placeholder={'Name'} name={'fullName'} component={Input} />
            </div>
            <div>
                <b>Looking for a JOB:</b> <Field name={'lookingForAJob'} component={Input} type={'checkbox'} />
            </div>
            <div>
                <b>My proffesional skills:</b> <Field placeholder={'My proffesional skills'} name={'lookingForAJobDescription'} component={Textarea} />
            </div>
            <div>
                <b>About me:</b> <Field placeholder={'About me'} name={'aboutMe'} component={Textarea} />
            </div>
            <div>
                <b>Contacts:</b> {Object.keys(profile.contacts).map(key => {
                    return <div key={key} className={style.contact}>
                        <b>{key}:<Field placeholder={key} name={'contacts.' + key} component={Input} /></b>
                    </div>
                })}
            </div>
        </form>
    )
}

 export const ProfileDataFormRedux = reduxForm ({
    form: 'editProfile'
}) (ProfileDataForm)

