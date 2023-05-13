function actionButton(selector, index) {
    $(selector).siblings().removeClass();
    $(selector).eq(index).addClass("action_button");
}
function actionButtonLight(selector, index) {
    $(selector).siblings().removeClass();
    $(selector).eq(index).addClass("action_button_light");
}
function slideShow(query, classItem) {
    fetch(query) 
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            $(classItem).empty();

            for (let item of data.results) {
                let urlImage = "https://image.tmdb.org/t/p/w500/";
                let title;
                let date;
                let months = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
                let average = Math.round(item.vote_average * 10);
                let color;

                item.title == undefined ? title = item.original_name : title = item.title;
                item.release_date == undefined ? date = item.first_air_date : date = item.release_date;

                if (average >= 70) color = '#01b4e4';
                else if (average < 70 && average > 40) color = '#ffff00';
                else if (average < 40) color = '#ff3300';

                $(classItem).append(`
                    <div class="element">
                        <img class="card" src='${urlImage}${item.poster_path}'></img>
                        <div class="cyrcle">
                            <div class="cyrcle__ring" style="background-image: conic-gradient(${color} 0deg, ${color} ${Math.round(average * 3.6)}deg, #0d253f ${Math.round(average * 3.6)}deg)">
                                <div class="cyrcle__ring__inner_cyrcle">
                                    <h5 style="color: white; padding: 5px 0 0 4px">${average}<span style="font-size: 6px">%</span></h5>
                                </div>
                            </div>
                        </div>
                        <div class="content">
                            <p><span>${title}</span></p>
                            <p>${date.split('-')[2]} ${months[date.split('-')[1] - 1]} ${date.split('-')[0]}</p>
                        </div>
                    </div>
                `);
            }
        })
}
function createTrailer(query, classItem) {
    fetch(query) 
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        $(classItem).empty();

        let urlImage = "https://image.tmdb.org/t/p/w500/";
        let urlVideo;
        let videoTitle

        for (let item of data.results) {
            let movieIMBD = `https://api.themoviedb.org/3/movie/${item.id}?api_key=6634c10a92a48984040a05947244d10f&language=en-US`;

            fetch(movieIMBD)
            .then((responseIMBD) => {
                return responseIMBD.json();
            })
            .then((dateIMBD) => {
                let trailer = `https://imdb-api.com/en/API/YouTubeTrailer/k_vxwner29/${dateIMBD.imdb_id}`;

                fetch(trailer)
                .then((responseTrailer) => {
                    return responseTrailer.json();
                })
                .then((dateTrailer) => {
                    urlVideo = dateTrailer.videoUrl;
                    videoTitle = dateTrailer.title;

                    console.log(videoTitle);

                    $(classItem).append(`
                    <div class="item_card">
                        <a class="openVideo"><video width="300" height="170" controls src="${urlVideo}">Видео не доступно</video></a>
                        <h5 style="color: white; padding: 5px 0 0 4px">${item.title}</h5>
                        <p>${videoTitle}</p>
                    </div>
                    `);
                })
            })
        }
    })
}

$('video').click(function() {
    this.width = 1000;
    this.height = 600;
})
//<img width="300" height="170" src='${urlImage}${item.backdrop_path}'></img>
$(document).ready(function() {
    $('#item1').mouseenter(function() {
        $('#menu1').css("display", "block")
    })
})
$(document).ready(function() {
    $('#menu1').mouseleave(function() {
        $('#menu1').css("display", "none")
    })
})

$(document).ready(function() {
    $('#item2').mouseenter(function() {
        $('#menu2').css("display", "block")
    })
})
$(document).ready(function() {
    $('#menu2').mouseleave(function() {
        $('#menu2').css("display", "none")
    })
})

$(document).ready(function() {
    $('#item3').mouseenter(function() {
        $('#menu3').css("display", "block")
    })
})
$(document).ready(function() {
    $('#menu3').mouseleave(function() {
        $('#menu3').css("display", "none")
    })
})

$(document).ready(function() {
    $('#item4').mouseenter(function() {
        $('#menu4').css("display", "block")
    })
})
$(document).ready(function() {
    $('#menu4').mouseleave(function() {
        $('#menu4').css("display", "none")
    })
})

let trends = "https://api.themoviedb.org/3/trending/all/day?api_key=6634c10a92a48984040a05947244d10f&language=ru";
slideShow(trends, '.trends__cards');

let treylers = "https://api.themoviedb.org/3/discover/movie?api_key=6634c10a92a48984040a05947244d10f&language=ru&sort_by=popularity.desc&with_watch_monetization_types=buy";
createTrailer(treylers, '.treylers__cards');

let popular = "https://api.themoviedb.org/3/discover/movie?api_key=6634c10a92a48984040a05947244d10f&language=ru&sort_by=popularity.desc&with_watch_monetization_types=buy";
slideShow(popular, '.popular__cards');

let free = "https://api.themoviedb.org/3/discover/movie?api_key=6634c10a92a48984040a05947244d10f&language=ru&sort_by=popularity.desc&with_watch_monetization_types=free";
slideShow(free, '.free__cards');

for (let item of $('.green_line')) {
    let num = Math.round(parseInt(item.querySelector('p').innerHTML));
    item.style.width = num / 2 + "px";
}

for (let item of $('.red_line')) {
    let num = Math.round(parseInt(item.querySelector('p').innerHTML));
    item.style.width = num * 15 + "px";
}

$(".trends__buttons__container button").eq(0).click(function() {
    let query = "https://api.themoviedb.org/3/trending/all/day?api_key=6634c10a92a48984040a05947244d10f&language=ru";

    actionButton(".trends__buttons__container button", 0);
    slideShow(query, '.trends__cards');
});
$(".trends__buttons__container button").eq(1).click(function() {
    let query = "https://api.themoviedb.org/3/trending/all/week?api_key=6634c10a92a48984040a05947244d10f&language=ru";

    actionButton(".trends__buttons__container button", 1);
    slideShow(query, '.trends__cards');
});

$(".treylers__buttons__container button").eq(0).click(function() {
    let query = "https://api.themoviedb.org/3/discover/movie?api_key=6634c10a92a48984040a05947244d10f&language=ru&sort_by=popularity.desc&with_watch_monetization_types=buy";

    actionButtonLight(".treylers__buttons__container button", 0);
    createTrailer(query, '.treylers__cards');
});
$(".treylers__buttons__container button").eq(1).click(function() {
    let query = "https://api.themoviedb.org/3/discover/tv?api_key=6634c10a92a48984040a05947244d10f&language=ru&sort_by=popularity.desc";

    actionButtonLight(".treylers__buttons__container button", 1);
    createTrailer(query, '.treylers__cards');
});
$(".treylers__buttons__container button").eq(2).click(function() {
    let query = "https://api.themoviedb.org/3/discover/movie?api_key=6634c10a92a48984040a05947244d10f&language=ru&sort_by=popularity.desc&with_watch_monetization_types=rent";

    actionButtonLight(".treylers__buttons__container button", 2);
    createTrailer(query, '.treylers__cards');
});
$(".treylers__buttons__container button").eq(3).click(function() {
    let query = "https://api.themoviedb.org/3/discover/movie?api_key=6634c10a92a48984040a05947244d10f&language=ru&sort_by=popularity.desc&primary_release_date.gte=2023-01-01&primary_release_date.lte=2023-02-15";

    actionButtonLight(".treylers__buttons__container button", 3);
    createTrailer(query, '.treylers__cards');
});

$(".popular__buttons__container button").eq(0).click(function() {
    let query = "https://api.themoviedb.org/3/discover/movie?api_key=6634c10a92a48984040a05947244d10f&language=ru&sort_by=popularity.desc&with_watch_monetization_types=buy";

    actionButton(".popular__buttons__container button", 0);
    slideShow(query, '.popular__cards');
});
$(".popular__buttons__container button").eq(1).click(function() {
    let query = "https://api.themoviedb.org/3/discover/tv?api_key=6634c10a92a48984040a05947244d10f&language=ru&sort_by=popularity.desc";

    actionButton(".popular__buttons__container button", 1);
    slideShow(query, '.popular__cards');
});
$(".popular__buttons__container button").eq(2).click(function() {
    let query = "https://api.themoviedb.org/3/discover/movie?api_key=6634c10a92a48984040a05947244d10f&language=ru&sort_by=popularity.desc&with_watch_monetization_types=rent";

    actionButton(".popular__buttons__container button", 2);
    slideShow(query, '.popular__cards');
});
$(".popular__buttons__container button").eq(3).click(function() {
    let query = "https://api.themoviedb.org/3/discover/movie?api_key=6634c10a92a48984040a05947244d10f&language=ru&sort_by=popularity.desc&primary_release_date.gte=2023-01-01&primary_release_date.lte=2023-02-15";
    
    actionButton(".popular__buttons__container button", 3);
    slideShow(query, '.popular__cards');
});

$(".free__buttons__container button").eq(0).click(function() {
    let query = "https://api.themoviedb.org/3/discover/movie?api_key=6634c10a92a48984040a05947244d10f&language=ru&sort_by=popularity.desc&with_watch_monetization_types=free";

    actionButton(".free__buttons__container button", 0);
    slideShow(query, '.free__cards');
});
$(".free__buttons__container button").eq(1).click(function() {
    let query = "https://api.themoviedb.org/3/discover/movie?api_key=6634c10a92a48984040a05947244d10f&language=ru&sort_by=popularity.desc&with_watch_monetization_types=free&without_keywords=serials";

    actionButton(".free__buttons__container button", 1);
    slideShow(query, '.free__cards');
});