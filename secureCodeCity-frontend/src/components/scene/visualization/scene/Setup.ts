import { DirectionalLight, Scene, WebGLRenderer } from "three";

export class Setup {

    public static initRenderer(renderer: WebGLRenderer, scene: Scene, container: HTMLCanvasElement) {
        let width: number = container.clientWidth;
        let height: number = container.clientHeight;

        Setup.setupRenderer(renderer, width, height);
        Setup.lights(scene);
    }

    /**
     * Setup the render information.
     */
    private static setupRenderer(renderer: WebGLRenderer, width: number, height: number) {
        renderer.setSize(width, height);
        renderer.setViewport(0, 0, width, height);
    }

    /**
     * Add light(s) to the scene
     */
    private static lights(scene: Scene) {
        let light = new DirectionalLight(0xaaaaaa);
        light.position.set(1, 0, 0).normalize();
        scene.add(light);

        light = new DirectionalLight(0xcccccc);
        light.position.set(-1, 0, 0).normalize();
        scene.add(light);

        light = new DirectionalLight(0xddddddd);
        light.position.set(0, 0, 1).normalize();
        scene.add(light);

        light = new DirectionalLight(0xeeeeee);
        light.position.set(0, 0, -1).normalize();
        scene.add(light);

        light = new DirectionalLight(0xffffff);
        light.position.set(0, 1, 0);
        scene.add(light);
    }
}
