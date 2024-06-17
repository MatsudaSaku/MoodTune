<?php

namespace App\Http\Controllers;

use App\Models\Journaling;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class JournalingController extends Controller
{
    public function store(Request $request)
    {
        Log::info('Store method called');
        Log::info('Request data: ', $request->all());

        if (!Auth::check()) {
            Log::error('User is not authenticated');
            return response()->json(['error' => 'User is not authenticated'], 401);
        }

        $title = $request->title ?? "無題";
        $userId = Auth::id();
        Log::info('Authenticated User ID: ' . $userId);
        /*$request->validate([
            "title" => "required|string",
            "content" => "required|string",
        ]);*/

        try {
            $journal = new Journaling();
            $journal->user_id = Auth::id();
            $journal->title = $title;
            $journal->content = $request->content;
            $journal->created_at = Carbon::now();
            $journal->updated_at = Carbon::now();
            $journal->save();

            Log::info('Journal entry saved successfully');

            return response()->json(["message" => "Journal entry saved successfully"], 200);
        }catch (\Exception $e){
            Log::error('Error saving journal entry: ' . $e->getMessage());

            return response()->json(["error" => $e->getMessage()], 500);
        }
    }
}
