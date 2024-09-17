// import React, { useState } from 'react';
// import { Box, Button, Input, VStack, Textarea, FormControl, FormLabel, Flex, Heading, Text } from '@chakra-ui/react';

// const Chatbot = () => {
//   const [userMessage, setUserMessage] = useState('');
//   const [chatLog, setChatLog] = useState([
//     { sender: 'bot', text: 'Hello! I am here to help you with the complaint form. You can ask me anything about the form.' },
//     { sender: 'bot', text: 'You need to provide your Name, Email, Phone Number, Problem Type, and a brief description of the issue.' },
//     { sender: 'bot', text: 'If you have any problem submitting the form, feel free to ask me.' },
//   ]);

//   // Define the bot responses based on user input
//   const botResponse = (input) => {
//     const lowercaseInput = input.toLowerCase();

//     if (lowercaseInput.includes('name')) {
//       return 'You can enter your full name in the Name field of the form.';
//     } else if (lowercaseInput.includes('email')) {
//       return 'You should provide a valid email address in the Email field.';
//     } else if (lowercaseInput.includes('phone')) {
//       return 'Make sure to enter your 10-digit phone number in the Phone field.';
//     } else if (lowercaseInput.includes('problem')) {
//       return 'In the problem field, you can select the category that best describes your issue.';
//     } else if (lowercaseInput.includes('image')) {
//       return 'You can upload an image (optional) related to the issue.';
//     } else if (lowercaseInput.includes('submit')) {
//       return 'Click the Submit button after filling out all the required fields.';
//     } else {
//       return 'I’m sorry, I didn’t understand your question. Please ask about any field or form submission issue.';
//     }
//   };

//   const handleSendMessage = () => {
//     if (userMessage.trim()) {
//       setChatLog((prevLog) => [
//         ...prevLog,
//         { sender: 'user', text: userMessage },
//         { sender: 'bot', text: botResponse(userMessage) },
//       ]);
//       setUserMessage('');
//     }
//   };

//   return (
//     <Box w="100%" maxW="400px" p={4} boxShadow="lg" borderRadius="lg" bg="white" position="fixed" bottom="20px" right="20px">
//       <Heading size="md" mb={4} color="#7685D7">Chatbot Assistant</Heading>
//       <Box height="300px" overflowY="auto" mb={4} bg="#F7F7FB" p={3} borderRadius="md" boxShadow="md">
//         {chatLog.map((chat, index) => (
//           <Flex key={index} justify={chat.sender === 'bot' ? 'flex-start' : 'flex-end'}>
//             <Box
//               bg={chat.sender === 'bot' ? '#7685D7' : '#E2E8F0'}
//               color={chat.sender === 'bot' ? 'white' : 'black'}
//               p={3}
//               m={1}
//               borderRadius="md"
//               maxW="75%"
//             >
//               <Text>{chat.text}</Text>
//             </Box>
//           </Flex>
//         ))}
//       </Box>

//       <FormControl>
//         <Input
//           placeholder="Ask me anything..."
//           value={userMessage}
//           onChange={(e) => setUserMessage(e.target.value)}
//           onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
//         />
//         <Button
//           colorScheme="blue"
//           mt={2}
//           w="full"
//           bg="#7685D7"
//           color="white"
//           _hover={{ bg: '#5B6DC7' }}
//           onClick={handleSendMessage}
//         >
//           Send
//         </Button>
//       </FormControl>
//     </Box>
//   );
// };

// export default Chatbot;


import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, Input, VStack, FormControl, Flex, Heading, Text } from '@chakra-ui/react';

const Chatbot = () => {
  const [userMessage, setUserMessage] = useState('');
  const [chatLog, setChatLog] = useState([
    { sender: 'bot', text: 'Hello! I am here to help you with the complaint form. You can ask me anything about the form.' },
    // { sender: 'bot', text: 'You need to provide your Name, Email, Phone Number, Problem Type, and a brief description of the issue.' },
    // { sender: 'bot', text: 'If you have any problem submitting the form, feel free to ask me.' },
  ]);

  // Function to get the bot response from the backend
  const getBotResponse = async (input) => {
    try {
      const response = await axios.post('http://localhost:5000/api/chat', { prompt: input });
      return response.data.response; // Get the bot response from the backend
    } catch (error) {
      console.error('Error fetching response from the server:', error);
      return 'Sorry, I am having trouble processing your request. Please try again.';
    }
  };

  const handleSendMessage = async () => {
    if (userMessage.trim()) {
      // Add the user's message to the chat log
      setChatLog((prevLog) => [
        ...prevLog,
        { sender: 'user', text: userMessage },
      ]);

      // Get the bot's response from the backend (which calls Gemini API)
      const botReply = await getBotResponse(userMessage);

      // Add the bot's response to the chat log
      setChatLog((prevLog) => [
        ...prevLog,
        { sender: 'bot', text: botReply },
      ]);

      // Clear the user message input
      setUserMessage('');
    }
  };

  return (
    <Box w="100%" maxW="400px" p={4} boxShadow="lg" borderRadius="lg" bg="black" position="fixed" bottom="20px" right="20px">
      <Heading size="md" mb={4} color="#7685D7">Chatbot Assistant</Heading>
      <Box height="300px" overflowY="auto" mb={4} bg="#F7F7FB" p={3} borderRadius="md" boxShadow="md">
        {chatLog.map((chat, index) => (
          <Flex key={index} justify={chat.sender === 'bot' ? 'flex-start' : 'flex-end'}>
            <Box
              bg={chat.sender === 'bot' ? '#7685D7' : '#E2E8F0'}
              color={chat.sender === 'bot' ? 'white' : 'black'}
              p={3}
              m={1}
              borderRadius="md"
              maxW="75%"
            >
              <Text>{chat.text}</Text>
            </Box>
          </Flex>
        ))}
      </Box>

      <FormControl>
        <Input
          placeholder="Ask me anything..."
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <Button
          colorScheme="blue"
          mt={2}
          w="full"
          bg="#7685D7"
          color="white"
          _hover={{ bg: '#5B6DC7' }}
          onClick={handleSendMessage}
        >
          Send
        </Button>
      </FormControl>
    </Box>
  );
};

export default Chatbot;
