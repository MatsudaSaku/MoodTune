<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>MoodTune</title>

	@if (app()->environment('local'))
        <!-- 開発環境用 -->

        @viteReactRefresh
        @vite(['resources/css/app.module.css', 'resources/js/app.jsx'])

	@else
        <!-- 本番環境用 -->
        @php
	$manifestPath = public_path('build/.vite/manifest.json');
            if (file_exists($manifestPath)) {
                $manifest = json_decode(file_get_contents($manifestPath), true);
            } else {
                throw new Exception('The Vite manifest file does not exist.');
            }
        
        $jsFile = $manifest['resources/js/app.jsx']['file'] ?? null;
        $cssFiles = $manifest['resources/js/app.jsx']['css'] ?? [];
        @endphp
        @foreach ($cssFiles as $cssFile)
            <link rel="stylesheet" href="{{ secure_asset('build/' . $cssFile) }}">
        @endforeach
        @if ($jsFile)
            <script src="{{ secure_asset('build/' . $jsFile) }}" defer></script>
        @endif
    @endif

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />
        
       
    </head>
    <body class="font-sans antialiased dark:bg-black dark:text-white/50">
    <div id="app"></div>
    </body>
</html>
