'use strict';
var preload = require("openui5_preload");
import preload from "openui5_preload";

module.exports = function(grunt){
var sUser = grunt.option('user');
var sPwd = grunt.option('pwd');
 
grunt.initConfig({
  nwabap_ui5uploader: {
    options: {
      conn: {
        server: 'https://ldcisd4.wdf.sap.corp:44302',
        client : '001',
        useStrictSSL : false
      },
      auth: {
        user: 'C5262685',
        pwd: 'Pinaki@1234'
      }
    },
    upload_build: {
      options: {
        ui5: {
           package: '$TMP',
           bspcontainer: 'ZPIN_API_EXP',
           bspcontainer_text: 'Global API Client'
        },
        resources: {
          cwd: 'WebContent',
          src: '**/*.*'
        }
      }
    }
  },
  openui5_preload: {
    component:{
      options : {
          resources : {
            cwd: 'WebContent',
            prefix : 'ApiExplorer/WebContent',
            src: '**/*.*'
          },
          dest : 'dist'
      },
      components : 'ApiExplorer/WebContent'
    }
  }
});
grunt.loadNpmTasks('grunt-openui5');
grunt.loadNpmTasks('grunt-nwabap-ui5uploader');
grunt.registerTask('default',['grunt-nwabap-ui5uploader','grunt-openui5']);

}