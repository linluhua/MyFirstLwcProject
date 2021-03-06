import { createElement } from 'lwc';
import { ShowToastEventName } from 'lightning/platformShowToastEvent';
import MiscNotification from 'c/miscNotification';

describe('c-misc-notification', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('shows custom toast events based on user input', () => {
        const TOAST_TITLE = 'The Title';
        const TOAST_MESSAGE = 'The Message';
        const TOAST_VARIANT = 'warning';

        // Create initial element
        const element = createElement('c-misc-notification', {
            is: MiscNotification
        });
        document.body.appendChild(element);

        // Mock handler for toast event
        const handler = jest.fn();
        // Add event listener to catch toast event
        element.addEventListener(ShowToastEventName, handler);

        // Select input field for simulating user input
        const inputTitleEl = element.shadowRoot.querySelector(
            'lightning-input[data-id="titleInput"]'
        );
        inputTitleEl.value = TOAST_TITLE;
        inputTitleEl.dispatchEvent(new CustomEvent('change'));

        // Select input field for simulating user input
        const inputMessageEl = element.shadowRoot.querySelector(
            'lightning-input[data-id="messageInput"]'
        );
        inputMessageEl.value = TOAST_MESSAGE;
        inputMessageEl.dispatchEvent(new CustomEvent('change'));

        // Select combobox for simulating user input
        const comboboxEl = element.shadowRoot.querySelector(
            'lightning-combobox'
        );
        comboboxEl.value = TOAST_VARIANT;
        comboboxEl.dispatchEvent(new CustomEvent('change'));

        // Select button for simulating user interaction
        const buttonEl = element.shadowRoot.querySelector('lightning-button');
        buttonEl.click();

        // Return a promise to wait for any asynchronous DOM updates. Jest
        // will automatically wait for the Promise chain to complete before
        // ending the test and fail the test if the promise ends in the
        // rejected state
        return Promise.resolve().then(() => {
            // Check if toast event has been fired
            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.title).toBe(TOAST_TITLE);
            expect(handler.mock.calls[0][0].detail.message).toBe(TOAST_MESSAGE);
            expect(handler.mock.calls[0][0].detail.variant).toBe(TOAST_VARIANT);
        });
    });

    it('is accessible', () => {
        const element = createElement('c-misc-notification', {
            is: MiscNotification
        });

        document.body.appendChild(element);

        return Promise.resolve().then(() => expect(element).toBeAccessible());
    });
});
