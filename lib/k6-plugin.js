'use babel';

import K6PluginView from './k6-plugin-view';
import { CompositeDisposable } from 'atom';
import { execSync } from 'child_process';
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
      'k6-plugin:toggle': () => this.k6()
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


  k6() {
  const util = require('util');
  let editor
  if (this.modalPanel.isVisible()) {
    this.modalPanel.hide();
  } else {
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getText()
      let path = editor.getPath()
      console.log(path)
      const { spawnSync } = require('child_process');
  // import { execSync } from 'child_process';  // replace ^ if using ES modules
      const output = spawnSync('k6', ['run', path], { encoding : 'utf8' });
      //this.k6PluginView.viewResults(out);
      //this.modalPanel.show();
      this.k6PluginView.viewResults(output.stdout);
      this.modalPanel.show();
    }

    //out.stdout.on("data", data => {
    //  return (data);
    //  });
  }
}

};
