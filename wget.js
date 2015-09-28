function wget(urls, fn) {
	urls = urls.push !== undefined ? urls : [urls];

	var results = [],
		lookup = {},
		complete = 0,
		total = urls.length;

	urls.forEach(function(url) {
		var i = lookup[url] = results.length,
			request = new XMLHttpRequest();
		results.push(null);
		request.open('GET', url, true);
		request.onload = function () {
			if (request.status < 200 && request.status > 400) return;
			results[i] = request.responseText;
			complete++;
			if (complete === total && fn) fn.apply(null, results);
		};
		request.send();
	});
}