import { LightningElement,api } from 'lwc';


export default class KSAPersonalInfo extends LightningElement {
    @api contactId;
    isEditMode = true;
    editclick = true;

    handleSuccess(event)
    {
        this.isEditMode = true;
        this.editclick = true;
        const evt = new ShowToastEvent({
            title: 'Data Saved',
            message: 'Personal Information Updated',
            variant: success,
        });
        this.dispatchEvent(evt);
    }
    onEdit(event)
    {
        //let edit = event.target.checked;
        //console.log(edit);
        if(this.editclick === true)
        {
            this.isEditMode = false;
            this.editclick = false;
        }
    }

    handleCancel()
    {
        this.isEditMode = true;
        this.editclick = true;
    }
}