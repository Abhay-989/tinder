import cloudinary from "../config/cloudinary.js";
import User from "../models/User.js";

export const updateProfile = async (req, res) => {
  try {
    // Make sure user is authenticated
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - no user found",
      });
    }

    const { image, ...otherData } = req.body;
    let updatedData = { ...otherData };

    if (image && typeof image === "string" && image.startsWith("data:image")) {
      try {
        const uploadResponse = await cloudinary.uploader.upload(image, {
          folder: "profile_images",
        });
        updatedData.image = uploadResponse.secure_url;
      } catch (error) {
        console.error("Error uploading image:", error);
        return res.status(400).json({
          success: false,
          message: "Error uploading image",
        });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(req.user.id, updatedData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error in updateProfile:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
