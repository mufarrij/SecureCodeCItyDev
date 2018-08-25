import {expect} from "chai";
import StatusAction from "../../../src/classes/status/StatusAction";
import ErrorAction from "../../../src/classes/status/ErrorAction";

describe("ErrorAction", () => {

    it("should construct minimal error action", () => {
        let expectedKey: string = "23";
        let expectedDescription: string = "diufgh";

        let result: StatusAction = new ErrorAction(expectedKey, expectedDescription, "", () => undefined);

        expect(result.key).to.be.eq(expectedKey);
        expect(result.description).to.be.eq(expectedDescription);
    });

});