import { injectable } from '@loopback/core'
import { Kafka, Consumer, EachMessagePayload } from 'kafkajs';
import { PushNotification } from '../utils/push-notification-management';

@injectable()
export class KafkaConsumerService {
  private kafka: Kafka;
  private consumer: Consumer;

  constructor() {
    this.kafka = new Kafka({
      clientId: 'my-app', // Replace with your client ID
      brokers: ['localhost:9092'], // Replace with your Kafka broker URL
    });

    this.consumer = this.kafka.consumer({ groupId: 'testgroup' }); // Replace with your consumer group ID
  }

  async start() {
    await this.consumer.connect();
    await this.subscribeToTopic('test'); // Replace with your Kafka topic
    await this.runConsumer();
    console.log('Kafka consumer started');
  }

  private async subscribeToTopic(topic: string) {
    await this.consumer.subscribe({ topic });
    console.log(`Subscribed to ${topic}`);
  }

private async runConsumer() {
    await this.consumer.run({
        eachMessage: async (payload: EachMessagePayload) => {
            const { topic, message } = payload;
            if (message && message.value) {
                console.log(`Received message on topic ${topic}: ${message.value.toString()}`);
            }

            // Add your logic to handle the Kafka message here
            // You can call another service or perform any other action based on the message content
            // For now, we'll just log the message
        },
    });
}

  async stop() {
    await this.consumer.disconnect();
    console.log('Kafka consumer stopped');
  }
}
