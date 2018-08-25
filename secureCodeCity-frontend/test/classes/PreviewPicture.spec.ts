import {expect} from "chai";
import {PreviewPicture} from "../../src/classes/PreviewPicture";
import {defaultProfile, leakPeriod} from "../../src/constants/Profiles";
import {district, evostreet} from "../../src/constants/Layouts";

describe("PreviewPicture", () => {

    it("should know its layout", () => {
        let bgPicture: string = "/static/resources/preview/evostreet_complexity_loc_EXTINT.png";

        const underTest: PreviewPicture =
            new PreviewPicture(bgPicture, evostreet, defaultProfile);

        expect(underTest.forLayout(evostreet)).to.be.eq(true);
        expect(underTest.forLayout(district)).to.be.eq(false);
    });

    it("should know its profile", () => {
        let bgPicture: string = "/static/resources/preview/evostreet_complexity_loc_EXTINT.png";

        const underTest: PreviewPicture =
            new PreviewPicture(bgPicture, evostreet, defaultProfile);

        expect(underTest.forProfile(defaultProfile)).to.be.eq(true);
        expect(underTest.forProfile(leakPeriod)).to.be.eq(false);
    });

});
