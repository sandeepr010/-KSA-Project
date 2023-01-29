public with sharing class ApplicationController {

    
    @auraEnabled
    public static ApplicationViewWrapper getAppliction(String recordId){
        ApplicationViewWrapper applicationViewWrapperInstance = new ApplicationViewWrapper();

        hed__Application__c application = [select hed__Preparer__r.Name,Highest_Qualification__c,Sports_Achievements__c, Professional_Achievements__c, Extra_Curricular_Activities__c, How_do_you_plan_to_fund_your_education__c, Statement_of_Purpose__c, Company_Sponsorship__c, Exceptional_Academic_Achievements__c, Master_s_Plan__c, Appeared_For_Any_Entrance_Exam__c, Do_you_have_work_experience__c from hed__Application__c where Id =:recordId];
        List<Contact> applicant = [select Id, FirstName, LastName, Aadhar_Number__c, Age_as_on_Date__c, Highest_Qualification__c, Birthdate, Nationality__c, hed__Gender__c, Mother_Tongue__c, Phone, Email, Contact_Phone__c, Marital_Status__c, Middle_Name__c, Passport_Number__c, Date_of_Expiry__c, Handicapped__c from Contact where id in (select hed__Applicant__c from hed__Application__c where Id =:recordId)];
         System.debug(application);

        List<hed__Education_History__c> educationHistoryList = [select Id, Year_of_Passing__c, Board_Council__c, Degree_CGPA_DGPA__c, Education_Type__c, Education_History_Type__c,Certification_Name__c, University_Institution__c, City__c, State__c, Country__c, Obtained_Marks__c, hed__Degree_Earned__c, Semester_Year_wise_Marks__c from hed__Education_History__c where Application__c =: recordId];

        List<hed__Relationship__c> relatedContactsList = [select Id,hed__RelatedContact__r.Id, hed__RelatedContact__r.Occupation__c, hed__RelatedContact__r.Annual_Income__c, hed__RelatedContact__r.Middle_Name__c, hed__RelatedContact__c,hed__RelatedContact__r.Email,hed__RelatedContact__r.phone, hed__RelatedContact__r.FirstName,hed__RelatedContact__r.LastName, hed__Status__c,hed__Type__c, hed__RelatedContact__r.Age__c, hed__RelatedContact__r.Qualification__c, hed__RelatedContact__r.Currency_Type__c FROM hed__Relationship__c where Application__c =:recordId];

        List<hed__Address__c> addressList = [select Id, hed__MailingStreet__c, hed__MailingStreet2__c, hed__MailingCity__c, Mailing_District__c, hed__MailingCounty__c, hed__MailingPostalCode__c, hed__MailingState__c  from hed__Address__c where Application__c =:recordId];

        //List<Work_Experience__c> workExperienceList = [select Id, Do_you_have_any_Work_Experience__c, Job_Type__c, Organisation_s_Name__c, Industry_Type__c, Location__c, Designation__c, Date_of_Joining__c, Date_of_Leaving__c, Currency_Type__c, Annual_Salary__c, No_of_months__c from Work_Experience__c where Application__c =:recordId];

        //List<Language__c> languagesList = [select Id, Name, Proficiency__c, Application__c from Language__c where Application__c =:recordId];
        
        List<Entrance_Exam__c> entranceExamList = [select id, Application__c, Applicant__c, Select_Exam__c, Result_Status__c, Score__c, Total_Score__c from Entrance_Exam__c where Application__c = :recordId];
        
        List<ApplicationViewWrapper.EducationHistoryWrapper> educationHistoryWrapperList = new List<ApplicationViewWrapper.EducationHistoryWrapper>();
        List<ApplicationViewWrapper.RelatedContactWrapper> relatedContactWrapperList = new List<ApplicationViewWrapper.RelatedContactWrapper>();
        List<ApplicationViewWrapper.AddressWrapper> addressesWrapperList = new List<ApplicationViewWrapper.AddressWrapper>();
        List<ApplicationViewWrapper.WorkExperienceWrapper> workExperienceWrapperList = new List<ApplicationViewWrapper.WorkExperienceWrapper>();
        List<ApplicationViewWrapper.LanguageWrapper> languageWrapperList = new List<ApplicationViewWrapper.LanguageWrapper>();
        List<ApplicationViewWrapper.EntranceExamWrapper> entranceExamWrapperList = new List<ApplicationViewWrapper.EntranceExamWrapper>();

        ApplicationViewWrapper.ContactWrapper conWrapper = new ApplicationViewWrapper.ContactWrapper(applicant[0]);
        for(hed__Education_History__c eh : educationHistoryList){
            ApplicationViewWrapper.EducationHistoryWrapper edw = new ApplicationViewWrapper.EducationHistoryWrapper(eh);
            educationHistoryWrapperList.add(edw);
        }

        for(hed__Relationship__c relationship : relatedContactsList){
            ApplicationViewWrapper.RelatedContactWrapper relatedConWrapper = new ApplicationViewWrapper.RelatedContactWrapper(relationship);
            relatedContactWrapperList.add(relatedConWrapper);
        }

        for(hed__Address__c add : addressList){
            ApplicationViewWrapper.AddressWrapper addWrapper = new ApplicationViewWrapper.AddressWrapper(add);
            addressesWrapperList.add(addWrapper);
        }

        // for(Work_Experience__c exp : workExperienceList){
        //     ApplicationViewWrapper.WorkExperienceWrapper expWrapper = new ApplicationViewWrapper.WorkExperienceWrapper(exp);
        //     workExperienceWrapperList.add(expWrapper);
        // }

        // for(Language__c lang : languagesList){
        //     ApplicationViewWrapper.LanguageWrapper langWrapper = new ApplicationViewWrapper.LanguageWrapper(lang);
        //     languageWrapperList.add(langWrapper);
        // }

        for(Entrance_Exam__c exam : entranceExamList){
            ApplicationViewWrapper.EntranceExamWrapper langWrapper = new ApplicationViewWrapper.EntranceExamWrapper(exam);
            entranceExamWrapperList.add(langWrapper);
        }

        applicationViewWrapperInstance.applicationWrapper = new ApplicationViewWrapper.ApplicationWrapper(application);
        applicationViewWrapperInstance.applicant = conWrapper;
        applicationViewWrapperInstance.educationHistories = educationHistoryWrapperList;
        applicationViewWrapperInstance.applicantRelations = relatedContactWrapperList;
        applicationViewWrapperInstance.addresses = addressesWrapperList;
        if(application != null && application.Do_you_have_work_experience__c != null && application.Do_you_have_work_experience__c){
            applicationViewWrapperInstance.workExperiences = workExperienceWrapperList;
        }
        applicationViewWrapperInstance.languages = languageWrapperList;
        if(application != null && application.Appeared_For_Any_Entrance_Exam__c != null && application.Appeared_For_Any_Entrance_Exam__c){
            applicationViewWrapperInstance.entranceExams = entranceExamWrapperList;
        }
        return applicationViewWrapperInstance;

    }

    @auraEnabled
    public static Map<String,List<SelectOption>> getPicklistValuesMap(){
        Map<String,List<SelectOption>> valuesMap = new Map<String,List<SelectOption>>();
        getPicklistValues('contact', 'hed__Gender__c', valuesMap);
        getPicklistValues('contact', 'Marital_Status__c', valuesMap);
        getPicklistValues('contact', 'Handicapped__c', valuesMap);
        getPicklistValues('hed__Application__c', 'How_do_you_plan_to_fund_your_education__c', valuesMap);
        getPicklistValues('hed__Application__c', 'Company_Sponsorship__c', valuesMap);
        getPicklistValues('hed__Relationship__c', 'hed__Type__c', valuesMap);
        getPicklistValues('Language__c', 'Proficiency__c', valuesMap);
        getPicklistValues('Entrance_Exam__c', 'Result_Status__c', valuesMap);
        getPicklistValues('Entrance_Exam__c', 'Select_Exam__c', valuesMap);
        getPicklistValues('Work_Experience__c', 'Do_you_have_any_Work_Experience__c', valuesMap);
        getPicklistValues('Work_Experience__c', 'Job_Type__c', valuesMap);
        getPicklistValues('hed__Education_History__c', 'Education_History_Type__c', valuesMap);
        getPicklistValues('hed__Education_History__c', 'hed__Degree_Earned__c', valuesMap);
        getPicklistValues('hed__Education_History__c', 'Education_Type__c', valuesMap);
        getPicklistValues('hed__Education_History__c', 'Country__c', valuesMap);
        return valuesMap;
    }

    @auraEnabled
    public static void saveApplication(String recordId, String appWrapper){
        System.debug(recordId);
        hed__Application__c application = [select hed__Preparer__r.Name ,Highest_Qualification__c, Sports_Achievements__c, Professional_Achievements__c, Extra_Curricular_Activities__c, How_do_you_plan_to_fund_your_education__c, Statement_of_Purpose__c, Company_Sponsorship__c, Exceptional_Academic_Achievements__c, Master_s_Plan__c, Appeared_For_Any_Entrance_Exam__c, Do_you_have_work_experience__c from hed__Application__c where Id =:recordId];
        List<Contact> applicant = [select Id, FirstName, LastName,  MobilePhone,Birthdate, Nationality__c, hed__Gender__c, Mother_Tongue__c, Phone, Email, Marital_Status__c, Contact_Phone__c, Middle_Name__c, Passport_Number__c, Date_of_Expiry__c, Handicapped__c from Contact where id in (select hed__Applicant__c from hed__Application__c where Id =:recordId)];
        List<hed__Relationship__c> relatedRelationshipListWithContact = [select Id, hed__RelatedContact__r.Id, hed__RelatedContact__r.Occupation__c, hed__RelatedContact__r.Annual_Income__c, hed__RelatedContact__r.Middle_Name__c, hed__RelatedContact__c,hed__RelatedContact__r.Email,hed__RelatedContact__r.phone, hed__RelatedContact__r.FirstName,hed__RelatedContact__r.LastName, hed__Status__c,hed__Type__c, hed__RelatedContact__r.Age__c, hed__RelatedContact__r.Qualification__c, hed__RelatedContact__r.Currency_Type__c FROM hed__Relationship__c where Application__c =:recordId];
        List<Contact> relatedFamilyContactList = [select Id, FirstName, MobilePhone,Middle_Name__c,LastName, Age__c, Qualification__c, Currency_Type__c, Occupation__c, Annual_Income__c, Phone, Email from Contact where ID in (select hed__RelatedContact__c from hed__Relationship__c where Application__c =:recordId)];
        List<Work_Experience__c> workExperienceList = [select Id, Do_you_have_any_Work_Experience__c, Job_Type__c, Organisation_s_Name__c, Industry_Type__c, Location__c, Designation__c, Date_of_Joining__c, Date_of_Leaving__c, Currency_Type__c, Annual_Salary__c, No_of_months__c from Work_Experience__c where Application__c =:recordId];
        List<hed__Education_History__c> educationHistoryList = [select Id, Year_of_Passing__c, Board_Council__c, Degree_CGPA_DGPA__c, Education_Type__c, Education_History_Type__c,Certification_Name__c, University_Institution__c, City__c, State__c, Country__c, Obtained_Marks__c, hed__Degree_Earned__c, Semester_Year_wise_Marks__c from hed__Education_History__c where Application__c =: recordId];
        List<hed__Address__c> addressList = [select Id, hed__MailingStreet__c, hed__MailingStreet2__c, hed__MailingCity__c, Mailing_District__c, hed__MailingCounty__c, hed__MailingPostalCode__c, hed__MailingState__c  from hed__Address__c where Application__c =:recordId];
        List<Language__c> languagesList = [select Id, Name, Proficiency__c, Application__c from Language__c where Application__c =:recordId];
        List<Entrance_Exam__c> entranceExamList = [select id, Application__c, Applicant__c, Select_Exam__c, Result_Status__c, Score__c, Total_Score__c from Entrance_Exam__c where Application__c = :recordId];
        
        Savepoint sp = Database.setSavepoint();
        try{
            ApplicationViewWrapper applicationWrapper = (ApplicationViewWrapper)JSON.deserialize(appWrapper, ApplicationViewWrapper.class);
            system.debug('maping'+ applicationWrapper);
            updateApplicantDetails(applicant, applicationWrapper);
            updateOtherDetails(application, applicationWrapper);
           //updateFamilyDetails(relatedRelationshipListWithContact, relatedFamilyContactList, applicationWrapper);
            updateWorkExperience(workExperienceList, applicationWrapper);
            updateEducationDetails(educationHistoryList, applicationWrapper);
            updateAddressDetails(addressList, applicationWrapper);
            updateLanguageDetails(languagesList, applicationWrapper);
            updateEntranceExamDetails(entranceExamList, applicationWrapper);
        } catch(Exception e) {
            Database.rollback(sp);
            throw new AuraHandledException(e.getMessage() + ' ----  '+e.getStackTraceString());
        }


    }

    private static void getPicklistValues(String objName, String fieldName, Map<String,List<SelectOption>> valuesMap){
        List<SelectOption> pickListOptions = new List<SelectOption>();
        SObjectType objType = ((SObject) Type.forName('Schema', objName).newInstance()).getSObjectType();
        Schema.DescribeSObjectResult objectDescribe = objType.getDescribe();

        List<Schema.PicklistEntry> pickListValues = objectDescribe.fields.getMap()
            .get(fieldName)
            .getDescribe()
            .getPickListValues();

        for (Schema.PicklistEntry objPickList : pickListValues) {
            pickListOptions.add(new SelectOption(objPickList.getLabel(), objPickList.getValue()));
        }

        valuesMap.put(fieldName, pickListOptions);
    }

    private static void updateApplicantDetails(List<Contact> applicant, ApplicationViewWrapper appWrapper){
        if(appWrapper.applicant == null) return;
        for(Contact con : applicant){
            con.FirstName = appWrapper.applicant.firstName;
            con.Middle_Name__c = appWrapper.applicant.middleName;
            con.LastName = appWrapper.applicant.lastName;
            con.Birthdate = appWrapper.applicant.dateOfBirth;
            con.Nationality__c = appWrapper.applicant.nationality;
            con.Passport_Number__c = appWrapper.applicant.passportNumber;
            con.Date_of_Expiry__c = appWrapper.applicant.passportExpiary;
            con.hed__Gender__c = appWrapper.applicant.gender;
            con.Phone = appWrapper.applicant.mobile;
            con.Email = appWrapper.applicant.email;
            con.Marital_Status__c = appWrapper.applicant.martialStatus;
            con.Mother_Tongue__c = appWrapper.applicant.motherTongue;
            con.Handicapped__c = appWrapper.applicant.isDifferentlyAbled;
            // con.Aadhar_Number__c=appWrapper.applicant.aadharnumber;
            // con.Age_as_on_Date__c=appWrapper.applicant.ageasondate;
            // con.Highest_Qualification__c=appWrapper.applicant.highestqualification;



        }
        if(applicant.size() > 0){
            update applicant;
        }
    }

    private static Void updateFamilyDetails(List<hed__Relationship__c> relatedRelationshipListWithContact, List<Contact> relatedFamilyContactList, ApplicationViewWrapper appWrapper){
        Map<String, ApplicationViewWrapper.RelatedContactWrapper> mapRelationWithApplication = new Map<String, ApplicationViewWrapper.RelatedContactWrapper>();

        Map<String, ApplicationViewWrapper.RelatedContactWrapper> mapContactWithApplication = new Map<String, ApplicationViewWrapper.RelatedContactWrapper>();
        System.debug('map account'+ mapContactWithApplication);

        if(appWrapper.applicantRelations == null) return;

        for(ApplicationViewWrapper.RelatedContactWrapper appWrap : appWrapper.applicantRelations){
            mapRelationWithApplication.put(appWrap.recordId, appWrap);
            mapContactWithApplication.put(appWrap.relatedContectId, appWrap);
        }
        for(hed__Relationship__c relationship : relatedRelationshipListWithContact){
            relationship.hed__Type__c = mapRelationWithApplication.get(relationship.Id).relationshipType;
        }

        for(Contact con: relatedFamilyContactList){
            con.FirstName = mapContactWithApplication.get(con.Id).firstName;
            con.LastName = mapContactWithApplication.get(con.Id).lastName;
            con.Age__c = mapContactWithApplication.get(con.Id).age;
            con.Currency_Type__c = mapContactWithApplication.get(con.Id).currencyType;
            if(appWrapper.applicantRelations == null) return;
            con.Occupation__c = mapContactWithApplication.get(con.Id).occupation;
            //con.Annual_Income__c = Decimal.valueOf(mapContactWithApplication.get(con.Id).annualIncome);
            con.Phone = mapContactWithApplication.get(con.Id).mobile;
           
            con.Email = mapContactWithApplication.get(con.Id).email;
        }
        if(relatedFamilyContactList.size() > 0){
            update relatedFamilyContactList;
        }
        if(relatedRelationshipListWithContact.size() > 0){
            update relatedRelationshipListWithContact;
        }
    }

    private static void updateWorkExperience(List<Work_Experience__c> workExperienceList, ApplicationViewWrapper appWrapper){
        Map<String, ApplicationViewWrapper.WorkExperienceWrapper> mapWorkExpWithApplication = new Map<String, ApplicationViewWrapper.WorkExperienceWrapper>();

        if(appWrapper.workExperiences == null) return;
        
        for(ApplicationViewWrapper.WorkExperienceWrapper appWrap : appWrapper.workExperiences){
            mapWorkExpWithApplication.put(appWrap.recordId, appWrap);
        }
        for(Work_Experience__c workExperience: workExperienceList){
            workExperience.Do_you_have_any_Work_Experience__c = mapWorkExpWithApplication.get(workExperience.Id).doYouHaveAnyWorkExperience;
            workExperience.Job_Type__c = mapWorkExpWithApplication.get(workExperience.Id).jobType;
            workExperience.Organisation_s_Name__c = mapWorkExpWithApplication.get(workExperience.Id).organisationName;
            workExperience.Industry_Type__c = mapWorkExpWithApplication.get(workExperience.Id).industryType;
            workExperience.Location__c = mapWorkExpWithApplication.get(workExperience.Id).location;
            workExperience.Designation__c = mapWorkExpWithApplication.get(workExperience.Id).designation;
            workExperience.Date_of_Joining__c = mapWorkExpWithApplication.get(workExperience.Id).dateOfJoining;
            workExperience.Date_of_Leaving__c = mapWorkExpWithApplication.get(workExperience.Id).dateOfLeaving;
            workExperience.Currency_Type__c = mapWorkExpWithApplication.get(workExperience.Id).currencyType;
            workExperience.Annual_Salary__c = mapWorkExpWithApplication.get(workExperience.Id).annualSalary;
            workExperience.No_of_months__c = mapWorkExpWithApplication.get(workExperience.Id).noOfMonths != null ? Decimal.valueOf(mapWorkExpWithApplication.get(workExperience.Id).noOfMonths) : null;
        }
        if(workExperienceList.size() > 0){
            update workExperienceList;
        }
    }

    private static void updateLanguageDetails(List<Language__c> languagesList, ApplicationViewWrapper appWrapper){
        Map<String, ApplicationViewWrapper.LanguageWrapper> mapLanguageWithApplication = new Map<String, ApplicationViewWrapper.LanguageWrapper>();

        if(appWrapper.languages == null) return;
        for(ApplicationViewWrapper.LanguageWrapper appWrap : appWrapper.languages){
            mapLanguageWithApplication.put(appWrap.recordId, appWrap);
        }
        for(Language__c lang : languagesList){
            lang.Name = mapLanguageWithApplication.get(lang.Id).languageName;
            lang.Proficiency__c = mapLanguageWithApplication.get(lang.Id).proficiency;
        }
        if(languagesList.size() > 0){
            update languagesList;
        }
    }

    private static void updateEntranceExamDetails(List<Entrance_Exam__c> entranceExamList, ApplicationViewWrapper appWrapper){
        Map<String, ApplicationViewWrapper.EntranceExamWrapper> mapEntranceExamWithApplication = new Map<String, ApplicationViewWrapper.EntranceExamWrapper>();

        if(appWrapper.entranceExams == null) return;
        
        for(ApplicationViewWrapper.EntranceExamWrapper appWrap : appWrapper.entranceExams){
            mapEntranceExamWithApplication.put(appWrap.recordId, appWrap);
        }
        for(Entrance_Exam__c exam : entranceExamList){
            exam.Select_Exam__c = mapEntranceExamWithApplication.get(exam.Id).selectExam;
            exam.Result_Status__c = mapEntranceExamWithApplication.get(exam.Id).resultStatus;
            exam.Score__c = mapEntranceExamWithApplication.get(exam.Id).score;
        }
        if(entranceExamList.size() > 0){
            update entranceExamList;
        }
    }

    private static void updateEducationDetails(List<hed__Education_History__c> educationHistoryList, ApplicationViewWrapper appWrapper){
        Map<String, ApplicationViewWrapper.EducationHistoryWrapper> mapEducationDetailsWithApplication = new Map<String, ApplicationViewWrapper.EducationHistoryWrapper>();

        if(appWrapper.educationHistories == null) return;
        for(ApplicationViewWrapper.EducationHistoryWrapper appWrap : appWrapper.educationHistories){
            mapEducationDetailsWithApplication.put(appWrap.recordId, appWrap);
        }
        for(hed__Education_History__c educationHistory: educationHistoryList){
            educationHistory.Education_History_Type__c = mapEducationDetailsWithApplication.get(educationHistory.Id).educationHistoryType;
            educationHistory.Year_of_Passing__c = mapEducationDetailsWithApplication.get(educationHistory.Id).yearOfPassing;
            educationHistory.Board_Council__c = mapEducationDetailsWithApplication.get(educationHistory.Id).boardCouncil;
            educationHistory.Degree_CGPA_DGPA__c = mapEducationDetailsWithApplication.get(educationHistory.Id).degreeCGPADGPA;
            educationHistory.Education_Type__c = mapEducationDetailsWithApplication.get(educationHistory.Id).educationType;
            educationHistory.hed__Degree_Earned__c = mapEducationDetailsWithApplication.get(educationHistory.Id).degreeEarned;
            educationHistory.University_Institution__c = mapEducationDetailsWithApplication.get(educationHistory.Id).institutionName;
            educationHistory.Obtained_Marks__c = mapEducationDetailsWithApplication.get(educationHistory.Id).obtainedMarks;
            educationHistory.Semester_Year_wise_Marks__c = mapEducationDetailsWithApplication.get(educationHistory.Id).semesteryearwiseMarks;
            educationHistory.City__c = mapEducationDetailsWithApplication.get(educationHistory.Id).city;
            educationHistory.State__c = mapEducationDetailsWithApplication.get(educationHistory.Id).state;
            educationHistory.Country__c = mapEducationDetailsWithApplication.get(educationHistory.Id).country;
        }
        if(educationHistoryList.size() > 0){
            update educationHistoryList;
        }
    }

    private static void updateAddressDetails(List<hed__Address__c> addressList, ApplicationViewWrapper appWrapper){
        Map<String, ApplicationViewWrapper.AddressWrapper> mapAddressDetailsWithApplication = new Map<String, ApplicationViewWrapper.AddressWrapper>();

        if(appWrapper.addresses == null) return;
        for(ApplicationViewWrapper.AddressWrapper appWrap : appWrapper.addresses){
            mapAddressDetailsWithApplication.put(appWrap.recordId, appWrap);
        }
        for(hed__Address__c addr: addressList){
            addr.hed__MailingStreet__c = mapAddressDetailsWithApplication.get(addr.Id).mailingStreet;
            addr.Mailing_District__c = mapAddressDetailsWithApplication.get(addr.Id).mailingDistrict;
            addr.hed__MailingCounty__c = mapAddressDetailsWithApplication.get(addr.Id).mailingCountry;
            addr.hed__MailingPostalCode__c = mapAddressDetailsWithApplication.get(addr.Id).mailingPostalCode;
            addr.hed__MailingState__c = mapAddressDetailsWithApplication.get(addr.Id).mailingState;
        }
        if(addressList.size() > 0){
            update addressList;
        }
    }

    private static void updateOtherDetails(hed__Application__c application, ApplicationViewWrapper appWrapper){
        if(application != null){
            application.Sports_Achievements__c = appWrapper.applicationWrapper.sportsAchievements;
            application.Professional_Achievements__c = appWrapper.applicationWrapper.professionalAchievements;
            application.Extra_Curricular_Activities__c = appWrapper.applicationWrapper.extraCurricularActivities;
            application.How_do_you_plan_to_fund_your_education__c = appWrapper.applicationWrapper.howDoYouPlanToFundYourEducation;
            application.Statement_of_Purpose__c = appWrapper.applicationWrapper.statementOfPurpose;
            application.Company_Sponsorship__c = appWrapper.applicationWrapper.companySponsorship;
            application.Exceptional_Academic_Achievements__c = appWrapper.applicationWrapper.exceptionalAcademicAchievements;
            application.Master_s_Plan__c = appWrapper.applicationWrapper.mastersPlan;
            update application;
        }
    }

    public class SelectOption {
		@AuraEnabled
		public String label;
		@AuraEnabled
		public String value;

		public SelectOption(String label, String value) {
			this.label = label;
			this.value = value;
		}
	}
}