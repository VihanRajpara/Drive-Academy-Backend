// Function to generate a random 6-character ID
const generateRandomId = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
};
// Helper function to ensure the generated ID is unique
const generateUniqueId = async (userModel) => {
  let id = generateRandomId();
  try {
    const existingUser = await userModel.findOne({ _id: id });
    if (existingUser) {
      return generateUniqueId(); // Recursive call until we get a unique ID
    }
  } catch (e) {
    console.log("Error In Helper ::", e);
    throw new Error("Error generating unique ID");
  }
  return id; // Return the unique ID
};

module.exports = generateUniqueId;
