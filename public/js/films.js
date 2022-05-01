test = [
    {
        "title": "Under the Surface, Naomi Klein and the Guardian (2016)",
        "url": "https://www.theguardian.com/environment/video/2016/nov/07/naomi-klein-at-the-great-barrier-reef-under-the-surface",
        "overview": "In Under the Surface, a special Guardian film, the award-winning writer and environmental campaigner Naomi Klein travels to the Great Barrier Reef with her son, Toma, to see the impact of coral bleaching caused by climate change. In a personal but also universal story, Klein tells how she wants him to bear witness. "
    },
    {
        "title": "Overview, Planetary Collective (2012)",
        "url": "https://vimeo.com/55073825",
        "overview": "On the 40th anniversary of the famous ‘Blue Marble’ photograph taken of Earth from space, Planetary Collective presents a short film documenting astronauts’ life-changing stories of seeing the Earth from the outside – a perspective-altering experience often described as the Overview Effect."
    },
    {
        "title": "The Importance of Hope, Alistair McIntosh (2008)",
        "url": "http://www.thedolectures.com/alastair-mcintosh-the-importance-of-hope/#.WDTxY3eZORs",
        "overview": "A talk on “death and climate change” by Alistair McInstosh, Scottish writer, environmental activist and scholar. He references his book Hell and High Water: Climate Change, Hope and the Human Condition, considering that politics alone is not enough to tackle the scale and depth of the problem that faces us."
    },
    {
        "title": "Naomi Klein: This Changes Everything, Clark University Climate Change Teach-In Keynote (2016)",
        "url": "http://commons.clarku.edu/videoarchive/225/",
        "overview": "For Naomi Klein, the climate crisis challenges us to abandon the free market ideology of our time, restructure the global economy, and remake our political systems. Either we embrace radical change ourselves or radical changes will be visited upon our physical world. The status quo is no longer an option. Can we pull off these changes in time? Nothing is certain, except that climate change changes everything."
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
        $('#filmsList')
            .append(get_resource_block(resource))
    })
}

showList(test)