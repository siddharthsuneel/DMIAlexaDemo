const Alexa = require('ask-sdk');

const SKILL_NAME = 'DMITestOne';
const GET_FACT_MESSAGE = 'Here\'s your fact: ';
const HELP_MESSAGE = 'Welcome to DMI !,You can say tell me a space fact, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

const ErrorHandler = {
canHandle() {
return true;
},
handle(handlerInput, error) {
console.log(`Error handled: ${error.message}`);

return handlerInput.responseBuilder
.speak('Sorry, an error occurred.')
.reprompt('Sorry, an error occurred.')
.getResponse();
},
};

const HelpHandler = {
canHandle(handlerInput) {
const request = handlerInput.requestEnvelope.request;
return request.type === 'IntentRequest'
&& request.intent.name === 'AMAZON.HelpIntent';
},
handle(handlerInput) {
return handlerInput.responseBuilder
.speak(HELP_MESSAGE)
.reprompt(HELP_REPROMPT)
.getResponse();
},
};

const ExitHandler = {
canHandle(handlerInput) {
const request = handlerInput.requestEnvelope.request;
return request.type === 'IntentRequest'
&& (request.intent.name === 'AMAZON.CancelIntent'
|| request.intent.name === 'AMAZON.StopIntent');
},
handle(handlerInput) {
return handlerInput.responseBuilder
.speak(STOP_MESSAGE)
.getResponse();
},
};

const SessionEndedRequestHandler = {
canHandle(handlerInput) {
const request = handlerInput.requestEnvelope.request;
return request.type === 'SessionEndedRequest';
},
handle(handlerInput) {
console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

return handlerInput.responseBuilder.getResponse();
},
};

const skillBuilder = Alexa.SkillBuilders.standard();

exports.handler = skillBuilder
.addRequestHandlers(
// GetNewFactHandler,
HelpHandler,
ExitHandler,
SessionEndedRequestHandler
)
.addErrorHandlers(ErrorHandler)
.lambda();
