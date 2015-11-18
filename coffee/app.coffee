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

  # Application Constructor
  initialize: ->
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

  # Setup touchstart events used within our application
  setupTouchEvents: ->
    app.log('Adding touch events')

    $('#start-button').bind('touchstart', app.launchTimeline)

  # Transition from our splash screen into the timeline.
  launchTimeline: ->
    app.log('Launching timeline')

    $('.splash').fadeOut(app.fadeTime)

    app.updateResetTimeout()

  # Close our timeline
  closeTimeline: (e)->
    app.log('Closing timeline')

    $('.splash').fadeIn(app.fadeTime)

  # Reset our timeout
  updateResetTimeout: ->
    app.log('Updating timeline reset timeout')

    app.cancelResetTimeout()

    # Create a timeout to reset our app back to the splash screen
    app.resetTimeout = setTimeout( ->
      app.closeTimeline()
    , app.resetTime)

    app.resetTimeout

  # Cancel our reset timeout
  cancelResetTimeout: ->
    app.log('Cancelling timeline reset timeout')

    if(app.resetTimeout != null)
      clearTimeout(app.resetTimeout)

  # Log out a message to the console
  log: (message)->
    console.log('RAY :: '+message)
}

# Initialize up our application
app.initialize()