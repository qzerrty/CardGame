setTimeout(()=>{
	document.querySelector('.pre-loader').style['opacity'] = '0';
	setTimeout(()=>{
		document.querySelector('.pre-loader').style['display'] = 'none';
		document.querySelector('.container-pre-loader').style['display'] = 'none';
	},400)
}, 500)

function openBlock(block) {
	document.querySelector(block).style['transform'] = 'translateY(0)';
}
function closeBlock(block) {
	document.querySelector(block).style['transform'] = 'translateY(-100%)';
}

var currentTheme = localStorage.theme;
if (localStorage.theme == null || localStorage.theme == undefined || localStorage.theme == 'undefined') {
	currentTheme = 'light-theme.css';
}
changeTheme(currentTheme);

function changeTheme(theme) {
	currentTheme = theme;
	localStorage.theme = theme;
	document.querySelector('#link').setAttribute('href', theme);
	let b1 = document.querySelector('#flrB');
	let a1 = document.querySelector('#flrA');
	let b2 = document.querySelector('#slrB');
	let a2 = document.querySelector('#slrA');
	if (theme == 'light-theme.css') {
		b1.style['background-color'] = '#15E341';
		a1.style['left'] = '139px';
		b2.style['background-color'] = 'rgba(0,0,0,0.2)';
		a2.style['left'] = '103px';
	} else if (theme == 'dark-theme.css') {
		b2.style['background-color'] = '#15E341';
		a2.style['left'] = '139px';
		b1.style['background-color'] = 'rgba(240,240,240,0.5)';
		a1.style['left'] = '103px';
	}
	changeSize(localStorage.field);
}

if (localStorage.field == null || localStorage.field == undefined || localStorage.field == 'undefined') {
	localStorage.field = 16;
}
changeSize(localStorage.field);

function changeSize(count) {
	let color1,color2;
	localStorage.field = count;
	if (currentTheme == 'light-theme.css') {
		color1 = '#092109';
		color2 = '#777';
	} else if (currentTheme == 'dark-theme.css') {
		color1 = '#eee';
		color2 = '#aaa';
	}
	if (localStorage.field == 16) {
		document.querySelector(`.h${localStorage.field}`).style['color'] = color1;
		document.querySelector(`.h${localStorage.field-1+21}`).style['color'] = color2;
	} else if (localStorage.field == 36) {
		document.querySelector(`.h${localStorage.field}`).style['color'] = color1;
		document.querySelector(`.h${localStorage.field-20}`).style['color'] = color2;
	}
}

function generate() {
	for (let i = 0;i<localStorage.field;i++) {
		document.querySelector('.block').innerHTML += '<div class="card" onclick="openCard(this)"><div class="front"></div><div class="back"></div></div>';
	}
	document.querySelector('.block').style['display'] = 'flex';
	document.querySelector('.timer').style['display'] = 'block';
	document.querySelector('.container .list').style['display'] = 'none';

	if (localStorage.field == 36) {
		document.querySelectorAll('.card').forEach(c=>{
			if (window.innerWidth > 540) {
				c.style['width'] = '60px';
				c.style['height'] = '60px';
			} else if (window.innerWidth <= 540) {	
				c.style['width'] = '11vw';
				c.style['height'] = '11vw';
			}
		})
	} else if (localStorage.field == 16) {
		document.querySelectorAll('.card').forEach(c=>{
			if (window.innerWidth > 540) {
				c.style['width'] = '100px';
				c.style['height'] = '100px';
			} else if (window.innerWidth <= 540) {	
				c.style['width'] = '18vw';
				c.style['height'] = '18vw';
			}
		})
	}

	start();
}