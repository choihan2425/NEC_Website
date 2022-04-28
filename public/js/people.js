function get_person_object(person) {
    return `<div class="col-3">
                <img src="${person.img}" alt="" data-p="${person._id}" style="width: 40%">
                <h6>${person.name}</h6>
                <p>${person.role}</p>
                <button type="button" value='${JSON.stringify(event)}'>Show more</button>
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
}

function showAdvisoryTeam(advisory_team) {
    $("#advisory_team").empty();
    advisory_team.forEach((person, idx) => {
        $('#advisory_team').append(get_person_object(person));
    });
}

function showAdvisoryBoard(advisory_board) {
    $("#advisory_board").empty();
    advisory_board.forEach((person, idx) => {
        $('#advisory_board').append(get_person_object(person));
    });
}

function showStudentFellows(student_fellows) {
    $("#student_fellows").empty();
    student_fellows.forEach((person, idx) => {
        $('#student_fellows').append(get_person_object(person));
    });
}