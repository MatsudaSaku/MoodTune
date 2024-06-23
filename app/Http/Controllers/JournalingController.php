<?php

namespace App\Http\Controllers;

use App\Models\Journaling;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Crypt;

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

        $userId = Auth::id();
        Log::info('Authenticated User ID: ' . $userId);

        try {
	$title = trim($request->title) ?: "無題";
            $journal = new Journaling();
            $journal->user_id = Auth::id();
            $journal->title = Crypt::encryptString($title);
            $journal->content = Crypt::encryptString($request->content);
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

    public function show($id)
    {
        $journaling = Journaling::find($id);
    if ($journaling) {
        $journaling->title = Crypt::decryptString($journaling->title);
        $journaling->content = Crypt::decryptString($journaling->content);
        return response()->json($journaling);
    } else {
        return response()->json(['message' => 'Journaling not found'], 404);
    }
    }

    public function index()
    {
        $userId = Auth::id();
        $journalings = Journaling::where('user_id', $userId)->get(['id', 'title', 'created_at']);

	foreach ($journalings as $journaling) {
            $journaling->title = Crypt::decryptString($journaling->title);
        }

        return response()->json($journalings);
    }
}
