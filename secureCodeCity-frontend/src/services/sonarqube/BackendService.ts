import axios, {AxiosPromise, AxiosRequestConfig} from "axios";

export abstract class BackendService {

    private apiUrl: string;

    constructor(baseUrl?: string) {
        this.apiUrl = (baseUrl || "") + "/api";
    }

    public callApi(route: string, options: AxiosRequestConfig = {}): AxiosPromise {
        return axios.get(this.apiUrl + route, options);
    }

}