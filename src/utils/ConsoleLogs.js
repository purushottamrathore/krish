const shouldDisplayLogs = true;

export const ConsoleLogs = (TAG, message) => {
  if (shouldDisplayLogs) {
    console.log(`${TAG}, ${message}`);
  }
};
