<template>
    <div id="app">
        <LoginPage v-if="!authenticated" @authenticated="updateAuthenticated"></LoginPage>

        <div v-if="authenticated" class="statsOuter">
            <div class="stats">Correctly answered questions: <strong>{{percentage}}%</strong> | Unanswered questions:
                <strong>{{unAnsweredQuestions}}</strong></div>
        </div>

        <div v-if="authenticated" class="cardsContainer">
            <div class="outerCard" v-for="(card, index) in questions" v-bind:key="card.title">
                <QuestionCard :cardData="card" :questionNumber="index + 1" @stats-update="updateStats($event)"/>
            </div>
        </div>
    </div>
</template>


<script>
    import testData from './test-data-1'
    import QuestionCard from "./components/QuestionCard";
    import LoginPage from "./components/LoginPage";

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
            QuestionCard, LoginPage
        },
        mounted() {
            this.updateAuthenticated();
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
                unAnsweredQuestions: testData.length,
                authenticated: false
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
            },
            updateAuthenticated() {
                if(!localStorage.authInfo) return false;

                let authInfo = JSON.parse(localStorage.authInfo);
                this.authenticated = authInfo.expires > Date.now();

                if(!this.authenticated) {
                    localStorage.removeItem('authInfo');
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
