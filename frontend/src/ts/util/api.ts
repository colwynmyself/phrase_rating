import { default as axios, AxiosResponse, AxiosRequestConfig } from 'axios';
import { Phrase } from '../classes/phrase';

const BASE_URL: string = process.env.BASE_URL || 'http://localhost:9200';

interface PhraseItem {
    id: number;
    name: string;
    humor: number;
    severity: number;
    importance: number;
}

interface PhraseList {
    phrases: PhraseItem[];
}

interface PhraseResponse {
    phrase: PhraseItem;
}

async function request(path: string, method='GET', body={}) {
    try {
        const url: string = `${BASE_URL}${path}`;
        const config: AxiosRequestConfig = {
            url,
            method,
        }

        if (body) {
            config.data = body;
        }

        const res: AxiosResponse = await axios.request(config);
        return res.data;
    } catch (error) {
        console.log(`Failed request body: ${JSON.stringify(body)}`);
        alert(`${error.message} (${method} ${path}). Check console for request body.`);
    }
}

export async function getPhrases(): Promise<Phrase[]> {
    const data: PhraseList = await request('/phrases');
    return data.phrases.map(p => new Phrase(p.name, p.humor, p.severity, p.importance));
}

export async function upsertPhrase(phrase: string): Promise<PhraseItem> {
    const res: PhraseResponse = await request('/phrases', "POST", { phrase });
    return res.phrase;
}

export async function voteOnPhrase(phrase_id: number, humor: number, importance: number, severity: number): Promise<void> {
    await request('/phrases/vote', 'POST', {
        phrase_id,
        humor,
        severity,
        importance,
    });
}
