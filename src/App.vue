<template>
    <div id="app">
        <div class="statsOuter">
            <div class="stats">Correctrly answered questions: <strong>{{percentage}}%</strong> | Unanswered questions:
                <strong>{{unAnsweredQuestions}}</strong></div>
        </div>

        <div class="cardsContainer">
            <div class="outerCard" v-for="(card, index) in questions" v-bind:key="card.title">
                <QuestionCard :cardData="card" :questionNumber="index + 1" @stats-update="updateStats($event)"/>
            </div>
        </div>
    </div>
</template>


<script>
    import testData from './test-data-2'
    import QuestionCard from "./components/QuestionCard";

    var shuffle = function (a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    };

    export default {
        name: 'App',
        components: {
            QuestionCard
        },
        data: function () {
            for (let i = 0; i < testData.length; i++) {
                let item = testData[i];
                let inputType = item.answer.indexOf(',') > -1 ? 'checkbox' : 'radio';

                shuffle(item.answerOptions);

                let answer = item.answer.split(',');
                let newValue = [];

                for (let j = 0; j < item.answerOptions.length; j++) {
                    let answerOption = item.answerOptions[j];
                    let index = answerOption.indexOf('.');
                    let answerOptionValue = answerOption.substr(0, index);

                    let answerOptionOrdinalValue = String.fromCharCode(65 + j);
                    if(answer.indexOf(answerOptionValue) > -1) {
                        newValue.push(answerOptionOrdinalValue);
                    }

                    let anserOptionText = answerOption.substr(index + 1, answerOption.length).trim();
                    item.answerOptions[j] = {
                        value: answerOptionOrdinalValue,
                        text: anserOptionText,
                        inputType: inputType,
                        name: 'question-' + i
                    }
                }

                newValue.sort();
                item.answer = newValue.join(',');
            }

            shuffle(testData);

            return {
                questions: testData,
                answeredCorrect: 0,
                unAnsweredQuestions: testData.length
            }
        },
        computed: {
            percentage: function () {
                let rate = (this.answeredCorrect * 100) / testData.length;
                return Math.round((rate + Number.EPSILON) * 100) / 100;
            }
        },
        methods: {
            updateStats: function (state) {
                if (state !== 'not-answered') {
                    --this.unAnsweredQuestions;
                }

                if (state === 'passed') {
                    ++this.answeredCorrect;
                }
            }
        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    .cardsContainer {
        margin-top: 50px;
    }

    .outerCard {
        width: 70%;
        display: inline-block;
        margin: 5px;
    }

    .statsOuter {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999;
        width: 100%;
        background: #ffffff;
    }

    .stats {
        background: #8afbd5bd;
        border: none;
        border-bottom: 2px solid #51ffc58f;
        padding: 6px;
    }
</style>
