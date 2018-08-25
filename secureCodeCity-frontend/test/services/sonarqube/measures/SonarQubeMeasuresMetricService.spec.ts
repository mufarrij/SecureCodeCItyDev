import {expect} from "chai";
import SonarQubeMeasuresMetricService from "../../../../src/services/sonarqube/measures/SonarQubeMeasuresMetricService";
import {CityBuilderStore} from "../../../../src/stores/CityBuilderStore";

describe("SonarQubeMeasuresMetricService", () => {

    it("should call backend and load measures", () => {
        let cityBuilderStore: CityBuilderStore = new CityBuilderStore();

        let underTest: SonarQubeMeasuresMetricService = new SonarQubeMeasuresMetricService(cityBuilderStore);

        let result = underTest.getMetricRequestValues();

        expect(result).to.be.eq("complexity,ncloc,coverage,violations,new_violations,open_issues");
    });

});