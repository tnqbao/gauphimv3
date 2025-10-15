import { v4 as uuidv4 } from 'uuid';

const DEVICE_ID_KEY = 'device_id';

/**
 * Generate a new device ID using UUID v4
 */
export const generateDeviceId = (): string => {
    return uuidv4();
};

/**
 * Get device ID from localStorage, create one if it doesn't exist
 */
export const getDeviceId = (): string => {
    if (typeof window === 'undefined') {
        // Server-side rendering, return empty string
        return '';
    }

    let deviceId = localStorage.getItem(DEVICE_ID_KEY);

    if (!deviceId) {
        deviceId = generateDeviceId();
        localStorage.setItem(DEVICE_ID_KEY, deviceId);
    }

    return deviceId;
};

/**
 * Set device ID in localStorage
 */
export const setDeviceId = (deviceId: string): void => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(DEVICE_ID_KEY, deviceId);
    }
};

/**
 * Remove device ID from localStorage
 */
export const removeDeviceId = (): void => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(DEVICE_ID_KEY);
    }
};
