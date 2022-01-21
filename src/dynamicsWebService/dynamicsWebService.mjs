/**
 * @module "DynamicsWebService" class
 * @description Class for getting Dynamics information from Dynamics system (via web service)
 */

"use strict";

import { BasicAuthentication } from "fortah-network-library";
import { Charset } from "fortah-network-library";
import { ContentType } from "fortah-network-library";
import { DynamicsWebServiceAdapter } from "../dynamicsWebService/dynamicsWebServiceAdapter.mjs";
import { MediaType } from "fortah-network-library";
import { Method } from "fortah-network-library";
import { ODataFilter } from "fortah-network-library";
import { ODataOperator } from "fortah-network-library";
import { ODataFilterPart } from "fortah-network-library";
import { RestWebService } from "fortah-network-library";
import { UrlParameter } from "fortah-network-library";

export class DynamicsWebService {
    get dynamicsApplication() { return this.mDynamicsApplication; }
    set dynamicsApplication(pValue) { this.mDynamicsApplication = pValue; }
    get webService() { return this.mWebService; }
    set webService(pValue) { this.mWebService = pValue; }
    get renumerationCode() { return this.mRenumerationCode; }
    set renumerationCode(pValue) { this.mRenumerationCode = String.verify(pValue); }
    get dynamicsObjects() { return this.mDynamicsObjects; }
    set dynamicsObjects(pValue) { this.mDynamicsObjects = pValue; }

    constructor(pApplication) {
        this.application = pApplication;
        this.webService = null;
        this.dynamicsApplication = null;
        this.renumerationCode = "";
        this.dynamicsObjects = null;
    }

    async renumber(pDynamicsApplication, pRenumerationCode, pValidator) {
        let result = false;
        if (this.initialise(pDynamicsApplication, pRenumerationCode, pValidator)) {
            await this.runWebService("renumber");
            this.finalise();
            result = true;
        }
        return result;
    }

    initialise(pDynamicsApplication, pRenumerationCode, pValidator) {
        this.dynamicsApplication = pDynamicsApplication;
        this.renumerationCode = pRenumerationCode;
        return this.verify(pValidator);
    }

    validate(pValidator) {
        pValidator.setComponent(DynamicsWebService.name);
        if (this.application.settings.dynamicsWebService)
            this.application.settings.dynamicsWebService.validate(pValidator);
        pValidator.testNotEmpty("Application", this.dynamicsApplication);
        if (this.dynamicsApplication)
            this.dynamicsApplication.verify(pValidator);
        pValidator.testNotEmpty("Renumeration Code", this.renumerationCode);
        pValidator.restoreComponent();
        return !pValidator.errorMessagesExist;
    }

    async runWebService(pWebServiceName) {
        this.createWebService(pWebServiceName);
        const response = await this.webService.execute();
        this.processResponse(response);
    }

    createWebService(pWebServiceName) {
        const url = this.createUrl(pWebServiceName);
        const authentication = this.createAuthentication();
        const contentType = new ContentType(MediaType.json, Charset.utf8);
        const accept = new ContentType(MediaType.json, Charset.utf8);
        const timeout = this.application.settings.dynamicsWebService.timeout;
        this.webService = new RestWebService(url, Method.get, null, "", authentication, contentType, accept, timeout);
        if (this.application.diagnostics.enabled) {
            const __this = this;
            this.webService.onRequest = (lRequest) => { __this.webService_onRequest(lRequest); }
            this.webService.onResponse = (lResponse) => { __this.webService_onResponse(lResponse); }
        }        
    }

    webService_onRequest(pRequest) {
        this.application.console.writeLine(`Calling "${this.webService.url.toHost()}" web service...`);
        this.application.diagnostics.dumpJson("Request", pRequest.toData(), true);
    }

    webService_onResponse(pResponse) {
        this.application.console.writeLine(`Web service call completed."`);
        this.application.diagnostics.dumpJson("Response", pResponse.toData(), true);
    }

    createAuthentication() {
        const user = this.application.settings.dynamicsWebService.user;
        const password = this.application.settings.dynamicsWebService.password;
        return new BasicAuthentication(user, password);
    }

    createUrl(pWebServiceName) {
        const url = this.application.settings.dynamicsWebService.createUrl(pWebServiceName);
        const oDataFilter = new ODataFilter([ 
            new ODataFilterPart("extensionId", ODataOperator.equals, this.dynamicsApplication.id),
            new ODataFilterPart("renumerationCode", ODataOperator.equals, this.renumerationCode, true)
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
