/// <reference path="./../../typings/main.d.ts" />

module Diplomat.Services {

    /*export interface PatientServiceInterface {
        getPatient: Function;
        createPatient: Function;
    }*/

    //implements PatientServiceInterface
    class Service {

        getPatient: Function;
        createPatient: Function;

        static $inject: string[] = ['config', "$httpBackend"];

        constructor(config, $httpBackend) {
            // allowes to use regular expression when matching url
            function rx(regexp) {
                return {
                    test: function(url) {
                        this.matches = url.match(config.webApi + regexp);
                        // console.log('url', url, config.webApi + regexp, this.matches && this.matches.length);
                        return this.matches && this.matches.length > 0;
                    }
                };
            };

            /**
             * Mocked apis
             */
            // Account configuration
            $httpBackend.whenGET(rx('account-configuration/business-units'))
                .respond(accountConfBusinessUnits());

            $httpBackend.whenGET(rx('account-configuration/groups'))
                .respond(accountConfGroups());

            /**
             * Real apis
             */
            $httpBackend.whenPOST(config.webApi + 'patient/search/benefitinvestigation')
                .passThrough();

            $httpBackend.whenPOST(config.webApi + 'patient/search/financialassistance')
                .passThrough();

            $httpBackend.whenPOST(config.webApi + 'patient/search/onboarding')
                .passThrough();


            $httpBackend.whenPOST(config.webApi + 'patient/search/orderentry')
                .passThrough();

            $httpBackend.whenPOST(config.webApi + 'patient/search/fulfillment')
                .passThrough();

            $httpBackend.whenPOST(config.webApi + 'patient/search/refill')
                .passThrough();

            $httpBackend.whenPOST(config.webApi + 'patient/advanced-search')
                .passThrough();

            $httpBackend.whenPOST(config.webApi + 'prescriber/search')
                .passThrough();


            $httpBackend.whenPOST(config.webApi + 'patients/orders')
                .passThrough();


            $httpBackend.whenPOST(config.webApi + 'refills/refillhistory')
                .passThrough();

            $httpBackend.whenPOST(config.webApi + '/configurations/config')
                .passThrough();

            $httpBackend.whenGET(config.webApi + '/configurations/config')
                .passThrough();

            $httpBackend.whenPOST(config.webApi + '/requests/search')
                .passThrough();

            $httpBackend.whenPOST(config.webApi + 'patient/export')
                .passThrough();
            
            $httpBackend.whenGET(rx('/enums/*'))
                .passThrough();

            $httpBackend.whenGET(rx('/requests/*'))
                .passThrough();

        }
    }

    function accountConfBusinessUnits() {
        return [{
            id: 1,
            name: "Central Pharmacy Newborough",
            address: "28 Rutherglen Rd, Newborough",
            assigned: true
        }, {
                id: 2,
                name: "Priceline Pharmacy",
                address: "27 Barbara Ave, Newborough",
                assigned: false
            }, {
                id: 3,
                name: "Discount Drug Store",
                address: "68 Lloyd St., Moe",
                assigned: false
            }, {
                id: 4,
                name: "John’s Pharmacy Store",
                address: "1164 Millburn Ave, Newborough",
                assigned: false
            }, {
                id: 5,
                name: "John’s Pharmacy",
                address: "152 Washington Ave, Maplewood",
                assigned: false
            }, {
                id: 6,
                name: "Ladhope Compounding Pharmacy",
                address: "451 Bloomfield Ave Ste 1, Newark",
                assigned: false
            }, {
                id: 7,
                name: "Wickham House Compounding Pharmacy",
                address: "458 Roseville Ave, Newark",
                assigned: true
            }, {
                id: 8,
                name: "Terry White Chemists",
                address: "211 Warren Street, Newark",
                assigned: false
            }, {
                id: 9,
                name: "John’s Specialty Pharmacy Store",
                address: "1 Gateway Ctr, Newark",
                assigned: true
            }, {
                id: 10,
                name: "John’s Specialty Pharmacy Central",
                address: "111 Market St, Jersey City",
                assigned: false
            }, {
                id: 11,
                name: "John and Jack Specialty Pharmacy - West",
                address: "3717 E South StLong Beach,",
                assigned: true
            }, {
                id: 12,
                name: "John and Jack Specialty Pharmacy - Central",
                address: "3301 E Miraloma Ave,Anaheim",
                assigned: false
            }, {
                id: 13,
                name: "John and Jack Specialty Pharmacy - St. George",
                address: "1630 Coney Island Ave, Brooklyn",
                assigned: false
            }, {
                id: 14,
                name: "John and Jack Specialty Pharmacy - Virginia",
                address: "1409 Avenue J, Brooklyn",
                assigned: false
            }, {
                id: 15,
                name: "John and Jack Specialty Pharmacy - Opera House",
                address: "56 Broad St, Newark",
                assigned: false
            }, {
                id: 16,
                name: "John and Jack Specialty Pharmacy - East",
                address: "451 Bloomfield Ave Ste 1, Newark",
                assigned: false
            }, {
                id: 17,
                name: "The Modern Chemist Pharmacy",
                address: "1446 E 12th St, Brooklyn",
                assigned: false
            }, {
                id: 18,
                name: "Andrew Brew Specialty Pharmacy",
                address: "248 Kearny Ave, Kearny",
                assigned: false
            }, {
                id: 19,
                name: "A&B Specialty Pharmacy",
                address: "56 Warren Street, Eastville",
                assigned: false
            }, {
                id: 20,
                name: "Andrew Specialty Pharmacy",
                address: "5 Gateway Ctr, Edison",
                assigned: false
            }, {
                id: 21,
                name: "Andrew Sr. Specialty Pharmacy",
                address: "78 Market St, Jersey City",
                assigned: false
            }, {
                id: 22,
                name: "Elmora Healthcare",
                address: "148 Elmora Ave, Elizabeth",
                assigned: false
            }, {
                id: 23,
                name: "Liss Pharmacy",
                address: "325 Washington Ave, Belleville",
                assigned: false
            }, {
                id: 24,
                name: "Maple Pharmacy",
                address: "960 Springfield Ave, Irvington",
                assigned: false
            }, {
                id: 25,
                name: "Bob's Pharmacy",
                address: "2064 Millburn Ave, Maplewood",
                assigned: false
            }, {
                id: 26,
                name: "Green Leaf Pharmacy",
                address: "12 Washington Ave, Newborough ",
                assigned: false
            }];
       
    }

    function accountConfGroups() {
        return [{
            id: 1,
            name: "John’s Community",
            groupName: "John’s Community",
            groupDescription: "This is the community of John",
            created: "22/03/2016",
            status: "Active",
            address: "John’s Community Pharmacies"
        }, {
                id: 2,
                name: "John’s Specialty",
                groupName: "John’s Specialty",
                groupDescription: "This is the community of John’s Specialty",
                created: "22/03/2016",
                status: "Active",
                address: "John’s Specialty Pharmacies"
            }, {
                id: 3,
                name: "J&J Specialty",
                groupName: "J&J Specialty",
                groupDescription: "This is the community of J&J Specialty",
                created: "22/03/2016",
                status: "Active",
                address: "John and Jack Specialty Pharmacy"
            }, {
                id: 4,
                name: "AAA Specialty",
                groupName: "AAA Specialty",
                groupDescription: "This is the community of AAA Specialty",
                created: "22/03/2016",
                status: "Active",
                address: "Andrew Brew Specialty Pharmacy"
            }, {
                id: 5,
                name: "Bob’s Pharmacy",
                groupName: "Bob’s Pharmacy",
                groupDescription: "This is the community of Bob",
                created: "22/03/2016",
                status: "Active",
                address: "Bob’s Pharmacies"
            }];
    }

    // Register factory.
    export class MocksService {
        app: ng.IModule;

        constructor() {
            this.app = angular.module("Diplomat");
            this.app.service("MocksService", Service);
        }
    }

}

// Instantiate the service.
new Diplomat.Services.MocksService();