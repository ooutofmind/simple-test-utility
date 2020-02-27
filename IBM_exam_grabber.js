function grabQuestions() {
	let result = [];
	let questionCards = document.querySelectorAll('div.card');
	for (let i = 0; i < questionCards.length; i++) {
		let card = questionCards[i];
		let encoded = encodeQuestionCard(card);
		result.push(encoded);
	};
	return JSON.stringify(result);
}

function encodeQuestionCard(card) {
	let topic = getTopic(card);
	let questionText = getQuestionText(card);
	let answerOptions = getAnswerOptions(card);
	let answer = getAnswer(card);

	let json = {
		topic: topic,
		questionText: questionText,
		answerOptions: answerOptions,
		answer: answer
	};

	return json;
}

function getTopic(card) {
	let topicEl = card.querySelector('h5');
	return reduceSpaces(topicEl.innerHTML);
}

function getQuestionText(card) {
	let questionEl = card.querySelector('div.question_text p');
	return reduceSpaces(questionEl.innerHTML);
}

function getAnswerOptions(card) {
	let result = [];
	let answers = card.querySelectorAll('li');
	for (let i = 0; i < answers.length - 1; i++) {
		let anwer = answers[i];
		let encoded = encodeAnswerOption(anwer);
		result.push(encoded);
	};

	return result;
}

function encodeAnswerOption(anwer) {
	return anwer.innerText;
}

function getAnswer(card) {
	let answerEl = card.querySelector('div.answer_block p strong');
	return reduceSpaces(answerEl.innerText);
}

function reduceSpaces(text) {
	return text.replace(/(\r\n|\n|\r)/gm, "").replace(/                            /gm, ' ').replace('<br>', '').replace("'", '&#39;').trim();
}

grabQuestions();