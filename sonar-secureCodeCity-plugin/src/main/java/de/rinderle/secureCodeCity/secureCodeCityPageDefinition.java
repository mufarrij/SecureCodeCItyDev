package de.rinderle.secureCodeCity;

import org.sonar.api.web.page.Context;
import org.sonar.api.web.page.Page;
import org.sonar.api.web.page.PageDefinition;

import static org.sonar.api.web.page.Page.Scope.COMPONENT;

public class secureCodeCityPageDefinition implements PageDefinition {

  private static final String PLUGIN_KEY = "softvis3d";
  private static final String PLUGIN_NAME = "SecureCodeCity Viewer";

  private static final String PLUGIN_OVERVIEW = "overview_page";

  @Override
  public void define(Context context) {
    context
        .addPage(Page.builder(PLUGIN_KEY + '/' + PLUGIN_OVERVIEW).setName(PLUGIN_NAME).setScope
            (COMPONENT).build());
  }
}
