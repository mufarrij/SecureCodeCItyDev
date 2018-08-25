import {expect} from "chai";
import StatusAction from "../../../src/classes/status/StatusAction";

describe("StatusAction", () => {

    it("should construct minimal action", () => {
        let expectedKey: string = "23";
        let expectedDescription: string = "diufgh";

        let result: StatusAction = new TestStatusAction(expectedKey, expectedDescription);

        expect(result.key).to.be.eq(expectedKey);
        expect(result.description).to.be.eq(expectedDescription);
    });

});

class TestStatusAction extends StatusAction {

    constructor(key: string, description: string) {
        super(key, description);
    }

}