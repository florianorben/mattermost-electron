'use strict';

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        electron: {
            osxBuild: {
                options: {
                    name: 'Mattermost',
                    dir: 'app',
                    out: 'dist',
                    version: '0.33.8',
                    platform: 'darwin',
                    arch: 'x64'
                }
            },
            linuxBuild: {
                options: {
                    name: 'Mattermost',
                    dir: 'app',
                    out: 'dist',
                    version: '0.33.8',
                    platform: 'linux',
                    arch: 'x64'
                }
            }
        }
    });

    grunt.registerTask('default', ['electron']);
};
