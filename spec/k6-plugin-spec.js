'use babel';

import K6Plugin from '../lib/k6-plugin';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('K6Plugin', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('k6-plugin');
  });

  describe('when the k6-plugin:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.k6-plugin')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'k6-plugin:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.k6-plugin')).toExist();

        let k6PluginElement = workspaceElement.querySelector('.k6-plugin');
        expect(k6PluginElement).toExist();

        let k6PluginPanel = atom.workspace.panelForItem(k6PluginElement);
        expect(k6PluginPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'k6-plugin:toggle');
        expect(k6PluginPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.k6-plugin')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'k6-plugin:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let k6PluginElement = workspaceElement.querySelector('.k6-plugin');
        expect(k6PluginElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'k6-plugin:toggle');
        expect(k6PluginElement).not.toBeVisible();
      });
    });
  });
});
