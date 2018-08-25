import { PerspectiveCamera, Vector3 } from "three";

/**
 * @class Creates the camera for the scene.
 */
export class Camera {

    private fov: number = 70;

    private aspectRatio: number;

    /**
     * Perspective camera setup
     */
    private perpCam: PerspectiveCamera;
    private perpNearPane: number = 1;
    private perpFarPane: number = 100000;

    constructor(container: HTMLCanvasElement) {
        this.aspectRatio = container.clientWidth / container.clientHeight;
        this.initPerspective();
    }

    public setCameraPosition(positionX: number, positionY: number, positionZ: number) {
        this.perpCam.position.x = positionX;
        this.perpCam.position.y = positionY;
        this.perpCam.position.z = positionZ;
        this.perpCam.lookAt(new Vector3(0, 0, 0));
    }

    public getCamera(): PerspectiveCamera {
        return this.perpCam;
    }

    public getCameraPosition(): Vector3 {
        return this.perpCam.position;
    }

    public setAspect(width: number, height: number) {
        this.perpCam.aspect = width / height;
        this.perpCam.updateProjectionMatrix();
    }

    /**
     * Initialize the perspective camera.
     */
    private initPerspective() {
        this.perpCam = new PerspectiveCamera
        (
            this.fov,
            this.aspectRatio,
            this.perpNearPane,
            this.perpFarPane
        );

        this.perpCam.name = "perp";
    }
}
