<template>
    <div id="app">
        <div :class="{outerCard: true}" v-for="(card, index) in questions" v-bind:key="card.title">
            <QuestionCard :cardData="card" :questionNumber="index + 1"/>
        </div>
        <button v-on:click="evaluate">Evaluate</button>
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

                for (let j = 0; j < item.answerOptions.length; j++) {
                    let answerOption = item.answerOptions[j];
                    let index = answerOption.indexOf('.');
                    let answerOptionValue = answerOption.substr(0, index);
                    let anserOptionText = answerOption.substr(index + 1, answerOption.length).trim();
                    item.answerOptions[j] = {
                        value: answerOptionValue,
                        text: anserOptionText,
                        inputType: inputType,
                        name: 'question-' + i
                    }
                }
            }

            shuffle(testData);

            return {
                questions: testData
            }
        },
        methods: {
            evaluate: function () {

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

    .outerCard {
        width: 70%;
        display: inline-block;
        margin: 5px;
    }
</style>
