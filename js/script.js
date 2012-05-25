/* Author: Egil Hansen */
(function($) {

  var runToggler = $('#run-toggler'),
      work = $('#work'),
      workLabel = $('label[for="work"] > span'),
      breakTime = $('#break'),
      breakLabel = $('label[for="break"] > span'),
      rest = $('#rest'),
      restLabel = $('label[for="rest"] > span'),
      timer = $('#timer'),
      stateElm = $('#state'),
      pomoCountElm = $('pomodoro-count'),
      state = {},
      countdown,
      updateState;

  state = {
    time: 0,
    target: 0,
    type: 0,
    pomocount: 0,
    timeoutId,
  };

  countdown = function() {
    var mins, secs;
    state.timeoutId = window.setTimeout(countdown, 1000);
    state.time += 1;
    mins = Math.floor(state.time / 60);
    secs = state.time % 60;

    // prettify for
    mins = mins < 10 ? "0" + mins : mins;
    secs = secs < 10 ? "0" + secs : secs;
    timer.text(mins + ":" + secs);
    if(time > target) {
      state.time = 0;
      updateState();
    }
  };

  updateState = function() {
    if(workCount === 0) {
        // rest
        countdownType = 2;
        target = rest.val() * 60;
        $('body').css('background-color', 'red').effect("pulsate", { times: 4 }, 1000);
      } else if(workCount > 0) {
        // break
        countdownType = 1;
        target = breakTime.val() * 60;
        $('body').css('background-color', 'yellow').effect("pulsate", { times: 4 }, 1000);
      } else {
        countdownType = 1;
        target = work.val() * 60;
        $('body').css('background-color', 'white');
      }

  };

  $(document).ready(function() {

    work.on('change', function(evt) {
      if(countdownType === 0) {
        target = work.val() * 60;
      }
    });

    breakTime.on('change', function(evt) {
      if(countdownType === 0) {
        target = breakTime.val() * 60;
      }
    });

    rest.on('change', function(evt) {
      if(countdownType === 0) {
        target = rest.val() * 60;
      }
    });

    runToggler.on('click', function(evt) {
      if(typeof timeoutId == "number") {
        window.clearTimeout(timeoutId);
        timeoutId = undefined;
        runToggler.text('Start');
      } else {
        ticker();
        runToggler.text('Pause');
      }
    });

    target = work.val() * 60;

    $('body').on('keypress', function(e) {
      var code = e.keyCode || e.which;
      if(code === 13) {
        runToggler.trigger('click');
      }
    });
  });

})(jQuery);
