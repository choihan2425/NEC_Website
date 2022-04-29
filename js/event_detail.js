let event = {
    "title": "Stock Number",
    "date": "Make",
    "path": "aaa",
    "overview": "overview placeholder"
}

function load_event(event){
    $('#event_img').attr('src', "img/events/" + event.path);
    $('#event_title').text(event.title);
    $('#event_date').text(event.date);
    $('#event_overview').text(event.overview);
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const event_id = urlParams.get('event_id');

load_event(event);
$(document).ready(function () {
    console.log(event_id);
    if (event_id) {
        $.getJSON('/get_event_by_id?event_id=' + event_id)
            .done(function (data) {
                if (data["message"] === "success") {
                    event = data["data"];
                    load_event(event);
                }
            });
    }

});