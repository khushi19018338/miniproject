// TODO: integrate WebSocket backend URL
const WS_URL = "ws://localhost:8080/ws"; // Replace with your backend URL

let socket = null;

export const initWebSocket = (onMessage, onError, onOpen) => {
  try {
    socket = new WebSocket(WS_URL);

    socket.onopen = () => {
      console.log("WebSocket connected");
      onOpen();
    };

    socket.onmessage = (event) => {
      console.log("WebSocket message received:", event.data);
      try {
        const data = JSON.parse(event.data);
        onMessage(data);
      } catch (e) {
        // If not JSON, treat as plain text
        onMessage({ message: event.data });
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
      onError();
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
    };
  } catch (error) {
    console.error("Failed to initialize WebSocket:", error);
    onError();
  }
};

export const sendMessage = (message) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({ message }));
    console.log("Message sent:", message);
  } else {
    console.error("WebSocket is not connected");
  }
};

export const closeWebSocket = () => {
  if (socket) {
    socket.close();
    socket = null;
  }
};
