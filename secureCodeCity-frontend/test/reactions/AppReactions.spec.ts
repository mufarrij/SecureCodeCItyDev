import { expect } from "chai";
import { CityBuilderStore } from "../../src/stores/CityBuilderStore";
import * as Sinon from "sinon";
import SonarQubeMeasuresService from "../../src/services/sonarqube/measures/SonarQubeMeasuresService";
import AutoReloadService from "../../src/services/AutoReloadService";
import AppReactions from "../../src/reactions/AppReactions";
import { AppStatusStore } from "../../src/stores/AppStatusStore";

describe("AppReactions", () => {

    it("should auto reload on analysisDate change", () => {
        let testCityBuilderStore = new CityBuilderStore();
        let testAppStatusStore = Sinon.createStubInstance(AppStatusStore);
        const testSonarMeasuresService = Sinon.createStubInstance(SonarQubeMeasuresService);
        const testAutoReloadService = Sinon.createStubInstance(AutoReloadService);
        testAutoReloadService.isActive.returns(true);

        const reaction =
            new AppReactions(testAppStatusStore, testCityBuilderStore, testSonarMeasuresService, testAutoReloadService);

        expect(testSonarMeasuresService.loadMeasures.notCalled).to.be.true;

        testAppStatusStore.analysisDate = new Date();

        expect(reaction).not.to.be.null;
        expect(testSonarMeasuresService.loadMeasures.calledOnce).to.be.true;
    });

    it("should not auto reload on analysisDate change but auto reload service not active", () => {
        let testCityBuilderStore = new CityBuilderStore();
        let testAppStatusStore = Sinon.createStubInstance(AppStatusStore);
        const testSonarMeasuresService = Sinon.createStubInstance(SonarQubeMeasuresService);
        const testAutoReloadService = Sinon.createStubInstance(AutoReloadService);
        testAutoReloadService.isActive.returns(false);

        const reaction =
            new AppReactions(testAppStatusStore, testCityBuilderStore, testSonarMeasuresService, testAutoReloadService);

        expect(testSonarMeasuresService.loadMeasures.notCalled).to.be.true;

        testAppStatusStore.analysisDate = new Date();

        expect(reaction).not.to.be.null;
        expect(testSonarMeasuresService.loadMeasures.notCalled).to.be.true;
    });

});