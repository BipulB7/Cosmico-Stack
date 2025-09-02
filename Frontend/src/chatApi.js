<<<<<<< HEAD

=======
// frontend/src/api/chatApi.js
>>>>>>> d23eb93d (Front+Backend fully live! Website deployment ready.)
export async function sendMessageToAI(message) {
  try {
    const res = await fetch('http://localhost:4000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    return data.response;
  } catch (error) {
    console.error('Error sending message:', error);
    return "Error: Could not connect to Cosmico.";
  }
}
