$(document).ready(function () {
  $('button[name="valid"]').attr("disabled", false);
  $('button[id="stop"]').attr("disabled", true);
  var _0x9475x1;
  $("#form").submit(function (_0x9475x2) {
    _0x9475x2.preventDefault();
    _0x9475x2.stopImmediatePropagation();
    var _0x9475x3 = $(this);
    var _0x9475x4 = $("#cc").val().split("\n");
    if (_0x9475x4 != "" || typeof _0x9475x4 != "object") {
      var _0x9475x5 = 0, _0x9475x6 = 0 + $(".live").text(), _0x9475x7 = 0 + $(".die").text(), _0x9475x8 = 0 + $(".unknown").text(), _0x9475x9 = _0x9475x4.length;
      _0x9475x1 = setInterval(function () {
        $.post(_0x9475x3.attr("action"), {data: _0x9475x4[_0x9475x5]}, function (_0x9475xa, _0x9475xb) {
          if (_0x9475xb == "success") {
            var _0x9475xc = $.parseJSON(_0x9475xa);
            if (_0x9475xc.error == 1) {
              $(".success").prepend(_0x9475xc.msg);
              _0x9475x6++;
              $(".live").text(_0x9475x6);
            } else {
              if (_0x9475xc.error == 2) {
                $(".danger").prepend(_0x9475xc.msg);
                _0x9475x7++;
                $(".die").text(_0x9475x7);
              } else {
                if (_0x9475xc.error == 3) {
                  $(".warning").prepend(_0x9475xc.msg);
                  _0x9475x8++;
                  $(".unknown").text(_0x9475x8);
                } else {
                  if (_0x9475xc.error == 4) {
                    $(".info").show().prepend(_0x9475xc.msg + "<br>");
                  }
                }
              }
            }
          }
        });
        if (_0x9475x5 == _0x9475x9) {
          clearInterval(_0x9475x1);
          $("#cc").val("");
          $("#cc").attr("disabled", false);
          $('button[name="valid"]').attr("disabled", false);
          $('button[id="stop"]').attr("disabled", true);
        } else {
          _0x9475x5++;
          $("#cc").attr("disabled", true);
          $('button[id="stop"]').attr("disabled", false);
          $('button[name="valid"]').attr("disabled", true);
        }
      }, 1500);
    } else {
      $(".info").show().html("<b>Error</b>");
    }
    ;
    return false;
  });
  $("#stop").click(function () {
    clearInterval(_0x9475x1);
    $("#cc").attr("disabled", false);
    $('button[name="valid"]').attr("disabled", false);
    $('button[id="stop"]').attr("disabled", true);
  });
});
