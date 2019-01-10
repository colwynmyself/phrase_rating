import { Data } from 'plotly.js';

export class BasePhrase {
    public name: string;
    public humor: number;
    public severity: number;
    public importance: number;

    public getAsData = (): Data => ({
        x: [this.humor],
        y: [this.importance],
        mode: 'markers',
        type: 'scatter',
        name: this.name,
        marker: { size: this.severity * 50 },
    });
}
