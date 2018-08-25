import { expect } from "chai";
import WebGLDetector from "../../src/services/WebGLDetector";

describe("WebGLDetector", () => {

    it("webGL is not supported without mocks", () => {
        expect(WebGLDetector.isWebGLSupported()).to.be.equal(false);
        expect(WebGLDetector.getWebGLErrorMessage()).to.contain("http://get.webgl.org/");
    });

});
