
/*
Licensed to the Apache Software Foundation (ASF) under one
or more contributor license agreements.  See the NOTICE file
distributed with this work for additional information
regarding copyright ownership.  The ASF licenses this file
to you under the Apache License, Version 2.0 (the
"License"); you may not use this file except in compliance
with the License.  You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied.  See the License for the
specific language governing permissions and limitations
under the License.
 */

(function() {
  var app;

  app = {
    resetTimeout: null,
    resetTime: 30000,
    fadeTime: 1000,
    initialize: function() {
      return document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
      app.log('Device Ready');
      StatusBar.hide();
      return app.setupTouchEvents();
    },
    setupTouchEvents: function() {
      app.log('Adding touch events');
      return $('#start-button').bind('touchstart', app.launchTimeline);
    },
    launchTimeline: function() {
      app.log('Launching timeline');
      $('.splash').fadeOut(app.fadeTime);
      return app.updateResetTimeout();
    },
    closeTimeline: function(e) {
      app.log('Closing timeline');
      return $('.splash').fadeIn(app.fadeTime);
    },
    updateResetTimeout: function() {
      app.log('Updating timeline reset timeout');
      app.cancelResetTimeout();
      app.resetTimeout = setTimeout(function() {
        return app.closeTimeline();
      }, app.resetTime);
      return app.resetTimeout;
    },
    cancelResetTimeout: function() {
      app.log('Cancelling timeline reset timeout');
      if (app.resetTimeout !== null) {
        return clearTimeout(app.resetTimeout);
      }
    },
    log: function(message) {
      return console.log('RAY :: ' + message);
    }
  };

  app.initialize();

}).call(this);
