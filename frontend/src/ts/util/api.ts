import { default as axios, AxiosResponse } from 'axios';
import { Phrase } from '../classes/phrase';

const BASE_URL: string = process.env.BASE_URL || 'http://localhost:8080';

interface PhraseItem {
    name: string;
    humor: number;
    severity: number;
    importance: number;
}

interface PhraseResponse {
    phrases: PhraseItem[];
}

async function request(path: string, method='GET') {
    try {
        const url: string = `${BASE_URL}${path}`;
        const res: AxiosResponse = await axios.request({
            url,
            method,
        });
        return res.data;
    } catch (error) {
        alert(error);
    }
}

export async function getPhrases() {
    const data: PhraseResponse = await request('/phrases');
    return data.phrases.map(p => new Phrase(p.name, p.humor, p.severity, p.importance));
}
