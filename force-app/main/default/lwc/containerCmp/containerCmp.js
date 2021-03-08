import { LightningElement, api } from 'lwc';

export default class ContainerCmp extends LightningElement {

    // Used to control visible component
    @api displayMode;
    
    // Used to hold selected id
    selectedId;

    get searchMode() { return this.displayMode == 'Search';}

    handleSelect(event) {
        console.log('inside handleSelect event ');
        console.log('detail selected id ' + event.detail.selectedId);
        this.selectedId = event.detail.selectedId;

        // Update display mode to hide search component
        this.displayMode = 'View';
    }

    handleBtnClick(event) {
        console.log('inside handleBtnClick');
        this.displayMode = 'Search';
    }
}