<template>
    <div :class="[cardClass, stateClass]">
        <h4>Question: {{questionNumber}}</h4>
        <p>{{cardData.questionText}}</p>
        <TestGroup :answer-options="cardData.answerOptions" :answer="cardData.answer"
                   :explanation="cardData.explanation" @answer-update="updateAnswer($event)"/>
    </div>
</template>

<script>
    import TestGroup from "./TestGroup";

    export default {
        name: 'QuestionCard',
        props: ['cardData', 'questionNumber'],
        components: {
            TestGroup
        },
        data: function () {
            return {
                cardClass: 'questionCard',
                stateClass: ''
            }
        },
        methods: {
            updateAnswer: function (stateClass) {
                this.stateClass = stateClass;

                this.$emit('stats-update', this.stateClass  === 'passed');
            }
        },
    }
</script>

<style>
    .questionCard {
        text-align: left;
        width: 90%;
        max-width: 900px;
        display: inline-block;
        background-color: #faffe461;
        border: 1px solid #f5ecd3;
        border-radius: 8px;
        padding-bottom: 5px;
    }

    .questionCard.not-answered {
        background-color: #00abff4f;
    }

    .questionCard.passed {
        background-color: #79de7d57;
    }

    .questionCard.failed {
        background-color: #ff000030;
    }

    .questionCard h4 {
        margin-left: 5px
    }

    .questionCard button {
        width: 130px;
        height: 30px;
        border-radius: 8px;
        margin-top: 10px;
    }

    .questionCard a, p, button {
        margin-left: 10px;
        margin-right: 10px;
    }

    .questionCard input {
        margin-left: 30px;
        margin-right: 10px;
    }

    .questionCard table {
        border-spacing: 1px;
    }
</style>