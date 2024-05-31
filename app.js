class Chatbox {
    constructor() {
        this.args = {
            openButton: document.querySelector('.chatbox__button'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button')
        }

        this.state = false;
        this.messages = [];
        // Define predefined responses for common questions
        this.predefinedResponses = {
            "hi": "Hello! How can I assist you today?",
            "hello": "Hello! How can I assist you today?",
            "how are you": "I'm doing well, thank you for asking!",
            "how r u": "I'm doing well, thank you for asking!",
            "how's it going": "I'm doing well, thank you for asking!",
            "pricing": "For pricing information, please visit our website or contact our sales team.",
            // Add more predefined responses as needed
        };
    }

    display() {
        const { openButton, chatBox, sendButton } = this.args;

        openButton.addEventListener('click', () => this.toggleState(chatBox))

        sendButton.addEventListener('click', () => this.onSendButton(chatBox))

        const node = chatBox.querySelector('input');
        node.addEventListener("keyup", ({ key }) => {
            if (key === "Enter") {
                this.onSendButton(chatBox)
            }
        })
    }

    toggleState(chatbox) {
        this.state = !this.state;

        // show or hides the box
        if (this.state) {
            chatbox.classList.add('chatbox--active')
        } else {
            chatbox.classList.remove('chatbox--active')
        }
    }

    onSendButton(chatbox) {
        // Get the input field element
        const textField = chatbox.querySelector('input');

        // Get the user input text from the input field
        const userInput = textField.value.trim().toLowerCase(); // Convert to lowercase for case-insensitive matching

        // Check if the user input is empty
        if (!userInput) {
            return; // If empty, do nothing
        }

        // Check if the user input matches any predefined response
        const predefinedResponse = this.predefinedResponses[userInput];

        // If a predefined response is found, use it; otherwise, use a generic response
        const responseMessage = predefinedResponse ? predefinedResponse : "Thank you for your message! We'll get back to you soon.";

        // Add user message to the messages array
        let userMessage = { name: "User", message: userInput };
        this.messages.push(userMessage);

        // Add response message to the messages array
        let response = { name: "Sam", message: responseMessage };
        this.messages.push(response);

        
        this.updateChatText(chatbox);

       
        textField.value = '';
    }

    updateChatText(chatbox) {
        var html = '';
        this.messages.slice().reverse().forEach(function (item, index) {
            if (item.name === "Sam") {
                html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>'
            } else {
                html += '<div class="messages__item messages__item--operator">' + item.message + '</div>'
            }
        });

        const chatmessage = chatbox.querySelector('.chatbox__messages');
        chatmessage.innerHTML = html;
    }
}

const chatbox = new Chatbox();
chatbox.display();
// JavaScript code for toggling the animation class on chat icon click
document.getElementById('chat-icon').addEventListener('click', function() {
    // Toggle animation class on click
    this.classList.toggle('animate');
});
