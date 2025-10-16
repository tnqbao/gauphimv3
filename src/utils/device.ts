/**
 * Device ID utility functions
 * Used for generating and managing unique device identifiers
 */

// Generate a UUID v4
function generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

/**
 * Get or generate a device ID
 * If a device ID already exists in localStorage, return it
 * Otherwise, generate a new UUID and store it in localStorage
 *
 * @returns {string} The device ID (UUID format)
 */
export const getDeviceId = (): string => {
    if (typeof window === 'undefined') {
        // Server-side: return a temporary UUID
        return generateUUID();
    }

    const DEVICE_ID_KEY = 'device_id';
    let deviceId = localStorage.getItem(DEVICE_ID_KEY);

    if (!deviceId) {
        deviceId = generateUUID();
        localStorage.setItem(DEVICE_ID_KEY, deviceId);
    }

    return deviceId;
};

/**
 * Clear the stored device ID
 * Useful for logout or reset scenarios
 */
export const clearDeviceId = (): void => {
    if (typeof window === 'undefined') return;

    localStorage.removeItem('device_id');
};

/**
 * Generate a new device ID and store it
 * This will replace any existing device ID
 *
 * @returns {string} The new device ID
 */
export const regenerateDeviceId = (): string => {
    if (typeof window === 'undefined') {
        return generateUUID();
    }

    const newDeviceId = generateUUID();
    localStorage.setItem('device_id', newDeviceId);
    return newDeviceId;
};
