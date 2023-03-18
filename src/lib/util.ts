// remove text after the first parenthesis and fix '&' symbols
export function fixXmlText(title: string) {
	return title
		.replaceAll('&amp;amp;', '&') // this is a cry for help
		.replaceAll('&amp;', '&')
		.replace(/\(.*\)/, '') // TODO: get rid of this only for course names
		.trim();
}
