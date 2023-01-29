import { LightningElement, api, wire, track } from 'lwc';
import getApplication from '@salesforce/apex/KSAComponent.kSAIds';


export default class KSAapplicationDetails2 extends LightningElement {
    @api recordId;
    @api pathAlign;

    @track applicationId;
    @track contactId;
    @track addressId;
    @track relationId;
    @track relationContactId;
    @track educationId;
    @track skillsId;
    @track careerId;
    @track workId;
    @track applingTo;
    
    application = true;
    isPersonalInfoStep = true;
    isAddressStep = false;
    isFamilyStep = false;
    isEducationStep = false;
    isCourseStep = false;
    isPriorSkillStep = false;
    isCareerStep = false;
    isWorkExpirenceStep = false;
    isCertificateStep =false;
    isEassyStep = false;
    isUnpriviligedStep = false;

    connectedCallback()
    {
        getApplication({applicationId:this.recordId}).then(
            result=>{
                this.contactId = result.contactId;
                this.addressId = result.addressId;
                this.relationId = result.relationId;
                this.relationContactId = result.relationContactId;
                this.educationId = result.educationId;
                this.skillsId = result.skillsId;
                this.careerId = result.careerId;
                this.workId = result.workId;
                this.applicationId = result.applicationId;
                this.applingTo = result.applingTo;
                const selectEvent = new CustomEvent('applingto', {
                    detail:result.applingTo
                    });
                this.dispatchEvent(selectEvent);
            })
            .catch(error=>{
                console.log('Connected Error',error);
            })

    }

    handleNext(event)
    {
        if(this.isPersonalInfoStep === true)
        {
            this.isAddressStep = true;
            this.isPersonalInfoStep = false;
            const selectEvent = new CustomEvent('handlenext', {
                detail:1
                });
            this.dispatchEvent(selectEvent);
        }
        else if(this.isAddressStep === true)
        {
            this.isFamilyStep = true;
            this.isAddressStep = false;
            const selectEvent = new CustomEvent('handlenext', {
                detail:2
                });
            this.dispatchEvent(selectEvent);
        }
        else if(this.isFamilyStep === true)
        {
            this.isEducationStep = true;
            this.isFamilyStep = false;
            const selectEvent = new CustomEvent('handlenext', {
                detail:3
                });
            this.dispatchEvent(selectEvent);
        }
        else if(this.isEducationStep === true)
        {
            if(this.applingTo === 'C and P')
            {
                this.isPriorSkillStep = true;
                this.isEducationStep = false;
                const selectEvent = new CustomEvent('handlenext', {
                    detail:5
                    });
                this.dispatchEvent(selectEvent);
            }
            else
            {
                this.isCourseStep = true;
                this.isEducationStep = false;
                const selectEvent = new CustomEvent('handlenext', {
                detail:4
                });
            this.dispatchEvent(selectEvent);
            }
        }
        else if(this.isCourseStep === true)
        {
            this.isPriorSkillStep = true;
            this.isCourseStep = false;
            const selectEvent = new CustomEvent('handlenext', {
                detail:5
                });
            this.dispatchEvent(selectEvent);
        }
        else if(this.isPriorSkillStep === true)
        {
            this.isCareerStep = true;
            this.isPriorSkillStep = false;
            const selectEvent = new CustomEvent('handlenext', {
                detail:6
                });
            this.dispatchEvent(selectEvent);
        }
        else if(this.isCareerStep === true)
        {
            this.isWorkExpirenceStep = true;
            this.isCareerStep = false;
            const selectEvent = new CustomEvent('handlenext', {
                detail:7
                });
            this.dispatchEvent(selectEvent);
        }
        else if(this.isWorkExpirenceStep === true)
        {
            this.isCertificateStep = true;
            this.isWorkExpirenceStep = false;
            const selectEvent = new CustomEvent('handlenext', {
                detail:8
                });
            this.dispatchEvent(selectEvent);
        }
        else if(this.isCertificateStep === true)
        {
            this.isEassyStep = true;
            this.isCertificateStep = false;
            const selectEvent = new CustomEvent('handlenext', {
                detail:9
                });
            this.dispatchEvent(selectEvent);
        }
        else if(this.isEassyStep === true)
        {
            this.isUnpriviligedStep = true;
            this.isEassyStep = false;
            const selectEvent = new CustomEvent('handlenext', {
                detail:10
                });
            this.dispatchEvent(selectEvent);
        }
    }

    previousButton(event)
    {
        if(this.isAddressStep === true)
        {
            this.isPersonalInfoStep = true;
            this.isAddressStep = false;
            const selectEvent = new CustomEvent('handleback', {
                detail:0
                });
            this.dispatchEvent(selectEvent);
        }
        else if(this.isFamilyStep === true)
        {
            this.isAddressStep = true;
            this.isFamilyStep = false;
            const selectEvent = new CustomEvent('handleback', {
                detail:1
                });
            this.dispatchEvent(selectEvent);
        }
        else if(this.isEducationStep === true)
        {
            this.isFamilyStep = true;
            this.isEducationStep = false;
            const selectEvent = new CustomEvent('handleback', {
                detail:2
                });
            this.dispatchEvent(selectEvent);
        }
        else if(this.isCourseStep === true)
        {
            this.isEducationStep = true;
            this.isCourseStep = false;
            const selectEvent = new CustomEvent('handleback', {
                detail:3
                });
            this.dispatchEvent(selectEvent);
        }
        else if(this.isPriorSkillStep === true)
        {
            if(this.applingTo === 'C and P')
            {
                this.isEducationStep = true;
                this.isPriorSkillStep = false;
                const selectEvent = new CustomEvent('handleback', {
                    detail:3
                });
                this.dispatchEvent(selectEvent);
            }
            else
            {
                this.isCourseStep = true;
                this.isPriorSkillStep = false;
                const selectEvent = new CustomEvent('handleback', {
                    detail:4
                });
                this.dispatchEvent(selectEvent);
            }
        }
        else if(this.isCareerStep === true)
        {
            this.isPriorSkillStep = true;
            this.isCareerStep = false;
            const selectEvent = new CustomEvent('handleback', {
                detail:5
                });
            this.dispatchEvent(selectEvent);
        }
        else if(this.isWorkExpirenceStep === true)
        {
            this.isCareerStep = true;
            this.isWorkExpirenceStep = false;
            const selectEvent = new CustomEvent('handleback', {
                detail:6
                });
            this.dispatchEvent(selectEvent);
        }
        else if(this.isCertificateStep === true)
        {
            this.isWorkExpirenceStep = true;
            this.isCertificateStep = false;
            const selectEvent = new CustomEvent('handleback', {
                detail:7
                });
            this.dispatchEvent(selectEvent);
        }
        else if(this.isEassyStep === true)
        {
            this.isCertificateStep = true;
            this.isEassyStep = false;
            const selectEvent = new CustomEvent('handleback', {
                detail:8
                });
            this.dispatchEvent(selectEvent);
        }
        else if(this.isUnpriviligedStep === true)
        {
            this.isEassyStep = true;
            this.isUnpriviligedStep = false;
            const selectEvent = new CustomEvent('handleback', {
                detail:9
                });
            this.dispatchEvent(selectEvent);
        }
    }

    handleScroll()
    {

    }
}