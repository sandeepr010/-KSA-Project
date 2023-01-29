import { LightningElement, api, track } from 'lwc';

export default class ApplicationDetailPageView extends LightningElement {
    @api recordId;
    @api pathAlign = [
        {status:'slds-progress__item slds-is-active',id:'#sectionStudentInfo',name:' Personal Information',icon:false,icon2:true,step:1,currentStep:true},
        {status:'slds-progress__item slds-is-completed',id:'#AddressDetailsInfo',name:'Address Information',icon:true,icon2:false,step:2,currentStep:false},
        {status:'slds-progress__item slds-is-completed',id:'#FamilyInformationInfo',name:'Family Information',icon:true,icon2:false,step:3,currentStep:false},
        //{status:'slds-progress__item slds-is-completed',id:'#EmploymentDetailsInfo',name:'Employment Details',icon:true,icon2:false,currentStep:4,currentStep:false},
        {status:'slds-progress__item slds-is-completed',id:'#EducationalQualificationsInfo',name:'Educational Qualifications',icon:true,icon2:false,step:4,currentStep:false},
        {status:'slds-progress__item slds-is-completed',id:'#EducationalQualificationsInfo',name:'Course Completion Documents',icon:true,icon2:false,step:5,currentStep:false},
        {status:'slds-progress__item slds-is-completed',id:'#EducationalQualificationsInfo',name:'Prior Skills and knowledge ',icon:true,icon2:false,step:6,currentStep:false},
        {status:'slds-progress__item slds-is-completed',id:'#EducationalQualificationsInfo',name:'Career Goles and Expectation',icon:true,icon2:false,step:7,currentStep:false},
        {status:'slds-progress__item slds-is-completed',id:'#EducationalQualificationsInfo',name:'Work Expirence and Activites',icon:true,icon2:false,step:8,currentStep:false},
        {status:'slds-progress__item slds-is-completed',id:'#EducationalQualificationsInfo',name:'Certification and Awards',icon:true,icon2:false,step:9,currentStep:false},
        {status:'slds-progress__item slds-is-completed',id:'#EducationalQualificationsInfo',name:'Essay',icon:true,icon2:false,step:10,currentStep:false},
        {status:'slds-progress__item slds-is-completed',id:'#EducationalQualificationsInfo',name:'Unprivileged Popultion',icon:true,icon2:false,step:11,currentStep:false},

       
    ];
    
    handleIndexChange(event){
        this.pathAlign = [...event.detail];
    }

    handleScroll(event) {
        
        var compEvent = component.getEvent("pathEvent");
        compEvent.setParams({"pathIndex" : indexToActive });
        compEvent.fire();
       
    }

    handleHighlight(event){
        let indexToHigllight = event.detail.indexToActive;
        for(let i = 0; i< this.pathAlign.length; i++){
            if(i == indexToHigllight){
                this.pathAlign[i]['status'] = 'slds-progress__item slds-is-active';
                this.pathAlign[i]['icon'] = false;
                this.pathAlign[i]['icon2'] = true;
            }else{
                this.pathAlign[i]['status'] = 'slds-progress__item slds-is-completed';
                this.pathAlign[i]['icon'] = true;
                this.pathAlign[i]['icon2'] = false;
            }
        }
    }
    
}