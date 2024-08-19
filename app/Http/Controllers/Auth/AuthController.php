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
use Illuminate\Support\Facades\Validator;

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


	    $validatedData = $this->validateSpotifyUser($spotifyUser);

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

            $userId = $user->id;
            $tokenResult = $user->createToken('Laravel Token');
            $token = $tokenResult->accessToken;

            session(['spotify_access_token' => $spotifyUser->token,
			'token' => $tokenResult->accessToken,
           		'user_id' => $user->id]);

            $token = $tokenResult->accessToken;


            return redirect('/Top')/*->with([
                'access_token' => $spotifyUser->token,
                'token' => $token,
                'user_id' => $userId,
            ])*/;


        } catch (\Exception $e) {
            Log::error('Spotify認証エラー: ' . $e->getMessage());
            Log::error('例外の詳細: ' . $e);
        }
    }

    private function validateSpotifyUser($spotifyUser)
    {
        $validator = Validator::make([
            'id' => $spotifyUser->getId(),
            'name' => $spotifyUser->getName(),
        ], [
            'id' => 'required|string',
            'name' => 'required|string',
        ]);
    
        if ($validator->fails()) {
            throw new \Exception('Spotifyユーザーデータのバリデーションに失敗しました: ' . implode(', ', $validator->errors()->all()));
        }
    
        return $validator->validated();
    }

    public function logout(Request $request)
    {

        $user = Auth::user();

        if ($user) {
            $user->spotify_access_token = null;
            $user->spotify_refresh_token = null;
            $user->spotify_token_expires_at = null;
            $user->save();
    
        }
    
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->flush();
        $request->session()->regenerateToken();


        return response()->json(['message' => 'Logged out successfully']);
    }
    
    public function refreshToken(Request $request)
    {
        $user = Auth::user();
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
        $user->spotify_access_token = $data['access_token'];
        
        $user->spotify_access_token = $data['access_token'];
        session(['spotify_access_token' => $data['access_token']]);
    
        return response()->json([
            'access_token' => $data['access_token'],
        ]);
    }
}
