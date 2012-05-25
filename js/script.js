/* Author: Egil Hansen */
(function ($) {

    var timerElm = $('#timer'),
        stateElm = $('#state .value'),
        pomoCountElm = $('#pomodoro-count .value'),
        notifySound = new Audio("/resources/notify.wav"),
        state = {},
        countdown,
        updateState,
        setTarget,
        toogleTimer;

    state = {
        time: 0,
        target: 0,
        type: undefined,
        pomocount: 0,
        timeoutId: undefined
    };

    setTarget = function () {
        state.time = state.target = $('#' + state.type).val() * 60;
    };

    // (re)start the counter and update the display
    countdown = function () {
        var mins, secs;

        // restart timer and update time
        state.timeoutId = window.setTimeout(countdown, 1000);

        // update time
        state.time -= 1;

        // calculate minutes and secs
        mins = Math.floor(state.time / 60);
        secs = state.time % 60;

        // prettify for output
        mins = mins < 10 ? "0" + mins : mins;
        secs = secs < 10 ? "0" + secs : secs;
        timerElm.text(mins + ":" + secs);

        // reset countdown and update rest of UI if timer is done
        if (state.time === 0) {
            updateState();
        }
    };

    // update the interface
    updateState = function (userAction) {
        // what kind of timer shoud we use now?
        if (state.type === 'work') {
            if (state.pomocount % 4 === 0) {
                state.type = 'rest';
                stateElm.text("Rest");
            } else {
                state.type = 'break';
                stateElm.text("Break");
            }
        } else {
            state.pomocount += 1;
            pomoCountElm.text(state.pomocount);
            state.type = 'work';
            stateElm.text("Working");
        }

        // animate text
        $('#state, #timer, #pomodoro-count')
                    .toggleClass(state.type)
                    .effect("pulsate", { times: 5 }, 400);

        // play sound when ever state is changed
        if (!userAction) {
            notifySound.play();
        }

        // update target time
        setTarget();
    };

    toogleTimer = function () {
        // only on first start
        if (state.type === undefined) { updateState(true); }

        // test if counting down, if so, pause, otherwise start
        if (typeof state.timeoutId == "number") {
            window.clearTimeout(state.timeoutId);
            state.timeoutId = undefined;
        } else {
            countdown();
        }
    };

    $(document).ready(function () {
        setTarget();

        $('fieldset input').on('change', function (e) {
            setTarget();
        });

        $('body').on('keypress', function (e) {
            var code = e.keyCode || e.which;
            // only continue if enter key is pressed
            if (code === 13) {
                toogleTimer();
            }
        });

        $('#state').on('click', function (e) {
            toogleTimer();
        });
    });

})(jQuery);
