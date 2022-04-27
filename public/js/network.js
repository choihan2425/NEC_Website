test = [
    {
        "title": "The Yale Forum on Religion and Ecology",
        "url": "http://fore.yale.edu/",
        "overview": "The Forum on Religion and Ecology is the largest international multi-religious project of its kind. Through conferences, publications, and websites, its members explore religious worldviews, texts, and ethics toward an understanding of the complex nature of current environmental concerns. Mary Evelyn Tucker (national Council member) and John Grim at Yale University serve as conveners."
    },
    {
        "title": "350.org",
        "url": "https://350.org/",
        "overview": "350* is a global grassroots climate movement to hold leaders accountable to the realities of science and the principles of justice. That movement is rising from the bottom up all over the world, and is uniting to create the solutions that will ensure a better future for all; online campaigns, grassroots organizing, and mass public actions bring together a global network active in over 188 countries. It was founded by leading climate activist Bill McKibben."
    },
    {
        "title": "Better Future Project",
        "url": "http://www.betterfutureproject.org/",
        "overview": "An affiliated group of 350.org, the Better Future Project is based in Massachusetts, and works to build a powerful grassroots movement to move beyond oil, coal and gas. They empower new leaders through training, coaching and support; connect activists to each other through networks like 350.org; and activate citizens through hard-hitting campaigns for climate justice. Juliet Schor (Boston College) serves as Chair of the Board, and Craig Altemose is the Executive Director."
    },
    {
        "title": "The Next System Project",
        "url": "http://thenextsystem.org/",
        "overview": "The Next System Project is an ambitious multi-year initiative aimed at thinking boldly about what is required to deal with the systemic challenges the United States. Today’s political economic system is not aimed at the wellbeing of people, place and planet; its priorities are corporate profits, the growth of GDP, and the projection of national power. There are alternatives that can lead to the systemic change we need. Building on innovative thinking and practical experience with new economic approaches, there can be a “next system,” a new political economy that serves humanity and the planet. The project is co-chaired by Gar Alperowitz and Gus Speth."
    }
]

function get_resource_block(resource) {
    return `<li class="list-group-item">
        <h3><a href="${resource.url}">${resource.title}</a></h3>
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

showList(test)