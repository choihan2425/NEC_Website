function load_user(user) {
    $('#name').text(user.fullname);

    if (user.likes) {
        user.likes.forEach((event) => {
            console.log(event)
            $('#event_list')
                .append(get_like_block(event))
        })
    }
}

function get_like_block(event) {
    return `<li class="list-group-item">
<div class="container">
<div class="row">
<div class="col-10">
${event.title} ${event.date} 
</div>
</div>
</div></li>`
}


$(document).ready(() => {
    $.getJSON('/get_current_user').done((data) => {
        if (data.message === "success") {
            const user = data.data;
            $('#event_list').empty();
            console.log(user)
            load_user(user)

        } else {
        }
    })
})
