import express from 'express';
import {auth} from './auth.js';
import jwt from 'jsonwebtoken';
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'localhost'
}));


// Dummy data
const PROBLEMS = [
    {   
        id: 1, 
        title: "Two Sum",
        description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
        difficulty: "Easy",
        tags: ["Array", "Hash Table"],
        acceptance: "46.5%"
    },
    {
        id: 2,
        title: "Add Two Numbers",
        description: "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit.",
        difficulty: "Medium",
        tags: ["Linked List", "Math"],
        acceptance: "34.5%"
    },
    {
        id: 3,
        title: "Longest Substring Without Repeating Characters",
        description: "Given a string s, find the length of the longest substring without repeating characters.",
        difficulty: "Medium",
        tags: ["Hash Table", "Two Pointers", "String", "Sliding Window"],
        acceptance: "30.5%"
    },
]
let USER_ID_COUNTER = 1;
const USERS = [
    {
        id: 1,
        username: "spidy",
        name: "Peter Parker",
        email: "pete@mit.edu",
        password: "IamSpidy",
    },
]

const SUBMISSIONS = [
    {
        id: 1,
        problemId: 1,
        userId: 1,
        code: `class Solution { public int[] twoSum(int[] nums, int target) { for (int i = 0; i < nums.length; i++) { for (int j = i + 1; j < nums.length; j++) { if (nums[j] == target - nums[i]) { return new int[] { i, j }; } } } throw new IllegalArgumentException(\"No two sum solution\"); } }`,
        language: "Java",
        status: "Accepted",
        runtime: "1 ms",
        memory: "39.1 MB",
        timestamp: "2021-10-10T12:00:00Z"
    },
    {
        id: 2,
        problemId: 1,
        userId: 2,
        code: `class Solution { public int[] twoSum(int[] nums, int target) { for (int i = 0; i < nums.length; i++) { for (int j = i + 1; j < nums.length; j++) { if (nums[j] == target - nums[i]) { return new int[] { i, j }; } } } throw new IllegalArgumentException(\"No two sum solution\"); } }`,
        language: "Java",
        status: "Accepted",
        runtime: "1 ms",
        memory: "39.1 MB",
        timestamp: "2021-10-10T12:00:00Z"
    },
]


app.get('/', (req, res) => {
    res.json({
        message: "CodeLeet Homepage"
    });
});

app.post('/signup', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (USERS.find(x => x.username === username)) {
        return res.status(411).json({
            message: "Username already exists!",
        });
    }
    USERS.push({id: ++USER_ID_COUNTER, username: username, password: password});
    return res.json({message: "success", USERS});
});

app.post('/login', (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    const user = USERS.find(x => x.username === username);

    if (!user) 
        return res.status(411).json({message: "User not found."});
    if (user.password !== password) 
        return res.status(411).json({message: "Incorrect Password"});

    const token = jwt.sign({
        id: user.id,
    }, JWT_SECRET);

    return res.json({message: "Login Success", token: token});
});

app.get('/profile', auth, (req, res) => {
    const user = USERS.find((x) => x.id === req.userId); 
    res.json({
        user
    });
});

app.get('/problem/:id', (req, res) => {
    const id = req.params.id;
    const problem = PROBLEMS.find(problem => problem.id == id);
    if (problem) {
        res.json({problem,});
    }
    return res.status(411).json({error: "Problem not found."});
});

app.get('/problem', (req, res) => {
    const filteredProblems = PROBLEMS.map((problem) => ({
        problemId: problem.id,
        difficulty: problem.difficulty,
        acceptance: problem.acceptance,
        title: problem.title,
    }));

    res.json({
        problems: filteredProblems,
    });
});

app.listen(port, () => {
    console.log(`Server app listening at http://localhost:${port}`);
});