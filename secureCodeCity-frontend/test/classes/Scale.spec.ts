import {expect} from "chai";
import Scale from "../../src/classes/Scale";

describe("Scale", () => {

    it("should implement SelectOptionValue", () => {
        let expectedId: string = "23";
        let expectedLabel: string = "INT";
        let expectedDescription: string = "ksudfhiusdhfs";

        let result: Scale = new Scale(expectedId, expectedLabel, expectedDescription);

        expect(result.label).to.be.eq(expectedLabel);
        expect(result.id).to.be.eq(expectedId);
        expect(result.description).to.be.eq(expectedDescription);
    });

});
