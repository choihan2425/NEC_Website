let work = {
    "img": "img",
    "description": "description",
    "video": "video",
    "bios": "bios"
}

function load_work(work){
    $('#img').attr('src', "img/about/work/" + work.img);
    $('#description').text(work.description.slice(0,1000));
    console.log(String(work.bios))
    if (String(work.video)) {
        $("#video").attr('href', work.video);
        $("#video").text("VIDEO");
        $("#line_video").remove();
    }
    if (String(work.bios)) {
        $("#bios").text(work.bios);
        $("#line_bios").remove();
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

});