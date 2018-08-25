import { SceneColorTheme } from "../classes/SceneColorTheme";

const DEFAULT_COLOR_THEME: SceneColorTheme = {
    id: "default",
    backgroundColor: 0xffffff
};

const DARK_COLOR_THEME: SceneColorTheme = {
    id: "dark",
    backgroundColor: 0x282829
};

export {
    DEFAULT_COLOR_THEME,
    DARK_COLOR_THEME
};

export class SceneColorThemes {

    public static availableColorThemes: SceneColorTheme[] = [
        DEFAULT_COLOR_THEME,
        DARK_COLOR_THEME
    ];

    public static getColorThemeById(themeId: string): SceneColorTheme | undefined {
        if (themeId !== undefined) {
            for (const availableTheme of SceneColorThemes.availableColorThemes) {
                if (availableTheme.id === themeId) {
                    return availableTheme;
                }
            }
        }
    }
}