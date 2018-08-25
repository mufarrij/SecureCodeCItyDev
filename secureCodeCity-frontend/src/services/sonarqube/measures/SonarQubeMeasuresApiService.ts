import {BackendService} from "../BackendService";
import {SonarQubeMeasurePagingResponse, SonarQubeMeasureResponse, SonarQubeQualifier} from "./SonarQubeMeasureResponse";
import {AppConfiguration} from "../../../classes/AppConfiguration";

export default class SonarQubeMeasuresApiService extends BackendService {

    constructor(config: AppConfiguration) {
        super(config.baseUrl);
    }

    public loadMeasures(baseComponentKey: string, metricKeys: string, strategy: string, qualifiers: SonarQubeQualifier[],
                        page: number = 1): Promise<SonarQubeMeasureResponse> {
        return new Promise<SonarQubeMeasureResponse>((resolve, reject) => {
            const params = {
                baseComponentKey,
                p: page,
                metricKeys,
                strategy,
                qualifiers: Array.from(qualifiers).join(","),
                s: "path",
                ps: 500
            };

            this.callApi("/measures/component_tree", {params}).then((response) => {
                let result: SonarQubeMeasurePagingResponse = response.data;
                let allResults: SonarQubeMeasureResponse = {
                    baseComponent: result.baseComponent,
                    components: result.components
                };

                const position = result.paging.pageIndex * result.paging.pageSize;
                if (position < result.paging.total) {
                    return this.loadMeasures(baseComponentKey, metricKeys, strategy, qualifiers, page + 1).then((resultSecond) => {
                        allResults.components = allResults.components.concat(resultSecond.components);
                        resolve(allResults);
                    }).catch((error) => {
                        reject(error);
                    });
                } else {
                    resolve(allResults);
                }
            }).catch((error) => {
                reject(error);
            });
        });
    }

}