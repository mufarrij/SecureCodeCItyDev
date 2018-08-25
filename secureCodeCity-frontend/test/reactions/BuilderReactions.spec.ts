import { expect } from "chai";
import { CityBuilderStore } from "../../src/stores/CityBuilderStore";
import BuilderReactions from "../../src/reactions/BuilderReactions";
import * as Sinon from "sinon";
import SonarQubeMeasuresService from "../../src/services/sonarqube/measures/SonarQubeMeasuresService";
import AutoReloadService from "../../src/services/AutoReloadService";

describe("BuilderReactions", () => {

    it("should initiate build process", () => {
        let testCityBuilderStore = new CityBuilderStore();
        const testSonarService = Sinon.createStubInstance(SonarQubeMeasuresService);
        const testAutoReloadService = Sinon.createStubInstance(AutoReloadService);
        const reactionRegister =
            new BuilderReactions(testCityBuilderStore, testSonarService, testAutoReloadService);

        expect(testSonarService.loadMeasures.notCalled).to.be.true;

        testCityBuilderStore.initiateBuildProcess = true;

        expect(reactionRegister).not.to.be.null;
        expect(testCityBuilderStore.initiateBuildProcess).to.be.false;
        expect(testSonarService.loadMeasures.calledOnce).to.be.true;
        expect(testAutoReloadService.startAutoReload.calledOnce).to.be.true;
    });

});