export const uploadImageToCloudinary = async (file) => {
    const cloudName = "dzwobkukk";
    const uploadPreset = "mimascota";

    if (!file) {
      console.error("No se proporcionó un archivo para subir.");
      return null;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
  
    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error al subir la imagen. Respuesta del servidor:", errorText);
        throw new Error("Error al subir la imagen");
      }
  
      const data = await response.json();
      return data.secure_url; // URL pública de la imagen
    } catch (error) {
      console.error("Error subiendo la imagen:", error.message);
      return null;
    }
};
  