<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Http;

class AuthController extends Controller
{
    public function redirectToSpotify()
    {
        /** @var SocialiteProviders\Spotify\Provider $driver */
        $driver = Socialite::driver('spotify');
        return $driver->stateless()->redirect();
    }

    public function handleSpotifyCallback()
    {
        try {
            /** @var SocialiteProviders\Spotify\Provider $driver */
            $driver = Socialite::driver('spotify');
            $spotifyUser = $driver ->stateless()->user();

            $user = User::updateOrCreate(
                ['spotify_id' => $spotifyUser->getId()],
                [
                    'name' => $spotifyUser->getName(),
                    'email' => $spotifyUser->getEmail(),
                    'avatar' => $spotifyUser->getAvatar(),
                    'spotify_access_token' => $spotifyUser->token,
                    'spotify_refresh_token' => $spotifyUser->refreshToken,
                    'spotify_token_expires_at' => now()->addSeconds($spotifyUser->expiresIn),
                ]
            );

            Auth::login($user, true);

            session(['spotify_access_token' => $spotifyUser->token]);


            return redirect('/Top')->with('access_token', $spotifyUser->token);

        } catch (\Exception $e) {
            Log::error('Spotify認証エラー: ' . $e->getMessage());
            Log::error('例外の詳細: ' . $e);
            return redirect('/error')->withErrors('認証に失敗しました: ' . $e->getMessage());
        }
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'Logged out successfully']);
    }

    /*public function refreshToken(Request $request)
    {
        $refreshToken = $request->input('refresh_token');

        $response = Http::asForm()->post('https://accounts.spotify.com/api/token', [
            'grant_type' => 'refresh_token',
            'refresh_token' => $refreshToken,
            'client_id' => env('SPOTIFY_CLIENT_ID'),
            'client_secret' => env('SPOTIFY_CLIENT_SECRET'),
        ]);

        if ($response->failed()) {
            return response()->json(['error' => 'Unable to refresh token'], 400);
        }

        $data = $response->json();

        return response()->json([
            'access_token' => $data['access_token'],
        ]);
    }*/
/*
    public function refreshToken(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['error' => 'User not authenticated'], 401);
        }

        $refreshToken = $user->spotify_refresh_token;

        if (!$refreshToken) {
            return response()->json(['error' => 'Refresh token not found'], 400);
        }

        $response = Http::asForm()->post('https://accounts.spotify.com/api/token', [
            'grant_type' => 'refresh_token',
            'refresh_token' => $refreshToken,
            'client_id' => env('SPOTIFY_CLIENT_ID'),
            'client_secret' => env('SPOTIFY_CLIENT_SECRET'),
        ]);

        if ($response->failed()) {
            return response()->json(['error' => 'Unable to refresh token'], 400);
        }

        $data = $response->json();

        $user->update(['spotify_access_token' => $data['access_token']]);

        return response()->json([
            'access_token' => $data['access_token'],
        ]);
    }*/
}
