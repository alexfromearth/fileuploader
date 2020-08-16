import * as axios from 'axios';


export class fileUploadAuthAPI {

    isUserAuthenticated() {
        return axios.get('/api/auth/me').then((response) => {
            return response.data;
        })
    }

    registration(fieldsData) {
        return axios.post('/api/auth/registration', fieldsData).then((response) => {
            return response.data;
        })
    }

    login(fieldsData) {
        return axios.post('/api/auth/login', fieldsData).then(response => {
            return response.data;
        })
    }

    logout() {
        return fetch('/api/auth/login', {
            method: "DELETE"
        }).then(response => {
            return response.json();
        })
    }

    // fileUpload

    uploadFile(file, userId) {
        return axios({
                method: 'post',
                url: '/api/upload',
                data: file,
                headers: {
                    // 'Content-Type': 'application/octet-stream',
                    'userid': userId
                }
            }
        ).then(response => {
            return response.data;
        })
    }

    uploadFileBuffer(blob, userName) {
        return axios({
                method: 'post',
                url: '/api/upload',
                data: blob,
                headers: {
                    'Content-Type': 'application/octet-stream',
                    'username': userName,
                    // 'filetype': fileType,
                }
            }
        ).then(response => {
            console.log(response.data);
        })
    }
    editFile(oldFileName, newFileName, fileId, userId) {
        return axios.patch(`/api/upload/file/${fileId}`, {oldFileName, newFileName, userId}).then((response) => {
            return response.data;
        })
    }

    deleteFile(fileId, fileName, userId) {
        return axios.delete(`/api/upload/file/?fileId=${fileId}&fileName=${fileName}&userId=${userId}`).then((response) => {
            return response.data;
        })
    }
}
