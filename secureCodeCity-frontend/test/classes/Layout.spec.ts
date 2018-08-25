import {expect} from "chai";
import Layout from "../../src/classes/Layout";

describe("Layout", () => {

    it("should construct layout", () => {

        let id = "id";
        let name = "name";
        let description = "description";
        let result: Layout = new Layout(id, name, description);

        expect(result.id).to.be.eq(id);
        expect(result.label).to.be.eq(name);
        expect(result.description).to.be.eq(description);
    });

    it("should implement selectOptionValue", () => {
        let id = "id";
        let name = "name";
        let description = "description";
        let result: Layout = new Layout(id, name, description);

        expect(result.label).to.be.eq(name);
        expect(result.id).to.be.eq(id);
    });

});