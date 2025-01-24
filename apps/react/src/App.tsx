import { buildTree, data } from "@recursive-ui/utils";

function App() {
	// const [count, setCount] = useState(0);

	return (
		<>
			{/* <button>test</button> */}

			<pre>{JSON.stringify(buildTree(data), null, 2)}</pre>
		</>
	);
}

export default App;
