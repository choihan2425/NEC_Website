function get_person_object(person) {
    return `<div class="col-3 person" data-p="${person._id}">
                <img src="img/about/people/${person.img}" alt="" style="width: 60%">
                <h6>${person.name}</h6>
                <p>${person.role}</p>
                <button type="button" class="btn btn-light detail-btn show_more_btn" value='${JSON.stringify(person)}' style="background-color: #b5c99a; font-size: 17px">Show more</button>
            </div>`
}


let event_arr =[]
$.get('/get_all_people')
    .done(function (data) {
        if (data.message === "success") {
            event_arr = data.data;
            staff = event_arr.slice(0,2);
            advisory_team = event_arr.slice(2,10);
            advisory_board = event_arr.slice(10,12);
            student_fellows = event_arr.slice(12,14)
            showStaff(staff);
            showAdvisoryTeam(advisory_team);
            showAdvisoryBoard(advisory_board);
            showStudentFellows(student_fellows);
    }
});

function showStaff(staff) {
    $("#staff").empty();
    staff.forEach((person, idx) => {
        $('#staff').append(get_person_object(person));
    });

    $('.show_more_btn').on('click', function(){
        const person_id = $(this).parents('.person').attr('data-p');
        console.log(person_id);
        location.href = "person_detail.html?person_id=" + person_id;
    });
}

function showAdvisoryTeam(advisory_team) {
    $("#advisory_team").empty();
    advisory_team.forEach((person, idx) => {
        $('#advisory_team').append(get_person_object(person));
    });

    $('.show_more_btn').on('click', function(){
        const person_id = $(this).parents('.person').attr('data-p');
        console.log(person_id);
        location.href = "person_detail.html?person_id=" + person_id;
    });
}

function showAdvisoryBoard(advisory_board) {
    $("#advisory_board").empty();
    advisory_board.forEach((person, idx) => {
        $('#advisory_board').append(get_person_object(person));
    });

    $('.show_more_btn').on('click', function(){
        const person_id = $(this).parents('.person').attr('data-p');
        console.log(person_id);
        location.href = "person_detail.html?person_id=" + person_id;
    });
}

function showStudentFellows(student_fellows) {
    $("#student_fellows").empty();
    student_fellows.forEach((person, idx) => {
        $('#student_fellows').append(get_person_object(person));
    });

    $('.show_more_btn').on('click', function(){
        const person_id = $(this).parents('.person').attr('data-p');
        console.log(person_id);
        location.href = "person_detail.html?person_id=" + person_id;
    });
}

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