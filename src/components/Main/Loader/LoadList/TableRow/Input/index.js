import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {DeleteFile, EditFile} from "../../../../../../redux/ActionThunkSagaCreators/sagaActionCreators";

function EditInput({originalName, setEditModal, fileId}) {
    const [inputEdit, setInputEdit] = useState(originalName);
    const userId = useSelector((state) => state.main.id)
    const dispatch = useDispatch();

    function handleBackClick() {
        setEditModal('');
    }


    function handleEdit() {
        dispatch(EditFile(originalName, inputEdit, fileId, userId));
        setEditModal('');
    }

    return (
        <>
            <span>Название файла:</span><input type="text" name="fileName"
                                               value={inputEdit}
                                               onChange={(e) => {
                                                   setInputEdit(e.target.value)
                                               }}/>
            <br/>
            <br/>
            <div>
                <button onClick={handleEdit} type="submit">Сохранить</button>
                <button onClick={handleBackClick}>Отменить</button>
            </div>
        </>
    );
}

export default EditInput;