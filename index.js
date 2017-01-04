/**
 * Created by mendieta on 7/27/16.
 */

var fs   = require( "fs" );
var path = require( "path" );
var nyg  = require( "nyg" );

var prompts = [
    {
        type   : "input",
        name   : "repoName",
        message: "Whats is the project name?",
        default: "Foo-Project"
    },
    {
        type   : "input",
        name   : "author",
        message: "Whats is your name? (Author)",
        default: "Foo()"
    },
    {
        type   : "input",
        name   : "email",
        message: "What is your email? (Author Email)",
        default: "developer@foostudio.mx"
    },
    {
        type   : "input",
        name   : "description",
        message: "Describe the project",
        default: "A Foo() project"
    },
    {
        type   : "list",
        message: "What framework will your project use?",
        name   : "framework",
        choices: [
            {
                name : "Vue",
                value: "vue",
                checked:true
            },
            {
                name   : "React",
                value  : "react"
            }
        ]
    }
];

var globs = [
    { base: "templates/{{framework}}" , template:false}
    /*{ base: "templates/foo", output: "src/foo" },
    { base: "templates/assets", output: "src/assets" },
    { base: "templates/base" },
    { base: 'templates/unsupported/{{unsupported}}', output: 'static/' },
    { base: 'templates/unsupported/', glob: '*', output: 'static/' },
    { base: 'templates/unsupported/images/', output: 'static/img/unsupported/' }*/
]

var gen = nyg( prompts, globs )
    .on( "postcopy", function () {
        var done = gen.async();
        /*fs.rename( path.join( gen.cwd, 'gitignore' ), path.join( gen.cwd, '.gitignore' ), function () {
            gen.copy( 'templates/.babelrc', '.babelrc', done )
        } )*/
    } )
    .run();