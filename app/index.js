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
            },
            // prompt for generating input endpoints
            {
                name: 'generateInputEndpoints',
                type: 'confirm',
                message: 'Do you want to generate input endpoints?'
            }, {
                when: function (response) {
                    return response.generateInputEndpoints;
                },
                name: 'numberOfInputEndpoints',
                message: 'How many number of input endpoints ?'
            },
            {
                name: 'generateOutputEndpoints',
                type: 'confirm',
                message: 'Do you want to generate output endpoints?'
            }, {
                when: function (response) {
                    return response.generateOutputEndpoints;
                },
                name: 'numberOfOutputEndpoints',
                message: 'How many number of output endpoints ?'
            }
        ];

        this.prompt(prompts, function (props) {

            this.vendor_name              = props.vendor_name;
            this.widget_name              = props.widget_name;
            this.display_name             = props.display_name;
            this.version                  = props.version;
            this.authors                  = props.authors;
            this.email                    = props.email;
            this.description              = props.description;
            this.wikiUrl                  = props.wikiUrl;
            this.generateInputEndpoints   = props.generateInputEndpoints;
            this.numberOfInputEndpoints   = props.numberOfInputEndpoints;
            this.generateOutputEndpoints  = props.generateOutputEndpoints;
            this.numberOfOutputEndpoints  = props.numberOfOutputEndpoints;

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

        /**
         * Generate input endpoints
         */
        var inputEndpoints = '';

        if (this.generateInputEndpoints) {
            for( var i = 0, l = this.numberOfInputEndpoints; i < l ; i++ ) {
                inputEndpoints += '\t';
                inputEndpoints += '<InputEndpoint >';
                inputEndpoints += '\n';
            }
        }

        /**
         * Generate output endpoints
         */
        var outputEndpoints = '';

        if (this.generateOutputEndpoints) {
            for( var i = 0, l = this.numberOfOutputEndpoints; i < l ; i++ ) {
                outputEndpoints += '\t';
                outputEndpoints += '<OutputEndpoint >';
                outputEndpoints += '\n';
            }
        }

        /**
         * Create configuration context
         */
        var config_context = {
            vendor_name : this.vendor_name,
            widget_name : this.widget_name,
            display_name : this.display_name,
            version : this.version,
            authors : this.authors,
            email : this.email,
            description: this.description,
            wikiUrl: this.wikiUrl,
            inputEndpoints : inputEndpoints,
            outputEndpoints: outputEndpoints
        };

        this.template("_config.xml", "config.xml", config_context);
    }
    

});