/**
 * @module "RegExpFlag" class (static)
 * @description Enumerates regular expression flags
 * @version 0.0.1 (2021-02-22)
 */

__require("/general/javaScript");

/*static*/ class RegExpFlag {
    static get globalMatch() { return "g"; }
    static get ignoreCase() { return "i"; }
    static get multiline() { return "m"; }
    static get dotAll() { return "s"; }
    static get unicode() { return "u"; }
    static get sticky() { return "y"; }

    static get values() { return [
        new EnumValue(RegExpFlag.globalMatch),
        new EnumValue(RegExpFlag.ignoreCase),
        new EnumValue(RegExpFlag.multiline),
        new EnumValue(RegExpFlag.dotAll),
        new EnumValue(RegExpFlag.unicode),
        new EnumValue(RegExpFlag.sticky)
    ]; }

    static parse(pString) {
        return Enum.parse(pString, RegExpFlag.values, RegExpFlag.name);
    }    

    static combine(pRegexFlags) {
        return pRegexFlags.join("");
    }
}

module.exports = RegExpFlag;