import {expect} from "chai";
import {TreeService} from "../../src/services/TreeService";
import {TreeElement} from "../../src/classes/TreeElement";

describe("TreeService", () => {

    it("should find tree node by id direct", () => {
        let id: string = "testId123";
        let tree: TreeElement = createTestTreeElement(id);

        let result = TreeService.searchTreeNode(tree, id);

        expect(result).not.to.be.null;
        expect((result as TreeElement).id).to.be.equal(tree.id);
    });

    it("should find tree node by id direct child", () => {
        let id: string = "testId123";
        let tree: TreeElement = createTestTreeElement("rootTreeId");

        tree.children.push(createTestTreeElement(id));

        let result = TreeService.searchTreeNode(tree, id);

        expect(result).not.to.be.null;
        expect((result as TreeElement).id).to.be.equal(id);
    });

    it("should find tree node by id direct child of child", () => {
        let id: string = "testId123";
        let tree: TreeElement = createTestTreeElement("rootTreeId");

        let child: TreeElement = createTestTreeElement("childTreeId");
        child.children.push(createTestTreeElement(id));

        tree.children.push(child);

        let result = TreeService.searchTreeNode(tree, id);

        expect(result).not.to.be.null;
        expect((result as TreeElement).id).to.be.equal(id);
    });

    it("should find all ids node by id direct", () => {
        let id: string = "testId123";
        let tree: TreeElement = createTestTreeElement(id);

        let result: string[] = TreeService.getAllSceneElementsRecursive(tree, id);

        expect(result.length).to.be.equal(1);
        expect(result[0]).to.be.equal(id);
    });

    it("should return all elements with direct child - request child", () => {
        let id: string = "testId123";
        let tree: TreeElement = createTestTreeElement("rootTreeId");

        tree.children.push(createTestTreeElement(id));

        let result: string[] = TreeService.getAllSceneElementsRecursive(tree, id);

        expect(result).to.be.length(1);
        expect(result[0]).to.be.equal(id);
    });

    it("should return all elements with direct child - request root", () => {
        let id: string = "testId123";
        let rootId: string = "rootId123";
        let tree: TreeElement = createTestTreeElement(rootId);

        tree.children.push(createTestTreeElement(id));

        let result: string[] = TreeService.getAllSceneElementsRecursive(tree, rootId);

        expect(result).to.be.length(2);
        expect(result[0]).to.be.equal(rootId);
    });

    it("should return all elements with direct child of child", () => {
        let id: string = "testId123";
        let rootId: string = "rootId123";
        let tree: TreeElement = createTestTreeElement(rootId);

        let child: TreeElement = createTestTreeElement("childTreeId");
        child.children.push(createTestTreeElement(id));

        tree.children.push(child);

        let result: string[] = TreeService.getAllSceneElementsRecursive(tree, rootId);

        expect(result).to.be.length(3);
        expect(result[0]).to.be.equal(rootId);
    });

    it("should find not fail if the child node does not exist", () => {
        let id: string = "testId123";
        let tree: TreeElement = createTestTreeElement(id);

        let result = TreeService.searchTreeNode(tree, "noId");

        expect(result).to.be.null;
    });

    it("should find not fail if the node does not exist in tree", () => {
        let id: string = "testId123";
        let tree: TreeElement = createTestTreeElement(id);

        tree.children.push(createTestTreeElement(id + "_1"));

        let result = TreeService.getAllSceneElementsRecursive(tree, "noId");

        expect(result).to.be.length(0);
    });
});

function createTestTreeElement(id: string, parent?: TreeElement): TreeElement {
    return new TreeElement(id, "", {}, "", "", true, parent);
}