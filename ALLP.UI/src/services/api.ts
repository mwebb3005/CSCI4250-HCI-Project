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

export const translateAndGradeApi = async (textToTranslate: string) => {
    const response = await axios.post('http://127.0.0.1:8000/translate', {
        text: textToTranslate
    }, {
        headers: {
            'Access-Control-Allow-Origin' : 'http://127.0.0.1:8000',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }
    });
    return response.data;
}

export const getPromptsApi = async () => {
    const response = await axios.get('http://127.0.0.1:8000/prompts', {
        headers: {
            'Access-Control-Allow-Origin' : 'http://127.0.0.1:8000',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }
    });
    return response.data;
}