import {assert, expect} from "chai";
import * as Sinon from "sinon";
import SonarQubeScmService from "../../../src/services/sonarqube/SonarQubeScmService";
import {AppStatusStore} from "../../../src/stores/AppStatusStore";
import {SceneStore} from "../../../src/stores/SceneStore";
import {TreeElement} from "../../../src/classes/TreeElement";
import VisualizationOptions from "../../../src/classes/VisualizationOptions";
import {numberOfAuthorsBlameColorMetric} from "../../../src/constants/Metrics";
import LayoutProcessor from "../../../src/services/layout/LayoutProcessor";
import {CityLayoutService} from "../../../src/services/layout/CityLayoutService";

describe("CityLayoutService", () => {

    it("should call layoutProcessor", (done) => {
        let clock = Sinon.useFakeTimers();

        let testAppStatusStore: AppStatusStore = new AppStatusStore();
        let testSceneStore: SceneStore = new SceneStore();
        testSceneStore.projectData = new TreeElement("", "", {}, "", "", false);

        let scmService: any = Sinon.createStubInstance(SonarQubeScmService);
        let layoutProcessor: any = Sinon.createStubInstance(LayoutProcessor);
        let epectedShape = {};
        layoutProcessor.getIllustration.callsFake(() => {
            return {
                shapes: epectedShape
            };
        });

        let underTest: CityLayoutService =
            new CityLayoutService(testSceneStore, testAppStatusStore, scmService, layoutProcessor);

        underTest.createCity();

        let returnPromise: Promise<any> = Promise.resolve({});
        clock.tick(10);
        returnPromise.then(() => {
            assert(layoutProcessor.getIllustration.called);
            expect(testSceneStore.shapes).to.be.deep.equal(epectedShape);

            clock.tick(10);
            done();
        }).catch((error) => done(error));
    });

    it("should send load status is app state", (done) => {
        let clock = Sinon.useFakeTimers();

        let testAppStatusStore: AppStatusStore = new AppStatusStore();
        let testSceneStore: SceneStore = new SceneStore();
        testSceneStore.projectData = new TreeElement("", "", {}, "", "", false);

        let scmService: any = Sinon.createStubInstance(SonarQubeScmService);

        let spyLoad = Sinon.spy(testAppStatusStore, "load");
        let spyLoadComplete = Sinon.spy(testAppStatusStore, "loadComplete");

        let underTest: CityLayoutService =
            new CityLayoutService(testSceneStore, testAppStatusStore, scmService);

        underTest.createCity();

        let returnPromise: Promise<any> = Promise.resolve({});
        clock.tick(10);
        returnPromise.then(() => {
            assert(spyLoad.calledWith(CityLayoutService.BUILD_CITY));
            assert(spyLoadComplete.calledWith(CityLayoutService.BUILD_CITY));

            clock.tick(10);
            done();
        }).catch((error) => done(error));
    });

    it("should call measure service if numberOfAuthorsBlameColorMetric", (done) => {
        let clock = Sinon.useFakeTimers();

        let testAppStatusStore: AppStatusStore = new AppStatusStore();
        let testSceneStore: SceneStore = new SceneStore();
        testSceneStore.projectData = new TreeElement("", "", {}, "", "", false);
        testSceneStore.options = VisualizationOptions.createDefault();
        testSceneStore.options.metricColor = numberOfAuthorsBlameColorMetric;

        let scmService: any = Sinon.createStubInstance(SonarQubeScmService);
        scmService.assertScmInfoAreLoaded.callsFake(() => {
            return Promise.resolve({});
        });

        let spyLoad = Sinon.spy(testAppStatusStore, "load");
        let spyLoadComplete = Sinon.spy(testAppStatusStore, "loadComplete");

        let underTest: CityLayoutService =
            new CityLayoutService(testSceneStore, testAppStatusStore, scmService);

        underTest.createCity();

        let returnPromise: Promise<any> = Promise.resolve({});
        clock.tick(10);
        returnPromise.then(() => {
            assert(spyLoad.calledWith(CityLayoutService.BUILD_CITY));
            assert(spyLoadComplete.calledWith(CityLayoutService.BUILD_CITY));

            assert(scmService.assertScmInfoAreLoaded.called);

            clock.tick(10);
            done();
        }).catch((error) => done(error));
    });
});
