parseURL = url => {
	let a = document.createElement("a");
	a.href = url;
	console.log(`Port: ${a.port}`);
};

parseURL("http://tutu.ru:8080/do/any.php?a=1&b[]=a&b[]=b#foo");
