import {expect} from "chai";
import {Camera} from "../../../../../src/components/scene/visualization/scene/Camera";

describe("Camera", () => {

    it("should construct and init camera", () => {
        let container: any = {
            clientWidth: 14,
            clientHeight: 56
        };

        let underTest: Camera = new Camera(container);

        expect(underTest.getCamera()).not.to.be.null;
    });

    it("should construct and init camera", () => {
        let container: any = {
            clientWidth: 14,
            clientHeight: 56
        };

        let underTest: Camera = new Camera(container);

        let positionX = 4;
        let positionY = 5;
        let positionZ = 6;
        underTest.setCameraPosition(positionX, positionY, positionZ);

        expect(underTest.getCameraPosition().x).to.be.eq(positionX);
        expect(underTest.getCameraPosition().y).to.be.eq(positionY);
        expect(underTest.getCameraPosition().z).to.be.eq(positionZ);
    });

    it("should set aspect", () => {
        let container: any = {
            clientWidth: 14,
            clientHeight: 56
        };

        let underTest: Camera = new Camera(container);

        let width = 34;
        let height = 34;
        underTest.setAspect(width, height);

        expect(underTest.getCamera().aspect).to.be.eq(width / height);
    });
});