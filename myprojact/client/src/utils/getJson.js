export function getJson(message) {
  const jsonPattern = /```json\s*([\s\S]*?)\s*```/g; // Pattern to match JSON blocks
  const jsonData = [];

  let match;
  while ((match = jsonPattern.exec(message)) !== null) {
    try {
      // Attempt to parse the matched JSON string
      const parsedData = JSON.parse(match[1]);
      if (Array.isArray(parsedData)) {
        jsonData.push(...parsedData); // Spread if it's an array
      } else {
        jsonData.push(parsedData); // Otherwise push the object
      }
    } catch (error) {
      console.error("Error parsing JSON data:", error.message);
    }
  }

  return jsonData;
}

