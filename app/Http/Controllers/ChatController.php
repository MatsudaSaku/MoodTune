<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Session;


class ChatController extends Controller
{
    /*public function someMethod()
    {
        // セッションから 'chat_history' キーのデータを取得
        $chatHistory = Session::get('chat_history');
    
        return response()->json($chatHistory);
    }*/

    public function sendMessage(Request $request)
    {
        //$messages = Session::get('chat_history', []);

        // ユーザーからの新しいメッセージを履歴に追加
        $userMessage = ['role' => 'user', 'content' => $request->input('message')];
        $messages[] = $userMessage;

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . env('OPENAI_API_KEY'),
            'Content-Type' => 'application/json'
        //])->withOptions([
          //  'verify' => false  // SSL証明書の検証をスキップ テスト用！！！
        ])->post('https://api.openai.com/v1/chat/completions', [
            'model' => 'gpt-4-turbo',
            'messages' => $request->input('messages')
        ]);

        if ($response->failed()) {
            return response()->json([
                'error' => 'API request failed',
                'details' => $response->json()
            ], 500);
        }

        $apiResponse = $response->json();
        $botMessage = ['role' => 'assistant', 'content' => $apiResponse['choices'][0]['message']['content']];
        $messages[] = $botMessage;

        // 更新した会話履歴をセッションに保存
        //Session::put('chat_history', $messages);

        //$this->someMethod();
        // レスポンスとしてAPIからの応答を返す
        return response()->json($apiResponse);
    }
}
