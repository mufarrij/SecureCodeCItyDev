import { assert, expect } from "chai";
import * as Sinon from "sinon";
import AutoReloadService from "../../src/services/AutoReloadService";
import SonarQubeComponentInfoService from "../../src/services/sonarqube/SonarQubeComponentInfoService";
import { AppStatusStore } from "../../src/stores/AppStatusStore";

describe("AutoReloadService", () => {

    it("should start calling component info update", () => {
        let windowStub = Sinon.stub(window, "setInterval");

        const appStatusStore = Sinon.createStubInstance(AppStatusStore);
        appStatusStore.analysisDate = new Date();

        const componentInfoService = Sinon.createStubInstance(SonarQubeComponentInfoService);
        let underTest = new AutoReloadService(appStatusStore, componentInfoService);

        underTest.startAutoReload();

        assert(windowStub.called);

        windowStub.restore();
    });

    it("should not start component info update if analysisDate is undefined", () => {
        let windowStub = Sinon.stub(window, "setInterval");

        const appStatusStore = Sinon.createStubInstance(AppStatusStore);
        const componentInfoService = Sinon.createStubInstance(SonarQubeComponentInfoService);
        let underTest = new AutoReloadService(appStatusStore, componentInfoService);

        underTest.startAutoReload();

        assert(windowStub.notCalled);

        windowStub.restore();
    });

    it("should clear interval on multiple starts", () => {
        let windowSetStub = Sinon.stub(window, "setInterval").returns(1);
        let windowClearStub = Sinon.stub(window, "clearInterval");

        const appStatusStore = Sinon.createStubInstance(AppStatusStore);
        appStatusStore.analysisDate = new Date();

        const componentInfoService = Sinon.createStubInstance(SonarQubeComponentInfoService);
        let underTest = new AutoReloadService(appStatusStore, componentInfoService);

        underTest.startAutoReload();

        assert(windowSetStub.called);
        expect(windowClearStub.called).to.be.false;

        underTest.startAutoReload();
        assert(windowSetStub.calledTwice);
        assert(windowClearStub.called);

        windowSetStub.restore();
        windowClearStub.restore();
    });

    it("should set active after start", () => {
        let windowStub = Sinon.stub(window, "setInterval").returns(1);

        const appStatusStore = Sinon.createStubInstance(AppStatusStore);
        appStatusStore.analysisDate = new Date();

        const componentInfoService = Sinon.createStubInstance(SonarQubeComponentInfoService);

        let underTest = new AutoReloadService(appStatusStore, componentInfoService);

        expect(underTest.isActive()).to.be.false;

        underTest.startAutoReload();

        expect(underTest.isActive()).to.be.true;

        windowStub.restore();
    });

    it("should update analysis date in store if changed", (done) => {
        let clock = Sinon.useFakeTimers();

        const appStatusStore = Sinon.createStubInstance(AppStatusStore);
        appStatusStore.analysisDate = new Date();

        let expectedDate = new Date(0);

        const componentInfoService = Sinon.createStubInstance(SonarQubeComponentInfoService);
        componentInfoService.loadComponentInfo.returns(Promise.resolve({
            analysisDate: expectedDate
        }));
        let underTest = new AutoReloadService(appStatusStore, componentInfoService);

        underTest.updateAnalysisDate();

        let returnPromise: Promise<any> = Promise.resolve({});
        clock.tick(10);
        returnPromise.then(() => {
            expect(appStatusStore.analysisDate.getTime()).to.eq(expectedDate.getTime());
            done();
        }).catch((error) => done(error));
    });

    it("should not update analysis date in store if not changed", (done) => {
        let clock = Sinon.useFakeTimers();

        let expectedDate = new Date(0);

        const appStatusStore = Sinon.createStubInstance(AppStatusStore);
        appStatusStore.analysisDate = expectedDate;

        const componentInfoService = Sinon.createStubInstance(SonarQubeComponentInfoService);
        componentInfoService.loadComponentInfo.returns(Promise.resolve({
            analysisDate: new Date(0)
        }));
        let underTest = new AutoReloadService(appStatusStore, componentInfoService);

        underTest.updateAnalysisDate();

        let returnPromise: Promise<any> = Promise.resolve({});
        clock.tick(10);
        returnPromise.then(() => {
            expect(appStatusStore.analysisDate).to.eq(expectedDate);
            done();
        }).catch((error) => done(error));
    });

    it("should update analysis date in store if undefined before", (done) => {
        let clock = Sinon.useFakeTimers();

        const appStatusStore = Sinon.createStubInstance(AppStatusStore);
        let expectedDate = new Date(0);

        const componentInfoService = Sinon.createStubInstance(SonarQubeComponentInfoService);
        componentInfoService.loadComponentInfo.returns(Promise.resolve({
            analysisDate: expectedDate
        }));
        let underTest = new AutoReloadService(appStatusStore, componentInfoService);

        underTest.updateAnalysisDate();

        let returnPromise: Promise<any> = Promise.resolve({});
        clock.tick(10);
        returnPromise.then(() => {
            expect(appStatusStore.analysisDate.getTime()).to.eq(expectedDate.getTime());
            done();
        }).catch((error) => done(error));
    });
});
