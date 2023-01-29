import { LightningElement,api} from 'lwc';
export default class KSAEassy extends LightningElement {
    @api eassyid;
    isEditMode = true;
    editclick = true;

    handleSuccess(event)
    {
        this.isEditMode = true;
        this.editclick = true;
    }
    onEdit(event)
    {
        console.log(this.eassyid);
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