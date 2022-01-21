import axios from 'axios';

// Sends response messages via the Send API
export const callSendAPI = async (
  senderPsid: string,
  response: any,
  pageAccessToken: string,
) => {
  try {
    // Construct the message body
    let requestBody = {
      recipient: {
        id: senderPsid,
      },
      message: response,
    };

    // Send the HTTP request to the Messenger Platform
    const result = await axios.post(
      'https://graph.facebook.com/v2.6/me/messages',
      requestBody,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        params: {
          access_token: pageAccessToken,
        },
      },
    );

    console.log('callSendAPI result', result);

    console.log('Message sent!');
  } catch (error) {
    console.error('Unable to send message:' + error);
  }
};
