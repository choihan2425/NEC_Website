const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get("error")) {
    $('#error_msg').text(urlParams.get("error"));
}

$('form').on('submit', function () {
    const email = $('#email').val()
    const p1 = $('#password').val()
    const p2 = $('#confirm').val()
    const name = $('#fullname').val()
    const brand = $('#brand').val()
    if (email === "") {
        $('#error_msg').text("Email cannot be empty");
        return false
    }
    if (p1.length === 0) {
        $('#error_msg').text("Password cannot be empty");
        return false
    }
    if (p1.length < 5) {
        $('#error_msg').text("Password must be at least 5 characters");
        return false
    }
    if (p2.length <= 0){
        $('#error_msg').text("Confirm Password cannot be empty");
        return false
    }
    if (name.length <= 0){
        $('#error_msg').text("Fullname cannot be empty");
        return false
    }

    if (p1 !== p2) {
        $('#error_msg').text("passwords do not match");
        return false
    }
});

$(document).ready(()=>{
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
})

