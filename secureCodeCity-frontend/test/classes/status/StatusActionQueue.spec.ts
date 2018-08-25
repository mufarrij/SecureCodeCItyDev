import {assert, expect} from "chai";
import StatusAction from "../../../src/classes/status/StatusAction";
import StatusActionQueue from "../../../src/classes/status/StatusActionQueue";

describe("StatusActionQueue", () => {

    it("should do add remove and isEmpty", () => {
        let underTest: StatusActionQueue<TestStatusAction> = new StatusActionQueue();
        let testAction = new TestStatusAction("key", "testEvent");

        expect(underTest.isEmpty).to.be.equal(true);

        underTest.add(testAction);
        expect(underTest.isEmpty).to.be.equal(false);

        underTest.remove(testAction);
        expect(underTest.isEmpty).to.be.equal(true);
    });

    it("should update and return new instance", () => {
        let underTest: StatusActionQueue<TestStatusAction> = new StatusActionQueue();
        let testAction: TestStatusAction = new TestStatusAction("key", "testEvent");

        underTest.add(testAction);
        let result = underTest.update(testAction);
        assert(result !== underTest);
        assert(!result.isEmpty);
    });

    it("should work with multiple events", () => {
        let underTest: StatusActionQueue<TestStatusAction> = new StatusActionQueue();
        let testAction = new TestStatusAction("key", "testEvent");
        let testAction2 = new TestStatusAction("key2", "testEvent");

        underTest.add(testAction);
        underTest.add(testAction2);
        underTest.remove(testAction);
        expect(underTest.isEmpty).to.be.equal(false);
        underTest.remove(testAction2);
        expect(underTest.isEmpty).to.be.equal(true);
    });

    it("should be able to iterate", () => {
        const underTest: StatusActionQueue<TestStatusAction> = new StatusActionQueue();
        let testAction = new TestStatusAction("key", "testEvent");
        let testAction2 = new TestStatusAction("key2", "testEvent");

        underTest.add(testAction);
        underTest.add(testAction2);

        let result: TestStatusAction[] = [];
        for (let queueElement of underTest) {
            result.push(queueElement);
        }

        expect(result.length).to.be.eq(2);

        result = [];
        for (let queueElement of underTest) {
            result.push(queueElement);
        }

        expect(result.length).to.be.eq(2);
    });

});

class TestStatusAction extends StatusAction {

    constructor(key: string, description: string) {
        super(key, description);
    }

}