import {SoftVis3dShape} from "../../domain/secureCodeCityShape";
import {Rectangle} from "../../domain/Rectangle";
import {Offset} from "../../../../services/HtmlDom";

export default class SceneObjectCalculator {

    public static findMaxDimension(shapes: SoftVis3dShape[]): Rectangle {
        let length: number = 0;
        let width: number = 0;

        for (let shape of shapes) {
            if (shape.dimensions.length > length) {
                length = shape.dimensions.length;
            }
            if (shape.dimensions.width > width) {
                width = shape.dimensions.width;
            }
        }

        return new Rectangle(width, length);
    }

    public static calculateDimensionOnResize(sidebarWidth: number, topbarHeight: number, appOffset: Offset,
                                             sonarFooter: HTMLElement | null, appWidth: number): Rectangle {
        const sceneBoarderWidth = 1;
        const sonarFooterHeight = sonarFooter ? sonarFooter.offsetHeight : SceneObjectCalculator.DEFAULT_FOOTER_HEIGHT;
        const appMaxHeight = window.innerHeight - sonarFooterHeight - appOffset.top - (2 * sceneBoarderWidth);
        const appComputedWidth = appWidth - 2 * sceneBoarderWidth;

        let width: number = appComputedWidth - sidebarWidth - 1;
        let height: number = appMaxHeight - topbarHeight;

        return new Rectangle(width, height);
    }

    private static DEFAULT_FOOTER_HEIGHT: number = 11;

}