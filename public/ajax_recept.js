$(document).ready(function () {
  $("#test_recept").on("click", function (e) {
    $('#div_new').hide();
    $('#div_overwrite').hide();
    $('#div_delete').hide();
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/test_recept",
      data: $('form').serialize(),
    }).done(function (data) {
      $('#windchill').html(data["Status Windchill"]);
      $('#ancestor').html(data["Status Ancestor"]);
      $('#mothall').html(data["Status Mothåll"]);
      $('#rullhjul').html(data["Status Rullhjul"]);
      $('#rullsarg').html(data["Status Rullsarg"]);
      $('#recipe_name').html(data["Status Receptnamn"]);
      $('#indexhjul').html(data["Status Indexhjul"]);
      if (data.show_overwrite === 'yes') {
        $('#div_overwrite').show();
      } else {
        $('#div_overwrite').hide();
      }
      if (data.show_new === 'yes') {
        $('#div_new').show();
      } else {
        $('#div_new').hide();
      }
      if (data.show_delete === 'yes') {
        $('#div_delete').show();
      } else {
        $('#div_delete').hide();
      }
    });
  });
});

$(document).ready(function () {
  $("#change_recept").on("click", function (e) {
    $('#div_new').hide();
    $('#div_overwrite').hide();
    $('#div_delete').hide();
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/edit_recept",
      data: $('form').serialize() + "&operation=" + "change",
    }).done(function (data) {
      $('#test_recept').trigger('click');
    });
  });
});

$(document).ready(function () {
  $("#new_recept").on("click", function (e) {
    $('#div_new').hide();
    $('#div_overwrite').hide();
    $('#div_delete').hide();
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/edit_recept",
      data: $('form').serialize() + "&operation=" + "new",
    }).done(function (data) {
      $('#test_recept').trigger('click');
    });
  });
});


$(document).ready(function () {
  $("#delete_recept").on("click", function (e) {
    $('#div_new').hide();
    $('#div_overwrite').hide();
    $('#div_delete').hide();
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/edit_recept",
      data: $('form').serialize() + "&operation=" + "delete",
    }).done(function (data) {
      $('#test_recept').trigger('click');
    });
  });
});