import axios from "axios";

export const helloWorld = async () => {
    const response = await axios.get('http://127.0.0.1:8000/', {
        headers: {
            'Access-Control-Allow-Origin' : 'http://127.0.0.1:8000',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }
    });
    return response.data;
}