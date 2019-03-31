import { getPhrases } from './util/api';
import { Data, Config, Layout, newPlot } from 'plotly.js';

async function main() {
    const phrases = await getPhrases();
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

main();
