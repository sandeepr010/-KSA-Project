import { LightningElement, api, wire, track } from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import getApplication from '@salesforce/apex/ApplicationController.getAppliction';
import getPicklistValuesMap from '@salesforce/apex/ApplicationController.getPicklistValuesMap';
import saveApplication from '@salesforce/apex/ApplicationController.saveApplication';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ApplicationDetailPageChildView extends LightningElement {
    
    @api recordId;
    @api pathAlign;
    currentPage = 1;
    @track
    application;
    applicationCopy;
    sldsSpinner = true;
    genderOptions = [];
    relationshipTypeOptions = [];
    martialStatusOptions = [];
    doYouHaveAnyWorkExperienceOptions = [];
    howDoYouPlanToFundYourEducationOptions = [];
    jobTypeOptions = [];
    educationHitory = [];
    proficiencyOptions = [];
    resultStatusOptions = [];
    selectExamOptions =[];
    isDifferentlyAbledOptions = [];
    companyScholarshipOptions = [];
    EducationHistoryTypeOptions = [];
    educationTypeOptions = [];
    degreeEarnedOptions = [];
    educationHistoryCountryOptions = [];
    isDisabled = true;
    isEditMode = false;
    hasPicklistValues = false;
    timimgOptions=[];
    branchOptions=[];
    areDetailsVisible = false;
    status="Payment Status: Paid";
    

    connectedCallback(){
        this.sldsSpinner = true;
        this.getPicklistValues();
        getApplication({recordId : this.recordId})
            .then(result => {
                this.application = result
                this.applicationCopy = JSON.parse(JSON.stringify(result));
                console.log('-->'+ JSON.parse(JSON.stringify(result)));
                console.log('-->'+ this.application);

                this.getEducationHitory();
                this.sldsSpinner  = false;
            })
            .catch(error => {
                console.log(error.body.message);
                this.sldsSpinner  = false;
            });
    }

    get isPersonalInfoStep(){
        return this.pathAlign[0].currentStep;
    }

    get isAddressInfoStep(){
        return this.pathAlign[1].currentStep;
    }

    get isFamilyInfoStep(){
        return this.pathAlign[2].currentStep;
    }


    get isEducationInfoStep(){
        return this.pathAlign[3].currentStep;
    }

    get isCourseInfoStep(){
        return this.pathAlign[4].currentStep;
    }

    get isSkillsInfoStep(){
        return this.pathAlign[5].currentStep;
    }

    get isCareerInfoStep(){
        return this.pathAlign[6].currentStep;
    }

    get isWorkInfoStep(){
        return this.pathAlign[7].currentStep;
    }

    get isCertificationInfoStep(){
        return this.pathAlign[8].currentStep;
    }

    get isEssayInfoStep(){
        return this.pathAlign[9].currentStep;
    }

    get isUnprivilegedInfoStep(){
        return this.pathAlign[10].currentStep;
    }


    handleNext(event) {
        console.log("line 82");
        var index = this.currentPage;

        let nextBtn = this.querySelector('lightning-button[data-id="nextbtn"]')

        index = index + 1;
        var path = JSON.parse(JSON.stringify(this.pathAlign));

        if(index==path.length){
            // this.querySelector('lightning-button[data-id="nextbtn"]').className='slds-hide';
            // this.template.querySelector('lightning-button[data-id="nextbtn"]').className='slds-hide';
            // nextBtn.disabled=true;
            this.ShowBtn = 'slds-p-right_x-small slds-hide';
        }else{
        this.ShowBtn = 'slds-p-right_x-small';
        }

        for(var i = 0; i<path.length; i++){
            console.log("current index" , index);
            if(path[i].step === index){
                console.log("line 86");
                if( path[i].status.includes('slds-is-completed')){
                    path[i].status = 'slds-progress__item slds-is-active';
                    console.log("line 90");
                    path[i].icon = false;
                    path[i].icon2 = true;
                    path[i].currentStep=true;
                }
                
                if( path[i].status.includes('slds-has-error')){
                    console.log("line 97");
                    path[i].status = 'slds-progress__item slds-has-error';
                    path[i].icon = false;
                    path[i].icon2 = false;
                    path[i].icon3 = true;
                }
            }else{
                console.log("line 104");
                if( path[i].status.includes('slds-is-active')){
                    console.log("line 105");
                    path[i].status = 'slds-progress__item slds-is-completed';
                    path[i].icon = true; 
                    path[i].icon2 = false;
                    path[i].currentStep=false;
                }
                if( path[i].status.includes('slds-is-completed')){
                    path[i].status = 'slds-progress__item slds-is-completed';
                    path[i].icon = true; 
                    path[i].icon2 = false;
                }
                if( path[i].status.includes('slds-has-error')){
                    path[i].status = 'slds-progress__item slds-has-error';
                    path[i].icon = false;
                    path[i].icon2 = false;
                    path[i].icon3 = true;
                }
                
            }
        }
        this.currentPage += 1 ;
        const selectedEvent = new CustomEvent("getindexvalue", {
            detail: path
          });
      
          // Dispatches the event.
        this.dispatchEvent(selectedEvent);
    
      
         
        //this.pathAlign = path;

        // var ttIndx= path.length+1;
        // if( ttIndx === index){
        //     this.button1 = false; 
        // }
        // this.button2 = true;
        // this.template.querySelector("c-message-service").publish({
        //     key: "TIG_ApplicationFormDetailView_Event1",

        //     value: {
        //         "indexing" : index,
        //         "check" : false }
        // });
    }


    previousButton(event) {
        var index = this.currentPage;
        index = index - 1;

        if(index ==0) return;

        //this.currentPage = index;
        console.log('line 167', this.currentPage);
        console.log('line 168', index);

        

        //var path = this.pathAlign;
        var path = JSON.parse(JSON.stringify(this.pathAlign));

        if(index - 1 ==path.length){
            
            // this.ShowBtn = 'slds-p-right_x-small slds-hide';
            this.ShowBtn = 'slds-p-right_x-small slds-hide';
        }else{
        this.ShowBtn = 'slds-p-right_x-small';
        }


        


        for(var i = 0; i<path.length; i++){
            console.log("current index" , index);
            if(path[i].step === index){
                console.log("line 86");
                if( path[i].status.includes('slds-is-completed')){
                    path[i].status = 'slds-progress__item slds-is-active';
                    console.log("line 90");

                    path[i].icon = false;
                    path[i].icon2 = true;
                    path[i].currentStep=true;
                }
                
                if( path[i].status.includes('slds-has-error')){
                    console.log("line 97");
                    path[i].status = 'slds-progress__item slds-has-error';
                    path[i].icon = false;
                    path[i].icon2 = false;
                    path[i].icon3 = true;
                }
            }else{
                console.log("line 104");
                if( path[i].status.includes('slds-is-active')){
                    console.log("line 105");
                    path[i].status = 'slds-progress__item slds-is-completed';
                    path[i].icon = true; 
                    path[i].icon2 = false;
                    path[i].currentStep=false;
                }
                if( path[i].status.includes('slds-is-completed')){
                    path[i].status = 'slds-progress__item slds-is-completed';
                    path[i].icon = true; 
                    path[i].icon2 = false;
                }
                if( path[i].status.includes('slds-has-error')){
                    path[i].status = 'slds-progress__item slds-has-error';
                    path[i].icon = false;
                    path[i].icon2 = false;
                    path[i].icon3 = true;
                }
                
            }
        }
        this.currentPage -= 1 ;
        const selectedEvent = new CustomEvent("getindexvalue", {
            detail: path
          });
      
          // Dispatches the event.
        this.dispatchEvent(selectedEvent);
    }
   

    

    async getPicklistValues(){
        if(this.hasPicklistValues){
            return;
        }
        getPicklistValuesMap()
        .then(result => {
            this.genderOptions = result['hed__Gender__c'];
            this.timimgOptions = result['Timings__c'];
            this.branchOptions = result['Branch_Name__c'];

            this.relationshipTypeOptions = result['hed__Type__c'];
            this.howDoYouPlanToFundYourEducationOptions = result['How_do_you_plan_to_fund_your_education__c'];
            this.martialStatusOptions = result['Marital_Status__c'];
            this.doYouHaveAnyWorkExperienceOptions = result['Do_you_have_any_Work_Experience__c'];
            this.jobTypeOptions = result['Job_Type__c'];
            this.proficiencyOptions = result['Proficiency__c'];
            this.resultStatusOptions = result['Result_Status__c'];
            this.selectExamOptions = result['Select_Exam__c'];
            this.isDifferentlyAbledOptions = result['Handicapped__c'];
            this.companyScholarshipOptions = result['Company_Sponsorship__c'];
            this.EducationHistoryTypeOptions = result['Education_History_Type__c'];
            this.degreeEarnedOptions = result['hed__Degree_Earned__c'];
            this.educationTypeOptions = result['Education_Type__c'];
            this.educationHistoryCountryOptions = result['Country__c'];
        });
        this.hasPicklistValues = true;
    }
    
    getEducationHitory() {

        let mydata = this.application.educationHistories;
  
        mydata.forEach(element => {
            if (element.educationHistoryType == '10th' || element.educationHistoryType == '12th') 
                {element.isSchool = true} 
            else {element.isSchool = false}
        });
        this.educationHitory =  mydata;
    }
    
    async handleEdit(event){
        this.sldsSpinner = true;
        await this.getPicklistValues();
        this.isDisabled = false;
        this.isEditMode = true;
        this.sldsSpinner = false;
    }


    handleSave(event){ 
        const updateFields = event.detail.draftvalue;  
        console.log( 'testing' ,JSON.stringify(this.application));
        console.log('testing');
        const allValid = [
            ...this.template.querySelectorAll('lightning-input'),
        ].reduce((validSoFar, inputCmp) => {
            inputCmp.reportValidity();
            return validSoFar && inputCmp.checkValidity();
        }, true);
        if (!allValid) {
           return;
        }

        this.sldsSpinner = true;

        saveApplication({recordId : this.recordId, appWrapper : JSON.stringify(this.application)})
            .then(result => {
                console.log(result);
                
                this.applicationCopy = JSON.parse(JSON.stringify(this.application));
                this.sldsSpinner= false;
                this.isDisabled = true;
                this.isEditMode = false;
                this.showToast();
            })
            .catch(error => {
                this.sldsSpinner  = false;
                this.isDisabled = false;
                this.isEditMode = true;

                const event = new ShowToastEvent({
                    title: 'Saves Failed',
                    message: error.body.message,
                    variant: 'error',
                    mode: 'dismissable'
                });
                this.dispatchEvent(event);
            });
    }

    handleCancel(event){
        this.application = JSON.parse(JSON.stringify(this.applicationCopy));
        this.isEditMode = false;
        this.isDisabled = true;
    }

    handleApplicant(event){
        var value;
        if(event.target.type === 'checkbox' || event.target.type === 'checkbox-button' || event.target.type === 'toggle'){
            value = event.target.checked;
        }else{
            value = event.target.value;
        }

        this.application.applicant[event.target.name] = value;
        
    }

    handleFamilyInformation(event){
        var value;
        if(event.target.type === 'checkbox' || event.target.type === 'checkbox-button' || event.target.type === 'toggle'){
            value = event.target.checked;
        }else{
            value = event.target.value;
        }
        
        if(event.target.name === 'firstName'){            
            this.application.applicantRelations[event.target.dataset.id].firstName = value;
        }else if(event.target.name === 'relationshipType'){
            this.application.applicantRelations[event.target.dataset.id].relationshipType = value;
        }else if(event.target.name === 'lastName'){
            this.application.applicantRelations[event.target.dataset.id].lastName = value;
        }else if(event.target.name === 'mobile'){
            this.application.applicantRelations[event.target.dataset.id].mobile = value;
        }else if(event.target.name === 'email'){
            this.application.applicantRelations[event.target.dataset.id].email = value;
        }else if(event.target.name === 'age'){
            this.application.applicantRelations[event.target.dataset.id].age = value;
        }else if(event.target.name === 'occupation'){
            this.application.applicantRelations[event.target.dataset.id].occupation = value;
        }else if(event.target.name === 'currencyType'){
            this.application.applicantRelations[event.target.dataset.id].currencyType = value;
        }else if(event.target.name === 'annualIncome'){
            this.application.applicantRelations[event.target.dataset.id].annualIncome = value;
        }else if(event.target.name === 'phone'){
            this.application.applicantRelations[event.target.dataset.id].phone = value;
        }

    }

    handleWorkExperience(event){
        var value;
        if(event.target.type === 'checkbox' || event.target.type === 'checkbox-button' || event.target.type === 'toggle'){
            value = event.target.checked;
        }else{
            value = event.target.value;
        }
        if(event.target.name === 'doYouHaveAnyWorkExperience'){            
            this.application.workExperiences[event.target.dataset.id].doYouHaveAnyWorkExperience = value;
        }else if(event.target.name === 'jobType'){
            this.application.workExperiences[event.target.dataset.id].jobType = value;
        }else if(event.target.name === 'organisationName'){
            this.application.workExperiences[event.target.dataset.id].organisationName = value;
        }else if(event.target.name === 'industryType'){
            this.application.workExperiences[event.target.dataset.id].industryType = value;
        }else if(event.target.name === 'location'){
            this.application.workExperiences[event.target.dataset.id].location = value;
        }else if(event.target.name === 'designation'){
            this.application.workExperiences[event.target.dataset.id].designation = value;
        }else if(event.target.name === 'dateOfJoining'){
            this.application.workExperiences[event.target.dataset.id].dateOfJoining = value;
        }else if(event.target.name === 'dateOfLeaving'){
            this.application.workExperiences[event.target.dataset.id].dateOfLeaving = value;
        }else if(event.target.name === 'currencyType'){
            this.application.workExperiences[event.target.dataset.id].currencyType = value;
        }else if(event.target.name === 'annualSalary'){
            this.application.workExperiences[event.target.dataset.id].annualSalary = value;
        }
    }

    handleEducation(event){
        var value;
        if(event.target.type === 'checkbox' || event.target.type === 'checkbox-button' || event.target.type === 'toggle'){
            value = event.target.checked;
        }else{
            value = event.target.value;
        }
        if(event.target.name === 'yearOfPassing'){            
            this.application.educationHistories[event.target.dataset.id].yearOfPassing = value;
        }else if(event.target.name === 'boardCouncil'){
            this.application.educationHistories[event.target.dataset.id].boardCouncil = value;
        }else if(event.target.name === 'degreeCGPADGPA'){
            this.application.educationHistories[event.target.dataset.id].degreeCGPADGPA = value;
        }else if(event.target.name === 'educationType'){
            this.application.educationHistories[event.target.dataset.id].educationType = value;
        }else if(event.target.name === 'institutionName'){
            this.application.educationHistories[event.target.dataset.id].institutionName = value;
        }else if(event.target.name === 'obtainedMarks'){
            this.application.educationHistories[event.target.dataset.id].obtainedMarks = value;
        }else if(event.target.name === 'degreeEarned'){
            this.application.educationHistories[event.target.dataset.id].degreeEarned = value;
        }else if(event.target.name === 'semesteryearwiseMarks'){
            this.application.educationHistories[event.target.dataset.id].semesteryearwiseMarks = value;
        }else if(event.target.name === 'country'){
            this.application.educationHistories[event.target.dataset.id].country = value;
        }else if(event.target.name === 'state'){
            this.application.educationHistories[event.target.dataset.id].state = value;
        }else if(event.target.name === 'city'){
            this.application.educationHistories[event.target.dataset.id].city = value;
        }
    }

    handleAddress(event){
        var value;
        if(event.target.type === 'checkbox' || event.target.type === 'checkbox-button' || event.target.type === 'toggle'){
            value = event.target.checked;
        }else{
            value = event.target.value;
        }
        if(event.target.name === 'mailingStreet'){            
            this.application.addresses[event.target.dataset.id].mailingStreet = value;
        }else if(event.target.name === 'mailingDistrict'){
            this.application.addresses[event.target.dataset.id].mailingDistrict = value;
        }else if(event.target.name === 'mailingState'){
            this.application.addresses[event.target.dataset.id].mailingState = value;
        }else if(event.target.name === 'mailingCountry'){
            this.application.addresses[event.target.dataset.id].mailingCountry = value;
        }else if(event.target.name === 'mailingPostalCode'){
            this.application.addresses[event.target.dataset.id].mailingPostalCode = value;
        }
    }

    handleOtherDetails(event){
        var value;
        if(event.target.type === 'checkbox' || event.target.type === 'checkbox-button' || event.target.type === 'toggle'){
            value = event.target.checked;
        }else{
            value = event.target.value;
        }

        this.application.applicationWrapper[event.target.name] = value;
    }

    handleLanguageDetails(event){
        var value;
        if(event.target.type === 'checkbox' || event.target.type === 'checkbox-button' || event.target.type === 'toggle'){
            value = event.target.checked;
        }else{
            value = event.target.value;
        }
        if(event.target.name === 'languageName'){            
            this.application.languages[event.target.dataset.id].languageName = value;
        }else if(event.target.name === 'proficiency'){
            this.application.languages[event.target.dataset.id].proficiency = value;
        }
    }

    handleChange(event) {
        
        this.areDetailsVisible = event.target.checked;
        this.status = event.target.value;



        if(event.target.status === 'Paid'){            
            this.PaymentGatewayTransactionDetail.status[event.target.dataset.id].status = value;
        }else if(event.target.name === 'Not Paid'){
            this.PaymentGatewayTransactionDetail.status[event.target.dataset.id].status = value;
        }

    }

    // handleAdmissionTestScoreDetails(event){
    //     var value;
    //     if(event.target.type === 'checkbox' || event.target.type === 'checkbox-button' || event.target.type === 'toggle'){
    //         value = event.target.checked;
    //     }else{
    //         value = event.target.value;
    //     }
    //     if(event.target.name === 'selectExam'){            
    //         this.application.entranceExams[event.target.dataset.id].selectExam = value;
    //     }else if(event.target.name === 'resultStatus'){
    //         this.application.entranceExams[event.target.dataset.id].resultStatus = value;
    //     }else if(event.target.name === 'score'){
    //         this.application.entranceExams[event.target.dataset.id].score = value;
    //     }
    // }

    handlePaymentDetails(event){
        var value;
        if(event.target.type === 'checkbox' || event.target.type === 'checkbox-button' || event.target.type === 'toggle'){
            value = event.target.checked;
        }else{
            value = event.target.value;
        }
        if(event.target.name === 'Status'){            
            this.PaymentGatewayTransactionDetail.status[event.target.dataset.id].status = value;
        }else if(event.target.name === 'Status'){
            this.PaymentGatewayTransactionDetail.status[event.target.dataset.id].status = value;
        }
    }

    handleChange(event) {
        this.areDetailsVisible = event.target.checked;
    }

    showToast() {

        const event = new ShowToastEvent({
            title: 'Saved',
            message: 'Application Saved Successfully',
            variant: 'success',
            mode: 'dismissable'
        });
        this.dispatchEvent(event);
    }

    handleScroll(event){
        var sectionStudentInfo = this.template.querySelector(".sectionStudentInfo");  
        var FamilyInformationInfo = this.template.querySelector(".FamilyInformationInfo");
        var EmploymentDetailsInfo = this.template.querySelector(".EmploymentDetailsInfo");
        var EducationalQualificationsInfo = this.template.querySelector(".EducationalQualificationsInfo");
        var AddressDetailsInfo = this.template.querySelector(".AddressDetailsInfo");
        var OtherInfo = this.template.querySelector(".OtherInfo");
        var LanguageProficiencyDetailsInfo = this.template.querySelector(".LanguageProficiencyDetailsInfo");
        var AdmissionTestScoreDetailsInfo = this.template.querySelector(".AdmissionTestScoreDetailsInfo");
        var scrollHeight = event.target.scrollTop;
        var indexToActive = 0;   
        var firstBox = sectionStudentInfo.offsetHeight;
        var secondBox = firstBox+AddressDetailsInfo.offsetHeight;
        var thirdBox = secondBox+FamilyInformationInfo.offsetHeight;
        var fourthBox =  thirdBox+EmploymentDetailsInfo.offsetHeight;
        var fifthBox = fourthBox+EducationalQualificationsInfo.offsetHeight;
        var sixBox = fifthBox+OtherInfo.offsetHeight;
        var seventhBox = sixBox+LanguageProficiencyDetailsInfo.offsetHeight;
        var eigthBox = sixBox+AdmissionTestScoreDetailsInfo.offsetHeight;
        var scrollHeightArray = [{'min':0,'max':firstBox},
                                 {'min':firstBox,'max':secondBox},
                                 {'min':secondBox,'max':thirdBox},
                                 {'min':thirdBox,'max':fourthBox},
                                 {'min':fourthBox,'max':fifthBox},
                                 {'min':fifthBox,'max':sixBox},
                                 {'min':sixBox,'max':seventhBox},
                                 {'min':seventhBox,'max':eigthBox}];
        for(let i=0; i< scrollHeightArray.length; i++){
            if(scrollHeightArray[i].min <= scrollHeight && scrollHeight <= scrollHeightArray[i].max){
                indexToActive = i;
                break;
            }
        }
        this.dispatchEvent(new CustomEvent('highlight', {detail: {'indexToActive':indexToActive}}));
    }
}