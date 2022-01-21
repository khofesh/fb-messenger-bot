import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Render,
  Req,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Response, Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  root() {
    return { message: 'Hello world, hbs!' };
  }

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/webhook')
  getWebhook(@Query() query, @Res() response: Response) {
    // Parse the query params
    let mode = query['hub.mode'];
    let token = query['hub.verify_token'];
    let challenge = query['hub.challenge'];

    // Check if a token and mode is in the query string of the request
    if (mode && token) {
      // Check the mode and token sent is correct
      if (mode === 'subscribe' && token === process.env.VERIFY_TOKEN) {
        // Respond with the challenge token from the request
        console.log('WEBHOOK_VERIFIED');

        console.log(challenge);

        return response.status(200);
      } else {
        // Respond with '403 Forbidden' if verify tokens do not match
        return response.sendStatus(HttpStatus.FORBIDDEN);
      }
    }
  }

  @Post('/webhook')
  postWebhook(@Req() request: Request, @Res() response: Response) {
    let body = request.body;
    // Checks this is an event from a page subscription
    if (body.object === 'page') {
      // Iterates over each entry - there may be multiple if batched
      body.entry.forEach(function (entry) {
        // Gets the message. entry.messaging is an array, but
        // will only ever contain one message, so we get index 0
        let webhookEvent = entry.messaging[0];
        console.log(webhookEvent);

        // Get the sender PSID
        let senderPsid = webhookEvent.sender.id;
        console.log('Sender PSID: ' + senderPsid);

        // Check if the event is a message or postback and
        // pass the event to the appropriate handler function
        if (webhookEvent.message) {
          this.appService.handleMessage(senderPsid, webhookEvent.message);
        } else if (webhookEvent.postback) {
          this.appService.handlePostback(senderPsid, webhookEvent.postback);
        }
      });

      // Returns a '200 OK' response to all requests
      response.status(200).send('EVENT_RECEIVED');
    } else {
      // Returns a '404 Not Found' if event is not from a page subscription
      response.sendStatus(404);
    }
  }
}
