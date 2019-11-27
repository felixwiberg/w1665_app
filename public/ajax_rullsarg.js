$(document).ready(function () {
  $("#test_rullsarg").on("click", function (e) {
    $('#div_new').hide();
    $('#div_overwrite').hide();
    $('#div_delete').hide();
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/test_rullsarg",
      data: $('form').serialize(),
    }).done(function (data) {
      $('#rullsarg').html(data["Status Rullsarg"]);

      if (data.show_change_delete === 'yes') {
        $('#div_overwrite').show();
        $('#div_delete').show();
      } else {
        $('#div_overwrite').hide();
        $('#div_delete').hide();
      }
      if (data.show_new === 'yes') {
        $('#div_new').show();
      } else {
        $('#div_new').hide();
      }
    });
  });
});

$(document).ready(function () {
  $("#change_rullsarg").on("click", function (e) {
    $('#div_new').hide();
    $('#div_overwrite').hide();
    $('#div_delete').hide();
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/edit_rullsarg",
      data: $('form').serialize() + "&operation=" + "change",
    }).done(function (data) {
      $('#test_rullsarg').trigger('click');
    });
  });
});

$(document).ready(function () {
  $("#new_rullsarg").on("click", function (e) {
    $('#div_new').hide();
    $('#div_overwrite').hide();
    $('#div_delete').hide();
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/edit_rullsarg",
      data: $('form').serialize() + "&operation=" + "new",
    }).done(function (data) {
      $('#test_rullsarg').trigger('click');
    });
  });
});


$(document).ready(function () {
  $("#delete_rullsarg").on("click", function (e) {
    $('#div_new').hide();
    $('#div_overwrite').hide();
    $('#div_delete').hide();
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/edit_rullsarg",
      data: $('form').serialize() + "&operation=" + "delete",
    }).done(function (data) {
      $('#test_rullsarg').trigger('click');
    });
  });
});