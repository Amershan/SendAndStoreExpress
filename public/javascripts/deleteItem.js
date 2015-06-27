function sendDeleteReq(obj){
   if (obj.checked) {
        $.ajax({
            //url: 'http://localhost:3000/box?' + $.param({'id': obj.id}),
            url: 'http://localhost:3000/box',
            type: 'DELETE',
            dataType: 'json',
            data:{'id': obj.id},
            success: function (data, textStatus, xhr) {
                console.log(data);
                location.reload();
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log('Error in Operation');
                console.log(xhr, textStatus, errorThrown);
            }
        });
   }else {
       return
   }
} 