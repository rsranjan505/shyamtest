//Add records in localstorage
$('form#userform').submit(function(e) {
    e.preventDefault();
    var name = $("#name").val();
    var address = $("#address").val();
    var gender = $("input[name=gender]").val();
    var image = $('#image')[0].files[0]

    var ele = $("#errormsg");
    if(name == "" || address == "" ){
        ele.text('Name or Address missing');
        ele.css('color','red');
        return 0;
    }
    ele.text("");
    // ele.css('color','red');

    const path = image !=null ? (window.URL || window.webkitURL).createObjectURL(image) :'';
    const user = [{
        name:name,
        address:address,
        gender:gender,
        image:path
        }];
    var newUser = [];
    if(localStorage.getItem('user')){
        preData = localStorage.getItem('user');

        newUser = $.merge(user, JSON.parse(preData));
        // console.log(newUser);
        localStorage.setItem('user',JSON.stringify(newUser));

    }else{
        localStorage.setItem('user',JSON.stringify(user));
    }

    loadData();
});

//Load locastorage data
loadData();
function loadData(){
    local = localStorage.getItem('user');

    if(local !=null){
        var content = `<table class='table'>
        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Image</th>
            <th scope="col">Address</th>
            <th scope="col">Gender</th>
            <th scope="col">Action</th>
            </tr>
        </thead>
        <tbody>`;
        $.each(JSON.parse(local), function(index, element) {
        content += `<><td> ${parseInt(index) + 1} </td>
                    <td> ${element.name} </td>
                    <td><img src="${element.image}"> </img> </td>
                    <td> ${element.address} </td>
                    <td> ${element.gender} </td>
                    <td> <a href="">Edit</a> | <a href="">Delete</a> | <a href="">View</a> </td></tr>`;
        });
        content += "</tbody></table>";
        $('#records').html(content);
    }else{
        var content = `<p>No Data Available</p>`;
    }
    $('#records').html(content);
}


//   console.log(local);
