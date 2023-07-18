function toTitleCase(str: string): string {
  try {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
      }
    );
  } catch (e) {
    return "";
  }
}

export default toTitleCase;
