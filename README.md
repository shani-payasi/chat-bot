# ChatBoot — AI Chat Assistant 🤖

ChatBoot is an AI-powered chat application built with **React, Redux Toolkit, Socket.IO, Node.js, Express, and Google's Gemini API**. It provides a clean, responsive chat interface where users can send messages and receive AI-generated responses in real time.

## ✨ Features

- **AI-Powered Conversations:** Generate responses using Google's Gemini AI.
- **Real-Time Communication:** Exchange messages using Socket.IO.
- **Responsive UI:** Dark-themed interface designed for desktop and mobile devices.
- **Live Connection Status:** View the current WebSocket connection status.
- **Typing Indicator:** See when the AI assistant is processing a response.
- **Markdown Support:** Render formatted text, code blocks, lists, and tables in AI responses.
- **Quick Prompts:** Start conversations using predefined suggestions.
- **State Management:** Manage chat messages, loading states, and connection status with Redux Toolkit.
- **Secure API Configuration:** Store the Gemini API key in environment variables.

## 🛠️ Tech Stack

**Frontend**
- React 19
- Vite
- Redux Toolkit
- React Redux
- Socket.IO Client
- React Markdown
- Remark GFM
- Lucide React
- CSS3

**Backend**
- Node.js
- Express.js
- Socket.IO
- Google GenAI SDK
- dotenv
- CORS

**AI Model:** Gemini 3.8 Flash, configured through the Google GenAI SDK.

## 📁 Project Structure

```text
ChatBoot/
├── backend/
│   ├── src/
│   │   ├── app.js
│   │   └── service/
│   │       └── ai.service.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   └── store.js
│   │   ├── components/
│   │   │   ├── AssistantMark.jsx
│   │   │   ├── Brand.jsx
│   │   │   ├── ChatComposer.jsx
│   │   │   ├── ChatHeader.jsx
│   │   │   ├── MessageBubble.jsx
│   │   │   └── WelcomePanel.jsx
│   │   ├── features/
│   │   │   └── chat/
│   │   │       ├── chatSlice.js
│   │   │       └── chatSocket.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

*Note: This structure assumes separate `backend` and `frontend` directories. Adjust the paths if your actual repository uses a different structure.*

## ⚙️ Getting Started

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/)
- npm
- A Google Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey)
- Git (optional)

### 1. Clone the Repository

```bash
git clone YOUR_REPOSITORY_URL
cd ChatBoot
```

Replace `YOUR_REPOSITORY_URL` with your actual GitHub repository URL.

### 2. Set Up the Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the backend directory:

```env
GEMINI_API_KEY=your_gemini_api_key
CLIENT_URL=http://localhost:5173
```

`GEMINI_API_KEY` is required to generate AI responses. `CLIENT_URL` should match your frontend origin when configured as a single allowed origin.

Start the backend:

```bash
npm run dev
```

The backend will run at:

`http://localhost:3000`

### 3. Set Up the Frontend

Open another terminal:

```bash
cd frontend
npm install
```

Create a `.env` file inside the frontend directory:

```env
VITE_SOCKET_URL=http://localhost:3000
```

Start the frontend:

```bash
npm run dev
```

Open the local URL displayed by Vite, typically:

`http://localhost:5173`

## 🔄 How It Works

1. The user enters a message in the React chat interface.
2. Redux Toolkit updates the chat state and displays the user's message.
3. The frontend sends the message to the backend through the `ai-message` Socket.IO event.
4. The backend adds the message to the conversation history.
5. The AI service sends the conversation to Google's Gemini API.
6. Gemini generates a response.
7. The backend sends the response to the frontend using `ai-message-response`.
8. Redux Toolkit stores the AI response and updates the interface.

## 🔌 Socket.IO Events

| Event | Direction | Purpose |
|---|---|---|
| `connection` | Client → Server | Establish a socket connection |
| `disconnect` | Client → Server | Handle a disconnected client |
| `ai-message` | Client → Server | Send a user message |
| `ai-message-response` | Server → Client | Receive the AI-generated response |

### Example: Sending a Message

```javascript
chatSocket.emit('ai-message', 'Explain React hooks');
```

### Example: Receiving a Response

```javascript
chatSocket.on('ai-message-response', (data) => {
  console.log(data.response);
});
```

## 🤖 Gemini AI Integration

The backend uses the Google GenAI SDK to generate responses from the conversation history.

```javascript
const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function generateResponse(chatHistory) {
  const conversation = chatHistory
    .map(({ role, message }) => `${role}: ${message}`)
    .join('\n');

  const response = await ai.interactions.create({
    model: 'gemini-3.8-flash',
    input: conversation,
  });

  return response.output_text;
}
```

The model identifier must be available to your Google AI account. Check the official [Gemini API documentation](https://ai.google.dev/gemini-api/docs) if you encounter model availability or quota errors.

## 🚀 Deployment

### Frontend

Deploy the frontend using [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/).

Configure this environment variable in your hosting dashboard:

```env
VITE_SOCKET_URL=https://your-backend-domain.com
```

Replace the example URL with your deployed backend URL.

### Backend

Deploy the backend on a Node.js-compatible hosting service, such as [Render](https://render.com/) or [Railway](https://railway.com/).

Configure the following environment variables on your backend hosting platform:

```env
GEMINI_API_KEY=your_gemini_api_key
CLIENT_URL=https://your-frontend-domain.com
```

Make sure the backend's Express CORS configuration and Socket.IO CORS configuration both allow the deployed frontend origin. The backend must also listen on the hosting provider's assigned port when required.

## 🔐 Security Notes

- Never commit `.env` files or expose your Gemini API key in frontend code.
- Add `.env` to `.gitignore`.
- Validate incoming messages before sending them to the AI service.
- Add rate limiting and request-size limits to help prevent abuse.
- Avoid storing sensitive user conversations without appropriate safeguards.
- For production use, consider per-user conversation histories instead of a single shared in-memory history array.

## ⚠️ Current Limitations

- Chat history is stored in server memory and is lost when the server restarts.
- The current history array is shared between all connected users, so conversations can mix across clients.
- There is no database-backed persistence or user authentication in the supplied implementation.
- AI requests may fail when API quotas are exhausted or the configured model is unavailable.

## 🔮 Future Improvements

- User authentication and personalized conversations.
- Persistent chat history using MongoDB.
- Separate conversation histories for each user or session.
- Streaming AI responses.
- Message retry and improved error handling.
- Rate limiting and request validation.
- Light and dark theme options.

## 👨‍💻 Author

**Shani Payasi**

- Portfolio: https://shani-payasi.netlify.app/
- GitHub: https://github.com/shani-payasi

## 📄 License

This project is currently unlicensed. Add a `LICENSE` file if you intend to distribute it under a specific open-source license.

---

**Built with React, Socket.IO, and Google Gemini AI.**
