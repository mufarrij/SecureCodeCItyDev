import { BackendService } from "./BackendService";

export interface SonarQubeComponentInfo {
    id: number;
    key: string;
    name: string;
    analysisDate: Date;
}

export default class SonarQubeComponentInfoService extends BackendService {

    private projectKey: string;

    constructor(projectKey: string, baseUrl?: string) {
        super(baseUrl);

        this.projectKey = projectKey;
    }

    /**
     * Only available (with the implemented parameters) from SQ version 6.4.
     *
     * Error handling should be done by the caller.
     */
    public loadComponentInfo(): Promise<SonarQubeComponentInfo> {
        return new Promise<SonarQubeComponentInfo>((resolve, reject) => {
            const params = {component: this.projectKey};
            this.callApi("/components/show", {params}).then((response) => {

                response.data.component.analysisDate = new Date(response.data.component.analysisDate);

                resolve(response.data.component);
            }).catch((error) => {
                /**
                 * Does not throw an application error because the api/component/show web-api changed in version 6.4
                 * and we currently support SQ versions > 6.3.
                 */
                reject(error.response.data);
            });
        });
    }

}