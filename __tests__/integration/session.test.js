const app = require('../../src/app');
const request = require('supertest');
const factory = require('../factories');
const truncate = require('../utils/truncate');
const faker = require('faker');

describe('Authentication', () => {

    beforeEach(async () => {
        await truncate();
    });

    afterAll(() => setTimeout(() => process.exit(), 1000));

    it('should authenticated with valid credentials', async () => {

        const user = await factory.create('User', {
            password: '123456'
        });

        const response = await request(app)
            .post('/login')
            .send({
                email: user.email,
                password:'123456'
            });

        expect(response.status).toBe(200);

    });

    it('should not authenticated with invalid email', async () => {


        const user = await factory.create('User', {
            password: '123456'
        });

        const response = await request(app)
            .post('/login')
            .send({
                email: 'email@invalid.com',
            });

        expect(response.status).toBe(401);

    });

    it('should not authenticated with invalid password', async () => {


        const user = await factory.create('User', {
            password: '123456'
        });

        const response = await request(app)
            .post('/login')
            .send({
                email: user.email,
                password:'12345678'
            });

        expect(response.status).toBe(401);

    });

    it('should not authenticated with invalid credentials', async () => {


        const user = await factory.create('User', {
            password: '123456'
        });

        const response = await request(app)
            .post('/login')
            .send({
                email: user.email
            });

        expect(response.status).toBe(401);

    });

    it('should return jwt token when authenticated', async () => {

        const user = await factory.create('User', {
            password: '123456'
        });

        const response = await request(app)
            .post('/login')
            .send({
                email: user.email,
                password:'123456'
            });

        expect(response.body).toHaveProperty('token');

    });

    it('should be able to access private routes when authenticated', async () => {

        const user = await factory.create('User', {
            password: '123456'
        });

        const token = await user.generateToken();

        const response = await request(app)
        .get(`/user/${user.id}`)
        .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);

    });

    it('should not be able to access private routes without jtw token', async () => {

        const user = await factory.create('User', {
            password: '123456'
        });

        const token = await user.generateToken();

        const response = await request(app)
        .get(`/user/${user.id}`);

        expect(response.status).toBe(401);

    });

    if('should not be able to access private routes with invalid jwt token', async () =>{

        const user = await factory.create('User', {
            password: '123456'
        });

        const token = await user.generateToken();

        const response = await request(app)
        .get(`/user/${user.id}`)
        .set("Authorization", `Bearer it-is-a-invalid-jwt-token`);

        expect(response.status).toBe(401);

    });

    it('should be able to access private routes when authenticated', async () => {

        const user = await factory.create('User', {
            password: '123456'
        });

        const token = await user.generateToken();

        const response = await request(app)
        .get(`/user/${user.id}`)
        .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);

    });


    it('should not able to get user information when user_id is invalid', async () => {

        const user = await factory.create('User');

        const token = await user.generateToken();

        const response = await request(app)
        .get(`/user/xxx`)
        .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(400);

    });


    it('should able register a new user', async () => {

        const response = await request(app)
        .post(`/register`)
        .send({
            name: faker.name.findName(),
            email:faker.internet.email(),
            password: faker.internet.password()
        });

        expect(response.status).toBe(200);

    });

    it('should not able register a invalid user', async () => {

        const response = await request(app)
        .post(`/register`)
        .send({
            name: faker.name.findName(),
            password: faker.internet.password()
        });

        expect(response.status).toBe(400);

    });


    it('should not able register a user already exists', async () => {

        const user = await factory.create('User');

        const response = await request(app)
        .post(`/register`)
        .send({
            name: user.name,
            email: user.email,
            password:user.password,

        });

        expect(response.status).toBe(400);

    });
});