import SonarQubeApiScm from "./SonarQubeApiScm";
export default class ScmCalculator {

    public static calcNumberOfAuthors(measures: SonarQubeApiScm[]): number {
        let groupByAuthorName = this.groupByAuthorName(measures);
        return groupByAuthorName.size;
    }

    public static createMetric(measure: string[]): SonarQubeApiScm {
        return new SonarQubeApiScm(+measure[0], measure[1], measure[2], measure[3]);
    }

    private static groupByAuthorName(measures: SonarQubeApiScm[]) {
        const map = new Map();
        measures.forEach((item) => {
            const key = item.authorName;
            if (!map.has(key)) {
                map.set(key, [item]);
            } else {
                map.get(key).push(item);
            }
        });
        return map;
    }
}