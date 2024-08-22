export const requiredRule = (v: any) => !!v || 'Field is required'

export const rulePositiveNumberOnly = (v: number) => v >= 0 || 'Field is must be positive only'

export const ruleFiles = (files: File[]) =>
  !files || !files.some((file) => file.size > 1e6) || 'Image size should be less than 1 Mb!'
