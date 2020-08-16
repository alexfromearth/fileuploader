import React from 'react';
import LoadList from "./LoadList";
import styles from './styles.module.sass'
import MyDropzone from "./Dropzone";

function Loader() {
    return (
        <div className={styles.loaderWrapper}>
            <MyDropzone />
            <LoadList />
        </div>
    );
}

export default Loader;
