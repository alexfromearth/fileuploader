import React, {useEffect} from 'react';
import {createPortal} from "react-dom";

const progressRoot = document.getElementById('progress-bar');

function ProgressBar({children, className}) {
    const element = document.createElement('div');
    element.classList.add(className);
    useEffect(() => {
        progressRoot.appendChild(element);

        return () => {
            progressRoot.removeChild(element);
        }
    }, [])

    return createPortal(children, element);
}

export default ProgressBar;