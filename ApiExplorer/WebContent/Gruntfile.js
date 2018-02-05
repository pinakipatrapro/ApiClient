var sUser = grunt.option('user');
var sPwd = grunt.option('pwd');
 
grunt.initConfig({
  nwabap_ui5uploader: {
    options: {
      conn: {
        server: 'https://ldcisd4.wdf.sap.corp:44302',
      },
      auth: {
        user: sUser,
        pwd: sPwd
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
          cwd: 'build-folder',
          src: '**/*.*'
        }
      }
    }
  }
});