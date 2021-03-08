import { LightningElement, api } from 'lwc';
import getAccounts from '@salesforce/apex/searchCmpController.getAccounts';

export default class SearchCmp extends LightningElement {

    @api searchLabel;

    globalSearchValue;

    // Holds the list of Account records
    resultList = [];

    // To control display of results
    get hasResults() { return this.resultList.length > 0}

    connectedCallback() {
        console.log('inside connectedCallback');
    }

    renderedCallback() {
        console.log('inside renderedCallback');
    }
    
    handleSearch(event) {
        // Clear previous list
        this.resultList = [];

        // Assign event value to global search value variable
        this.globalSearchValue = event.target.value;
        console.log('globalSearchValue ' + this.globalSearchValue);
        
        try{
            if(this.globalSearchValue.length > 0) {
                getAccounts({ searchValue: this.globalSearchValue })
                    .then(result => {
                        console.log('inside result of getaccounts ');
                        console.log('result ' + result);
                        console.log('result ' + JSON.stringify(result));
                        this.resultList = result;
                    })
                    .catch(error => {
                        console.log('inside error of getaccounts ');
                    });
            }
        } catch(e) {
            console.log('catch e ' + e);
        }
    }

    setSelectedRecord(event) {
        //console.log('setSelectedRecord event.currentTarget.dataset.Name ' + JSON.stringify(event));
        try{
            console.log('setSelectedRecord event.currentTarget.dataset.Name ' + event.currentTarget.dataset.name);
            var selectedId = event.currentTarget.dataset.id;
            console.log('setSelectedRecord selectedId ' + selectedId);

            // Pass id to Parent
            const selectedEvent = new CustomEvent('selected', { detail : {selectedId : selectedId} });
            this.dispatchEvent(selectedEvent);
        } catch(error) {
            console.log('selected error ' + error);
        }
    }
}