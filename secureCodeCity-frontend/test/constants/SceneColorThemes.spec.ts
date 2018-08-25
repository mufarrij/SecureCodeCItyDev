import { expect } from "chai";
import { DARK_COLOR_THEME, DEFAULT_COLOR_THEME, SceneColorThemes } from "../../src/constants/SceneColorThemes";

describe("SceneColorThemes", () => {

    it("should provide available layouts", () => {
        expect(SceneColorThemes.availableColorThemes.length).to.be.greaterThan(0);
    });

    it("should find layout by id", () => {
        expect(SceneColorThemes.getColorThemeById(DEFAULT_COLOR_THEME.id)).to.be.eq(DEFAULT_COLOR_THEME);

        expect(SceneColorThemes.getColorThemeById(DARK_COLOR_THEME.id)).to.be.eq(DARK_COLOR_THEME);
    });

});