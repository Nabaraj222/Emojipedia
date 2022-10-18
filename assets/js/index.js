const baseURL = 'http://localhost:3000/api/';


if (window.location.pathname == "/") {
    $onDelete = $(".table tbody td a.delete");
    $onDelete.click(function () {
        var id = $(this).attr("data-id");

        var request = {
            "url": baseURL + "emoji/" + id,
            "method": "DELETE",
        }

        if (confirm("Do you want to delete this record?")) {
            $.ajax(request).done(function (response) {
                alert("data deleted successfully.")
                location.reload();
            })
        }
    })
}

$("#update_emoji").submit(function (event) {
    event.preventDefault();
    var unindexed_array = $(this).serializeArray();
    var data = {};

    $.map(unindexed_array, function (n, i) {
        data[n['name']] = n['value'];
    })

    var request = {
        "url": baseURL + "emoji/" + data.id,
        "method": "put",
        "data": data
    }

    $.ajax(request).done(function (response) {
        alert("data updated successfully.");
    })

    console.log(data);
})