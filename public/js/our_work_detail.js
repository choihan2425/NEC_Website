let work = {
    "img": "img",
    "title": "title",
    "description": "description",
    "video": "video",
    "bios": "bios"
}

function load_work(work){
    $('#img').attr('src', "img/about/work/" + work.img);
    $('#title').text(work.title);
    $('#description').text(work.description.slice(0,1000));
    console.log(String(work.bios))
    if (work.video) {
        $("#video").attr('href', work.video);
        $("#video").text("VIDEO");
        $("#video").before("<hr style='margin: 10px'>")
    }
    if (String(work.bios)) {
        $("#bios").text(work.bios);
        $("#bios").before("<hr style='margin: 10px'>")
    }
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const work_id = urlParams.get('work_id');

// load_person(person);
$(document).ready(function () {
    console.log(work_id);
    if (work_id) {
        $.getJSON('/get_work_by_id?work_id=' + work_id)
            .done(function (data) {
                if (data["message"] === "success") {
                    work = data["data"];
                    load_work(work);
                }
            });
    }
    $.getJSON('/get_current_user').done((data)=>{
        if(data.message === "success"){
            const user=data.data;
            $('.login').remove();
            $('#showname').text(user.fullname);
            console.log(user)
        } else{
            $('.logout').remove();
        }
    })

});
