/**
 * @description       : 
 * @author            : Theodore Fernandez
 * @group             : 
 * @last modified on  : 03-04-2021
 * @last modified by  : Theodore Fernandez
 * Modifications Log 
 * Ver   Date         Author               Modification
 * 1.0   03-04-2021   Theodore Fernandez   Initial Version
**/
public with sharing class searchCmpController {
    /**
    * @description Returns
    * @author Theodore Fernandez | 03-04-2021 
    * @param String searchValue 
    * @return List<Account> 
    **/
    @AuraEnabled()
    public static List<Account> getAccounts(String searchValue) {
        System.debug('inside searchCmpController');
        // Add % to enable wild card search
        searchValue = '%' + searchValue + '%';
        List<Account> accountList = [SELECT Id, Name FROM Account WHERE Name LIKE:searchValue];

        return accountList;
    }

}
