import axios from 'axios';

const URI = 'http://127.0.0.1:8000';

const get = async (endpoint) => {
    try {
        const url = `${URI}${endpoint}`;
        return await axios.get(url);
    } catch (err) {
        throw new Error(err.response?.data?.message || "Error de conexión");
    }
};

const post = async (endpoint, payload) => {
    try {
        const url = `${URI}${endpoint}`;
        return await axios.post(url, payload, {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (err) {
        throw new Error(err.response?.data?.message || "Error de conexión");
    }
};

const put = async (endpoint, payload) => {
    try {
        const url = `${URI}${endpoint}`;
        return await axios.put(url, payload, {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (err) {
        throw new Error(err.response?.data?.message || "Error de conexión");
    }
};

const remove = async (endpoint) => {
    try {
        const url = `${URI}${endpoint}`;
        return await axios.delete(url);
    } catch (err) {
        throw new Error(err.response?.data?.message || "Error de conexión");
    }
};

const base = { get, post, put, remove };

export default base;
