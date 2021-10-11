/**
 * @module "DynamicsWebService" class
 * @description Class for getting Dynamics information from Dynamics system (via web service)
 */

import { BasicAuthentication } from "network-library";
import { Charset } from "network-library";
import { ContentType } from "network-library";
import { DynamicsWebServiceAdapter } from "../dynamicsTools/dynamicsWebServiceAdapter.mjs";
import { MediaType } from "network-library";
import { Method } from "network-library";
import { ODataFilter } from "network-library";
import { ODataOperator } from "network-library";
import { ODataFilterPart } from "network-library";
import { RestWebService } from "network-library";
import { UrlParameter } from "network-library";
import { Validator } from "core-library";

export class DynamicsWebService {
    get settings() { return global.theApplication.settings; }
    get debug() { return global.theApplication.debug; }

    get dynamicsApplication() { return this.mDynamicsApplication; }
    set dynamicsApplication(pValue) { this.mDynamicsApplication = pValue; }
    get renumberationCode() { return this.mRenumberationCode; }
    set renumberationCode(pValue) { this.mRenumberationCode = String.validate(pValue); }
    get dynamicsObjects() { return this.mDynamicsObjects; }
    set dynamicsObjects(pValue) { this.mDynamicsObjects = pValue; }

    constructor() {
        this.dynamicsApplication = null;
        this.renumberationCode = "";
        this.dynamicsObjects = null;
    }

    async renumber(pDynamicsApplication, pRenumberationCode) {
        this.initialise(pDynamicsApplication, pRenumberationCode);
        await this.runWebService("renumber");
        this.finalise();
    }

    initialise(pDynamicsApplication, pRenumberationCode) {
        this.dynamicsApplication = pDynamicsApplication;
        this.renumberationCode = pRenumberationCode;
        this.validate();
    }

    validate(pValidator) {
        pValidator.setComponent(DynamicsWebService.name);
        if (this.settings.dynamicsWebService)
            this.settings.dynamicsWebService.validate(pValidator);
        pValidator.testNotEmpty("Application", this.dynamicsApplication);
        if (this.dynamicsApplication)
            this.dynamicsApplication.validate(pValidator);
        pValidator.testNotEmpty("Renumberation Code", this.renumberationCode);
        pValidator.restoreComponent();
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
        const timeout = this.settings.dynamicsWebService.timeout;
        return new RestWebService(url, Method.get, null, "", authentication, contentType, accept, timeout);
    }

    createAuthentication() {
        const user = this.settings.dynamicsWebService.user;
        const password = this.settings.dynamicsWebService.password;
        return new BasicAuthentication(user, password);
    }

    createUrl(pWebService) {
        const url = this.settings.dynamicsWebService.createUrl(pWebService);
        const oDataFilter = new ODataFilter([ 
            new ODataFilterPart("extensionId", ODataOperator.equals, this.dynamicsApplication.id),
            new ODataFilterPart("renumberationCode", ODataOperator.equals, this.renumberationCode, true)
        ], ODataOperator.and);
        url.parameters = [ 
            new UrlParameter("$filter", oDataFilter.toString()),
            new UrlParameter("$expand", "applications,applicationDependencies,ranges,objects,objectFields")
        ];
        return url;
    }

    processResponse(pResponse) {
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
        this.dynamicsApplication = DynamicsWebServiceAdapter.dynamicsApplicationFromData(pData[0]);
        if (this.dynamicsApplication == null)
            throw new Error("Application data are incorrect.");
    }

    processResponseDynamicsDependencies(pData) {
        DynamicsWebServiceAdapter.dynamicsDependenciesFromData(pData, this.dynamicsApplication);
    }

    processResponseRanges(pData) {
        DynamicsWebServiceAdapter.dynamicsRangesFromData(pData, this.dynamicsApplication);
    }

    processResponseDynamicsObjects(pData) {
        this.dynamicsObjects = DynamicsWebServiceAdapter.dynamicsObjectsFromData(pData);
    }

    processResponseDynamicsObjectFields(pData) {
        DynamicsWebServiceAdapter.dynamicsObjectFieldsFromData(pData, this.dynamicsObjects);
    }

    finalise() {        
    }
}
