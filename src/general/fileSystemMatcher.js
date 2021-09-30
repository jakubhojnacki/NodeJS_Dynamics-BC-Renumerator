/**
 * @module "FileSystemMatcher" class
 * @description Matches directory / file name to a filter
 * @version 0.0.3 (2021-09-20)
 */

import "./javaScript.js";

export default class FileSystemMatcher {
    get regex() { return this.mRegex; }

	constructor(pFilter) {
        const filter = String.validate(pFilter);
		const pattern = FileSystemMatcher.createPattern(filter);
		this.mRegex = new RegExp(pattern);
	}

	static createPattern(pFilter) {
		let pattern = pFilter;
		const specialCharacters = [".", ",", "+", "!", "^", "$", "=", "<", ">", "|", "(", ")", "[", "]", "{", "}"];
		for (const specialCharacter of specialCharacters)
			pattern = pattern.replace(specialCharacter, "\\" + specialCharacter);
        pattern = pattern.replace("*", ".*");
        pattern = pattern.replace("?", ".");
        return "^" + pattern + "$";
	}

	matches(pName) {
		return this.regex.test(pName);
	}
}
