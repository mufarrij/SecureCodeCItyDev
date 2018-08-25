export default class SonarQubeApiScm {

    public readonly lineNumber: number;
    public readonly authorName: string;
    public readonly lastCommit: string;
    public readonly lastCommitRevision: string;

    constructor(lineNumber: number, authorName: string, lastCommit: string, lastCommitRevision: string) {
        this.lineNumber = lineNumber;
        this.authorName = authorName;
        this.lastCommit = lastCommit;
        this.lastCommitRevision = lastCommitRevision;
    }
}