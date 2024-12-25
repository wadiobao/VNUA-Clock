(function() {
  var countdown, init_countdown, set_countdown;
  var DEFAULT_MINUTES = 15;
  var soundPlayed10s = false;
  var soundPlayed3s = false;
  var soundPlayed0s = false;

  function playSound(audioId, duration) {
    var audio = document.getElementById(audioId);
    audio.currentTime = 0;
    audio.play();
    
    setTimeout(function() {
      audio.pause();
      audio.currentTime = 0;
    }, duration);
  }

  function stopAllSounds() {
    ['sound10s', 'sound3s', 'sound0s'].forEach(function(id) {
      var audio = document.getElementById(id);
      audio.pause();
      audio.currentTime = 0;
    });
  }

  countdown = init_countdown = function() {
    countdown = new FlipClock($('.countdown'), {
      clockFace: 'MinuteCounter',
      language: 'en',
      autoStart: false,
      countdown: true,
      showSeconds: true,
      callbacks: {
        start: function() {
          soundPlayed10s = false;
          soundPlayed3s = false;
          soundPlayed0s = false;
          return console.log('The clock has started!');
        },
        stop: function() {
          var self = this;
          if (this.factory.getTime().time === 0 && !soundPlayed0s) {
            playSound('sound0s', 5000);
            soundPlayed0s = true;
            setTimeout(function() {
              stopAllSounds();
              if (self.factory.getTime().time === 0) {
                toggleControls(true);
              }
            }, 4000);
          } else {
            stopAllSounds();
            if (this.factory.getTime().time === 0) {
              toggleControls(true);
            }
          }
          return console.log('The clock has stopped!');
        },
        interval: function() {
          var time = this.factory.getTime().time;
          if (time) {
            if (time === 10 && !soundPlayed10s) {
              playSound('sound10s', 8000);
              soundPlayed10s = true;
            }
            else if (time === 4 && !soundPlayed3s) {
              playSound('sound3s', 6000);
              soundPlayed3s = true;
            }
            return console.log('Clock interval', time);
          }
        }
      }
    });
    return countdown;
  };

  set_countdown = function(minutes, seconds) {
    var totalSeconds = (minutes * 60) + seconds;
    countdown.setTime(totalSeconds);
  };

  init_countdown();
  set_countdown(DEFAULT_MINUTES, 0);

  function toggleControls(show) {
    if (show) {
      $('.controls, .settings').removeClass('hidden');
    } else {
      $('.controls, .settings').addClass('hidden');
    }
  }

  $('#startBtn').on('click', function() {
    if (!countdown.running) {
      countdown.start();
      toggleControls(false);
    }
  });

  $(document).on('keyup', function(e) {
    if (e.key === "Escape") {
      if (countdown.running) {
        countdown.stop();
        stopAllSounds();
        toggleControls(true);
      }
    }
  });

  $('#setTimeBtn').on('click', function() {
    var minutes = parseInt($('#minutesInput').val()) || 0;
    var seconds = parseInt($('#secondsInput').val()) || 0;
    
    if (seconds >= 60) {
      minutes += Math.floor(seconds / 60);
      seconds = seconds % 60;
    }
    
    $('#minutesInput').val(minutes);
    $('#secondsInput').val(seconds);
    
    if (countdown.running) {
      countdown.stop();
    }
    
    set_countdown(minutes, seconds);
    
    soundPlayed10s = false;
    soundPlayed3s = false;
    soundPlayed0s = false;
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiPGFub255bW91cz4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBLFNBQUEsRUFBQSxjQUFBLEVBQUE7O0VBQUEsU0FBQSxHQUFZLGNBQUEsR0FBaUIsUUFBQSxDQUFBLENBQUE7SUFDekIsU0FBQSxHQUFZLElBQUksU0FBSixDQUFjLENBQUEsQ0FBRSxZQUFGLENBQWQsRUFDWjtNQUFBLFNBQUEsRUFBVyxlQUFYO01BQ0EsUUFBQSxFQUFVLElBRFY7TUFFQSxTQUFBLEVBQVcsS0FGWDtNQUdBLFNBQUEsRUFBVyxJQUhYO01BSUEsV0FBQSxFQUFhLElBSmI7TUFLQSxTQUFBLEVBQ0U7UUFBQSxLQUFBLEVBQU8sUUFBQSxDQUFBLENBQUE7aUJBQ0wsT0FBTyxDQUFDLEdBQVIsQ0FBWSx3QkFBWjtRQURLLENBQVA7UUFFQSxJQUFBLEVBQU0sUUFBQSxDQUFBLENBQUE7aUJBQ0osT0FBTyxDQUFDLEdBQVIsQ0FBWSx3QkFBWjtRQURJLENBRk47UUFJQSxRQUFBLEVBQVUsUUFBQSxDQUFBLENBQUE7QUFDaEIsY0FBQTtVQUFRLElBQUEsR0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQWIsQ0FBQSxDQUFzQixDQUFDO1VBQzlCLElBQUcsSUFBSDttQkFDRSxPQUFPLENBQUMsR0FBUixDQUFZLGdCQUFaLEVBQThCLElBQTlCLEVBREY7O1FBRlE7TUFKVjtJQU5GLENBRFk7QUFnQlosV0FBTztFQWpCa0I7O0VBb0I3QixhQUFBLEdBQWdCLFFBQUEsQ0FBQyxPQUFELEVBQVUsS0FBVixDQUFBO0FBRWhCLFFBQUEsT0FBQSxFQUFBLEdBQUEsRUFBQSxTQUFBLEVBQUEsR0FBQSxFQUFBO0lBQUksSUFBRyxTQUFTLENBQUMsT0FBYjtBQUNFLGFBREY7O0lBR0EsT0FBQSxHQUFVLE9BQUEsR0FBVTtJQUVwQixHQUFBLEdBQU0sSUFBSSxJQUFKLENBQUE7SUFDTixLQUFBLEdBQVEsSUFBSSxJQUFKLENBQVMsS0FBVDtJQUNSLEdBQUEsR0FBTSxLQUFLLENBQUMsT0FBTixDQUFBLENBQUEsR0FBa0IsT0FBQSxHQUFVO0lBRWxDLFNBQUEsR0FBWSxJQUFJLENBQUMsS0FBTCxDQUFXLENBQUMsR0FBQSxHQUFNLEdBQUcsQ0FBQyxPQUFKLENBQUEsQ0FBUCxDQUFBLEdBQXdCLElBQW5DO0lBRVosT0FBQSxHQUFVO0lBQ1YsSUFBRyxTQUFBLEdBQVksQ0FBZjtNQUNFLFNBQUEsSUFBYSxDQUFDO01BQ2QsT0FBQSxHQUFVLEtBRlo7O0lBSUEsU0FBUyxDQUFDLE9BQVYsQ0FBa0IsU0FBbEI7V0FDQSxTQUFTLENBQUMsS0FBVixDQUFBO0VBbkJZOztFQXFCaEIsY0FBQSxDQUFBOztFQUNBLGFBQUEsQ0FBYyxDQUFkLEVBQWlCLElBQUksSUFBSixDQUFBLENBQWpCO0FBMUNBIiwic291cmNlc0NvbnRlbnQiOlsiY291bnRkb3duID0gaW5pdF9jb3VudGRvd24gPSAoKSAtPlxuICAgIGNvdW50ZG93biA9IG5ldyBGbGlwQ2xvY2sgJCgnLmNvdW50ZG93bicpLFxuICAgIGNsb2NrRmFjZTogJ01pbnV0ZUNvdW50ZXInLFxuICAgIGxhbmd1YWdlOiAnZW4nLFxuICAgIGF1dG9TdGFydDogZmFsc2UsXG4gICAgY291bnRkb3duOiB0cnVlLFxuICAgIHNob3dTZWNvbmRzOiB0cnVlXG4gICAgY2FsbGJhY2tzOlxuICAgICAgc3RhcnQ6ICgpIC0+XG4gICAgICAgIGNvbnNvbGUubG9nICdUaGUgY2xvY2sgaGFzIHN0YXJ0ZWQhJ1xuICAgICAgc3RvcDogKCkgLT5cbiAgICAgICAgY29uc29sZS5sb2cgJ1RoZSBjbG9jayBoYXMgc3RvcHBlZCEnXG4gICAgICBpbnRlcnZhbDogKCkgLT5cbiAgICAgICAgdGltZSA9IHRoaXMuZmFjdG9yeS5nZXRUaW1lKCkudGltZVxuICAgICAgICBpZiB0aW1lIFxuICAgICAgICAgIGNvbnNvbGUubG9nICdDbG9jayBpbnRlcnZhbCcsIHRpbWVcblxuICAgIHJldHVybiBjb3VudGRvd25cbiAgXG5cbnNldF9jb3VudGRvd24gPSAobWludXRlcywgc3RhcnQpIC0+XG5cbiAgICBpZiBjb3VudGRvd24ucnVubmluZ1xuICAgICAgcmV0dXJuXG5cbiAgICBzZWNvbmRzID0gbWludXRlcyAqIDYwXG5cbiAgICBub3cgPSBuZXcgRGF0ZVxuICAgIHN0YXJ0ID0gbmV3IERhdGUgc3RhcnRcbiAgICBlbmQgPSBzdGFydC5nZXRUaW1lKCkgKyBzZWNvbmRzICogMTAwMFxuXG4gICAgbGVmdF9zZWNzID0gTWF0aC5yb3VuZCAoZW5kIC0gbm93LmdldFRpbWUoKSkgLyAxMDAwXG5cbiAgICBlbGFwc2VkID0gZmFsc2VcbiAgICBpZiBsZWZ0X3NlY3MgPCAwXG4gICAgICBsZWZ0X3NlY3MgKj0gLTFcbiAgICAgIGVsYXBzZWQgPSB0cnVlXG5cbiAgICBjb3VudGRvd24uc2V0VGltZShsZWZ0X3NlY3MpXG4gICAgY291bnRkb3duLnN0YXJ0KClcbiAgICBcbmluaXRfY291bnRkb3duKClcbnNldF9jb3VudGRvd24oMSwgbmV3IERhdGUoKSlcbiJdfQ==
//# sourceURL=coffeescript