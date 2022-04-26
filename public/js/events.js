function get_event_object(event) {
    return `<div class="container event" data-e="${event._id}"style="padding-bottom: 15px">
                <div class="row" style="">
                <div class="col-lg-5 col-md-6 col-sm-12 image_div">
                    <div class="card" style="height:auto; width: auto;">
                        <img src="img/events/${event.path}" style="max-height:20rem; min-height:15rem">
                    </div>
                </div> 
                <div class="col-lg-7 col-md-6 col-sm-12 description_div d-flex align-items-center">
                    <div>
                        <h3 style="margin-bottom: 0.3rem;">${event.title}</h3>
                        <div style="font-size:large; margin-bottom:0.2rem">${event.date}</div>
                        <button type="button" class="btn btn-light detail-btn" value='${JSON.stringify(event)}' style="background-color: #b5c99a; font-size: 17px">Learn More</button>
                    </div>
                </div> 
            </div>
            </div>`
}

let event_arr = []
$.get("/get_all_events")
    .done(function (data) {
        if (data.message === "success") {
            event_arr = data.data;
            showList(event_arr);
        }
    });

function showList(events) {
    $('#event_list').empty();
    events.forEach((event, idx) => {
        $('#event_list').append(get_event_object(event, idx));
    });

    $('.detail-btn').on('click', function(){
        const event_id = $(this).parents('.event').attr('data-e');
        console.log(event_id);
        location.href = "event_detail.html?event_id=" + event_id;
    });
}
