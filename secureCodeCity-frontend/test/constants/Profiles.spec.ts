import {expect} from "chai";
import {Profiles, custom, defaultProfile} from "../../src/constants/Profiles";

describe("Profiles", () => {

    it("should provide available profiles", () => {
        expect(Profiles.availableProfiles.length).to.be.greaterThan(0);
    });

    it("should find profile by id", () => {
        expect(Profiles.getAvailableProfileById(custom.id)).to.be.eq(custom);

        expect(Profiles.getAvailableProfileById(defaultProfile.id)).to.be.eq(defaultProfile);
    });

});