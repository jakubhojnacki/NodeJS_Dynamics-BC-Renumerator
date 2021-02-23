/**
 * @module JavaScript extensions
 * @description A series of useful language extensions
 * @version 0.0.2 (2021-02-19)
 */

Array.default = function(pValue, pDefault) {
	return pValue != null ? pValue : (pDefault != null ? pDefault : []);
}

Array.isNonEmpty = function(pArray) {
	return ((pArray != null) && (Array.isArray(pArray)) && (pArray.length > 0));
}

Array.prototype.clone = function() {
	return this.slice(0);
};

Boolean.default = function(pValue, pDefault) {
	return pValue != null ? pValue : (pDefault != null ? pDefault : false);
}

Boolean.tryToParse = function(pString) {
	let boolean = false;
	if (typeof(pString) === "boolean")
		boolean = pString;
	else {
		const string = pString ? pString.trim().toLowerCase() : "";
		boolean = (string === "true");
	}
	return boolean;
}

Date.default = function(pValue, pDefault) {
	return pValue != null ? pValue : (pDefault != null ? pDefault : new Date());
}

Date.tryToParse = function(pString) {
	let time = Date.parse(pString);
	if (isNaN(time))
		time = null;
	let date = null;
	if (time != null) {
		date = new Date();
		date.setTime(time);
	}
	return date;
}

Date.prototype.format = function(pPattern) {
	let string = pPattern;
	string = string.replace("yyyy", this.getFullYear().pad(4));
	string = string.replace("yy", this.getFullYear().pad(4).substr(2));
	string = string.replace("MM", (this.getMonth() + 1).pad(2));
	string = string.replace("dd", this.getDate().pad(2));
	string = string.replace("hh", this.getHours().pad(2));
	string = string.replace("mm", this.getMinutes().pad(2));
	string = string.replace("ss", this.getSeconds().pad(2));
	string = string.replace("zzz", this.getMilliseconds().pad(3));
	return string;
}

Date.prototype.toFriendlyDateString = function() {
	return this.format("yyyy-MM-dd");
}

Date.prototype.toFriendlyDateTimeString = function() {
	return this.format("yyyy-MM-dd hh:mm:ss");
}

Date.prototype.toTimeStamp = function() {
	return this.format("yyyyMMddhhmmsszzz");
}

Number.compare = function(pNumber) {
	let result = 0;
	const thisValue = this.valueof();
	if (thisValue > pNumber)
		result = 1
	else if (thisValue < pNumber)
		result = -1;
	return result;
}

Number.default = function(pValue, pDefault) {
	return pValue != null ? pValue : (pDefault != null ? pDefault : 0);
}

Number.prototype.pad = function(pLength) 
{
	const string = "0".repeat(pLength) + this.valueOf();
	return string.substr(string.length - pLength);
}

Number.tryToParseInt = function(pString) {
	let number =  parseInt(pString, 10);
	if (isNaN(number))
		number = 0;
	return number;
}   

Number.tryToParseFloat = function(pString) {
	let number =  parseFloat(pString);
	if (isNaN(number))
		number = 0;
	return number;
}   

Object.default = function(pValue, pDefault) {
	return pValue != null ? pValue : (pDefault != null ? pDefault : {});
}

Object.prototype.clone = function() {
	let cloned = new Object();
	for (const property in this)
		cloned[property] = this[property];
	return cloned;
}

Object.prototype.merge = function(pObject, pOverwrite) {
	if (pObject != null)
		for (const property in pObject) {
			const set = pOverwrite ? true : (!(property in this));
			if (set) 
				this[property] = pObject[property];
		}
	return this;
}

String.default = function(pValue, pDefault) {
	return pValue != null ? pValue : (pDefault != null ? pDefault : "");
}

String.prototype.append = function(pPart, pPrefix, pSuffix) {
	let newString = this.valueOf();
	if ((newString) && (pPart)) {
		newString += pPrefix != null ? pPrefix : "";
		newString += pPart;
		newString += pSuffix != null ? pSuffix : "";
	}
	return newString;
}

String.prototype.removeIfStartsWith = function(pPart) {
	let newString = this.valueOf();
	if ((this) && (pPart))
		if (this.substr(0, pPart.length) === pPart)
			newString = this.substr(pPart.length);
	return newString;
}

String.prototype.removeIfEndsWith = function(pPart) {
	let newString = this.valueOf();
	if ((newString) && (pPart))
		if (this.substr(this.length - pPart.length) === pPart)
			newString = this.substr(0, this.length - pPart.length);
	return newString;
}