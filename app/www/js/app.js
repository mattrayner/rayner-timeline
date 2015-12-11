
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
    backgroundObjects: null,
    initialize: function() {
      app.backgroundObjects = document.getElementsByClassName('background');
      return document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
      app.log('Device Ready');
      StatusBar.hide();
      app.setupTouchEvents();
      return app.resizeTimeline();
    },
    setupTouchEvents: function() {
      app.log('Adding touch events');
      $('#start-button').bind('touchstart', app.launchTimeline);
      $(window).bind('scroll', function() {
        return app.updateResetTimeout();
      });
      $('a.year').bind('click', app.openOverlay);
      return $('a.close-modal').bind('click', function(e) {
        e.preventDefault();
        return app.closeOverlay();
      });
    },
    launchTimeline: function() {
      app.log('Launching timeline');
      $('.splash').fadeOut(app.fadeTime);
      $('.app').show();
      return app.updateResetTimeout();
    },
    closeTimeline: function(e) {
      app.log('Closing timeline');
      $(window).scrollLeft(0);
      $('.splash').show();
      $('.app').hide();
      return app.closeOverlay();
    },
    updateResetTimeout: function() {
      app.log('Updating timeline reset timeout');
      app.cancelResetTimeout();
      app.resetTimeout = setTimeout(function() {
        return app.closeTimeline();
      }, app.resetTime);
      return app.resetTimeout;
    },
    updateBackgroundPosition: function() {
      var left;
      app.log('Updating background position');
      left = $(window).scrollLeft();
      return $(app.backgroundObjects).css('background-position-x', left + "px");
    },
    cancelResetTimeout: function() {
      app.log('Cancelling timeline reset timeout');
      if (app.resetTimeout !== null) {
        return clearTimeout(app.resetTimeout);
      }
    },
    log: function(message) {
      return console.log('RAY :: ' + message);
    },
    resizeTimeline: function() {
      var app_width, backgrounds, content_width, timeline_width, years;
      app.log('Resize timeline');
      years = $('#timeline .content .year').length;
      content_width = 152 + ((152 - 75) * (years - 1));
      timeline_width = 47 + content_width + 32;
      app_width = timeline_width + 500;
      $('#timeline').css('width', timeline_width + "px");
      $('#timeline .content').css('width', content_width + "px");
      $('.app').css('width', app_width + "px");
      backgrounds = $(".backgrounds");
      return $(window).scroll(function() {
        var windowpos;
        windowpos = $(window).scrollLeft();
        return true;
      });
    },
    openOverlay: function() {
      var target;
      target = $(this).data('year');
      $('body').css({
        'overflow': 'hidden',
        'width': '1024px'
      });
      $('#overlay').fadeIn('fast');
      $('.image-year').hide();
      $("#" + target).show();
      app.cancelResetTimeout();
      return $('.cycle-slideshow').cycle(0);
    },
    closeOverlay: function() {
      $('body').css({
        'overflow': '',
        'width': ''
      });
      $('#overlay').fadeOut('fast');
      return app.updateResetTimeout();
    }
  };

  app.initialize();

}).call(this);
