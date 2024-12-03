import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import {
  IConsumer,
  KafkajsConsumerOptions,
} from './interfaces/consumer.interface';
import { KafkajsConsumer } from './kafkajs.consumer';

@Injectable()
export class ConsumerService implements OnApplicationShutdown {
  private readonly consumers: IConsumer[] = [];

  async consume({ topics, config, onMessage }: KafkajsConsumerOptions) {
    const consumer = new KafkajsConsumer(
      topics,
      config,
      process.env.KAFKA_BROKER,
    );
    await consumer.connect();
    await consumer.consume(onMessage);
    this.consumers.push(consumer);
  }

  async onApplicationShutdown() {
    for (const consumer of this.consumers) {
      await consumer.disconnect();
    }
  }
}
