import { LightningElement,api } from 'lwc';

export default class KSAAddress extends LightningElement {
    @api addressId;
    isEditMode = true;
    editclick = true;

    handleSuccess(event)
    {
        this.isEditMode = true;
        this.editclick = true;
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