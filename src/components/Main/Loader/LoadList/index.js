import React, {useState} from 'react';
import {useSelector} from "react-redux";
import 'antd/dist/antd.css';
import Modal from "../../../Modal";
import styles from './TableRow/styles.module.sass';
import TableRow from "./TableRow";

function LoadList() {

    const files = useSelector((state) => state.main.files);


    function handleFileNameChange(fileId) {

    }

    return (
        <>
            <table>
                <thead>
                <tr>
                    {/*<th>Превью</th>*/}
                    <th>Название файла</th>
                    <th>Размер файла</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {files.map((file) => (
                    <TableRow key={file.id} file={file}/>
                ))}
                </tbody>
            </table>
        </>
    );
}


export default LoadList;
