// import {assert} from "chai";
// import * as Sinon from "sinon";
// import SoftVis3dScene from "../../../../../src/components/scene/visualization/scene/SoftVis3dScene";
// import {Setup} from "../../../../../src/components/scene/visualization/scene/Setup";
// import {HtmlDom, Offset} from "../../../../../src/services/HtmlDom";

describe("SoftVis3dScene", () => {

    /**
     * The component SoftVis3dScene has currently to many dependencies for a good unit test.
     */

    // let documentCreateStub: any;
    // let setupInitStub: any;
    // let rendererStub: any;
    // let orbitControlsStub: any = {};
    // let htmlDomWidthStub: any;
    // let htmlDomHeightStub: any;
    // let offset: Offset;
    // let htmlDomOffsetStub: any;
    // let stub: any;
    //
    // beforeEach(function() {
    //     let container = {
    //         width: 1,
    //         height: 2
    //     };
    //
    //     documentCreateStub = Sinon.stub(document, "getElementById").returns(container);
    //     setupInitStub = Sinon.stub(Setup, "initRenderer").returns(container);
    //
    //     const fn = (value: any) => value;
    //     const spy = Sinon.spy(fn);
    //
    //     rendererStub = {
    //         setSize: spy,
    //         setViewport: spy,
    //         render: spy
    //     };
    //
    //     htmlDomWidthStub = Sinon.stub(HtmlDom, "getWidthById");
    //     htmlDomHeightStub = Sinon.stub(HtmlDom, "getHeightById");
    //     offset = {
    //         top: 2,
    //         left: 4
    //     };
    //     htmlDomOffsetStub = Sinon.stub(HtmlDom, "getOffsetsById").returns(offset);
    //
    //     window = Object.assign(window, {
    //         requestAnimationFrame: Function
    //     });
    //     stub = Sinon.stub(window, "requestAnimationFrame");
    // });
    //
    // afterEach(function() {
    //     documentCreateStub.restore();
    //     setupInitStub.restore();
    //     htmlDomWidthStub.restore();
    //     htmlDomHeightStub.restore();
    //     htmlDomOffsetStub.restore();
    //     stub.restore();
    // });
    //
    // it("should init rendere on construction", () => {
    //     new SoftVis3dScene(rendererStub, orbitControlsStub);
    //
    //     assert(setupInitStub.called);
    // });
    //
    // it("should init rendere on construction", () => {
    //     new SoftVis3dScene(rendererStub, orbitControlsStub);
    //
    //     assert(setupInitStub.called);
    // });
});