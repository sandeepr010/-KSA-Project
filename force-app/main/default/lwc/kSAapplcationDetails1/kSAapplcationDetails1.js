import { LightningElement, api, track } from 'lwc';

export default class ApplicationDetailPageView extends LightningElement {
    @api recordId;
    @track applic;
    @track pathAlign = [
        {status:'slds-progress__item slds-is-active',id:'#isPersonalInfoStep',name:' Personal Information',active:true,complete:false},
        {status:'slds-progress__item',id:'#isAddressStep',name:'Address Information',active:false,complete:false},
        {status:'slds-progress__item',id:'#isFamilyStep',name:'Family Information',active:false,complete:false},
        {status:'slds-progress__item',id:'#isEducationStep',name:'Educational Qualifications',active:false,complete:false},
        {status:'slds-progress__item',id:'#isCourseStep',name:'Course Completion Documents',active:false,complete:false},
        {status:'slds-progress__item',id:'#isPriorSkillStep',name:'Prior Skills and knowledge ',active:false,complete:false},
        {status:'slds-progress__item',id:'#isCareerStep',name:'Career Goles and Expectation',active:false,complete:false},
        {status:'slds-progress__item',id:'#isWorkExpirenceStep',name:'Work Expirence and Activites',active:false,complete:false},
        {status:'slds-progress__item',id:'#isCertificateStep',name:'Certification and Awards',active:false,complete:false},
        {status:'slds-progress__item',id:'#isEassyStep',name:'Essay',active:false,complete:false},
        {status:'slds-progress__item',id:'#isUnpriviligedStep',name:'Unprivileged Popultion',active:false,complete:false},
    ];
    
    handleScroll(event) {
        
        var compEvent = component.getEvent("pathEvent");
        compEvent.setParams({"pathIndex" : indexToActive });
        compEvent.fire();
       
    }

    handleNext(event){
        if(this.applic === 'C and P')
        {
            let textVal = event.detail;
            if(textVal===5)
            {
                let i = textVal;
                let j = textVal - 2;
                this.pathAlign[i]['status'] = 'slds-progress__item slds-is-active';
                this.pathAlign[i]['active'] = true;
                this.pathAlign[i]['complete'] = false;
                this.pathAlign[j]['status'] = 'slds-progress__item slds-is-completed';
                this.pathAlign[j]['active'] = false;
                this.pathAlign[j]['complete'] = true;   
            }
            else
            {
                let i = textVal;
                let j = textVal - 1;
                this.pathAlign[i]['status'] = 'slds-progress__item slds-is-active';
                this.pathAlign[i]['active'] = true;
                this.pathAlign[i]['complete'] = false;
                this.pathAlign[j]['status'] = 'slds-progress__item slds-is-completed';
                this.pathAlign[j]['active'] = false;
                this.pathAlign[j]['complete'] = true;
            }
        }
        else{
            let textVal = event.detail;
            let i = textVal;
            let j = textVal - 1;
            this.pathAlign[i]['status'] = 'slds-progress__item slds-is-active';
            this.pathAlign[i]['active'] = true;
            this.pathAlign[i]['complete'] = false;
            this.pathAlign[j]['status'] = 'slds-progress__item slds-is-completed';
            this.pathAlign[j]['active'] = false;
            this.pathAlign[j]['complete'] = true;
        }
    }

    handleBack(event)
    {
        let textVal = event.detail;
        if(this.applic === 'C and P')
        {
            if(textVal===3)
            {
                let i = textVal;
                let j = textVal + 2;
                this.pathAlign[i]['status'] = 'slds-progress__item slds-is-active';
                this.pathAlign[i]['active'] = true;
                this.pathAlign[i]['complete'] = false;
                this.pathAlign[j]['status'] = 'slds-progress__item';
                this.pathAlign[j]['active'] = false;
                this.pathAlign[j]['complete'] = false;
            }
            else
            {
                let i = textVal;
                let j = textVal + 1;
                this.pathAlign[i]['status'] = 'slds-progress__item slds-is-active';
                this.pathAlign[i]['active'] = true;
                this.pathAlign[i]['complete'] = false;
                this.pathAlign[j]['status'] = 'slds-progress__item';
                this.pathAlign[j]['active'] = false;
                this.pathAlign[j]['complete'] = false;
            }
        }
        else
        {
            let i = textVal;
            let j = textVal + 1;
            this.pathAlign[i]['status'] = 'slds-progress__item slds-is-active';
            this.pathAlign[i]['active'] = true;
            this.pathAlign[i]['complete'] = false;
            this.pathAlign[j]['status'] = 'slds-progress__item';
            this.pathAlign[j]['active'] = false;
            this.pathAlign[j]['complete'] = false;
        }
    }

    applingto(event)
    {
        let textVal = event.detail;
        this.applic = textVal;    
    }
    
}