import React from 'react';
import styles from "./styles.module.sass";
import {NavLink} from "react-router-dom";
import {Button, Tooltip} from 'antd';
import {HomeOutlined, UserAddOutlined} from '@ant-design/icons';

function GuestScreen() {
    return (
        <div className={styles.startScreenWrapper}>
            <h1>Загружатор</h1>
            <div>
                <NavLink to="/login"><Button type={"ghost"} icon={<HomeOutlined />}>Войти</Button></NavLink>
                <NavLink to="/registration"><Button type={"ghost"}><UserAddOutlined />Зарегистрироваться</Button></NavLink>
            </div>
        </div>
    );
}

export default GuestScreen;
