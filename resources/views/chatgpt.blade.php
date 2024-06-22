<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Chat</title>
        
        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />

        <!-- Styles -->
        <style>
            body { font-family: 'Figtree', sans-serif; }
            .chat-container { max-width: 600px; margin: 50px auto; padding: 20px; background: white; border-radius: 8px; }
            .chat-input { width: calc(100% - 22px); padding: 10px; border-radius: 8px; border: 1px solid #ccc; }
            .chat-button { width: 100%; padding: 10px; border-radius: 8px; background-color: #007BFF; color: white; border: none; cursor: pointer; }
            .chat-button:hover { background-color: #0056b3; }
        </style>
    </head>
    <body class="font-sans antialiased dark:bg-black dark:text-white/50">
        <div class="chat-container">
        <div id="chatDisplay" class="chat-display"></div>
            <input type="text" id="messageInput" class="chat-input" placeholder="Type your message here...">
            <button onclick="sendMessage()" class="chat-button">Send</button>
        </div>

        <!-- Script -->
        <script>
        const chatDisplay = document.getElementById('chatDisplay');
        let conversationHistory = [];

        const initialMessage = async () => {
    try {

        const initialSystemMessage = {
            role: 'system',
            content: 'あなたがユーザーに対して五つの質問を一つ一つしてください。あなたが五つ質問をしてユーザーが五つ回答したら、それまでのユーザーの回答を振り返り解析して、四つの感情である、興奮、不安、悲しみ、楽しみ、を四つ全部で100としてそれぞれの現在の感情を数値で表してください。'
        };
        conversationHistory.push(initialSystemMessage);

        const response = await fetch('/api/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        messages: conversationHistory//[{ role: 'system', content: "五つの質問を一つ一つしていってください。あなたが五つ質問をしてユーザーが五つ回答したら、それまでのユーザーの回答を振り返り解析して、四つの感情である、興奮、不安、悲しみ、楽しみ、を四つ全部合わせて100とする現在の感情を、それぞれ数値で表してください。" }]
                    })
                });

        /*const initialContent = {
            role: 'system',
            content: 'これから五つの質問を一つ一つしてください。質問をして全ての回答が終わったら、それまでの回答を振り返り解析して、四つの感情である、興奮、不安、悲しみ、楽しみ、を四つ全部で100としてそれぞれの現在の感情を数値で表してください。'
        };*/
        const data = await response.json();
        conversationHistory.push(data.choices[0].message); // 初期メッセージを履歴に追加
        updateChatDisplay(data.choices[0].message.content);
    } catch (error) {
        console.error('Error:', error);
    }
};

        /*const initialMessage = async () => {
            try {
                const response = await fetch('/api/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        messages: [{ role: 'system', content: "これから五つの質問を一つ一つしてください。質問をして全ての回答が終わったら、それまでの回答を振り返り解析して、四つの感情である、興奮、不安、悲しみ、楽しみ、を四つ全部で100としてそれぞれの現在の感情を数値で表してください。" }]
                    })
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log(data);
                chatDisplay.textContent = data.choices[0].message.content;// data.message[0].content;
            } catch (error) {
                console.error('Error:', error);
            }
        };*/


            const sendMessage = async () => {
                const message = document.getElementById('messageInput').value;
                let response;
                conversationHistory.push({role: 'user', content: message});

                console.log('Current conversation history:', conversationHistory);
                try {
                    const response = await fetch('/api/chat', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                        messages: conversationHistory
                        })
                    });

                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }

                    const data = await response.json();
                    console.log(data);
                    conversationHistory.push({role:'assistant', content: data.choices[0].message.content});
                    updateChatDisplay(data.choices[0].message.content);
                } catch (error) {
                    console.error('Error:', error);
                    if (response) {
                        response.json().then(json => console.error(json)).catch(e => console.error('Error parsing JSON:', e));
                    }
                }
            };



            function updateChatDisplay(message) {
                const messageDiv = document.createElement('div');

                messageDiv.innerHTML = message.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                //messageDiv.textContent = message;

                messageDiv.style.marginBottom = '10px';
                messageDiv.style.padding = '5px';
                messageDiv.style.borderBottom = '1px solid #ccc';

                chatDisplay.appendChild(messageDiv);

                chatDisplay.scrollTop = chatDisplay.scrollHeight
            }


            window.onload = initialMessage;
        </script>
    </body>
</html>
