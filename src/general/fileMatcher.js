/**
 * @module "FileMatcher" class
 * @description Matches file name to a filter
 * @version 0.0.2 (2021-08-29)
 */

import "./javaScript.js";

export default class FileMatcher {
    get regex() { return this.mRegex; }

	constructor(pFilter) {
        const filter = String.validate(pFilter);
		const pattern = FileMatcher.createPattern(filter);
		this.mRegex = new RegExp(pattern);
	}

	static createPattern(pFilter) {
		let pattern = pFilter;
		const specialCharacters = [".", ",", "+", "!", "^", "$", "=", "<", ">", "|", "(", ")", "[", "]", "{", "}"];
		for (const specialCharacter of specialCharacters)
			pattern = pattern.replace(specialCharacter, "\\" + specialCharacter);
        pattern = pattern.replace("*", ".*");
        pattern = pattern.replace("?", ".");
        return pattern;
	}

	matches(pName) {
		return this.regex.test(pName);
	}
}
