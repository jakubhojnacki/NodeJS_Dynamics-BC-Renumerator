/**
 * @module "Authentication" class (abstract)
 * @description Abstract class for all authentications
 * @version 0.0.2 (2021-05-25)
 */

import "../general/javaScript.js";

export default class Authentication  {
	constructor() {
	}

	async toString() {
		return "";
	}

	encodeAuthorisation(pAuthorisation) {
		let encodedAuthorisation = encodeURIComponent(pAuthorisation);
		const encodedAuthorisationBuffer = Buffer.from(encodedAuthorisation, "ascii");
		encodedAuthorisation = encodedAuthorisationBuffer.toString("base64");
		return encodedAuthorisation;
	}
}
