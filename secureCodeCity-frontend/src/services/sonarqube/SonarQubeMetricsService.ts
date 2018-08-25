import {BackendService} from "./BackendService";
import {AppStatusStore} from "../../stores/AppStatusStore";
import {CityBuilderStore} from "../../stores/CityBuilderStore";
import Metric from "../../classes/Metric";
import LoadAction from "../../classes/status/LoadAction";
import ErrorAction from "../../classes/status/ErrorAction";
import {MetricType} from "../../classes/MetricType";

export interface SonarQubeApiMetric {
    id: number;
    key: string;
    type: MetricType;
    name: string;
    description: string;
    hidden?: boolean;
}

export default class SonarQubeMetricsService extends BackendService {
    public static LOAD_METRICS: LoadAction = new LoadAction("SONAR_LOAD_METRICS", "Request metric definitions from SonarQube");
    private static LOAD_METRICS_ERROR_KEY: string = "LOAD_METRICS_ERROR";

    private appStatusStore: AppStatusStore;
    private cityBuilderStore: CityBuilderStore;

    constructor(appStatusStore: AppStatusStore, cityBuilderStore: CityBuilderStore, baseUrl?: string) {
        super(baseUrl);

        this.appStatusStore = appStatusStore;
        this.cityBuilderStore = cityBuilderStore;
    }

    public loadAvailableMetrics(page = 1): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            if (page === 1) {
                this.appStatusStore.load(SonarQubeMetricsService.LOAD_METRICS);
            }

            const params = {f: "name,description", p: page};
            this.callApi("/metrics/search", { params }).then((response) => {
                const metrics: Metric[] = (response.data.metrics as SonarQubeApiMetric[])
                    .filter((c) => this.shouldMetricBeFiltered(c.type))
                    .filter((c) => c.hidden === true || c.hidden === undefined || c.hidden === null)
                    .map((c) => this.createMetric(c));

                this.cityBuilderStore.genericMetrics.addMetrics(metrics);

                const metricsPosition = response.data.p * response.data.ps;
                if (metricsPosition < response.data.total) {
                    return this.loadAvailableMetrics(page + 1).then(() => {
                        resolve();
                    }).catch(() => {
                        reject();
                    });
                } else {
                    this.appStatusStore.loadComplete(SonarQubeMetricsService.LOAD_METRICS);
                    resolve();
                }
            }).catch(() => {
                this.appStatusStore.error(
                    new ErrorAction(SonarQubeMetricsService.LOAD_METRICS_ERROR_KEY,
                        "SonarQube metric API is not available or responding: ",
                        "Try again", () => {
                            location.reload();
                        }));
                this.appStatusStore.loadComplete(SonarQubeMetricsService.LOAD_METRICS);
                reject();
            });
        });
    }

    private createMetric(sonarQubeMetric: SonarQubeApiMetric): Metric {
        return new Metric(sonarQubeMetric.key, sonarQubeMetric.name, sonarQubeMetric.description, sonarQubeMetric.type);
    }

    private shouldMetricBeFiltered(type: MetricType): boolean {
        return type === MetricType.INT || type === MetricType.FLOAT || type === MetricType.PERCENT
            || type === MetricType.MILLISEC || type === MetricType.RATING || type === MetricType.WORK_DUR;
    }

}