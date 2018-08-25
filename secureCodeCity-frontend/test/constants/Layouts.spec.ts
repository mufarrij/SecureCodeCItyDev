import {expect} from "chai";
import {Layouts, evostreet, district} from "../../src/constants/Layouts";

describe("Layouts", () => {

    it("should provide available layouts", () => {
        expect(Layouts.availableLayouts.length).to.be.greaterThan(0);
    });

    it("should find layout by id", () => {
        expect(Layouts.getLayoutById(evostreet.id)).to.be.eq(evostreet);

        expect(Layouts.getLayoutById(district.id)).to.be.eq(district);
    });

});