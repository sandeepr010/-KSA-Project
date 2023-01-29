import { LightningElement,track,api } from 'lwc';

export default class KSARelation extends LightningElement {
    @api relationId;
    @api relationContactId;
    @api contactId;
    editRelationClick = true;
    relationInput = true;
    editNameClick = true;
    nameInput = true;

    handleRelationSuccess(event)
    {
        this.editRelationClick = true;
        this.relationInput = true;
    }
    onRelationEditMethod(event)
    {
        if(this.editRelationClick === true)
        {
            this.relationInput = false;
            this.editRelationClick = false;
        }
    }
    handleRelationCancel()
    {
        this.editRelationClick = true;
        this.relationInput = true;
    }

    handleNameSuccess()
    {
        this.editNameClick = true;
        this.nameInput = true;
    }

    handleNameEdit()
    {
        if(this.editNameClick === true)
        {
            this.nameInput = false;
            this.editNameClick = false;
        }
    }

    handleNameCancel()
    {
        this.editNameClick = true;
        this.nameInput = true;
    }
}