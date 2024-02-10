//Add records in localstorage
$('form#userform').submit(function(e) {
    e.preventDefault();

    var name = $("#name").val();
    var address = $("#address").val();
    var gender = $("input[name=gender]:checked").val();
    var image = $('#image')[0].files[0];

    var ele = $("#errormsg");
    if(name == "" || address == "" ){
        ele.text('Name or Address missing');
        ele.css('color','red');
        return 0;
    }
    ele.text("");

    const path = image !=null ? (window.URL || window.webkitURL).createObjectURL(image) :'';

    var id;
    data = getLocalStorageData();
    if(data !=null){
        id = parseInt(data.length) + 1;
    }else{
        id = 1;
    }

    const user = [{
        id:id,
        name:name,
        address:address,
        gender:gender,
        image:path
        }];
    var newUser = [];
    if(localStorage.getItem('user')){
        preData = localStorage.getItem('user');
        newUser = $.merge(user, JSON.parse(preData));
        setLocalStorageData(newUser);

    }else{
        setLocalStorageData(user);
    }

    $("#name").val("");
    $("#address").val("");

    loadData();
});


//Retrieve Records from LocaStorage
function getLocalStorageData(){
    local = localStorage.getItem('user');
    return JSON.parse(local);
}

//Store Records in LocaStorage
function setLocalStorageData(data){
    localStorage.setItem('user',JSON.stringify(data));
}

//Load locastorage data
loadData();
function loadData(data=null){
    if(data == null){
        data = getLocalStorageData();
    }

    if(data !=null){
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
        $.each(data, function(index, element) {
        content += `<tr><td> ${parseInt(index) + 1} </td>
                    <td> ${element.name} </td>
                    <td><img id="img" onclick="downloadImg('${element.image}')" src="${element.image}" width="45px"> </img> </td>
                    <td> ${element.address} </td>
                    <td> ${element.gender} </td>
                    <td> <button class="btn btn-primary" onClick="updateData('${element.id}')">Edit</button> | <button type="button" class="btn btn-danger" onClick="deleteData('${element.id}')">Delete</button> | <a href="">View</a> </td></tr>`;
        });
        content += "</tbody></table>";
        $('#records').html(content);
    }else{
        var content = `<p>No Data Available</p>`;
    }
    $('#records').html(content);
}


//Download Image Dta
// function downloadImg(img){

//     $("<a>").attr("href", img).attr("download", "img.png").appendTo("body").click().remove();
//     alert(img);
// }


//Delete object from local storage
function deleteData(id){
    datas = getLocalStorageData();
    const objWithIdIndex = datas.findIndex((obj) => obj.id == id);

    if (objWithIdIndex > -1) {
        datas.splice(objWithIdIndex, 1);
    }

    setLocalStorageData(datas);
    loadData();

}

//Update data
function updateData(id){
    datas = getLocalStorageData();
    // const objWithIdIndex = datas.findIndex((obj) => obj.id == id);
    const editdata = datas.filter( user => user.id == id );

    var form = `<form id="editform" method="post"  enctype="multipart/form-data">

    <div class="mb-3">
        <label for="formGroupExampleInput" class="form-label">Name</label>
        <input type="text" name="name" id="name" value="${editdata[0].name}" class="form-control" id="formGroupExampleInput" placeholder="Name">
    </div>
    <div class="mb-3">
        <label for="formGroupExampleInput2" class="form-label">Address</label>
        <input type="text" name="address" id="address" value="${editdata[0].address}" class="form-control" id="formGroupExampleInput2" placeholder="Address">
    </div>
    <div class="mb-3">
        <label for="formGroupExampleInput2" class="form-label">Gender</label>
        <div class="form-check">
            <input class="form-check-input" type="radio" name="gender" id="male" value="male" ${editdata[0].gender == 'male' ? 'checked' : ''}>
            <label class="form-check-label" for="exampleRadios1">
              Male
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="gender" id="female" value="female"  ${editdata[0].gender == 'female' ? 'checked' : ''}>
            <label class="form-check-label" for="exampleRadios2">
              Female
            </label>
          </div>
    </div>
    <div class="mb-3">
        <label for="formGroupExampleInput2" class="form-label">Uplod Image</label>
        <input type="file" class="form-control-file" id="image">
    </div>
    <p id="errormsg"></p>
    <div class="mb-3">
        <button type="submit" class="btn btn-primary" id="exampleFormControlFile1">Update</button>
        <button id="cancel" type="button" class="btn btn-primary" >Cancel</button>
    </div>
</form>`;

    $('#form').html(form);

    $('#cancel').click(function() {
        location.reload();
    });

    $('form#editform').submit(function(e) {
        e.preventDefault();
        var name = $("#name").val();
        var address = $("#address").val();
        var gender = $("input[name=gender]:checked").val();
        var image = $('#image')[0].files[0];

        var ele = $("#errormsg");
        if(name == "" || address == "" ){
            ele.text('Name or Address missing');
            ele.css('color','red');
            return 0;
        }
        ele.text("");
        // ele.css('color','red');
        const path = image !=null ? (window.URL || window.webkitURL).createObjectURL(image) :'';

        const objWithIdIndex = datas.findIndex((obj) => obj.id == id);
        datas[objWithIdIndex].name = name;
        datas[objWithIdIndex].address = address;
        datas[objWithIdIndex].gender = gender;
        datas[objWithIdIndex].image = path;

        console.log(datas);

        setLocalStorageData(datas);
        loadData();
    });
}



//Sorting
function sortBy($this){
    var sortby = $($this).val();

    datas = getLocalStorageData();

    if(sortby == 'name'){
        sortedData = datas.sort(function(a,b){
            //convert both to lowercase
            let x = a.name.toLowerCase();
            let y = b.name.toLowerCase();

            //compare the word which is comes first
            if(x>y){return 1;}
                if(x<y){return -1;}
                return 0;
            });
    }else if(sortby == 'id'){
        sortedData = datas.sort(function(a,b){
            return a.id - b.id;
        })
    }else{
        sortedData = datas;
    }

    loadData(sortedData);
}


//   console.log(local);
