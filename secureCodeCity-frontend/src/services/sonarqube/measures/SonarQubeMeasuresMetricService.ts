import {CityBuilderStore} from "../../../stores/CityBuilderStore";
import {noColorMetric, numberOfAuthorsBlameColorMetric, packageNameColorMetric} from "../../../constants/Metrics";

export default class SonarQubeMeasuresMetricService {

    private cityBuilderStore: CityBuilderStore;

    constructor(cityBuilderStore: CityBuilderStore) {
        this.cityBuilderStore = cityBuilderStore;
    }

    public getMetricRequestValues(): string {
        let result: Set<string> = new Set();
        result.add(this.cityBuilderStore.profile.footprintMetricId);
        result.add(this.cityBuilderStore.profile.heightMetricId);

        for (const colorMetric of this.cityBuilderStore.colorMetrics.keys) {
            if (colorMetric !== noColorMetric.id && colorMetric !== packageNameColorMetric.id
                && colorMetric !== numberOfAuthorsBlameColorMetric.id) {
                result.add(colorMetric);
            }
        }

        return Array.from(result).join(",");
    }
}