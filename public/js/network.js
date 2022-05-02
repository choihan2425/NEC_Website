
function get_resource_block(resource) {
    return `<li class="list-group-item">
        <h3 ><a style="text-decoration: none;" href="${resource.url}">${resource.title}</a></h3>
        <p>${resource.overview}</p>
    </li>
    `


}

function showList(list) {
    list.forEach((resource, idx) => {
        console.log(resource, idx)
        $('#networkList')
            .append(get_resource_block(resource))
    })
}

$.get('/get_all_networks').done((data)=>{
    if(data.message ==="success"){
        showList(data.data)
    }
})

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
