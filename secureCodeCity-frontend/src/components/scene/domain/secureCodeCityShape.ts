import { Shape, Vector2 } from "three";
import { Dimension } from "./Dimension";
import { Position } from "./Position";

export class SoftVis3dShape extends Shape {

    public key: string;

    public position: Position;
    public dimensions: Dimension;
    public color: number;
    public opacity?: number;

    public type: string;
    public margin: number;

    constructor(points: Vector2[], key: string) {
        super(points);

        this.holes = [];
        this.key = key;
        this.position = {
            _x: 0,
            _y: 0,
            _z: 0
        };
        this.dimensions = new Dimension(5, 5, 5);
        this.color = 0;
        this.opacity = 0.5;
    }
}