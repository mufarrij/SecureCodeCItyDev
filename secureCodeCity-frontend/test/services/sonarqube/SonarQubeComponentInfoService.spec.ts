import { assert, expect } from "chai";
import * as Sinon from "sinon";
import SonarQubeComponentInfoService from "../../../src/services/sonarqube/SonarQubeComponentInfoService";

describe("SonarQubeComponentInfoService", () => {

    it("should call backend and return component info", (done) => {
        let apiUrl: string = "urlsihshoif";
        let projectKey = "iuzsgdfus";
        let underTest: SonarQubeComponentInfoService = new SonarQubeComponentInfoService(projectKey, apiUrl);

        let expectedId = "0844b558-2051-45a6-9970-e3f53fc86f09";
        let expectedKey = "de.rinderle.softvis3d:softvis3d";
        let expectedName = "softvis3d";

        Sinon.stub(underTest, "callApi").callsFake(() => {
            return Promise.resolve({
                data: {
                    component: {
                        organization: "default-organization",
                        id: expectedId,
                        key: expectedKey,
                        name: expectedName,
                        qualifier: "TRK",
                        analysisDate: "2017-11-14T22:08:39+0100",
                        leakPeriodDate: "2017-08-15T16:23:51+0200",
                        version: "1.0.1-SNAPSHOT"
                    }
                }
            });
        });

        underTest.loadComponentInfo().then((result) => {
            // check result property is of type Date
            expect(result.analysisDate.getTime()).to.be.eq(1510693719000);

            expect(result.id).to.be.eq(expectedId);
            expect(result.key).to.be.eq(expectedKey);
            expect(result.name).to.be.eq(expectedName);

            done();
        }).catch((error) => {
            assert.isNotOk(error, "Promise error");
            done();
        });
    });

    it("should react on errors", (done) => {
        let apiUrl: string = "urlsihshoif";
        let projectKey = "iuzsgdfus";
        let underTest: SonarQubeComponentInfoService = new SonarQubeComponentInfoService(projectKey,
            apiUrl);

        Sinon.stub(underTest, "callApi").callsFake(() => {
            return Promise.reject({
                response: {
                    data: "not working"
                }
            });
        });

        underTest.loadComponentInfo().then(() => {
            assert.isNotOk("Should go to catch clause instead of then");

            done();
        }).catch((error) => {
            expect(error).to.be.eq("not working");

            done();
        });
    });

});