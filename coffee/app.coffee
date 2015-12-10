###
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
###
app = {
  # Reset timeout
  resetTimeout: null,

  # How long until the reset?
  resetTime: 30000,

  # How long will fades last?
  fadeTime: 1000,

  # Get a reference to our background object
  backgroundObjects: null,

  # Application Constructor
  initialize: ->
    app.backgroundObjects = document.getElementsByClassName('background')

    document.addEventListener('deviceready', this.onDeviceReady, false)

  # deviceready Event Handler
  #
  # The scope of 'this' is the event. In order to call the 'receivedEvent'
  # function, we must explicitly call 'app.receivedEvent(...);'
  onDeviceReady: ->
    app.log('Device Ready')

    # Hide our status bar
    StatusBar.hide()

    # Add our touch events
    app.setupTouchEvents()

    app.resizeTimeline()

  # Setup   events used within our application
  setupTouchEvents: ->
    app.log('Adding touch events')

    $('#start-button').bind('touchstart', app.launchTimeline)

    $(window).bind('scroll', ->
      app.updateResetTimeout()
#      app.updateBackgroundPosition()
    )
#    $(window).bind('touchmove', ->
#      app.updateResetTimeout()
#      app.updateBackgroundPosition()
#    )

    $('a.year').bind('touchend', ->
      target = $(this).data('year')

      $('#overlay').fadeIn('fast')

      $('.image-year').hide()
      $("##{target}").show()
    )

  # Transition from our splash screen into the timeline.
  launchTimeline: ->
    app.log('Launching timeline')

    $('.splash').fadeOut(app.fadeTime)
    $('.app').show()

    app.updateResetTimeout()

  # Close our timeline
  closeTimeline: (e)->
    app.log('Closing timeline')

    $(window).scrollLeft(0)

    $('.splash').show()
    $('.app').hide()

  # Reset our timeout
  updateResetTimeout: ->
    app.log('Updating timeline reset timeout')

    app.cancelResetTimeout()

    # Create a timeout to reset our app back to the splash screen
    app.resetTimeout = setTimeout( ->
      app.closeTimeline()
    , app.resetTime)

    app.resetTimeout

  updateBackgroundPosition: ->
    app.log('Updating background position')

    left = $(window).scrollLeft()

    $(app.backgroundObjects).css('background-position-x', "#{left}px")

  # Cancel our reset timeout
  cancelResetTimeout: ->
    app.log('Cancelling timeline reset timeout')

    if(app.resetTimeout != null)
      clearTimeout(app.resetTimeout)

  # Log out a message to the console
  log: (message)->
    console.log('RAY :: '+message)

  # Resize the timeline and it's content element
  resizeTimeline: ->
    app.log('Resize timeline')

    years = $('#timeline .content .year').length

    content_width = 152+((152-75) * (years - 1))
#    timeline_width = 50+47+content_width+32+50
    timeline_width = 47+content_width+32
    app_width = timeline_width+1124

    $('#timeline').css('width', "#{timeline_width}px")
    $('#timeline .content').css('width', "#{content_width}px")
    $('.app').css('width', "#{app_width}px")

    backgrounds = $(".backgrounds");
    $(window).scroll(->
      windowpos = $(window).scrollLeft();

#      backgrounds.css('left', "#{windowpos}px");

      true
    )
}

# Initialize up our application
app.initialize()