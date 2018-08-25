import {expect} from "chai";
import {SoftVis3dShape} from "../../../../../src/components/scene/domain/secureCodeCityShape";
import SceneObjectCalculator from "../../../../../src/components/scene/visualization/scene/SceneObjectCalculator";
import {Dimension} from "../../../../../src/components/scene/domain/Dimension";
import {Rectangle} from "../../../../../src/components/scene/domain/Rectangle";
import {Vector2} from "three";
import {Offset} from "../../../../../src/services/HtmlDom";

describe("SceneObjectCalculator", () => {

    it("should calc with empty shape array", () => {
        let shapes: SoftVis3dShape[] = [];
        let result: Rectangle = SceneObjectCalculator.findMaxDimension(shapes);

        expect(result.length).to.be.eq(0);
        expect(result.width).to.be.eq(0);
    });

    it("should calc with single shape in array", () => {
        let shapes: SoftVis3dShape[] = [];
        let points: Vector2[] = [];
        points.push(new Vector2(12, 54));
        let shape: SoftVis3dShape = new SoftVis3dShape(points, "1");
        shape.dimensions = new Dimension(23, 56, 89);
        shapes.push(shape);
        let result: Rectangle = SceneObjectCalculator.findMaxDimension(shapes);

        expect(result.length).to.be.eq(56);
        expect(result.width).to.be.eq(23);
    });

    it("should find max width and length", () => {
        let shapes: SoftVis3dShape[] = [];
        let points: Vector2[] = [];
        points.push(new Vector2(12, 54));
        let shape: SoftVis3dShape = new SoftVis3dShape(points, "1");
        shape.dimensions = new Dimension(1, 3453, 89);
        shapes.push(shape);
        let shape2: SoftVis3dShape = new SoftVis3dShape(points, "1");
        shape2.dimensions = new Dimension(2332, 56, 1);
        shapes.push(shape2);
        let result: Rectangle = SceneObjectCalculator.findMaxDimension(shapes);

        expect(result.length).to.be.eq(3453);
        expect(result.width).to.be.eq(2332);
    });

    it("should calc dimension on resize", () => {
        const sidebarWidth = 12;
        const topbarHeight = 34;

        const appOffset: Offset = new Offset(56, 78);
        const sonarFooter: any = {
            offsetHeight: 74
        };
        const appWidth = 90;

        let result = SceneObjectCalculator.calculateDimensionOnResize(sidebarWidth, topbarHeight, appOffset, sonarFooter, appWidth);

        expect(result.length).to.be.eq(602);
        expect(result.width).to.be.eq(75);
    });

});