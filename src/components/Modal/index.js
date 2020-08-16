import React, {useEffect} from 'react';
import {createPortal} from "react-dom";
const ModalRoot = document.getElementById('modal');

function Modal({className, children}) {

    const element = document.createElement('div');
    element.classList.add(className);

    useEffect(() => {
        ModalRoot.appendChild(element);
        return () => {
            ModalRoot.removeChild(element);
        }
    }, [])
    return createPortal(children, element);
}

export default Modal;