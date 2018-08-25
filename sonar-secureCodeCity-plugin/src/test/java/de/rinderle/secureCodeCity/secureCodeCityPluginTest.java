package de.rinderle.secureCodeCity;

import org.junit.Test;
import org.sonar.api.Plugin;

import static org.mockito.Matchers.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;

public class secureCodeCityPluginTest {

    @Test
    public void define() {
        final secureCodeCityPlugin underTest = new secureCodeCityPlugin();

        final Plugin.Context context = mock(Plugin.Context.class);
        underTest.define(context);

        verify(context).addExtension(eq(secureCodeCityPageDefinition.class));
    }

}