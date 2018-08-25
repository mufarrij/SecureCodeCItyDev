package de.rinderle.secureCodeCity;

import org.sonar.api.Plugin;

/**
 * This class is the entry point for all extensions.
 */
public final class secureCodeCityPlugin implements Plugin {

  @Override
  public void define(Context context) {
    context.addExtension(secureCodeCityPageDefinition.class);
  }

}
