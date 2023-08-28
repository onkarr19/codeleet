# CodeLeet - LeetCode Clone

CodeLeet is a web application designed to serve as a clone of the popular coding practice platform, LeetCode. It provides a platform for developers to solve coding problems, improve their problem-solving skills, and prepare for technical interviews. CodeLeet offers a collection of coding challenges and a user-friendly interface to solve and test solutions.

## Features

- **Coding Challenges:** CodeLeet comes with a vast collection of coding problems across various difficulty levels and categories such as algorithms, data structures, dynamic programming, and more.

- **User Authentication:** Users can sign up, log in, and manage their profiles. Authentication is implemented to ensure secure access to the platform.

- **Code Editor:** An in-browser code editor allows users to write and test their solutions directly on the platform. Syntax highlighting and code formatting are included for a seamless coding experience.

- **Test Cases:** Users can run their code against predefined test cases to verify the correctness of their solutions.

- **Discussion Forum:** CodeLeet provides a discussion forum where users can ask questions, share solutions, and engage in technical discussions related to coding challenges.

- **Leaderboard:** A global leaderboard showcases the top performers based on their solutions and efficiency.

## Installation

### Prerequisites

- Node.js (v20 or higher)
- npm (v9 or higher)

### Clone the repository

```bash
git clone https://github.com/onkarr19/codeleet.git
cd codeleet
```

### Set up the server

```bash
cd server
npm install
```
Create a `.env` in server directory. This file will contain your environment variables.

```bash
# .env
JWT_SECRET="secret-key"
PORT=3000
RABBITMQ_HOSTNAME="rabbitmq-host"
RABBITMQ_PORT="rabbitmq-host-port"  # 5671
RABBITMQ_USERNAME="username"
RABBITMQ_PASSWORD="password"
RABBITMQ_PROTOCOL=amqps
```

### Set up the client

```bash
cd client
npm install
```

### Start the application

```bash
# Start the server
cd server
npm start
```

You may alternatively start server using `nodemon`: 
```bash
npx nodemon index.js
```
```bash
# Start the client
cd client
npm run dev
```

The server will run on `http://localhost:3000`, and the client will run on `http://localhost:5000`.

## Contributing

We welcome contributions to improve CodeLeet. If you'd like to add new features, fix bugs, or suggest enhancements, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature: `git checkout -b feature-name`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push the branch to your fork: `git push origin feature-name`.
5. Submit a pull request to the `main` branch of the original repository.

Please ensure that your code follows the established coding standards, and include appropriate tests when necessary.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

We would like to express our gratitude to the creators of LeetCode for inspiring this project. Special thanks to the open-source community for providing invaluable resources and tools.

Happy coding!