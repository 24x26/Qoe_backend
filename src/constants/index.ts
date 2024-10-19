export const plansToCIR={
    "10 Mbps":3 * 1024 * 1024,
    "20 Mbps": 8 * 1024 * 1024,
    "30 Mbps":16 * 1024 * 1024,
    "40 Mbps":18 * 1024 * 1024,
    "50 Mbps":20 * 1024 * 1024,
}

export function bytesToSpeed(bytes:number) {
    // Step 1: Calculate bits from bytes
    const bits = bytes * 8;

    // Step 2: Determine if it should be in Kbps or Mbps
    if (bits < 1000) {
        return `${bits} bits`;
    } else if (bits < 1000000) {
        // Convert to Kbps
        const kbps = bits / 1000;
        return `${kbps.toFixed(2)} Kbps`;
    } else {
        // Convert to Mbps
        const mbps = bits / 1000000;
        return `${mbps.toFixed(2)} Mbps`;
    }
}