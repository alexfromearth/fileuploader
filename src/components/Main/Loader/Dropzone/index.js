import React, {useCallback, useEffect, useState} from 'react';
import Dropzone, {useDropzone} from 'react-dropzone';
import styles from './styles.module.sass';
import {fileUploadAuthAPI} from '../../../../api/api'
import {uploadFile} from "../../../../redux/ActionThunkSagaCreators/sagaActionCreators";
import {useDispatch, useSelector} from "react-redux";
import storage from '../../../../firebase/firebase'
import ProgressBar from "../../../ProgressBar";
import CircularProgress from "@material-ui/core/CircularProgress";

const API = new fileUploadAuthAPI();

function MyDropzone() {
    const [loadFile, setLoadFile] = useState(false);
    const [file, setFile] = useState(null);
    const currentUserId = useSelector(state => state.main.id);
    const isFetching = useSelector(state => state.main.isFetching);
    const dispatch = useDispatch();

    function handleUpload(file) {
        dispatch(uploadFile(file, currentUserId));
    }

    useEffect(() => {
        if (loadFile && file) {
            handleUpload(file);
            setFile(null);
            setLoadFile(false);
        }
    }, [loadFile])

    const onDrop = useCallback(acceptedFiles => {
        const data = new FormData();
        data.append('file', acceptedFiles[0], acceptedFiles[0].name);
        setFile(data);
    }, [])

    return (
        <>
            <Dropzone onDrop={onDrop}>
                {({getRootProps, getInputProps}) => (
                    <section>
                        <div {...getRootProps()} className={styles.drop}>
                            <input {...getInputProps()} />
                            <div>Drag 'n' drop some files here, or click to select files</div>
                        </div>
                    </section>
                )}
            </Dropzone>
            <button onClick={() => (setLoadFile(true))}>Загрузить</button>
            {isFetching &&
            <ProgressBar className={styles.progressWrapper}>
                <CircularProgress />
                <p>uploading...</p>
            </ProgressBar>}
        </>
    )
}

export default MyDropzone;
