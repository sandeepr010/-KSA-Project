import { LightningElement,api } from 'lwc';


export default class KSAPersonalInfo extends LightningElement {
    @api courseId;
    isEditMode = true;
    editclick = true;

    handleSuccess(event)
    {
        this.isEditMode = true;
        this.editclick = true;
    }
    onEdit(event)
    {
        console.log(this.courseId);
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