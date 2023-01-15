$(document).ready(function () {


})



function fetch() {

    $.getJSON('http://localhost:8080/home/data',
        function (data) {
            var details = '';

            $.map(data, function (value) {
                details = details + '<tr>' + '<td>' +
                    value._id + '</td>' + '<td>' +
                    value.Name + '</td>' + '<td>' +
                    value.date + '</td>' + '<td>' +
                    value.time + '</td><td ><button  data-attr="' + value._id + '" class="delete">delete</button></td></tr>';
            });
            $('#table').append(details);

            $(".delete").on('click', function () {
                var deletedid = $(this).attr('data-attr')
                deleteRow(deletedid)

                $(this).parent().parent().hide()
            })

        });
}


function deleteRow(id) {

    // alert('Are u sure!..')
    $.ajax({
        url: `http://localhost:8080/home/delete/${id}`,
        type: "GET",
        success: function (data) {
            console.log('success', data)
            $("#table").on('click', '#delete', function () {
                $(this).remove()
            })
        },
        error: function () {
            console.log("error")
        }
    })
}



function fetchOne() {
     alert ("today");
    $.getJSON('http://localhost:8080/home/data/date',
        function (data) {
            var details = '';

            $.map(data, function (value) {
                details = details + '<tr>' + '<td>' +
                    value._id + '</td>' + '<td>' +
                    value.Name + '</td>' + '<td>' +
                    value.date + '</td>' + '<td>' +
                    value.time + '</td><td ><button  data-attr="' + value._id + '" class="reminder">Set Reminder</button></td></tr>';
            });
            $('#tableOne').append(details);
            // $("#specific").on('click', function () {
            //     alert("today matched...");
            // })
        });
}
