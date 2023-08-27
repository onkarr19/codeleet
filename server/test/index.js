// test/test.js
import { publishToQueue } from '../services/rabbitmq.js';
import chai from 'chai';
import supertest from 'supertest';
import app from '../index.js';

const expect = chai.expect;
const request = supertest(app);

// Utility function to perform authentication and get token
async function loginUser() {
    const res = await request.post('/login').send({
        username: 'spidy',
        password: 'IamSpidy'
    });

    return res.body.token;
}

describe('API Routes', () => {
    it('should return homepage message', async () => {
        const response = await request.get('/');
        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal('CodeLeet Homepage');
    });

    it('should sign up a new user', async () => {
        const response = await request.post('/signup').send({
            username: 'newuser',
            password: 'newpassword',
            email: 'newuser@example.com'
        });
        expect(response.status).to.equal(200);
        // Add more assertions based on your expected response
    });

    it('should return a JWT token on successful login', async () => {
        const response = await request.post('/login').send({
            username: 'spidy',
            password: 'IamSpidy'
        });
        expect(response.status).to.equal(200);
        expect(response.body.token).to.be.a('string');
    });

    // Add more test cases for other routes

});

describe('Auth Middleware', () => {
    it('should pass if a valid JWT token is provided', async () => {
        const token = await loginUser();
        const profileResponse = await request.get('/profile').set('Authorization', token);

        expect(profileResponse.status).to.equal(200);
        // Add more assertions based on your expected response
    });
    

    it('should block access if no JWT token is provided', async () => {
        const response = await request.get('/profile');
        expect(response.status).to.equal(403);
    });

    // Add more test cases for the auth middleware
});

describe('RabbitMQ Submissions', () => {
    // Test the submission route
    it('should add submission to queue', async () => {
        const token = await loginUser();
        const submissionData = {
            problem_id: 123,
            code: 'console.log("Hello, World!");',
            lang: 'javascript',
            submit: false
        };

        const response = await request.post('/submission').send(submissionData).set('Authorization', token);;
        expect(response.status).to.equal(200);
    });

    // Test the RabbitMQ function
    it('should send submission data to RabbitMQ', async () => {
        const submissionData = {
            problem_id: 123,
            code: 'console.log("Hello, World!");',
            lang: 'javascript'
        };

        const sendResult = await publishToQueue(submissionData);
        // Add assertions for successful sending of submission data
        // For example: expect(sendResult).to.equal(something);
    });

    // Add more test cases for the auth middleware
});
