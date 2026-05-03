import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    res.json({
      content: `Welcome to Pet Rescue Hub. By using this website, you agree to the following terms and conditions.

1. Ownership and Copyright
All content, images, and designs on this website are the property of Pet Rescue Hub and protected under copyright laws.

2. Use of Content
You may view and download materials for personal use only. Reproduction, distribution, or modification without permission is prohibited.

3. Disclaimer
Pet Rescue Hub provides information "as is." We make no guarantees regarding accuracy or availability of pets listed.

4. Liability
We are not responsible for any direct or indirect damages arising from the use of this website.

5. Updates
We may modify this legal notice at any time. Please review this page periodically for updates.`,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;