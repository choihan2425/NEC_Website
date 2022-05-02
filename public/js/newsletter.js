test = [
    {
        "title":"Fall 2020 Newsletter",
        "url": "https://mailchi.mp/c51ce7708f4d/a-new-earth-conversation-fall-5071189",
    },
    {
        "title": "Summer 2020 Newsletter",
        "url": "https://mailchi.mp/5ee074a48e4f/a-new-earth-conversation-spring-2552174",
    },
    {
        "title": "Spring 2020 Newsletter",
        "url": "https://us17.campaign-archive.com/?u=625995360e925ce8132137949&id=bb220e6437",
    },
    {
        "title": "Fall 2019 Newsletter",
        "url": "https://us17.campaign-archive.com/?e=[UNIQID]&u=625995360e925ce8132137949&id=458f2c4462",
    },
    {
        "title": "Fall 2018 Newsletter",
        "url": "https://us17.campaign-archive.com/?u=625995360e925ce8132137949&id=4aed2de44a",
    },
    {
        "title": "Spring 2018 Newsletter",
        "url": "https://us17.campaign-archive.com/?u=625995360e925ce8132137949&id=b6ac7572ba",
    },
]

function get_resource_block(resource) {
    return `<li class="list-group-item">
        <h3 ><a style="text-decoration: none;" href="${resource.url}">${resource.title}</a></h3>
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

showList(test)
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