import {expect} from "chai";
import Metric from "../../src/classes/Metric";
import {MetricType} from "../../src/classes/MetricType";

describe("Metric", () => {

    it("should construct minimal metric", () => {
        let expectedKey: string = "23";
        let expectedName: string = "diufgh";
        let expectedDescription: string = "description";
        let expectedType: MetricType = MetricType.INT;

        let result: Metric = new Metric(expectedKey, expectedName, expectedDescription, expectedType);

        expect(result.id).to.be.eq(expectedKey);
        expect(result.description).to.be.eq(expectedDescription);
        expect(result.type).to.be.eq(expectedType);
    });

    it("should implement SelectOptionValue", () => {
        let expectedId: string = "23";
        let expectedName: string = "diufgh";

        let result: Metric = new Metric(expectedId, expectedName, "isudiusdgf");

        expect(result.label).to.be.eq(expectedName);
        expect(result.id).to.be.eq(expectedId);
    });

});