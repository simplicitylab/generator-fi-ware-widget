'use strict';

var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
  
    // The name `constructor` is important here
    constructor: function () {
        // Calling the super constructor is important so our generator is correctly setup
        yeoman.generators.Base.apply(this, arguments);
    },

    /**
     * Prompt for vendor name
     **/
    promptVendorName: function () {
        var done = this.async();

        this.prompt({
            type    : 'input',
            name    : 'vendor_name',
            message : 'Your vendor name',
            required : true
        }, function (answers) {

            // store app name
            this.vendor_name = answers.vendor_name;

            done();
        }.bind(this));
    },

    /**
     * Prompt for widget name
     **/
    promptWidgetName: function () {
        var done = this.async();

        this.prompt({
            type    : 'input',
            name    : 'widget_name',
            message : 'The name of the widget',
            required : true,
            default : this.appname // Default to current folder name
        }, function (answers) {

            // store app name
            this.widget_name = answers.widget_name;

            done();
        }.bind(this));
    },

    /**
     * Prompt for widget name
     **/
    promptDisplayName: function () {
        var done = this.async();

        this.prompt({
            type    : 'input',
            name    : 'display_name',
            message : 'The display name of the widget',
            required : true,
            default : this.widget_name
        }, function (answers) {

            // store app name
            this.display_name = answers.display_name;

            done();
        }.bind(this));
    },

    /**
     * Prompt for version
     **/
    promptVersion: function () {
        var done = this.async();

        this.prompt({
            type    : 'input',
            name    : 'version',
            message : 'The widget version',
            required : true,
            default : "1.0"
        }, function (answers) {

            // store app name
            this.version = answers.version;

            done();
        }.bind(this));
    },

    /**
     * Prompt for authors
     **/
    promptAuthors: function () {
        var done = this.async();

        this.prompt({
            type    : 'input',
            name    : 'authors',
            message : 'Author(s) of the widget',
            required : true
        }, function (answers) {

            // store app name
            this.authors = answers.authors;

            done();
        }.bind(this));
    },

    /**
     * Prompt for mail
     **/
    promptMail: function () {
        var done = this.async();

        this.prompt({
            type    : 'input',
            name    : 'email',
            message : 'The contact e-email address(es)',
            required : true
        }, function (answers) {

            // store app name
            this.email = answers.email;

            done();
        }.bind(this));
    },

    /**
     * Prompt for description
     **/
    promptDescription: function () {
        var done = this.async();

        this.prompt({
            type    : 'input',
            name    : 'description',
            message : 'The description of the widget',
            required : true
        }, function (answers) {

            // store app name
            this.description = answers.description;

            done();
        }.bind(this));
    },

    /**
     * Prompt for description
     **/
    promptWiki: function () {
        var done = this.async();

        this.prompt({
            type    : 'input',
            name    : 'wikiUrl',
            message : 'The wikiUrl of the widget',
            optional : true
        }, function (answers) {

            // store app name
            this.wikiUrl = answers.wikiUrl;

            done();
        }.bind(this));
    },

    /**
     * Creates directories
     **/
    createDirectories: function () {
        this.mkdir("js");
        this.mkdir("css");
        this.mkdir("images");
    },

    /**
     * Copy files
     */
    copyFiles: function() {

        var config_context = {
            vendor_name : this.vendor_name,
            widget_name : this.widget_name,
            display_name : this.display_name,
            version : this.version,
            authors : this.authors,
            email : this.email,
            description: this.description,
            wikiUrl: this.wikiUrl
        };

        this.template("_config.xml", "config.xml", config_context);
    }
    

});