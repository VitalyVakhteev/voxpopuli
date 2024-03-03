// src/stores.js
import { writable } from 'svelte/store';
import {goto} from "$app/navigation";

// Function to create a writable store that syncs with localStorage
function persist(key, initialValue) {
    // Initialize the store value
    let value = initialValue;

    // Check if running in a browser environment
    if (typeof window !== 'undefined') {
        // Attempt to get the stored value from localStorage
        const storedValue = localStorage.getItem(key);
        if (storedValue !== null) {
            value = JSON.parse(storedValue);
        }
    }

    // Create a Svelte writable store with the value
    const store = writable(value);

    // Only subscribe to the store and update localStorage if in a browser
    if (typeof window !== 'undefined') {
        store.subscribe((currentValue) => {
            localStorage.setItem(key, JSON.stringify(currentValue));
        });
    }

    return store;
}
export function logout() {
    // Check if running in a browser environment
    if (typeof window !== 'undefined') {
        // Remove the current user from localStorage
        localStorage.removeItem('currentUsername');

        // Optionally, reset other stores related to the user's session
        // For example, if you want to reset isLoggedIn to false:
        isLoggedIn.set(false);

        // Reset the currentUsername store to its initial value
        currentUsername.set('');
        goto('/login')
    }
}

// Use the persist function for the currentUsername store
export const currentUsername = persist('currentUsername', '');

// Other stores remain unchanged
export const currentPoll = writable({});
export const showModal = writable(false);
export const isLoggedIn = writable(false);
export const hasVoted = writable(false);
export const currentID = writable(0);
