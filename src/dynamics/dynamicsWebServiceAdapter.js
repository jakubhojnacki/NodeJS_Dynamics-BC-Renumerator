/**
 * @module "DynamicsAdapter" class
 * @description Class for getting Dynamics information from Dynamics system
 * @version 0.0.1 (2021-02-22)
 */

import "../general/javaScript.js";
import BasicAuthentication from "../webServices/basicAuthentication.js";
import Charset from "../network/charset.js";
import ContentType from "../network/contentType.js";
import DynamicsApplication from "./dynamicsApplication.js";
import DynamicsDependencies from "./dynamicsDependencies.js";
import DynamicsDependency from "./dynamicsDependency.js";
import DynamicsObjects from "./dynamicsObjects.js";
import DynamicsObject from "./dynamicsObject.js";
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
    get settings() { return this.mSettings; }
    get dynamicsApplication() { return this.mDynamicsApplication; }
    set dynamicsApplication(pValue) { this.mDynamicsApplication = pValue; }
    get renumberationCode() { return this.mRenumberationCode; }
    set renumberationCode(pValue) { this.mRenumberationCode = pValue; }
    get objects() { return this.mObjects; }
    set objects(pValue) { this.mObjects = pValue; }

    constructor(pSettings) {
        this.mSettings = pSettings;
        this.mDynamicsApplication = null;
        this.mRenumberationCode = "";
        this.mObjects = null;
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

    getValidator() {
        const validator = new Validator();
        this.settings.validate(validator);
    }

    validate(pValidator, pRaiseError) {
        const validator = pValidator ? pValidator : new Validator();
        const raiseError = Boolean.validate(pRaiseError);
        validator.testNotEmpty(DynamicsWebServiceAdapter.name, "Settings", this.settings);
        if (this.settings)
            this.settings.validate(validator);
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
        const user = this.settings.user;
        const password = this.settings.password;
        return new BasicAuthentication(user, password);
    }

    createUrl(pWebService) {
        const url = this.settings.createUrl(pWebService);
        const oDataFilter = new ODataFilter([ 
            new ODataFilterPart("extensionId", ODataOperator.equals, "d4688c1b-70bd-47f3-8087-f462a8a88f0b"),
            new ODataFilterPart("renumberationCode", ODataOperator.equals, "'SAAS'")
        ], ODataOperator.and);
        url.parameters = [ 
            new UrlParameter("$filter", oDataFilter.toString()),
            new UrlParameter("$expand", "applications,applicationDependencies,objects,objectFields")
        ];
        return url;
    }

    processResponse(pResponse) {
        const data = this.extractResponseData(pResponse);
        this.processApplication(data.applications);
        this.processWebServiceResponseDependencies(data.applicationDependencies);
        this.processWebServiceResponseObjects(data.objects);
        this.processWebServiceResponseObjectFields(data.objectFields);
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

    processApplication(pData) {
        this.dynamicsApplication = DynamicsWebServiceSerialiser.deserialiseDynamicsApplication(pData[0]);
        if (this.dynamicsApplication == null)
            throw new Error("Application data are incorrect.");
    }

    processWebServiceResponseDependencies(pData) {
        DynamicsWebServiceSerialiser.deserialiseDynamicsDependencies(pData, this.dynamicsApplication);
    }

    processWebServiceResponseObjects(pData) {
        this.objects = DynamicsWebServiceSerialiser.deserialiseDynamicsObjects(pData);
    }

    processWebServiceResponseObjectFields(pData) {
        DynamicsWebServiceSerialiser.deserialiseDynamicsObjectFields(pData, this.objects);
    }

    finalise() {        
    }
}
