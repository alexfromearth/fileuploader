import React from 'react';
import styles from './Input.module.css';

export let Input = ({input, meta, ...props}) => {
    return (
        <div>
            <div>
                <input
                    className={(meta.touched && meta.error) ? styles.error : ""}{...input} placeholder={props.placeholder}/>
            </div>
            <div>
                {meta.touched && meta.error &&
                <span className={styles.spanError}>{meta.error}</span>}
            </div>
        </div>
    )
}

