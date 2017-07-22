/* Event Data */
let eventData = [{
		date: "2017-07-20",
		eventId: 0,
		event: "Come up with a homework idea",
		description: "Well, yeah, you know. You've got to engage the audience, inspire them to do something if not great than warm at least. Something you'll be glad to check on later."
			},
	{
		date: "2017-07-22",
		eventId: 0,
		event: "Parent's birthday",
		description: "Yeah, both of them. Mom wanted a new bag — have no idea where to get one. Zara? Will see. Anyway, yeah, both of them, same day. Have to check those homeworks though."
			},
	{
		date: "2017-07-22",
		eventId: 1,
		event: "Friends' party",
		description: "Go see some friends since you're visiting Ternopil, grab some beer, talk about life and how everything is shit.",
		participants: [{
				name: "Volodymyr Stoyko",
				url: "https://www.facebook.com/corest",
				avatar: "https://scontent-cdt1-1.xx.fbcdn.net/v/t1.0-9/19959082_10210721389766187_6789533543778955899_n.jpg?oh=204032e8f826891d02c566e5cdcdf384&oe=59C40BCC"
					},
			{
				name: "Gustav Hansen",
				url: "https://randomuser.me/",
				avatar: "https://randomuser.me/api/portraits/men/76.jpg"
					}
				]
			},
	{
		date: "2017-07-25",
		eventId: 0,
		event: "Owerwatch Time",
		description: "Play with friends.",
		participants: [{
				name: "Tracer",
				url: "https://playoverwatch.com/en-us/heroes/tracer/",
				avatar: "https://blzgdapipro-a.akamaihd.net/hero/tracer/hero-select-portrait.png"
					},
			{
				name: "Reaper",
				url: "https://playoverwatch.com/en-us/heroes/reaper/",
				avatar: "https://blzgdapipro-a.akamaihd.net/hero/reaper/hero-select-portrait.png"
					}
				]
			},
	{
		date: "2017-07-23",
		eventId: 0,
		event: "Microsoft Interview",
		description: "Prepare for a Microsoft Interview",
		participants: [{
				name: "Bill Gates",
				url: "https://www.microsoft.com/en-us",
				avatar: "http://news.unl.edu/sites/default/files/Microsoft-PESTEL-Analysis.jpg"
					}
				]
			},
		];


/* Calendar */
class Calendar {
	constructor(element, locale, callback) {
		this.element = element;
		this.locale = locale;
		this.callback = callback;
		moment.locale(locale);
		this.show(moment().year());
	}

	show(year) {
		this.year = year;
		var m, d1, t = [],
			y = '',
			w = 0,
			r = 0,
			n = _.reduce(moment.weekdaysShort(), function (n, ddd) {
				return n += '<div class="ddd" data-ddd="' + ddd + '"></div>';
			}, '');
		for (m = 0; m <= 11; m++) {
			d1 = moment([year, m, 1]);
			t.push('<div class="MMMM">' + moment.months()[m] + '</div>' + n + '<div class="MM"><a href="#" class="' + (year == moment().year() && m == moment().month() && 1 == moment().date() ? 'active ' : '') + 'D" data-d="' + d1.day() + '" data-date="' + year + '-' + ('00' + (m + 1)).slice(-2) + '-01" draggable="false"><span class="num">1</span><div class="content"></div></a>' + _.range(2, d1.daysInMonth() + 1).reduce(function (MM, d) {

				// Format date
				let monthNow = ('00' + (m + 1)).slice(-2);
				let dayNow = ('00' + d).slice(-2);
				let dateNow = `${year}-${monthNow}-${dayNow}`;

				let dateIsInEvents = eventData.findIndex(obj => obj.date === dateNow) == -1 ? false : true; // Trying to find event with current date						

				return MM += '<a href="#" class="' + (year == moment().year() && m == moment().month() && d == moment().date() ? 'active ' : '') + 'D" data-date="' + dateNow + '" draggable="false">' + '<span class="num">' + d + '</span>' + '<div class="content">' + ((dateIsInEvents) ? '<label class="ui green label"></label>' : '') + '</div></a>';
			}, '') + '</div>');
			w = Math.max(w, Math.ceil((d1.day() + d1.daysInMonth()) / 7));
			if (m == 3 || m == 7 || m == 11) {
				y += '<div class="M" data-w="' + w + '">' + t.join('</div><div class="M" data-w="' + w + '">') + '</div>';
				r += w;
				w = 0;
				t = [];
			}
		}

		this.element.innerHTML = '<nav><a href="#" class="nav prev" draggable="false"><svg viewBox="0 0 512 512"><path d="M189.8,349.7c3.1-3.1,3-8,0-11.3L123.4,264H408c4.4,0,8-3.6,8-8c0-4.4-3.6-8-8-8H123.4l66.3-74.4c2.9-3.4,3.2-8.1,0.1-11.2c-3.1-3.1-8.5-3.3-11.4-0.1c0,0-79.2,87-80,88S96,253.1,96,256s1.6,4.9,2.4,5.7s80,88,80,88c1.5,1.5,3.6,2.3,5.7,2.3C186.2,352,188.2,351.2,189.8,349.7z"/></svg></a><div class="title"><strong>' + year + '</strong></div><a href="#" class="nav next" draggable="false"><svg viewBox="0 0 512 512"><path d="M322.2,349.7c-3.1-3.1-3-8,0-11.3l66.4-74.4H104c-4.4,0-8-3.6-8-8c0-4.4,3.6-8,8-8h284.6l-66.3-74.4c-2.9-3.4-3.2-8.1-0.1-11.2c3.1-3.1,8.5-3.3,11.4-0.1c0,0,79.2,87,80,88s2.4,2.8,2.4,5.7s-1.6,4.9-2.4,5.7s-80,88-80,88c-1.5,1.5-3.6,2.3-5.7,2.3C325.8,352,323.8,351.2,322.2,349.7z"/></svg></a></nav><div class="YYYY" data-w="' + r + '">' + y + '</div>';

		this.element.querySelector('.prev').addEventListener('click', () => {
			this.show(--this.year);
		});
		this.element.querySelector('.next').addEventListener('click', () => {
			this.show(++this.year);
		});
		this.element.querySelectorAll('.D>div>label').forEach((element) => element.addEventListener('click', (event) => {
			this.callback(event.target.parentElement.parentElement.getAttribute('data-date')); // костыль: наследник<родитель<родитель<дата
		}));
	}
}

new Calendar(document.getElementById('calendar'), 'en', function (date) {
	$('.ui.modal')
		// initializing
		.modal({
			observeChanges: true, // Fix for bad position
			onShow: function () {
				let eventsForClickedDate = eventData.filter(function (val) {
					return val.date === date;
				});

				let modalEvents = document.getElementById('event-list');
				modalEvents.innerHTML = '';

				let dom = `<i class="close icon"></i>`;

				eventsForClickedDate.forEach(function (ev) {
					dom += `<div class="header">${ev.event}</div><div class="content ${ev.participants ? 'image' : ''}">`;

					if (ev.participants) {
						dom += `<div class="ui tiny image">`;

						ev.participants.forEach(function (user) {
							dom += `<h5><a href="${user.url}" target="_blank">${user.name}</a></h5><img src="${user.avatar}">`;
						});

						dom += `</div>`;
					}

					dom += `<div class="description">${ev.description}</div></div>`;
				});

				dom += `<div class="actions">
									<div class="ui positive right labeled icon button">OK<i class="checkmark icon"></i></div>
								</div>`;

				modalEvents.innerHTML = dom;
			}
		})
		.modal('show');
});