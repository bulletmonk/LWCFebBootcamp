/**
 * @description       : Controller for detailCmp
 * @author            : Theodore Fernandez
 * @group             : 
 * @last modified on  : 03-05-2021
 * @last modified by  : Theodore Fernandez
 * Modifications Log 
 * Ver   Date         Author               Modification
 * 1.0   03-05-2021   Theodore Fernandez   Initial Version
**/
public with sharing class detailController {
    /**
    * @description Returns an Account given a record Id
    * @author Theodore Fernandez | 03-05-2021 
    * @param String recordId 
    * @return Account 
    **/
    @AuraEnabled(cacheable=true)
    public static Account getAccountById(String recordId) {
        return [SELECT Id, Name, Industry, Type, Phone, Website, AccountNumber FROM Account WHERE Id = :recordId];
    }
}
