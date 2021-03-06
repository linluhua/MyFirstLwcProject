import { createElement } from 'lwc';
import ApexWireMethodToFunction from 'c/apexWireMethodToFunction';
import { registerApexTestWireAdapter } from '@salesforce/sfdx-lwc-jest';
import getContactList from '@salesforce/apex/ContactController.getContactList';

// Realistic data with a list of contacts
const mockGetContactList = require('./data/getContactList.json');

// Register as Apex wire adapter. Some tests verify that provisioned values trigger desired behavior.
const getContactListAdapter = registerApexTestWireAdapter(getContactList);

describe('c-apex-wire-method-to-function', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        // Prevent data saved on mocks from leaking between tests
        jest.clearAllMocks();
    });

    describe('getContactList @wire', () => {
        it('renders six records when data returned', () => {
            // Create initial element
            const element = createElement('c-apex-wire-method-to-function', {
                is: ApexWireMethodToFunction
            });
            document.body.appendChild(element);

            // Emit data from @wire
            getContactListAdapter.emit(mockGetContactList);

            // Return a promise to wait for any asynchronous DOM updates. Jest
            // will automatically wait for the Promise chain to complete before
            // ending the test and fail the test if the promise rejects.
            return Promise.resolve().then(() => {
                // Select elements for validation
                const detailEls = element.shadowRoot.querySelectorAll('p');
                expect(detailEls.length).toBe(mockGetContactList.length);
                expect(detailEls[0].textContent).toBe(
                    mockGetContactList[0].Name
                );
            });
        });
        it('shows error panel element when error returned', () => {
            // Create initial element
            const element = createElement('c-apex-wire-method-to-function', {
                is: ApexWireMethodToFunction
            });
            document.body.appendChild(element);

            // Emit error from @wire
            getContactListAdapter.error();

            // Return a promise to wait for any asynchronous DOM updates. Jest
            // will automatically wait for the Promise chain to complete before
            // ending the test and fail the test if the promise rejects.
            return Promise.resolve().then(() => {
                const errorPanelEl = element.shadowRoot.querySelector(
                    'c-error-panel'
                );
                expect(errorPanelEl).not.toBeNull();
            });
        });
    });

    it('is accessible when data is returned', () => {
        // Create initial element
        const element = createElement('c-apex-wire-method-to-function', {
            is: ApexWireMethodToFunction
        });
        document.body.appendChild(element);

        // Emit data from @wire
        getContactListAdapter.emit(mockGetContactList);

        return Promise.resolve().then(() => expect(element).toBeAccessible());
    });

    it('is accessible when error is returned', () => {
        // Create initial element
        const element = createElement('c-apex-wire-method-to-function', {
            is: ApexWireMethodToFunction
        });
        document.body.appendChild(element);

        // Emit error from @wire
        getContactListAdapter.error();

        return Promise.resolve().then(() => expect(element).toBeAccessible());
    });
});
