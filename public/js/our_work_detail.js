let work = {
    "img": "img",
    "description": "description"
}

function load_work(work){
    $('#img').attr('src', "img/about/people/" + work.img);
    $('#description').text(work.description);
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