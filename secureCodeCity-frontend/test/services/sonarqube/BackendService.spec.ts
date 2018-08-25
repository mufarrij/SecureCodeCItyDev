import {assert} from "chai";
import {BackendService} from "../../../src/services/sonarqube/BackendService";
import * as Sinon from "sinon";

import axios from "axios";

describe("BackendService", () => {

    it("BackendService should call axios library", () => {

        let underTest: BackendService = new TestService();

        let axiosStub = Sinon.stub(axios, "get");

        const route = "/zusfd/";
        underTest.callApi(route);

        assert(axiosStub.calledWith("/api" + route, {}));
        axiosStub.restore();
    });

    it("BackendService should call axios library with baseUrl", () => {

        let baseUrl = "iusdgzfuzgdf/";
        let underTest: BackendService = new TestService(baseUrl);

        let axiosStub = Sinon.stub(axios, "get");

        const route = "/zusfd/";
        underTest.callApi(route);

        assert(axiosStub.calledWith(baseUrl + "/api" + route, {}));
        axiosStub.restore();
    });

});

class TestService extends BackendService {
    constructor(apiUrl?: string) {
        super(apiUrl);
    }
}