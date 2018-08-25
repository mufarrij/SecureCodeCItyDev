import {expect} from "chai";
import {Scales, EXPONENTIAL, LOGARITHMIC} from "../../src/constants/Scales";

describe("Scales", () => {

    it("should provide available scales", () => {
        expect(Scales.availableScales.length).to.be.greaterThan(0);
    });

    it("should find scale by id", () => {
        expect(Scales.getScaleById(EXPONENTIAL.id)).to.be.eq(EXPONENTIAL);

        expect(Scales.getScaleById(LOGARITHMIC.id)).to.be.eq(LOGARITHMIC);
    });

});