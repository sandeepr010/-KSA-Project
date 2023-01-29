import { LightningElement,api } from 'lwc';


export default class KSAPersonalInfo extends LightningElement {
    @api educationid;
    @api educationName
    isEditMode = true;
    editclick = true;
    cp = false;

    connectedCallback()
    {
        if(this.educationName==='C and P')
        {
            this.cp = true;
        }
    }

    handleSuccess(event)
    {
        this.isEditMode = true;
        this.editclick = true;
    }

    onEdit(event)
    {
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