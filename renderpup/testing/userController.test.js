const supertest = require('supertest');
const express = require('express');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const db = require('../server/models/model');
const userController = require('../server/controllers/userController');


jest.mock('bcrypt', () => ({
    genSalt: jest.fn().mockResolvedValue('someSalt'),
    hash: jest.fn().mockResolvedValue('hashedPassword'),
    compare: jest.fn().mockResolvedValue(true),
}));

jest.mock('../server/models/model', () => ({
    query: jest.fn(),
}));

describe('User controller middleware', () => {
    let app;

    beforeAll(() => {
        app = express();
        app.use(express.json());
        app.use(cookieParser());

        app.post('/signup', userController.createUser, (req, res) => {
            res.status(201).json({ message: res.locals.userCreated })
        });
        app.post('/login', userController.verifyUser, (req, res) => {
            return res.status(200).json(res.locals.passwordMatches);
        });
        app.post('/logout', userController.deleteCookie, (req, res) => {
            return res.status(200).json({ success: true, message: 'Logout successful' });
        });
    })

    describe('createUser', () => {
        it('should create a user and respond with a success message', async () => {
          const newUser = {
            firstName: 'Tom',
            lastName: 'Hanks',
            email: 'wilson@example.com.',
            username: 'wilson',
            password: 'password123'
          };
    
          db.query.mockResolvedValueOnce({ rows: [{ _id: 1 }] });
    
          const response = await supertest(app)
            .post('/signup')
            .send(newUser);
            console.log(newUser);
    
          expect(response.statusCode).toBe(201);
          expect(response.body.message).toBe('User created successfully');
        });
      });

    describe('verifyUser', () => {
        it('should verify to see if a username and password match', async () => {
            const user = {
                username: 'vicky',
                password: 'password'
            };
            db.query.mockResolvedValueOnce({ rows: [{ password: 'hashedPassword'}] })
        
            const response = await supertest(app)
            .post('/login')
            .send(user)

            expect(response.statusCode).toBe(200);
            expect(bcrypt.compare).toHaveBeenCalledWith(user.password, 'hashedPassword');
            expect(db.query).toHaveBeenCalledWith(expect.stringContaining(user.username))
        })
    })
});

