declare interface SelectOptionValue {
    readonly id: string;
    readonly label: string;
}

interface MeasureList {
    [propName: string]: number;
}

declare module "three-orbit-controls" {
    interface OrbitController {
        reset(): void;
    }
    let orbitcontrols: (three: any) => (new(camera: any, canvas: HTMLCanvasElement) => OrbitController);
    export = orbitcontrols;
}