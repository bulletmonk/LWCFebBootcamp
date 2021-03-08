import { LightningElement, api, wire, track} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getAccountById from '@salesforce/apex/detailController.getAccountById';
import { refreshApex } from '@salesforce/apex';

export default class DetailCmp extends LightningElement {
    @api recordId;
    @api recordId2;
    @api displayMode;

    // Holds the account record
    record;

    resultRecord;

    get recordPopulated() { return this.record ? true : false }
    get viewMode() { return this.displayMode == 'View'}
    get editMode() { return this.displayMode == 'Edit'}

    //get recordName() { return this.record && this.record.Name ? this.record.Name : 'test'}

    @wire(getAccountById, { recordId: '$recordId'})
    getAccount(result){
        this.resultRecord = result;
        
        console.log('inside getAccount');
        if(result.error) {
            console.log('getaccount error ' + JSON.stringify(result.error));
        } else if(result.data) {
            console.log('result data ' + JSON.stringify(result.data));
            this.record = result.data;
        }

    }

    // Handles back event to dispatch event to parent to update display mode to Search
    handleBack(event) {
        console.log('inside handleBack');
        this.dispatchEvent(new CustomEvent('btnclick', {detail: {eventName: 'Search'}}));
    }

    // Handles edit event to update display mode into Edit mode
    handleEdit(event) {
        console.log('inside handleEdit');
        this.displayMode = 'Edit';
    }

    // Handles cancel event to update display mode into View mode
    handleCancel(event) {
        console.log('inside handleCancel');
        this.displayMode = 'View';
    }

    // Handles finish event to save changes in the record
    handleFinish(event) {
        console.log('inside handle finish');
        this.template.querySelector('lightning-record-edit-form').submit();
        this.displayMode = 'View';
    }
    
    // Handles success event to display success toast
    handleSuccess() {
        console.log('handlesuccess');
        this.dispatchEvent(
            new ShowToastEvent({
            title: "SUCESS!",
            message: "Record has been updated",
            variant: "success"
            })
        );

        refreshApex(this.resultRecord);
    }

    connectedCallback(){
        console.log('inside detail connectedcallback');
        console.log('recordId ' + this.recordId);
    }

}