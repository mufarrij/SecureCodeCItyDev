export default class WebGLDetector {

    public static isWebGLSupported(): boolean {
        try {
            let canvas = document.createElement("canvas");
            return !!((window as any).WebGLRenderingContext
                && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")));
        } catch (e) {
            return false;
        }
    }

    public static getWebGLErrorMessage(): string {
        if (this.isWebGLSupported()) {
            return "";
        }

        if (typeof window !== "undefined" && (window as any).WebGLRenderingContext) {
            return "Your graphics card does not seem to support WebGL. Find out how to get it on http://get.webgl.org/";
        } else {
            return "Your browser does not seem to support WebGL. Find out how to get it on http://get.webgl.org/.";
        }
    }

}