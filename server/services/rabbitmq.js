import amqp from 'amqplib';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { config as dotenvConfig } from 'dotenv';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenvConfig({ path: join(__dirname, '..', '.env') });

const rabbitmqConfig = {
    hostname: process.env.RABBITMQ_HOSTNAME,
    port: process.env.RABBITMQ_PORT,
    username: process.env.RABBITMQ_USERNAME,
    password: process.env.RABBITMQ_PASSWORD,
    protocol: process.env.RABBITMQ_PROTOCOL
};

  
async function publishToQueue(submissionData) {
    try {
        const queueName = 'submission-queue';
        const connection = await amqp.connect(rabbitmqConfig);
        const channel = await connection.createChannel();
        await channel.assertQueue(queueName, { durable: true });
        
        const message = JSON.stringify(submissionData);
        
        channel.sendToQueue(queueName, Buffer.from(message));
        // console.log(`Message sent: ${message}`);
        
        await channel.close();
        await connection.close();
    } catch (error) {
        console.error('Error:', error);
    }
}

async function consumeFromQueue() {
    const queueName = 'submission-queue';
    const connection = await amqp.connect(rabbitmqConfig);
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName);
    
    console.log('Waiting for submissions...');
    
    channel.consume(queueName, async (msg) => {
        const submissionCode = msg.content.toString();
        console.log(`Received submission: ${submissionCode}`);
    }, { noAck: true });
    
    process.on('exit', () => {
        channel.close();
        connection.close();
    });
}

export { publishToQueue, consumeFromQueue };
