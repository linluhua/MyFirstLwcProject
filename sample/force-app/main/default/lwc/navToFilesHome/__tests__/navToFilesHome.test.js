import { createElement } from 'lwc';
import NavToFilesHome from 'c/navToFilesHome';
import { getNavigateCalledWith } from 'lightning/navigation';
// This test uses a mocked navigation plugin.
// See force-app/test/jest-mocks/navigation.js for the mock
// and see jest.config.js for jest config to use the mock

describe('c-nav-to-files-home', () => {
    it('navigates to files home tab', () => {
        // Nav param values to test later
        const NAV_TYPE = 'standard__objectPage';
        const NAV_OBJECT_API_NAME = 'ContentDocument';
        const NAV_ACTION_NAME = 'home';

        // Create initial lwc element and attach to virtual DOM
        const element = createElement('c-nav-to-files-home', {
            is: NavToFilesHome
        });
        document.body.appendChild(element);

        // Return a promise to wait for any asynchronous DOM updates. Jest
        // will automatically wait for the Promise chain to complete before
        // ending the test and fail the test if the promise rejects.
        return Promise.resolve().then(() => {
            // Get handle to button and fire click event
            const buttonEl = element.shadowRoot.querySelector(
                'lightning-button'
            );
            buttonEl.click();

            const { pageReference } = getNavigateCalledWith();

            // Verify component called with correct event type and params
            expect(pageReference.type).toBe(NAV_TYPE);
            expect(pageReference.attributes.objectApiName).toBe(
                NAV_OBJECT_API_NAME
            );
            expect(pageReference.attributes.actionName).toBe(NAV_ACTION_NAME);
        });
    });

    it('is accessible', () => {
        const element = createElement('c-nav-to-files-home', {
            is: NavToFilesHome
        });

        document.body.appendChild(element);

        return Promise.resolve().then(() => expect(element).toBeAccessible());
    });
});
