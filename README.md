# 🌟 Songify

Fullstack application for music streaming with real-time features:
- **Backend**: Node.js + Express
- **Frontend**: React + TypeScript
- **Authentication**: Clerk

## 🛠 Tech Stack

**Backend**:
- Node.js + Express
- MongoDB
- Socket.io (Real-time)
- Clerk (Authentication)
- Cloudinary (Media Storage)

**Frontend**:
- React 18
- TypeScript
- Tailwind CSS
- Radix UI
- Clerk Authentication
- Axios

## 🚀 Key Features

- 🎸 Music streaming with player controls
- 🔈 Volume control with slider
- 🎧 Admin dashboard for content management
- 💬 Real-time chat integration
- 👨🏼‍💼 Online/Offline user status
- 👀 Real-time user activity tracking
- 📊 Analytics dashboard

## 📂 Folder Structure

```
songify/
├── backend/      # Node.js + Express (API & Core Logic)
│   ├── src/      
│   │   ├── controller/
│   │   ├── models/
│   │   ├── routes/
│   │   └── lib/
├── frontend/    # React + TypeScript (Web Interface)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── stores/
└── music/       # Sample music files
```

## 🖥 Local Setup

**Backend (Node.js):**
```bash
cd backend
npm install
# Setup .env file
npm run dev
```

**Frontend (React):**
```bash
cd frontend
npm install
# Setup .env file
npm run dev
```

## 🔑 Environment Variables

**Backend (.env):**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/songify
ADMIN_EMAIL=your-email@example.com
NODE_ENV=development

CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name

CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

**Frontend (.env):**
```
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

## 👨‍💻 Author
- GitHub: [@hashiifabdillah](https://github.com/hashiifab)
- LinkedIn: [Hashiif Abdillah](https://www.linkedin.com/in/hashiif-abdillah-665373297/)
