test = [
    {
        "title": "What We Know: The Reality, Risks and Response to Climate Change",
        "url": "http://councilontheuncertainhumanfuture.org/wp-content/uploads/2016/07/AAAS_WhatWeKnow.pdf",
        "overview": "The AAAS Climate Science Panel",
        "photo" : "/img/Readings/reading_1.png"
    },
    {
        "title": "Climate Change Evidence and Causes",
        "url": "http://councilontheuncertainhumanfuture.org/wp-content/uploads/2016/07/RoyalSociety_ClimateChangeEvidenceAndCauses.pdf",
        "overview": "The Royal Society and the National Academy of Sciences (2014)",
        "photo" : "/img/Readings/reading_2.png"

    },
    {
        "title": "Climate Change 2014: Impacts, Adaptation, and Vulnerability",
        "url": "https://www.ipcc.ch/report/ar5/wg2/",
        "overview": "IPCC Working Group II",
        "photo" : "/img/Readings/reading_3.png"

    },
    {
        "title": "Climate Change Impacts in the United States (2014)",
        "url": "http://nca2014.globalchange.gov/",
        "overview": "National Climate Assessment",
        "photo" : "/img/Readings/reading_4.png"

    }
]

function get_resource_block(resource) {
    return `<li class="list-group-item">
<div class="container">
<div class="row">
<div class="col-4">
                                    <img class="img-fluid" src=${resource.photo}>

</div>
<div class="col-8">
        <h3 ><a style="text-decoration: none;" href="${resource.url}">${resource.title}</a></h3>
        <p>${resource.overview}</p>
</div>
</div>
</div>
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