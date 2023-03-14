// remove text after the first parenthesis and fix '&' symbols
export function trimCourseTitle(title: string) {
	return title
		.replaceAll('&amp;', '&')
		.replace(/\(.*\)/, '')
		.trim();
}
