$(document).ready(function () {
  $('button[name="valid"]').attr("disabled", false);
  $('button[id="stop"]').attr("disabled", true);

  var intervalId;

  $("#form").submit(function (event) {
    event.preventDefault();
    event.stopImmediatePropagation();

    var form = $(this);
    var ccData = $("#cc").val().split("\n");

    if (ccData !== "" || typeof ccData !== "object") {
      var successCount = 0,
          liveCount = 0 + $(".live").text(),
          dieCount = 0 + $(".die").text(),
          unknownCount = 0 + $(".unknown").text(),
          totalCount = ccData.length;

      intervalId = setInterval(function () {
        $.post(form.attr("action"), { data: ccData[successCount] }, function (response, status) {
          if (status === "success") {
            var jsonResponse = $.parseJSON(response);
            if (jsonResponse.error === 1) {
              $(".success").prepend(jsonResponse.msg);
              liveCount++;
              $(".live").text(liveCount);
            } else if (jsonResponse.error === 2) {
              $(".danger").prepend(jsonResponse.msg);
              dieCount++;
              $(".die").text(dieCount);
            } else if (jsonResponse.error === 3) {
              $(".warning").prepend(jsonResponse.msg);
              unknownCount++;
              $(".unknown").text(unknownCount);
            } else if (jsonResponse.error === 4) {
              $(".info").show().prepend(jsonResponse.msg + "<br>");
            }
          }
        });

        if (successCount === totalCount) {
          clearInterval(intervalId);
          $("#cc").val("");
          $("#cc").attr("disabled", false);
          $('button[name="valid"]').attr("disabled", false);
          $('button[id="stop"]').attr("disabled", true);
        } else {
          successCount++;
          $("#cc").attr("disabled", true);
          $('button[id="stop"]').attr("disabled", false);
          $('button[name="valid"]').attr("disabled", true);
        }
      }, 1500);
    } else {
      $(".info").show().html("<b>Error</b>");
    }

    return false;
  });

  $("#stop").click(function () {
    clearInterval(intervalId);
    $("#cc").attr("disabled", false);
    $('button[name="valid"]').attr("disabled", false);
    $('button[id="stop"]').attr("disabled", true);
  });
});
