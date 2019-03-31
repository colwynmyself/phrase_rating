import { phrases } from './phrases';
import { Data, Config, Layout, newPlot } from 'plotly.js';

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
