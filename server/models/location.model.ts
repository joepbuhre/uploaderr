
export const fetchAllUploadLocations = (): string[] => {
    return Object.entries(process.env)
            .filter(envs => envs[0].startsWith('UPLOAD_PATHS_'))
            .map(envs => envs[0].replace('UPLOAD_PATHS_', ''))
}