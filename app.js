const API_key = 'api_key';

const outputElement = document.querySelector('#output')
const submitButton = document.querySelector('#submit');
const inputElement = document.querySelector('input');
const historyElement = document.querySelector('.history');
const buttonElement = document.querySelector('button');

async function getMessage(){
    const options = {
        method: 'POST',
        headers:{
            'Authorization':`Bearer ${API_key}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "user",
                content: inputElement.value
              }
            ],
            max_tokens: 100
          })
    }
    try{
        const response = await fetch('https://api.openai.com/v1/chat/completions', options)
        const data = await response.json()
        console.log(data)
        outputElement.textContent = data.choices[0].message.content;
        if(data.choices[0].message.content){
            const pElement = document.createElement('p')
            pElement.textContent = inputElement.value
            historyElement.append(pElement.textContent)
        }
    }catch(error){
        console.log(error)
    }
}

submitButton.addEventListener('click', getMessage);


function clearMessage(){
    outputElement.textContent = '';
    inputElement.value = '';
}

buttonElement.addEventListener('click', clearMessage);