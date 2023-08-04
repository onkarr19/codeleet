import { useState } from 'react'
// import './App.css'

const problems1 = [
	{
		id: 4,
		title: "Two Sum",
		description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
		difficulty: "Easy",
		tags: ["Array", "Hash Table"],
		acceptance: "46.5%"
	},
	{
		id: 5,
		title: "Add Five Numbers",
		description: "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit.",
		difficulty: "Medium",
		tags: ["Linked List", "Math"],
		acceptance: "34.5%"
	},
	{
		id: 5,
		title: "Longest Substring Without Repeating Characters",
		description: "Given a string s, find the length of the longest substring without repeating characters.",
		difficulty: "Medium",
		tags: ["Hash Table", "Two Pointers", "String", "Sliding Window"],
		acceptance: "30.5%"
	},
]

const problems2 = [
	{
		id: 1,
		title: "Four Sum",
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
function App() {
	// const [count, setCount] = useState(10)
	const [problems, setProblems] = useState([])

	return (
		<>
			{/* <h1>CodeLeet</h1> */}
			<div>
				<input type='text' placeholder='email'></input>
				<input type='password' placeholder='password'></input>
				<button>sign in</button>

				<div>
					<button onClick={() => {
						setProblems(problems => problems1)
					}}>1</button>
					<button onClick={() => {
						setProblems(problems => problems2)
					}}>2</button>
				</div>
				<div>
					{problems.map(problem => <ProblemStatement
						title={problem.title}
						acceptance={problem.acceptance}
						difficulty={problem.difficulty}
					></ProblemStatement>)}
				</div>



			</div>
		</>
	)
}

function ProblemStatement(props) {
	const title = props.title;
	const acceptance = props.acceptance;
	const difficulty = props.difficulty;

	return <>

		<tr>
			<td>{title}</td>
			<td>{acceptance}</td>
			<td>{difficulty}</td>
		</tr>

	</>

}

export default App;