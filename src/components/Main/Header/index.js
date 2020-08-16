import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import styles from './styles.module.sass'
import {logoutUser} from "../../../redux/ActionThunkSagaCreators/sagaActionCreators";

function Header() {
    const userEmail = useSelector((state) => state.main.userEmail)
    const files = useSelector((state) => state.main.files);
    const dispatch = useDispatch();

    const sizeOfAll = files.map(file => file.size)
        .reduce((acc, currVal) => (acc + currVal), 0) / 1024 / 1024;

    function handleLogout() {
        dispatch(logoutUser());
    }
    return (
        <div className={styles.headerWrapper}>
            <h2>Загружатор</h2>
            <p>Привет, {userEmail}! Ты загрузил {files && files.length} файла(ов) общим размером {sizeOfAll.toFixed(2)} Mb</p>
            <button onClick={handleLogout}>Выйти</button>
        </div>
    );
}



export default Header;
