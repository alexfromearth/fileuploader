import React from 'react';
import styles from "../RegPage/styles.module.sass";
import {Field, Form} from "react-final-form";
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {composeValidators, isEmail, maxLength, minLength, required} from "../../utils/validators";
import {Input} from "../CustomFormItems/Input";
import {registration} from "../../redux/ActionThunkSagaCreators/sagaActionCreators";

function RegistrationPage(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    function submitLoginForm(fieldData) {
        dispatch(registration(fieldData));
        history.push('/');
    }

    return (
        <div>
            <Form
                onSubmit={submitLoginForm}
                render={({handleSubmit, pristine, submitting, serverMessage}) => (
                    <form onSubmit={handleSubmit} className={styles.RegForm}>
                        <div>
                            <Field
                                name={"userEmail"}
                                placeholder={"Login"}
                                validate={composeValidators(required, isEmail)}
                                render={(props) =>
                                    <>
                                        <label>Login</label>
                                        <Input {...props} />
                                    </>}
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
                                    maxLength(16)
                                )}
                                render={(props) =>
                                    <>
                                        <label>Password</label>
                                        <Input {...props} />
                                    </>}
                            />
                            <Field
                                type={"phone"}
                                placeholder={"phone"}
                                name={"phone"}
                                validate={composeValidators(
                                    required,
                                    minLength(4),
                                )}
                                render={(props) =>
                                    <>
                                        <label>phone</label>
                                        <Input {...props} />
                                    </>}
                            />
                            <Field
                                type={"text"}
                                placeholder={"User name"}
                                name={"userName"}
                                validate={composeValidators(
                                    required,
                                    minLength(4),
                                )}
                                render={(props) =>
                                    <>
                                        <label>user name</label>
                                        <Input {...props} />
                                    </>}
                            />
                        </div>
                        <button disabled={submitting || pristine}>Register</button>
                    </form>
                )}
            />
        </div>
    );
}



export default RegistrationPage;
