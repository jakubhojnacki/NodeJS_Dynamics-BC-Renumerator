/**
 * @module "DynamicsAdapter" class
 * @description Class for getting Dynamics information from Dynamics system
 * @version 0.0.1 (2021-02-22)
 */

import "../general/javaScript.js";
import Charset from "../network/charset.js";
import ContentType from "../network/contentType.js";
import DynamicsApplication from "./dynamicsApplication.js";
import DynamicsDependencies from "./dynamicsDependencies.js";
import DynamicsDependency from "./dynamicsDependency.js";
import DynamicsObjects from "./dynamicsObjects.js";
import DynamicsObject from "./dynamicsObject.js";
import MediaType from "../network/mediaType.js";
import Method from "../network/method.js";
import ODataFilter from "../oData/oDataFilter.js";
import ODataOperator from "../oData/oDataOperator.js";
import ODataFilterPart from "../oData/oDataFilterPart.js";
import RestWebService from "../webServices/restWebService.js";
import UrlParameter from "../network/urlParameter.js";

export default class DynamicsWebServiceAdapter {
    get settings() { return this.mSettings; }
    get application() { return this.mApplication; }
    set application(pValue) { this.mApplication = pValue; }
    get renumberationCode() { return this.mRenumberationCode; }
    set renumberationCode(pValue) { this.mRenumberationCode = pValue; }
    get objects() { return this.mObjects; }
    set objects(pValue) { this.mObjects = pValue; }

    constructor(pSettings) {
        this.mSettings = pSettings;
        this.mApplication = null;
        this.mRenumberationCode = "";
        this.mObjects = null;
    }

    async renumber(pApp, pRenumberationCode) {
        this.initialise(pApp, pRenumberationCode);
        this.runWebService();
        this.finalise();
    }

    initialise(pApplication, pRenumberationCode) {
        this.application = pApplication;
        this.renumberationCode = pRenumberationCode;
        this.validate();
    }

    validate() {
        //TODO - Not implemented
    }

    runWebService() {
        const webService = this.createWebService();
        const response = webService.execute();
        this.processResponse(response);
    }

    createWebService() {
        const url = this.createUrl();
        const headers = this.createHeaders();
        const authentication = this.createAuthentication();
        const contentType = new ContentType(MediaType.json, Charset.utf8);
        const accept = new ContentType(MediaType.json, Charset.utf8);
        return new RestWebService(url, Method.get, headers, "", authentication, contentType, accept);
    }

    createUrl() {
        const url = this.settings.createUrl();
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
        const rawData = pResponse.body;
        const data = JSON.parse(rawData);
        if (data.value) {
            this.processApplication(pData.value.applications);
            this.processWebServiceResponseDependencies(pData.value.applicationDependencies);
            this.processWebServiceResponseObjects(pData.value.objects);
            this.processWebServiceResponseObjectFields(pData.value.objectFields);
        } else
            this.cannotProcessResponse();
    }

    processApplication(pData) {
        if ((pData) && (Array.isArray(pData)) && (pData.length > 0))
            this.application = DynamicsApplication.deserialise(pData[0]);
        else
            this.cannotProcessResponse();
    }

    deserialiseApplication(pData) {
        let application = null;
        if (pData != null) {
            const version = DynamicsVersion.parse(pData.version);
            const dependencies = DynamicsDependencies.deserialise(pData.dependencies);
            const idRanges = DynamicsIdRanges.deserialise(pData.idRanges);
            application = new DynamicsApplication(pData.id, pData.name, pData.publisher, version, dependencies, idRanges);
        }
        return application;
    }

    processWebServiceResponseDependencies(pData) {
        if ((this.application) && (pData) && (Array.isArray(pData))) {
            this.application.dependencies = new DynamicsDependencies();  
            for (const dataItem of pData) {
                const dependency = DynamicsDependency.deserialise(dataItem);
                this.application.dependencies.push(dependency);
            }
        } else
            this.cannotProcessResponse();
    }

    processWebServiceResponseObjects(pData) {
        if ((pData) && (Array.isArray(pData))) {
            this.objects = new DynamicsObjects();
            for (const dataItem of pData) {
                const object = DynamicsObject.deserialise(dataItem);
                this.objects.push(object);
            }
        } else
            this.cannotProcessResponse();
    }

    processWebServiceResponseObjectFields(pData) {
        if ((pData) && (Array.isArray(pData))) {
            for (const dataItem of pData) {
                if ((dataItem.objectType) && (dataItem.objectId)) {
                    const object = this.objects.get(dataItem.objectType, dataItem.objectId);
                    if (object) {
                        const objectField = DynamicsObjectField.deserialise(dataItem);
                        object.push(objectField);
                    }
                }
            }
        } else
            this.cannotProcessResponse();
    }

    cannotProcessResponse() {
        throw new Error("Cannot process renumberation web service response");
    }
}
