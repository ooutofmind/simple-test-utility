<template>
    <div>
        <div v-for="answerOption in answerOptions" v-bind:key="answerOption.value">
            <table>
                <td>
                    <tr>
                        <input :disabled="!isAnswerHidden" :type="answerOption.inputType" :value="answerOption.value"
                               :name="answerOption.name"
                               @change="selectionHandler(answerOption, $event)"/>
                    </tr>
                </td>
                <td>
                    <tr>
                        <strong>{{answerOption.value}}.</strong>
                    </tr>
                </td>
                <td>
                    <tr>{{answerOption.text}}</tr>
                </td>
            </table>

        </div>
        <button :class="{ hidden: !isAnswerHidden }" @click="updateAnswerState">Check</button>
        <br>
        <a :hidden="isAnswerHidden" target="_blank" :href="explanation">Correct answer: {{answer}}</a>
    </div>
</template>

<script>
    const CARD_STATE = {
        NOT_ANSWERED: 'not-answered',
        PASSED: 'passed',
        FAILED: 'failed'
    };

    export default {
        props: ['answerOptions', 'answer', 'explanation'],
        data: function () {
            return {
                value: [],
                stateClass: CARD_STATE.NOT_ANSWERED,
                isAnswerHidden: true
            }
        },

        methods: {
            selectionHandler: function (answerOption, event) {
                let value;
                if (answerOption.inputType === 'radio') {
                    value = answerOption.value;
                } else {
                    answerOption.checked = event.target.checked;

                    value = this.answerOptions
                        .filter((it) => it.checked)
                        .map((it) => it.value)
                        .join(',');
                }

                if (!value) {
                    this.stateClass = CARD_STATE.NOT_ANSWERED;
                } else if (value === this.answer) {
                    this.stateClass = CARD_STATE.PASSED;
                } else {
                    this.stateClass = CARD_STATE.FAILED;
                }

            },
            updateAnswerState: function () {
                this.isAnswerHidden = this.stateClass === CARD_STATE.NOT_ANSWERED;
                this.$emit('answer-update', this.stateClass);
            }
        }
    }
</script>

<style>
    .hidden {
        display: none
    }
</style>