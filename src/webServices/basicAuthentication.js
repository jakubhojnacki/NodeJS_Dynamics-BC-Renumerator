/**
 * @module "BasicAuthentication" class
 * @description Provides functionality to support basic authentication for HTTP(S) protocol
 * @version 0.0.2 (2021-05-25)
 */

import "../general/javaScript.js";
import Authentication from "./authentication.js";

export default class BasicAuthentication extends Authentication {
	get user() { return this.mUser; }
	set user(pValue) { this.mUser = pValue; }
	get password() { return this.mPassword; }
	set password(pValue) { this.mPassword = pValue; }

	constructor(pUser, pPassword) {
		super();
		this.mUser = String.validate(pUser);
		this.mPassword = String.validate(pPassword);
	}

	async toString() {
		let userPassword = `${this.user}:${this.password}`;
		userPassword = Buffer.from(userPassword, "ascii").toString("base64");
		return `Basic ${userPassword}`;
	}
}
