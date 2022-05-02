function getCurrCourse(course, idx){
    return`<div class="accordion-item">
                <h2 class="accordion-header" id="${course._id}">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${idx}" aria-expanded="false" aria-controls="flush-collapse${idx}">
                        <span>${course.code} |&nbsp;</span><br>
                        <span><strong>${course.title}</strong></span>
                        <span style="font-style: italic;">&nbsp;-&nbsp;${course.instructor}</span>
                    </button>
                </h2>
                <div id="flush-collapse${idx}" class="accordion-collapse collapse" aria-labelledby="${course._id}" data-bs-parent="#currColCourses">
                    <div class="accordion-body">
                        ${course.description}
                    </div>
                </div>
            </div>`
}

function getPastCourse(course){
    return`<p style="font-size: medium;">
                ${course.code}&nbsp;|&nbsp;<strong>${course.title}</strong><span style="font-style: italic;">&nbsp;-&nbsp;${course.instructor}</span>
           </p>`
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

let curr_course_arr = []
$.get("/get_current_courses")
    .done(function (data) {
        console.log(data);
        if (data.message === "success") {
            curr_course_arr = data.data;
            showCurrList(curr_course_arr);
        }
    });

let past_course_arr=[]
$.get("/get_past_courses")
    .done(function (data) {
        if (data.message === "success") {
            past_course_arr = data.data;
            showPastList("f21");
            showPastList("s21");
            showPastList("f20");
            showPastList("s20");
            showPastList("f19");
            showPastList("s19");
            showPastList("f18");

        }
    });


// saving course list of a certain term into an array
function getList(period){
    let period_courses = [] // courses list for a particular period
    past_course_arr.forEach((course)=>{
        if (course.period === period){
            period_courses.push(course);
        }
    });
    return period_courses;
}

function showPastList(period) { // period = f21 through f19
    const courses = getList(period); // list of the courses of certain period

    // adding html element of each course to the website
    let label= 0;
    courses.forEach((course) => {
        if(course.type === 'c'){
            label = '#' + period + ' .accordion-body .collaborative';
            console.log('collective');
            $(label).append(getPastCourse(course));
        } else{ // course.type === 'a'
            label = '#' + period + ' .accordion-body .affiliate';
            console.log('affiliate');
            $(label).append(getPastCourse(course));
        }
    });
}

function showCurrList(courses) {
    $('#event_list').empty();
    courses.forEach((course, idx) => {
        $('#currColCourses').append(getCurrCourse(course, idx));
    });
}

