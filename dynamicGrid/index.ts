import type { IInputs, IOutputs } from "./generated/ManifestTypes";
// import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
// type DataSet = ComponentFramework.PropertyTypes.DataSet;
import { default as App } from "./App.svelte";

export class dynamicGrid implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    private _componentBody: HTMLDivElement;
    private _componentState: ComponentFramework.Dictionary;
    private _notifyChanges: () => void;
    private _myApp: App;

    /**
     * Empty constructor.
     */
    private constructor() { }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
     */
    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement): void {
        this._componentBody = container;
        this._componentState = state;
        this._notifyChanges = notifyOutputChanged;

        this._myApp = new App({
            props: {
                // notifyChanges: this._notifyChanges,
                xrmApi: context.webAPI,
                utils: context.utils,
                visible: context.mode.isVisible,
                disabled: context.mode.isControlDisabled,
                dataset: context.parameters.sampleDataSet,
                parameters: {
                    relatedEntityColumn: context.parameters.relatedEntityColumn,
                    relatedRecordId: context.parameters.relatedRecordId,
                }
            },
            target: this._componentBody
        })
    }


    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */
    public updateView(context: ComponentFramework.Context<IInputs>): void {

        this._myApp.$set({
            // notifyChanges: this._notifyChanges,
            // size: { height: context.mode.allocatedHeight, width: context.mode.allocatedWidth },
            // offline: context.client.isOffline(),
            visible: context.mode.isVisible,
            disabled: context.mode.isControlDisabled,
            dataset: context.parameters.sampleDataSet,
        },)
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs {
        return {};
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary
    }

}
