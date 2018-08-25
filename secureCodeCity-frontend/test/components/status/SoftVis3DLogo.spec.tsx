import * as React from "react";
import {expect} from "chai";
import {shallow} from "enzyme";
import SoftVis3DLogo from "../../../src/components/status/secureCodeCityLogo";

describe("<SoftVis3DLogo/>", () => {

    it("should draw logo with text", () => {
        const softvis3d = shallow(
            <SoftVis3DLogo />
        );

        expect(softvis3d.html()).to.include("SecureCode");
        expect(softvis3d.html()).to.include("City");
    });

});