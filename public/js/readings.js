test = [
    {
        "title": "What We Know: The Reality, Risks and Response to Climate Change",
        "url": "http://councilontheuncertainhumanfuture.org/wp-content/uploads/2016/07/AAAS_WhatWeKnow.pdf",
        "overview": "The AAAS Climate Science Panel"
    },
    {
        "title": "Climate Change Evidence and Causes",
        "url": "http://councilontheuncertainhumanfuture.org/wp-content/uploads/2016/07/RoyalSociety_ClimateChangeEvidenceAndCauses.pdf",
        "overview": "The Royal Society and the National Academy of Sciences (2014)"
    },
    {
        "title": "Climate Change 2014: Impacts, Adaptation, and Vulnerability",
        "url": "http://ipcc-wg2.gov/AR5/",
        "overview": "IPCC Working Group II"
    },
    {
        "title": "Climate Change Impacts in the United States (2014)",
        "url": "http://nca2014.globalchange.gov/",
        "overview": "National Climate Assessment"
    }
]

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
        $('#readingsList')
            .append(get_resource_block(resource))
    })
}

showList(test)