<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ChatController extends Controller
{

    public function sendMessage(Request $request)
    {
        $userMessage = ['role' => 'user', 'content' => $request->input('message')];
        $messages[] = $userMessage;

        $apiKey = env('OPENAI_API_KEY');
        Log::info('API Key: ' . $apiKey);

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $apiKey,
            'Content-Type' => 'application/json'

        ])->post('https://api.openai.com/v1/chat/completions', [
            'model' => 'gpt-4o',
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

        return response()->json($apiResponse);
    }
}
