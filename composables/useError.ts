export const useError = () => {
  // TODO: Implement error handling
  /**
   * 1. Error Translation (i18n)
   * 2. Logging
   * 3. Mapping error to log
   */
  const error = ref<string | null>(null)

  return { error }
}