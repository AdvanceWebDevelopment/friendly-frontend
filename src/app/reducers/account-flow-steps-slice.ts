import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface FlowStepsState {
    steps: number[];
    currentStep: number;
}

const initialState: FlowStepsState = {
    steps: [],
    currentStep: 0,
};

const flowStepsSlice = createSlice({
    name: "flow-steps",
    initialState,
    reducers: {
        setState(state, action: PayloadAction<FlowStepsState>) {
            state.steps = action.payload.steps;
            state.currentStep = action.payload.currentStep;
        },

        goNext(state) {
            if (state.currentStep < state.steps[state.steps.length - 1]) {
                state.currentStep = state.currentStep + 1;
            } else return;
        },

        goBack(state) {
            if (state.currentStep > state.steps[0]) {
                state.currentStep = state.currentStep - 1;
            } else return;
        },
    },
});

// Reducers
export const flowStepsReducer = flowStepsSlice.reducer;

// Actions
export const flowStepsActions = flowStepsSlice.actions;

// Selector
export const selectSteps = (state: RootState) => state.flowStepsState.steps;
export const selectCurrentStep = (state: RootState) => state.flowStepsState.currentStep;
