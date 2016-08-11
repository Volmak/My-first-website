							/* ROTATIVE SECTION */
var rotative = document.getElementById('rotative');
var rotateResultImage = rotative.children[0];
var rotateResultName = rotative.children[1];
var rotateResultQuote = rotative.children[2];

var controls = rotative.children[4];
var rotateLeft = controls.children[0];
var rotateOption1 = controls.children[1];
var rotateOption2 = controls.children[2];
var rotateOption3 = controls.children[3];
var rotateRight = controls.children[4];

var pointerR = 4;

controls.addEventListener('click', function (e) {
	
	if (e.target == rotateLeft) {	
		Ajax.request("GET", "server/movies.php", true, function (response) {
			var movies = JSON.parse(response);
			clickRotateLeft(movies);
		}, {});
	}
	if (e.target == rotateOption1) {
		Ajax.request("GET", "server/movies.php", true, function (response) {
			var movies = JSON.parse(response);
			changeRotateImage(movies, pointerR);
		}, {});
	}
	if (e.target == rotateOption2) {
		Ajax.request("GET", "server/movies.php", true, function (response) {
			var movies = JSON.parse(response);
			changeRotateImage(movies, pointerR + 1);
		}, {});
	}
	if (e.target == rotateOption3) {
		Ajax.request("GET", "server/movies.php", true, function (response) {
			var movies = JSON.parse(response);
			changeRotateImage(movies, pointerR + 2);
		}, {});
	}
	if (e.target == rotateRight) {
		Ajax.request("GET", "server/movies.php", true, function (response) {
			var movies = JSON.parse(response);
			clickRotateRight(movies);
		}, {});
	}
}, false);


function clickRotateLeft(movies) {
	if (pointerR > 0) {
		pointerR--;
		rotateOption1.src = "assets/images/" + movies[pointerR].src;
		rotateOption2.src = "assets/images/" + movies[pointerR + 1].src;
		rotateOption3.src = "assets/images/" + movies[pointerR + 2].src;
	}
}
function clickRotateRight(movies) {
	if (pointerR < movies.length - 3) {
		pointerR++;
		rotateOption1.src = "assets/images/" + movies[pointerR].src;
		rotateOption2.src = "assets/images/" + movies[pointerR + 1].src;
		rotateOption3.src = "assets/images/" + movies[pointerR + 2].src;
	}
}
function changeRotateImage(movies, i){
	rotateResultImage.src = 'assets/images/' + movies[i].src;
	rotateResultName.innerHTML = movies[i].name;
	rotateResultQuote.innerHTML = '&lt;&lt;' + movies[i].quote + '&gt;&gt';
}



							/* MORE MOVIES SECTION */

var counterMore = 0;
var moreMovies = document.getElementById('moreMovies');
var moreMoviesBtn = document.getElementById('addMoreMovies');

addMoreMovies();
/*moreMoviesBtn.addEventListener('click', addMovies(), false);*/

function addMoreMovies() {
	Ajax.request("GET", "server/moremovies.php", true, function (response) {
		var unsorted = JSON.parse(response);
		var movies = unsorted.sort(function(a, b){
			 return b.year-a.year;
		});
		/* normally I would use a sorted php array, but this is the first time I sort JS object so I wated to give it a try*/
		
		for(var i = 0; i < 4; i++){
			
			if(counterMore >= movies.lendth) {
				break;
			}
		
			var div = document.createElement('DIV');
			div.className = "movie more";
			
				var imagebox = document.createElement('DIV');
				imagebox.className = "imagebox";
				
					var img = document.createElement('IMG');
					img.src = "assets/images/" + movies[counterMore].src;
					
					var buttons = document.createElement('DIV');
					buttons.className = 'buttons';
			
						var button1 = document.createElement('A');
						var button2 = document.createElement('A');
						var button3 = document.createElement('A');
						
				
							var i1 = document.createElement('I');
							i1.className = "fa fa-eye";
							i1.setAttribute('aria-hidden', 'true');
							i1.innerHTML = '<br>' + movies[counterMore].views;
							
							var i2 = document.createElement('I');
							i2.className = "fa fa-twitch";
							i2.setAttribute('aria-hidden', 'true')
							i2.innerHTML = '<br>' + movies[counterMore].comments;
							
							var i3 = document.createElement('I');
							i3.className = "fa fa-heart-o";
							i3.setAttribute('aria-hidden', 'true')
							i3.innerHTML = '<br>' + movies[counterMore].likes;
				
						button1.appendChild(i1);
						button2.appendChild(i2);
						button3.appendChild(i3);
				
						buttons.appendChild(button1);
						buttons.appendChild(button2);
						buttons.appendChild(button3);
			
					imagebox.appendChild(img)
					imagebox.appendChild(buttons)
					
				var nameField = document.createElement('P');
					
					var movieName = document.createElement('A');
					movieName.className = 'name';
					movieName.href = movies[counterMore].href;
					movieName.innerHTML = movies[counterMore].name;
					
					nameField.appendChild(movieName);
					
				var year = document.createElement('P');
				year.className = "year blurred";
				year.innerHTML = movies[counterMore].year;
	
				div.appendChild(imagebox);
				div.appendChild(nameField);
				div.appendChild(year);
				
			moreMovies.insertBefore(div,moreMoviesBtn);
			
			counterMore++
		};	
	}, {});
}



							/* POPULAR MOVIES SECTION */

var counterPop = 0;
var popMovies = document.getElementById('popMovies');
var popMoviesBtn = document.getElementById('addPopMovies');

addPopMovies();
addPopMovies();
addPopMovies();
/*popMoviesBtn.addEventListener('click', addPopMovies(), false);*/

function addPopMovies() {
	Ajax.request("GET", "server/moremovies.php", true, function (response) {
		var unsorted = JSON.parse(response);
		var movies = unsorted.sort(function(a, b){
			 return b.views-a.views;
		});
		/* this is done on purpose, normally I would use a sorted php array*/
				
		for(var i = 0; i < 2; i++){
			
			if(counterPop >= movies.lendth) {
				break;
			}
		
			var div = document.createElement('DIV');
			div.className = "movie popular";
			
				var imagebox = document.createElement('DIV');
				imagebox.className = "imagebox";
				
					var img = document.createElement('IMG');
					img.src = "assets/images/" + movies[counterPop].src;
					
				imagebox.appendChild(img)
					
				var nameField = document.createElement('P');
					
					var movieName = document.createElement('A');
					movieName.className = 'name';
					movieName.href = movies[counterPop].href;
					movieName.innerHTML = movies[counterPop].name;
					
				nameField.appendChild(movieName);
					
				var rating = document.createElement('P');
				rating.className = "rating";
				
					var stars = document.createElement('IMG');
					var howMany = parseInt(movies[counterPop].rating + 0.5);
						switch (howMany) {
						case 5:	stars.src = "assets/images/stars-5.png";
						break;
						case 4:	stars.src = "assets/images/stars-4.png";
						break;
						case 3:	stars.src = "assets/images/stars-3.png";
						break;
						case 2:	stars.src = "assets/images/stars-2.png";
						break;
						case 1:	stars.src = "assets/images/stars-1.png";
						break;
						case 0:	stars.src = "assets/images/stars-5.png";
						break;
	
						default:stars.innerHTML = 'Unrated';
						break;
						}
				rating.appendChild(stars);
	
				div.appendChild(imagebox);
				div.appendChild(nameField);
				div.appendChild(rating);
				
			popMovies.insertBefore(div,popMoviesBtn);
			
			counterPop++
		};	
	}, {});
}



							/* TESTIMONIALS SECTION */

var testimonials = document.getElementById('testimonials').children[1];
var profLeft = testimonials.children[0];
var profRight = testimonials.children[2];
var profPic = testimonials.children[1];
var profName = testimonials.children[3].children[0];
var profTitle = testimonials.children[3].children[1];
var profTestimony = testimonials.children[3].children[2];
var pointerT = 0;

document.addEventListener('DOMContentLoaded', function() {
	Ajax.request("GET", "server/testimonials.php", true, function (response) {
		var fans = JSON.parse(response);
			profChange(fans);
	}, {});
}, false);

testimonials.addEventListener('click', function (e){
	Ajax.request("GET", "server/testimonials.php", true, function (response) {
		var fans = JSON.parse(response);
  
		if(e.target == profLeft && pointerT > 0) {
			pointerT--;
			profChange(fans);
		}
		if(e.target == profRight && pointerT < fans.length - 1) {
			pointerT++;
			profChange(fans);
		}
	}, {});
}, false);

function profChange(fans) {
	profPic.src = "assets/images/" + fans[pointerT].src;
	profName.innerHTML = fans[pointerT].name;
	profTitle.innerHTML = fans[pointerT].title;
	profTestimony.innerHTML = fans[pointerT].testimony;
}



							/* "MAIL US" SECTION */

var mailSection = document.getElementById('mail');

mailSection.addEventListener('input', function(e){
	
	var label = e.target.parentElement.children[0];
	
	if(e.target.value) {
		label.style.transform = "scale(0.7) translate(0, -1em)";
		label.style.opacity = 0.3;
	} else {
		label.style.transform = "";
		label.style.opacity = "";		
	}
	
}, false);



							/* MAP SECTION */

function initMap() {

    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 40.674, lng: -73.945},
      zoom: 12,
      styles: [
               {
                   "stylers": [
                       {
                           "hue": "#ff1a00"
                       },
                       {
                           "invert_lightness": true
                       },
                       {
                           "saturation": -100
                       },
                       {
                           "lightness": 33
                       },
                       {
                           "gamma": 0.5
                       }
                   ]
               },
               {
                   "featureType": "water",
                   "elementType": "geometry",
                   "stylers": [
                       {
                           "color": "#2D333C"
                       }
                   ]
               }
           ]
    });
};
