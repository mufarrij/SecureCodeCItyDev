import {expect} from "chai";
import LoadAction from "../../../src/classes/status/LoadAction";

describe("LoadAction", () => {

    it("should construct minimal load action", () => {
        let expectedKey: string = "23";
        let expectedDescription: string = "diufgh";

        let result: LoadAction = new LoadAction(expectedKey, expectedDescription);

        expect(result.key).to.be.eq(expectedKey);
        expect(result.description).to.be.eq(expectedDescription);
    });

    it("should save status", () => {
        let expectedKey: string = "23";
        let expectedDescription: string = "diufgh";

        let result: LoadAction = new LoadAction(expectedKey, expectedDescription);

        let max = 200;
        let current = 56;
        result.setStatus(max, current);

        expect(result.max).to.be.eq(max);
        expect(result.current).to.be.eq(current);
    });

    it("should know if a status was set or not", () => {
        let expectedKey: string = "23";
        let expectedDescription: string = "diufgh";

        let result: LoadAction = new LoadAction(expectedKey, expectedDescription);

        expect(result.hasStatus()).to.be.false;

        let max = 200;
        let current = 56;
        result.setStatus(max, current);

        expect(result.hasStatus()).to.be.true;
    });

    it("should calc percentage", () => {
        let expectedKey: string = "23";
        let expectedDescription: string = "diufgh";

        let result: LoadAction = new LoadAction(expectedKey, expectedDescription);

        let limit = 200;
        let current = 56;
        result.setStatus(limit, current);

        expect(result.percent).to.be.eq(28);

        limit = 200;
        current = 0;
        result.setStatus(limit, current);

        expect(result.percent).to.be.eq(0);

        limit = 200;
        current = 200;
        result.setStatus(limit, current);

        expect(result.percent).to.be.eq(100);
    });
});