import { default as axios, AxiosResponse } from 'axios';
import { Phrase } from '../classes/phrase';

const BASE_URL: string = process.env.BASE_URL || 'http://localhost:8080';

async function request(path, method='GET') {
    const url: string = `${BASE_URL}${path}`;
    const res: AxiosResponse = await axios.request({
        url,
        method,
    });
    return res.data;
}

export async function getPhrases() {
    const data = await request('/phrases');
    return data.phrases.map(p => new Phrase(p.name, p.humor, p.severity, p.importance));
}
