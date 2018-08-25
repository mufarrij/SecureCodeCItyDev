import {expect} from "chai";
import {ColorMetrics, coverageColorMetric, packageNameColorMetric} from "../../src/constants/Metrics";

describe("Metrics", () => {

    it("should provide available color metrics", () => {
        expect(ColorMetrics.availableColorMetrics.length).to.be.greaterThan(0);
    });

    it("should find layout by id", () => {
        expect(ColorMetrics.getColorMetricById(coverageColorMetric.id)).to.be.eq(coverageColorMetric);

        expect(ColorMetrics.getColorMetricById(packageNameColorMetric.id)).to.be.eq(packageNameColorMetric);
    });

});