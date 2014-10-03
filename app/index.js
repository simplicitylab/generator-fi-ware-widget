'use strict';

var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
  
    // The name `constructor` is important here
    constructor: function () {
        // Calling the super constructor is important so our generator is correctly setup
        yeoman.generators.Base.apply(this, arguments);
    },

    /**
     * Prompt questions
     **/
    promptQuestions: function () {
        var done = this.async();

        var prompts = [
            {
                name: 'vendor_name',
                message: 'Your vendor name'
            },
            {
                type: 'input',
                name: 'widget_name',
                message: 'The name of the widget',
                default: this.appname
            },
            {
                type    : 'input',
                name    : 'display_name',
                message : 'The display name of the widget',
                default :  this.widget_name
            },
            {
                type    : 'input',
                name    : 'version',
                message : 'The widget version',
                default : "1.0"
            },
            {
                type    : 'input',
                name    : 'authors',
                message : 'Author(s) of the widget'
            },
            {
                type    : 'input',
                name    : 'email',
                message : 'The contact e-email address(es)'
            },
            {
                type    : 'input',
                name    : 'description',
                message : 'The description of the widget'
            },
            {
                type    : 'input',
                name    : 'wikiUrl',
                message : 'The wikiUrl of the widget'
            }
        ];

        this.prompt(prompts, function (props) {

            this.vendor_name  = props.vendor_name;
            this.widget_name  = props.widget_name;
            this.display_name = props.display_name;
            this.version      = props.version;
            this.authors      = props.authors;
            this.email        = props.email;
            this.description  = props.description;
            this.wikiUrl      = props.wikiUrl;

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