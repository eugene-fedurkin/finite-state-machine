class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (!config) throw Error('error'); // ??
        this.config = config;
        this.history = [this.config.initial];
        this.stateIndex = 0;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.history[this.stateIndex];
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        for (let existedState in this.config.states) {
            if (state === existedState) {
                this.history.splice(this.stateIndex + 1);
                this.history.push(state);
                this.stateIndex++;
                return;
            }
        }
        throw Error('config isn\'t passed');
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        let newState = this.config.states[this.getState()].transitions[event];
        this.changeState(newState);
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.history = [this.config.initial];
        this.stateIndex = 0;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let states = [];
        for (let state in this.config.states) {
            if (!event || this.config.states[state].transitions[event]) {
                states.push(state);
            }
        } 
        return states;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.stateIndex > 0) {
            this.stateIndex--;
            return true;
        } else return false;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.history[this.stateIndex + 1]) {
            this.stateIndex++;
            return true;
        } else return false;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.history = [this.config.initial];
        this.stateIndex = 0;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
