import {Intersection, Raycaster, Vector3} from "three";
import {SoftVis3dMesh} from "../domain/secureCodeCityMesh";
import {PerspectiveCamera} from "three";
import {Offset} from "../../../services/HtmlDom";

export class SelectionCalculator {

    public static RAYCASTER = new Raycaster();

    public static makeSelection(x: number, y: number, width: number, height: number,
                                camera: PerspectiveCamera, objectsInView: SoftVis3dMesh[]): string | null {

        // creating NDC coordinates for ray intersection.
        let mouseDownX: number = (x / width) * 2 - 1;
        let mouseDownY: number = -(y / height) * 2 + 1;

        let vector = new Vector3(mouseDownX, mouseDownY, 1).unproject(camera);

        let cameraPosition = camera.position;
        SelectionCalculator.RAYCASTER.set(cameraPosition, vector.sub(cameraPosition).normalize());
        let intersected: Intersection[] =
            SelectionCalculator.RAYCASTER.intersectObjects(objectsInView, true);

        let result: string | null = null;
        if (intersected.length > 0) {
            let object: SoftVis3dMesh = intersected[0].object as SoftVis3dMesh;
            result = object.getSoftVis3dId();
        }

        return result;
    }

    public static calculateSelectionPosition(event: MouseEvent, offset: Offset) {
        let x: number = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        let y: number = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;

        x -= offset.left;
        y -= offset.top;

        return {x, y};
    }
}
