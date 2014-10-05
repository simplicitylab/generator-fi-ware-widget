'use strict';

var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({

    // The name `constructor` is important here
    constructor: function () {
        // Calling the super constructor is important so our generator is correctly setup
        yeoman.generators.Base.apply(this, arguments);
    },

    /**
     * Init
     */
    init: function () {
        this.inputEndpointCounter = 0;
        this.generatedInputs = [];
        this.outputEndpointCounter = 0;
        this.generatedOutputs = [];

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
     * Generate input endpoints
     */
    promptInputEndpoints: function() {

        var done = this.async();
        var self = this;

        if (this.generateInputEndpoints) {

            if ( this.inputEndpointCounter < this.numberOfInputEndpoints ) {

                // increase counter
                this.inputEndpointCounter++;

                var prompts = [
                    {
                        type: 'input',
                        name: 'name',
                        message: 'What is the name of the input?',
                        default: "name_" + this.inputEndpointCounter
                    },
                    {
                        type: 'input',
                        name: 'label',
                        message: 'What is the label of the input?',
                        default: "label " + this.inputEndpointCounter
                    },
                    {
                        type: 'input',
                        name: 'description',
                        message: 'What is the description of the input?',
                        default: "description " + this.inputEndpointCounter
                    },
                    {
                        type: 'input',
                        name: 'friendcode',
                        message: 'What is the friendcode of the input?',
                        default: "friendcode_" + this.inputEndpointCounter
                    }
                ];

                this.prompt(prompts, function (props) {

                    self.generatedInputs.push({
                        name : props.name,
                        label : props.label,
                        description : props.description,
                        friendcode: props.friendcode
                    });

                    // call itself recursive
                    self.promptInputEndpoints();
                });


            } else {
                // we are done
                done();
            }
        } else {
            done();
        }
    },


    /**
     * Generate output endpoints
     */
    promptOutputEndpoints: function() {

        var done = this.async();
        var self = this;

        if (this.generateOutputEndpoints) {

            if ( this.outputEndpointCounter < this.numberOfOutputEndpoints ) {

                // increase counter
                this.outputEndpointCounter++;

                var prompts = [
                    {
                        type: 'input',
                        name: 'name',
                        message: 'What is the name of the output?',
                        default: "name_" + this.outputEndpointCounter
                    },
                    {
                        type: 'input',
                        name: 'label',
                        message: 'What is the label of the output?',
                        default: "label " + this.outputEndpointCounter
                    },
                    {
                        type: 'input',
                        name: 'action_label',
                        message: 'What is the action label of the output?',
                        default: "action label " + this.outputEndpointCounter
                    },
                    {
                        type: 'input',
                        name: 'description',
                        message: 'What is the description of the output?',
                        default: "description " + this.outputEndpointCounter
                    },
                    {
                        type: 'input',
                        name: 'friendcode',
                        message: 'What is the friendcode of the output?',
                        default: "friendcode_" + this.outputEndpointCounter
                    }
                ];

                this.prompt(prompts, function (props) {

                    self.generatedOutputs.push({
                        name : props.name,
                        label : props.label,
                        action_label: props.action_label,
                        description : props.description,
                        friendcode: props.friendcode
                    });

                    // call itself recursive
                    self.promptOutputEndpoints();
                });


            } else {
                // we are done
                done();
            }
        } else {
            done();
        }
    },

    /**
     * Prompt for Grunt build script
     */
    promptGruntBuildFile: function () {
        var done = this.async();

        var prompts = [
            // prompt for generating grunt build file
            {
                name: 'generateGruntBuildScript',
                type: 'confirm',
                message: 'Do you want to generate a Grunt build script?'
            }
        ];

        this.prompt(prompts, function (props) {
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
            for( var i = 0, l = this.generatedInputs.length; i < l ; i++ ) {
                inputEndpoints += '\t';
                inputEndpoints += '<InputEndpoint name="' + this.generatedInputs[i]['name'] + '" type="text" description="' + this.generatedInputs[i]['description'] + '" label="' + this.generatedInputs[i]['label'] + '" friendcode="' + this.generatedInputs[i]['friendcode'] + '" />';
                inputEndpoints += '\n';
            }
        }

        /**
         * Generate output endpoints
         */
        var outputEndpoints = '';

        if (this.generateOutputEndpoints) {
            for( var i = 0, l = this.generatedOutputs.length; i < l ; i++ ) {
                outputEndpoints += '\t';
                outputEndpoints += '<OutputEndpoint name="' + this.generatedOutputs[i]['name'] + '" type="text" description="' + this.generatedOutputs[i]['description'] + '" label="' + this.generatedOutputs[i]['label'] + '"  action_label="' + this.generatedOutputs[i]['action_label'] + '" friendcode="' + this.generatedOutputs[i]['friendcode'] + '" />';
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

        // construct src directory
        var src_dir = '';
        if (this.generateGruntBuildScript) {
            src_dir = 'src/';
        }

        // friendly name
        var friendly_name = this.widget_name.toLowerCase().replace(/ /g,"_");

        // copy files from template directory
        this.template("_config.xml", src_dir + "config.xml", config_context);
        this.template("_index.html", src_dir + "index.html", config_context);
        this.template("_main.js", src_dir + "js/main.js");
        this.template("_style.css", src_dir + "css/style.css");

        // check if grunt build script needs to be generated
        if (this.generateGruntBuildScript) {
            // copy grunt related files
            this.template("_package.json", "package.json", { friendly_name: friendly_name, version : this.version } );
            this.template("_Gruntfile.js", "Gruntfile.js", { output_name_compressed : friendly_name });
        }

    }
    

});