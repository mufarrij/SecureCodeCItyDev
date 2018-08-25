import {assert, expect} from "chai";
import * as Sinon from "sinon";
import {SceneStore} from "../../src/stores/SceneStore";
import {CityBuilderStore} from "../../src/stores/CityBuilderStore";
import SceneReactions from "../../src/reactions/SceneReactions";
import {complexityColorMetric} from "../../src/constants/Metrics";
import {TreeElement} from "../../src/classes/TreeElement";
import {CityLayoutService} from "../../src/services/layout/CityLayoutService";
import VisualizationOptions from "../../src/classes/VisualizationOptions";

describe("SceneReactions", () => {

    it("should change city builder color metric setting if changed in the scene", () => {
        let testSceneStore = Sinon.createStubInstance(SceneStore);
        let testCityBuilderStore = Sinon.createStubInstance(CityBuilderStore);
        let testLegayConnector = Sinon.createStubInstance(CityLayoutService);
        testSceneStore.options = VisualizationOptions.createDefault();

        let reactions = new SceneReactions(testSceneStore, testCityBuilderStore, testLegayConnector);

        testSceneStore.options.metricColor = complexityColorMetric;

        expect(reactions).not.to.be.null;
        expect(testCityBuilderStore.metricColor).to.be.eq(complexityColorMetric);
    });

    it("should rebuild city if color metric changed", () => {
        let testSceneStore = Sinon.createStubInstance(SceneStore);
        let testCityBuilderStore = Sinon.createStubInstance(CityBuilderStore);
        let testLegayConnector = Sinon.createStubInstance(CityLayoutService);

        testSceneStore.options = VisualizationOptions.createDefault();

        let reactions = new SceneReactions(testSceneStore, testCityBuilderStore, testLegayConnector);

        testSceneStore.shapes = [];
        testSceneStore.options.metricColor = complexityColorMetric;

        assert(testLegayConnector.createCity.calledOnce);
        expect(reactions).not.to.be.null;
    });

    it("should convert backend data to threeJS shapes", () => {
        let testSceneStore = Sinon.createStubInstance(SceneStore);
        let testCityBuilderStore = Sinon.createStubInstance(CityBuilderStore);
        let testLegayConnector = Sinon.createStubInstance(CityLayoutService);

        testSceneStore.options = VisualizationOptions.createDefault();

        let reactions = new SceneReactions(testSceneStore, testCityBuilderStore, testLegayConnector);

        testSceneStore.projectData = new TreeElement("", "", {}, "", "", false);

        assert(testLegayConnector.createCity.calledOnce);
        expect(reactions).not.to.be.null;
    });

});