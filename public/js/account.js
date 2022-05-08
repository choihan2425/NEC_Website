function load_user(user) {
    $('#name').text(user.fullname);

    if (user.likes) {
        user.likes.forEach((event) => {
            console.log(event)
            $('#event_list')
                .append(get_like_block(event))
        })
    }
    $('.detail-btn').on('click', function(){
        const event_id = $(this).attr('data-e');
        console.log(event_id);
        location.href = "event_detail.html?event_id=" + event_id;
    });
}

function get_like_block(event) {
    return `<li class="list-group-item">
<div class="container">
<div class="row">
<div class="col-6">
${event.title} 
</div>
<div class="col-4">${event.date} </div>
<div class="col-2">
<button type="button" class="btn btn-light detail-btn" data-e="${event.id}" style="background-color: #b5c99a; font-size: 17px">Details</button>
</div>
</div>
</div></li>`
}


$(document).ready(() => {
    $.getJSON('/get_current_user').done((data) => {
        if (data.message === "success") {
            const user = data.data;
            console.log(user)
            load_user(user)

        } else {
        }
    })
})
