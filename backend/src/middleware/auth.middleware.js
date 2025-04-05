import { clerkClient } from "@clerk/express";

export const protectRoute = async (req, res, next) => {
	if (!req.auth.userId) {
		return res.status(401).json({ message: "Unauthorized - you must be logged in" });
	}
	next();
};

export const requireAdmin = async (req, res, next) => {
	try {
		// Periksa apakah user sudah login (userId ada)
		if (!req.auth || !req.auth.userId) {
			return res.status(401).json({ message: "Unauthorized - you must be logged in" });
		}

		// Sesuai permintaan untuk membuat semua user menjadi admin (open source music)
		// Langsung lanjutkan ke next middleware tanpa pengecekan email
		next();
		
		/* Kode asli yang melakukan pengecekan email admin:
		const currentUser = await clerkClient.users.getUser(req.auth.userId);
		const isAdmin = process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;

		if (!isAdmin) {
			return res.status(403).json({ message: "Unauthorized - you must be an admin" });
		}
		next();
		*/
	} catch (error) {
		console.error("Error in requireAdmin middleware:", error);
		return res.status(401).json({ message: "Authentication error" });
	}
};
