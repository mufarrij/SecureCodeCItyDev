import { MeshLambertMaterial, BoxGeometry } from "three";
import { SoftVis3dMesh } from "../../domain/secureCodeCityMesh";
import { SoftVis3dShape } from "../../domain/secureCodeCityShape";

export class ObjectFactory {

    public static getSceneObjects(shapes: SoftVis3dShape[]): SoftVis3dMesh[] {
        let result: SoftVis3dMesh[] = [];

        for (let shape of shapes) {
            result.push(this._getShape(shape));
        }

        return result;
    }

    private static _getShape(element: SoftVis3dShape): SoftVis3dMesh {
        element.opacity = 1;

        let z = element.position._z + Math.floor(element.dimensions.height / 2);

        let geometry = new BoxGeometry(
            element.dimensions.length,
            element.dimensions.height,
            element.dimensions.width,
            0,
            0,
            0
        );

        let material = new MeshLambertMaterial({
            color: element.color,
            transparent: true,
            opacity: element.opacity
        });

        let cube: SoftVis3dMesh = new SoftVis3dMesh(element.key, geometry, material);
        cube.position.setX(element.position._x);
        cube.position.setY(z);
        cube.position.setZ(element.position._y);

        return cube;
    }
}
