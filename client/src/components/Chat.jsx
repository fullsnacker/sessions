import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { data } from '../data/data';

export const Chat = () => {
	const [messages, setMessages] = useState(data);
	const [question, setQuestion] = useState('');
	const container = useRef(null);

	const handleSubmit = () => {
		event.preventDefault();

		if (question === '') return;

		setMessages((messages) =>
			messages.concat({
				id: String(Date.now()),
				type: question[0] === '?' ? 'bot' : 'user',
				text:
					question[0] === '?'
						? question.substring(1, question.length)
						: question
			})
		);
		setQuestion('');
	};

	useEffect(() => {
		container.current?.scrollTo(0, container.current.scrollHeight);
	}, [messages]);

	return createPortal(
		<div>
			{
				<div className="flex flex-col gap-4 m-auto max-w-4xl border border-gray-400  p-4 rounded-md">
					<div
						ref={container}
						className="flex flex-col gap-4 h-[500px] overflow-y-auto"
					>
						{messages.map((message) => (
							<div
								key={message.id}
								className={`p-4 max-w-[80%] rounded-lg text-white 
							${
								message.type === 'bot'
									? 'bg-slate-500 text-left self-start rounded-bl-none'
									: 'bg-green-600 text-right self-end rounded-br-none'
							}`}
							>
								{message.text}
							</div>
						))}
					</div>
					<form className="flex items-center" onSubmit={handleSubmit}>
						<input
							value={question}
							onChange={(event) => {
								setQuestion(event.target.value);
							}}
							placeholder="Mensaje"
							className="flex-1 border border-gray-400 py-2 px-4 rounded-r-none max-w-[60%]"
							type="text"
							name="question"
						/>
						<button
							className={`px-4 py-2 rounded-lg rounded-l-none ${'bg-blue-500'}`}
							type="button"
							onClick={() => {
								handleSubmit();
							}}
						>
							Send
						</button>
						<a
							className={`ml-2 px-4 py-2 rounded-lg  ${'bg-yellow-800'}`}
							href={`data:text/json;charset=utf-8,${encodeURIComponent(
								JSON.stringify(messages)
							)}`}
							download={`session-${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}-${new Date().getHours()}-${new Date().getMinutes()}-${new Date().getSeconds()}.json`}
						>
							Export
						</a>
					</form>
				</div>
			}
		</div>,
		document.getElementById('chat')
	);
};
