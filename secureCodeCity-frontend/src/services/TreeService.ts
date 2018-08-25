import {TreeElement} from "../classes/TreeElement";
export class TreeService {

    public static searchTreeNode(tree: TreeElement, id: string): TreeElement | null {
        if (tree) {
            return this.searchIdInElement(id, tree);
        } else {
            return null;
        }
    }

    public static getAllSceneElementsRecursive(tree: TreeElement, id: string): string[] {
        let node = this.searchTreeNode(tree, id);
        if (node === null) {
            return [];
        } else {
            return this.privateGetAllSceneElementsRecursive(node);
        }
    }

    public static getAllFiles(node: TreeElement): TreeElement[] {
        let results: TreeElement[] = [];

        if (node.isFile) {
            results.push(node);
        }

        // children nodes
        for (const child of node.children) {
            let result = this.getAllFiles(child);
            results = results.concat(result);
        }

        return results;
    }

    private static searchIdInElement(id: string, element: TreeElement): TreeElement | null {
        if (element.id === id) {
            return element;
        }

        for (const child of element.children) {
            let result = this.searchIdInElement(id, child);
            if (result) {
                return result;
            }
        }

        return null;
    }

    private static privateGetAllSceneElementsRecursive(node: TreeElement): string[] {
        let showIds: string[] = [];
        showIds.push(node.id);

        // children nodes
        for (const child of node.children) {
            let result = this.privateGetAllSceneElementsRecursive(child);
            showIds = showIds.concat(result);
        }

        return showIds;
    }

}