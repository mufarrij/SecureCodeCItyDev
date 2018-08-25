import { expect } from "chai";
import ColorThemeSelector from "../../src/classes/ColorThemeSelector";
import { DARK_COLOR_THEME, DEFAULT_COLOR_THEME } from "../../src/constants/SceneColorThemes";

describe("ColorThemeSelector", () => {

    it("should return dark if default is current", () => {
        expect(ColorThemeSelector.toggleColorTheme(DARK_COLOR_THEME)).to.be.eq(DEFAULT_COLOR_THEME);
    });

    it("should return default if dark is current", () => {
        expect(ColorThemeSelector.toggleColorTheme(DEFAULT_COLOR_THEME)).to.be.eq(DARK_COLOR_THEME);
    });
});