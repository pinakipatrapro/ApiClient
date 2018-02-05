'use strict';

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
           bspcontainer: 'ZPIN_API_CLIENT',
           bspcontainer_text: 'Global API Client'
        },
        resources: {
          cwd: 'WebContent',
          src: '**/*.*'
        }
      }
    }
  }
});
grunt.loadNpmTasks('grunt-nwabap-ui5uploader');
grunt.registerTask('default',['grunt-nwabap-ui5uploader']);

}