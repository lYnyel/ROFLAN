export const fetchRandomText = async (): Promise<string> => {
    try {
      const response = await fetch("https://api.quotable.io/random");
      if (!response.ok) {
        throw new Error("Failed to fetch text");
      }
      const data = await response.json();
      return data.content; // Возвращаем только текст цитаты
    } catch (error) {
      console.error("Error fetching text:", error);
      return "Failed to fetch random text.";
    }
  };
  