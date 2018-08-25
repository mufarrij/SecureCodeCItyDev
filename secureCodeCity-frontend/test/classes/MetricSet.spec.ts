import {expect} from "chai";
import Metric from "../../src/classes/Metric";
import MetricSet from "../../src/classes/MetricSet";

describe("MetricSet", () => {

    it("should add metrics", () => {
        let initialMetrics: Metric[] = [];
        initialMetrics.push(new Metric("123", "siuhf", ""));

        let result: MetricSet = new MetricSet(initialMetrics);
        expect(result.keys.length).to.be.eq(1);

        let additionalMetrics: Metric[] = [];
        additionalMetrics.push(new Metric("123", "siuhf", ""));
        result.addMetrics(additionalMetrics);

        expect(result.keys.length).to.be.eq(2);
    });

    it("should return metric keys", () => {
        let initialMetrics: Metric[] = [];
        initialMetrics.push(new Metric("123", "siuhf", ""));
        initialMetrics.push(new Metric("321", "siuhf", ""));

        let result: MetricSet = new MetricSet(initialMetrics);

        expect(result.keys.length).to.be.eq(2);
        expect(result.keys[0]).to.be.eq("123");
        expect(result.keys[1]).to.be.eq("321");
    });

    it("should return select options", () => {
        let initialMetrics: Metric[] = [];
        initialMetrics.push(new Metric("123", "siuhf", ""));
        initialMetrics.push(new Metric("321", "iojsiodf", ""));

        let result: MetricSet = new MetricSet(initialMetrics);

        expect(result.asSelectOptions.length).to.be.eq(2);
        expect(result.asSelectOptions[0].label).to.be.eq("siuhf");
        expect(result.asSelectOptions[1].label).to.be.eq("iojsiodf");
    });

    it("should return metric by id", () => {
        let initialMetrics: Metric[] = [];
        initialMetrics.push(new Metric("123", "siuhf", ""));

        let expectedKey: string = "321";
        let expectedMetric: Metric = new Metric(expectedKey, "siuhf", "");
        initialMetrics.push(expectedMetric);

        let result: MetricSet = new MetricSet(initialMetrics);

        expect(result.getMetricByKey(expectedKey)).to.be.eq(expectedMetric);
    });

    it("should return metric by id but not found", () => {
        let initialMetrics: Metric[] = [];
        initialMetrics.push(new Metric("123", "siuhf", ""));

        let result: MetricSet = new MetricSet(initialMetrics);

        expect(result.getMetricByKey("not known")).to.be.undefined;
    });
});