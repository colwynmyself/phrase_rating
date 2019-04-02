import { Data, Config, Layout, newPlot } from 'plotly.js';

import { getPhrases, upsertPhrase, voteOnPhrase } from './util/api';
import { Phrase } from './classes/phrase';

interface SubmissionData {
    phrase: string;
    severity: number;
    importance: number;
    humor: number;
}

async function createPlot() {
    const phrases: Phrase[] = await getPhrases();
    const data: Data[] = phrases.map(phrase => phrase.getAsData());
    const layout: Partial<Layout> = {
        title: 'Phrases',
        xaxis: {
            range: [0, 1],
            title: 'Humor',
        },
        yaxis: {
            range: [0, 1],
            title: 'Importance',
        },
    };
    const config: Partial<Config> = {
        responsive: true,
    };

    newPlot('app', data, layout, config);
}

function initializeForm() {
    const form = document.querySelector('form');
    const vote = document.getElementById('vote')
    const showButton = document.getElementById('show-vote');
    const votePane = document.getElementsByClassName('vote-pane')[0];

    showButton.addEventListener("click", () => {
        vote.classList.remove('hidden');
    }, false);

    vote.addEventListener("click", () => {
        vote.classList.add("hidden");
    }, false);

    votePane.addEventListener("click", e => {
        e.stopPropagation();
    }, false);

    form.addEventListener("submit", async e => {
        e.preventDefault();

        const data = new FormData(form);
        const inputs: SubmissionData = {
            phrase: data.get('phrase').toString(),
            severity: parseFloat(data.get('severity').toString()),
            importance: parseFloat(data.get('importance').toString()),
            humor: parseFloat(data.get('humor').toString()),
        };

        const phrase = await upsertPhrase(inputs.phrase);
        await voteOnPhrase(phrase.id, inputs.humor, inputs.importance, inputs.severity);
        await createPlot();
    }, false);
}

initializeForm();
createPlot();
