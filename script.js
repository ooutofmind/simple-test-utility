__ANSWER_TYPE = {
	SINGLE: 'radio',
	MULTIPLE: 'checkbox'
}

function appendCard(container, cardData, questionNum) {
	var card = document.createElement("div");
	card.classList.add('question-card');
	card.appendChild(createTitleEl(cardData.topic));
	card.appendChild(createQuestionEl(cardData.questionText));
	card.appendChild(createAnswerOptionsEl(cardData.answerOptions, getAnswerType(cardData.answer), questionNum));
	card.appendChild(createAnswerEl(cardData.answer ));


	container.appendChild(card)
}

function createTitleEl(title) {
	var titleEl = document.createElement("h4");
	titleEl.innerHTML = title;
	return titleEl;
}

function createQuestionEl(question) {
	var questionEl = document.createElement('span');
	questionEl.innerHTML = question;
	return questionEl;
}

function createAnswerEl(answer) {
	var answerEl = document.createElement('div');
	answerEl.setAttribute('hidden', 'true');
	answerEl.innerHTML = 'Correct answer is: ' + answer;
	answerEl.classList.add('answer');
	return answerEl;
}

function createAnswerOptionsEl(answers, answerType, questionNum) {
	var listEl = document.createElement('div');
	for (var i = 0; i < answers.length; i++) {
		let answer = answers[i];

		var wrapper = document.createElement('div');
		listEl.appendChild(wrapper);

		var answerValue = parseOptionValue(answer);

		var input = document.createElement('input');
		input.setAttribute('type', answerType);

		input.setAttribute('id', answerType + '-' + questionNum + '-' + answerValue);
		input.setAttribute('value', answerValue);

		input.setAttribute('name', 'question-' + questionNum);

		var label = document.createTextNode(answer);
		wrapper.appendChild(input);
		wrapper.appendChild(label);
	}

	return listEl;
}

function parseOptionValue(answerOption) {
	let index = answerOption.indexOf('.');
	return answerOption.substr(0, index);
}

function getAnswerType(answer) {
	return answer.indexOf(',') > -1 ? __ANSWER_TYPE.MULTIPLE : __ANSWER_TYPE.SINGLE;
}

function getAllQuestionCards(container) {
	return container.querySelectorAll('div.question-card');
}

function getAnswerEl(cardEl) {
	return cardEl.querySelector('div.answer');
}

document.correctAnswers = {};
var container = document.getElementById('main_container');
for (var i = 0; i < document.rawData.length; i++) {
	let cardData = document.rawData[i];
	appendCard(container, cardData, i);

	document.correctAnswers[i] = cardData.answer;
};

let evaluateButton = document.createElement('button');
evaluateButton.innerHTML = 'Evaluate';
evaluateButton.addEventListener('click', ()=> { 
	let cards = getAllQuestionCards(container);
	for (var i = 0; i < cards.length; i++) {
		let card = cards[i];
		let options = card.querySelectorAll('input');

		let res = [];
		for (var j = 0; j < options.length; j++) {
			let option = options[j];
			if(option.checked) res.push(option.value);
		}

		res = res.join(',');

		card.classList.remove('empty');
		card.classList.remove('passed');
		card.classList.remove('failed');

		let className = '' === res ? 'empty' : document.correctAnswers[i] === res ? 'passed' : 'failed';
		card.classList.add(className);

		let answerEl = getAnswerEl(card);
		if(className === 'failed') {
			answerEl.removeAttribute('hidden');
		} else {
			answerEl.setAttribute('hidden', 'true');
		}
		
	}
});
container.appendChild(evaluateButton);

