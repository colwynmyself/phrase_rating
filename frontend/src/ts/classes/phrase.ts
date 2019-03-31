import { Data } from 'plotly.js';

export class Phrase {
    public name: string;
    public humor: number;
    public severity: number;
    public importance: number;

    public constructor(name: string, humor: number, severity: number, importance: number) {
        this.name = name;
        this.humor = humor;
        this.severity = severity;
        this.importance = importance;
    }

    public getAsData = (): Data => ({
        x: [this.humor],
        y: [this.importance],
        mode: 'markers',
        type: 'scatter',
        name: this.name,
        marker: { size: this.severity * 50 },
    });
}
