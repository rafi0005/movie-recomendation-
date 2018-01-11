let app = {
    URL: 'https://api.themoviedb.org/3/',
    INPUT: null,
    init: function () {
         
        app.INPUT = document.getElementById('search-input');
        app.INPUT.focus();
         
        let btn = document.getElementById('search-button');
        btn.addEventListener('click', app.runSearch);

        let bkbtn = document.getElementById('back-button');
        bkbtn.addEventListener('click', function () {
            innerHTML = "";
            location.reload();
        });

        //listener for enter or return
        document.addEventListener('keypress', function (ev) {
            let char = ev.char || ev.charCode || ev.which;
            if (char == 10 || char == 13) {
                //they hit <enter> or <return>
                btn.dispatchEvent(new MouseEvent('click'));
            }
        })
    },
    
    
    runSearch: function (ev) {
        ev.preventDefault();
        if (app.INPUT.value) {
            let url = app.URL + "search/movie?api_key=" + KEY;
            url += "&query=" + app.INPUT.value;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    app.showMovies(data.results);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    showMovies: function (movies) {
        //naviage to the search-results page...
        let section = document.querySelector('#search-results .content');
        let df = document.createDocumentFragment();
        section.innerHTML = "";

        movies.forEach(function (movie) {

            let div = document.createElement('div');

            //div.addEventListener('click', app.getRecommended);
            div.classList.add('movie');

            let h2 = document.createElement('h2');
            h2.textContent = movie.title;
            h2.classList.add("movie-title");
            h2.addEventListener('click', app.getRecommended);
            h2.setAttribute("data-movie", movie.id);

            let p = document.createElement('p');
            p.classList.add("movie-desc");
            //p.textContent = movie.overview;
            if (movie.overview.length > 250) {
                p.textContent = ''.concat('Overview:', movie.overview.substr(0, 250), '....')
            } else {
                p.textContent = movie.overview;
            }
           

            let img = document.createElement('img');
            img.src = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
            img.alt = "Movie Poster";

            img.className = "poster";
            div.appendChild(h2);
            div.appendChild(img);
            div.appendChild(p);
            
            df.appendChild(div);
           

        });
        section.appendChild(df);
        document.querySelector('#search-results').classList.add('active');
        document.querySelector('.searchbar').classList.add('searchbar-top');

    },
    getRecommended: function (ev) {
        let movie_id = ev.target.getAttribute("data-movie");
        console.log(ev.target.tagName, movie_id);
        ev.preventDefault();
        let url = app.URL + "movie/" + movie_id + "/recommendations?api_key=" + KEY;
    
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                app.showRecommended(data.results);
            })
            .catch(err => {
                console.log(err);
            });
    },
    showRecommended: function(movies){
        
       let section = document.querySelector('#recommended-results .content');
        let df = document.createDocumentFragment();
        section.innerHTML = "";
		let h4=document.createElement('h4');
		h4.textContent='';
        movies.forEach(function(movie){
            let div = document.createElement('div');
            div.classList.add('movie');
            let h2 = document.createElement('h2');
            h2.textContent = movie.title;
			h2.classList.add("movie-title"); 
            let p =  document.createElement('p');
             p.classList.add = ("movie.desc");
			p.textContent =movie.overview;
			if(movie.overview.length>250){
				p.textContent=''.concat('overview:',movie.overview.substr(0,250,'') )
			}else{
				p.textContent=movie.overview;
			}
           
			let h2r = document.createElement('h4');
            h2r.textContent = movie.release_date;
			h2r.classList.add("movie-release");
           
			
            let imge =document.createElement('img');
            imge.classList.add('poster_recomended');
			imge.src= "https://image.tmdb.org/t/p/w185"+movie.poster_path;
			
            
            div.appendChild(h2);
			
			div.appendChild(imge);
			div.appendChild(h2r);
			
            
             
			section.appendChild(h4);
			
           div.appendChild(p);
            
            df.appendChild(div);
			
			
        });
       section.appendChild(df);
    }
    
};

document.addEventListener('DOMContentLoaded', app.init);
