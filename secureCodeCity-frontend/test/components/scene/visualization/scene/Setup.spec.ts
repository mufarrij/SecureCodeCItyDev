import {assert, expect} from "chai";
import {Setup} from "../../../../../src/components/scene/visualization/scene/Setup";
import * as Sinon from "sinon";

describe("Setup", () => {

    it("should construct and init renderer and lights", () => {
        let container: any = {
            clientWidth: 45,
            clientHeight: 78
        };

        let renderer: any = {
            setSize: Sinon.stub(),
            setViewport: Sinon.stub(),
            setClearColor: Sinon.stub()
        };

        let sceneMock: any = {
            add: Sinon.stub()
        };

        Setup.initRenderer(renderer, sceneMock, container);

        assert(renderer.setSize.calledWith(container.clientWidth, container.clientHeight));
        assert(renderer.setViewport.calledWith(0, 0, container.clientWidth, container.clientHeight));

        expect(sceneMock.add.callCount).to.be.eq(5);
    });

});