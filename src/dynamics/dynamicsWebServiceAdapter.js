/**
 * @module "DynamicsAdapter" class
 * @description Class for getting Dynamics information from Dynamics system
 * @version 0.0.1 (2021-02-22)
 */

import "../general/javaScript.js";
import BasicAuthentication from "../webServices/basicAuthentication.js";
import Charset from "../network/charset.js";
import ContentType from "../network/contentType.js";
import DynamicsWebServiceSerialiser from "./dynamicsWebServiceSerialiser.js";
import MediaType from "../network/mediaType.js";
import Method from "../network/method.js";
import ODataFilter from "../oData/oDataFilter.js";
import ODataOperator from "../oData/oDataOperator.js";
import ODataFilterPart from "../oData/oDataFilterPart.js";
import RestWebService from "../webServices/restWebService.js";
import UrlParameter from "../network/urlParameter.js";
import Validator from "../general/validator.js";

export default class DynamicsWebServiceAdapter {
    get settings() { return global.theApplication.settings; }
    get debug() { return global.theApplication.debug; }

    get dynamicsApplication() { return this.mDynamicsApplication; }
    set dynamicsApplication(pValue) { this.mDynamicsApplication = pValue; }
    get renumberationCode() { return this.mRenumberationCode; }
    set renumberationCode(pValue) { this.mRenumberationCode = pValue; }
    get dynamicsObjects() { return this.mDynamicsObjects; }
    set dynamicsObjects(pValue) { this.mDynamicsObjects = pValue; }

    constructor() {
        this.mDynamicsApplication = null;
        this.mRenumberationCode = "";
        this.mDynamicsObjects = null;
    }

    async renumber(pApp, pRenumberationCode) {
        this.initialise(pApp, pRenumberationCode);
        await this.runWebService("renumber");
        this.finalise();
    }

    initialise(pDynamicsApplication, pRenumberationCode) {
        this.dynamicsApplication = pDynamicsApplication;
        this.renumberationCode = pRenumberationCode;
        this.validate();
    }

    validate(pValidator, pRaiseError) {
        const validator = pValidator ? pValidator : new Validator();
        const raiseError = Boolean.validate(pRaiseError);
        if (this.settings.dynamicsWebService)
            this.settings.dynamicsWebService.validate(validator);
        validator.testNotEmpty(DynamicsWebServiceAdapter.name, "Application", this.dynamicsApplication);
        if (this.dynamicsApplication)
            this.dynamicsApplication.validate(validator);
        validator.testNotEmpty(DynamicsWebServiceAdapter.name, "Renumberation Code", this.renumberationCode);
        if (raiseError)
            validator.raiseErrorIfNotSuccess();
        return validator;
    }

    async runWebService(pWebService) {
        const webService = this.createWebService(pWebService);
        const response = await webService.execute();
        this.processResponse(response);
    }

    createWebService(pWebService) {
        const url = this.createUrl(pWebService);
        const authentication = this.createAuthentication();
        const contentType = new ContentType(MediaType.json, Charset.utf8);
        const accept = new ContentType(MediaType.json, Charset.utf8);
        return new RestWebService(url, Method.get, null, "", authentication, contentType, accept);
    }

    createAuthentication() {
        const user = this.settings.dynamicsWebService.user;
        const password = this.settings.dynamicsWebService.password;
        return new BasicAuthentication(user, password);
    }

    createUrl(pWebService) {
        const url = this.settings.dynamicsWebService.createUrl(pWebService);
        const oDataFilter = new ODataFilter([ 
            new ODataFilterPart("extensionId", ODataOperator.equals, "d4688c1b-70bd-47f3-8087-f462a8a88f0b"),
            new ODataFilterPart("renumberationCode", ODataOperator.equals, "'SAAS'")
        ], ODataOperator.and);
        url.parameters = [ 
            new UrlParameter("$filter", oDataFilter.toString()),
            new UrlParameter("$expand", "applications,applicationDependencies,ranges,objects,objectFields")
        ];
        return url;
    }

    processResponse(pResponse) {
        this.debug.dumpJson("Web Service Response", pResponse);
        const data = this.extractResponseData(pResponse);
        this.processResponseDynamicsApplication(data.applications);
        this.processResponseDynamicsDependencies(data.applicationDependencies);
        this.processResponseRanges(data.ranges);
        this.processResponseDynamicsObjects(data.objects);
        this.processResponseDynamicsObjectFields(data.objectFields);
    }

    extractResponseData(pResponse) {
        if (!pResponse.body)
            throw new Error("Web service response doesn't have any data.");
        if ((!pResponse.body.value) || (!Array.isArray(pResponse.body.value)))
            throw new Error("Web service response data are not of expected format.");
        if (pResponse.body.value.length == 0)
            throw new Error("Web service response data are empty.");
        return pResponse.body.value[0];
    }

    processResponseDynamicsApplication(pData) {
        this.dynamicsApplication = DynamicsWebServiceSerialiser.deserialiseDynamicsApplication(pData[0]);
        if (this.dynamicsApplication == null)
            throw new Error("Application data are incorrect.");
    }

    processResponseDynamicsDependencies(pData) {
        DynamicsWebServiceSerialiser.deserialiseDynamicsDependencies(pData, this.dynamicsApplication);
    }

    processResponseRanges(pData) {
        DynamicsWebServiceSerialiser.deserialiseDynamicsRanges(pData, this.dynamicsApplication);
    }

    processResponseDynamicsObjects(pData) {
        this.dynamicsObjects = DynamicsWebServiceSerialiser.deserialiseDynamicsObjects(pData);
    }

    processResponseDynamicsObjectFields(pData) {
        DynamicsWebServiceSerialiser.deserialiseDynamicsObjectFields(pData, this.dynamicsObjects);
    }

    finalise() {        
    }
}
