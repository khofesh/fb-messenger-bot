import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { callSendAPI } from './utils/callSend';

@Injectable()
export class AppService {
  pageAccessToken: string;

  constructor(private configService: ConfigService) {
    this.pageAccessToken = this.configService.get<string>('PAGE_ACCESS_TOKEN');
  }

  getHello(): string {
    return 'Hello World!';
  }

  // Handles messages events
  handleMessage(senderPsid: string, receivedMessage: any) {
    let response: any;

    // Checks if the message contains text
    if (receivedMessage.text) {
      // Create the payload for a basic text message, which
      // will be added to the body of your request to the Send API
      response = {
        text: `You sent the message: '${receivedMessage.text}'. Now send me an attachment!`,
      };
    } else if (receivedMessage.attachments) {
      // Get the URL of the message attachment
      let attachmentUrl = receivedMessage.attachments[0].payload.url;
      response = {
        attachment: {
          type: 'template',
          payload: {
            template_type: 'generic',
            elements: [
              {
                title: 'Is this the right picture?',
                subtitle: 'Tap a button to answer.',
                image_url: attachmentUrl,
                buttons: [
                  {
                    type: 'postback',
                    title: 'Yes!',
                    payload: 'yes',
                  },
                  {
                    type: 'postback',
                    title: 'No!',
                    payload: 'no',
                  },
                ],
              },
            ],
          },
        },
      };
    }

    // Send the response message
    callSendAPI(senderPsid, response, this.pageAccessToken);
  }

  // Handles messaging_postbacks events
  handlePostback(senderPsid: any, receivedPostback: any) {
    let response: any;

    // Get the payload for the postback
    let payload = receivedPostback.payload;

    // Set the response based on the postback payload
    if (payload === 'yes') {
      response = { text: 'Thanks!' };
    } else if (payload === 'no') {
      response = { text: 'Oops, try sending another image.' };
    }
    // Send the message to acknowledge the postback
    callSendAPI(senderPsid, response, this.pageAccessToken);
  }
}
