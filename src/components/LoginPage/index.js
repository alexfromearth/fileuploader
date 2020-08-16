import React from 'react';
import {Field, Form} from "react-final-form";
import {
    composeValidators,
    isEmail,
    maxLength,
    minLength,
    required,
} from "../../utils/validators";
import {Input} from "../CustomFormItems/Input";
import styles from './styles.module.sass'
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {login} from "../../redux/ActionThunkSagaCreators/sagaActionCreators";


function Login() {
    const dispatch = useDispatch();
    const validationFailed = useSelector(state => state.main.validationFailed)
    const history = useHistory()

    let submitLoginForm = (fieldsData) => {
        dispatch(login(fieldsData))
        if (!validationFailed) {
            history.push('/');
        }
    };

    return (
        <div className={styles.LoginWrapper}>
            <Form
                onSubmit={submitLoginForm}
                render={({handleSubmit, pristine, submitting, serverMessage}) => (
                    <form onSubmit={handleSubmit} className={styles.loginForm}>
                        <div>
                            <Field
                                name={"userEmail"}
                                placeholder={"Login"}
                                validate={composeValidators(required, isEmail)}
                                render={(props) => <Input {...props} />}
                            />
                        </div>
                        <div>
                            <Field
                                type={"password"}
                                placeholder={"Password"}
                                name={"password"}
                                validate={composeValidators(
                                    required,
                                    minLength(4),
                                    maxLength(20)
                                )}
                                render={(props) => <Input {...props} />}
                            />
                        </div>
                        { validationFailed && <p style={{color: "red"}}></p> }
                        <button disabled={submitting || pristine}>Login</button>
                    </form>
                )}
            />
        </div>
    );
}


export default Login;
