$(document).ready(function(){

  var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

  function getChannelInfo(channel){
    $.ajax({
      type: 'GET',
      url: "https://wind-bow.gomix.me/twitch-api/channels/" + channel,
      dataType: "jsonp",
      success: function(data){
        //console.log(data);
        var image = '<th scope="row"><img class="img-responsive" src="' + data.logo + '"></th>';
        var name = '<td><a href="' + data.url + '" target="_blank">' + data.display_name + '</a></td>';
        var status = '';

        if (data.status !== null){
          status = '<td><em>' + data.status + '</em></td>';
        } else {
          status = '<td></td>';
        }

        var channelRowBeforeStream = image + name + status;

        $.ajax({
            type: 'GET',
            url: "https://wind-bow.gomix.me/twitch-api/streams/" + channel,
            dataType: "jsonp",
            success: function(channelStream){

              if(channelStream.stream !== null){
                $('.table tbody').append('<tr class="online">' + channelRowBeforeStream + '</tr>');
              }
              else {
                $('.table tbody').append('<tr class="offline">' + channelRowBeforeStream + '</tr>');
              }
            },
            error: function (errorMessage) {
            }
          });

          },
          error: function (errorMessage) {
          }
        });
  }

  for (var i=0; i<channels.length; i++){
    getChannelInfo(channels[i]);
  }

  $('.btn.online').on('click', function(){
    $('.table tr.offline').fadeOut(function(){
      $('.table tr.online').fadeIn();
    });
    $('.btn').removeClass('selected');
    $(this).addClass('selected');

  });

  $('.btn.all').on('click', function(){
    $('.table tr.offline, .table tr.online').fadeIn();
    $('.btn').removeClass('selected');
    $(this).addClass('selected');
  });

  $('.btn.offline').on('click', function(){
    $('.table tr.online').fadeOut(function(){
      $('.table tr.offline').fadeIn();
    });
    $('.btn').removeClass('selected');
    $(this).addClass('selected');
  });

});

function searchNames() {
  var input, filter, table, tr, td, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
