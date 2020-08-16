import React, {useState} from 'react';
import Modal from "../../../../Modal";
import styles from "./styles.module.sass";
import EditInput from './Input/index'
import {DeleteFile} from "../../../../../redux/ActionThunkSagaCreators/sagaActionCreators";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useDispatch, useSelector} from "react-redux";
import {faPenSquare, faTrashAlt} from "@fortawesome/free-solid-svg-icons";

function TableRow({file}) {
    const [showDeleteModal, setDeleteModal] = useState('');
    const [showEditModal, setEditModal] = useState('');
    const userId = useSelector(state => state.main.id);
    const dispatch = useDispatch();


    function handleDelete(fileId, originalName) {
        dispatch(DeleteFile(fileId, originalName, userId));
        setDeleteModal('');
    }
    return (
        <tr>
            {/*<td><img src={file.image} alt=""/></td>*/}
            <td>{file.originalname}</td>
            <td>{((file.size / 1024) / 1024).toFixed(2)} Mb</td>
            <td>
                <a className={styles.editBtn} onClick={() => setEditModal(file.id)}><FontAwesomeIcon icon={faPenSquare}/></a>
                <a className={styles.deleteBtn} onClick={() => setDeleteModal(file.id)}><FontAwesomeIcon icon={faTrashAlt}/></a>
                {showEditModal === file.id && <Modal className={styles.myModalEdit}>
                    <h2>Редактирование файла</h2>
                    <form>
                        <EditInput originalName={file.originalname} fileId={file.id} setEditModal={setEditModal}/>
                    </form>
                </Modal>}
                {showDeleteModal === file.id && <Modal className={styles.myModalDelete}>
                    <p>Вы действительно хотите удалить "{file.originalname}"</p>
                    <div>
                        <button onClick={() => handleDelete(file.id, file.originalname)}>Удалить</button>
                        <button onClick={() => setDeleteModal('')}>Отменить</button>
                    </div>
                </Modal>}
            </td>
        </tr>
    );
}

export default TableRow;