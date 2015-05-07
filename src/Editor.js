/** @jsx React.DOM */
var React = require('react');
var Ace = require('brace');
var TabsStore = require('./TabsStore');
var TabActions = require('./Actions');
var fs = require('fs');

require('brace/mode/pgsql');
require('brace/theme/chrome');
require('brace/theme/idle_fingers');
require('brace/keybinding/vim');

var Editor = React.createClass({

    getInitialState: function(){
        return {
            theme: TabsStore.getEditorTheme(), 
            mode: TabsStore.getEditorMode()};
    },

    componentDidMount: function(){
        this.editor = Ace.edit(this.props.name);
        this.editor.getSession().setMode('ace/mode/pgsql');
        this.editor.setTheme('ace/theme/' + this.state.theme);
        this.editor.setKeyboardHandler(this.state.mode);
        TabsStore.bind('editor-resize', this.resize);
        TabsStore.bind('change-theme', this.changeHandler);
        TabsStore.bind('change-mode', this.changeHandler);
        TabsStore.bind('open-file', this.fileOpenHandler);
        TabsStore.bind('execute-script-'+this.props.eventKey, this.execHandler);

        this.editor.getSelectedText = function() { 
            return this.session.getTextRange(this.getSelectionRange());
        }
    },

    componentWillUnmount: function(){
        TabsStore.unbind('editor-resize', this.resize);
        TabsStore.unbind('change-theme', this.changeTheme);
        TabsStore.unbind('change-mode', this.changeMode);
        TabsStore.unbind('open-file', this.fileOpenHandler);
        TabsStore.unbind('execute-script-'+this.props.eventKey, this.execHandler);
    },

    execHandler: function(editor) {
        var selected = this.editor.getSelectedText()
        if (selected) {
            var script = selected;
        } else {
            var script = this.editor.getValue();
        }
        TabActions.runQuery(this.props.eventKey, script);
    },

    changeHandler: function(){
        this.setState({
            theme: TabsStore.getEditorTheme(),
            mode: TabsStore.getEditorMode(),
        });
        this.editor.setTheme('ace/theme/' + this.state.theme);
        this.editor.setKeyboardHandler(this.state.mode);
        this.editor.resize();
    },

    fileOpenHandler: function(){
        filename = TabsStore.getEditorFile(this.props.eventKey);
        this.setState({
            file: filename
        })

        self = this;
        fd = fs.readFile(filename, 'utf8', function(err, data){
            if (err){
                console.log(err);
            } else {
                self.editor.setValue(data, -1);
            }
        });
    },

    resize: function(){
        this.editor.resize();
    },

    render: function(){
        return (
            <div id={this.props.name} mode={this.state.mode}/>
        );
    },
});

module.exports= Editor;