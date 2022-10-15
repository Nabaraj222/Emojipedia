const baseURL = 'http://localhost:3000/api/';


if(window.location.pathname == "/"){
    $onDelete = $(".table tbody td a.delete");
    $onDelete.click(function(){
        var id = $(this).attr("data-id");

        var request = {
            "url":baseURL+"users/" + id,
            "method":"DELETE",
        }

        if(confirm("Do you want to delete this record?"))
        {
            $.ajax(request).done(function(response){
                alert("data deleted successfully.")
                location.reload();
            })
        }
    })
}