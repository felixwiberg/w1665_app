$(function() {
    $("#HButton").on("click", function () {
      $.ajax({
        type: 'GET',
        url: '/orders',
        datatype: "json", // expecting JSON to be returned

        success: function (result) {
            console.log(result);
            if(result.status == 200){
                self.isEditMode(!self.isEditMode());
                $('#target').html(html);
            }
        },
        error: function(result){
            console.log(result);
        }
      });
    });
  });