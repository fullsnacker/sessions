import { Chat } from './components/Chat';

function App() {
	const INITIAL_MESSAGE =
		'Hola! Soy Snachat. Hazme consultas acerca de Fullsnacker';

	return (
		<main className="p-4">
			<Chat />
		</main>
	);
}

export default App;
