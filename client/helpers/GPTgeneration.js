"use client"
export async function GPTgeneration(message,openAiAPI) {
    let url = "https://api.openai.com/v1/chat/completions";
        let token = `Bearer ${openAiAPI}`
        let model = 'gpt-4'

        let messagesToSend = [
            {
                role: 'user',
                content: message
            }
        ]

        let res = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: model,
                messages: messagesToSend
            })
        })
        let resjson = await res.json()
         return resjson.choices[0].message;
}