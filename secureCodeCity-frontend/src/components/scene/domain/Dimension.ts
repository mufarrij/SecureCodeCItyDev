export class Dimension {
    public readonly length: number;
    public readonly width: number;
    public readonly height: number;

    constructor(width: number, length: number, height: number) {
        this.width = width;
        this.length = length;
        this.height = height;
    }
}