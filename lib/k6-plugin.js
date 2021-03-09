'use babel';

import K6PluginView from './k6-plugin-view';
import { CompositeDisposable } from 'atom';

export default {

  k6PluginView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.k6PluginView = new K6PluginView(state.k6PluginViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.k6PluginView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'k6-plugin:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.k6PluginView.destroy();
  },

  serialize() {
    return {
      k6PluginViewState: this.k6PluginView.serialize()
    };
  },

  toggle() {
    console.log('K6Plugin was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
