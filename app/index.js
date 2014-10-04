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
                default : "1.0.0"
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
            // prompt for generating input and output endpoints
            {
                name: 'generateInputEndpoints',
                type: 'confirm',
                message: 'Do you want to generate input endpoints?',
            },
            {
                when: function (response) {
                    return response.generateInputEndpoints;
                },
                name: 'numberOfInputEndpoints',
                message: 'How many number of input endpoints ?',
                default: 1
            },
            {
                name: 'generateOutputEndpoints',
                type: 'confirm',
                message: 'Do you want to generate output endpoints?',
            },
            {
                when: function (response) {
                    return response.generateOutputEndpoints;
                },
                name: 'numberOfOutputEndpoints',
                message: 'How many number of output endpoints ?',
                default: 1
            },
            // prompt for generating grunt build file
            {
                name: 'generateGruntBuildScript',
                type: 'confirm',
                message: 'Do you want to generate a Grunt build script?'
            },

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
            this.generateGruntBuildScript = props.generateGruntBuildScript;

            done();

        }.bind(this));
    },


    /**
     * Creates directories
     **/
    createDirectories: function () {

        var src_dir = '';
        if (this.generateGruntBuildScript) {
            // construct src directory
            src_dir = 'src/';

            // create buil directory
            this.mkdir('build');
        }

        this.mkdir(src_dir + "js");
        this.mkdir(src_dir + "css");
        this.mkdir(src_dir + "images");
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
            for( var i = 1, l = this.numberOfInputEndpoints; i <= l ; i++ ) {
                inputEndpoints += '\t';
                inputEndpoints += '<InputEndpoint name="name_' + i + '" type="text" description="description ' + i +'" label="label ' + i + '" action_label="action label ' + i + '" friendcode="friendcode ' + i + '" >';

                if (i != l) {
                    inputEndpoints += '\n';
                }

            }
        }

        /**
         * Generate output endpoints
         */
        var outputEndpoints = '';

        if (this.generateOutputEndpoints) {
            for( var i = 1, l = this.numberOfOutputEndpoints; i <= l ; i++ ) {
                outputEndpoints += '\t';
                outputEndpoints += '<OutputEndpoint name="name_' + i + '" type="text" description="description ' + i +'" label="label ' + i + '" action_label="action label ' + i + '" friendcode="friendcode ' + i + '" >';

                if (i != l) {
                    outputEndpoints += '\n';
                }
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

        // construct src directory
        var src_dir = '';
        if (this.generateGruntBuildScript) {
            src_dir = 'src/';
        }

        // copy files from template directory
        this.template("_config.xml", src_dir + "config.xml", config_context);
        this.template("_index.html", src_dir + "index.html", config_context);
        this.template("_main.js", src_dir + "js/main.js");
        this.template("_main.css", src_dir + "css/main.css");
        this.template("_catalogue.png", src_dir + "images/catalogue.png");
        this.template("_catalogueSmartphone.png", src_dir + "images/catalogueSmartphone.png");

        // check if grunt build script needs to be generated
        if (this.generateGruntBuildScript) {
            // generate output name for compressed file
            var output_name_compressed = this.widget_name.toLowerCase().replace(/ /g,"_");

            // copy grunt related files
            this.template("_package.json", "package.json", config_context);
            this.template("_Gruntfile.js", "Gruntfile.js", { output_name_compressed : output_name_compressed });
        }

    }
    

});