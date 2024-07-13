# ジャーナリング解析音楽推薦アプリ MoodTune
「**書く瞑想**」と呼ばれるジャーナリングを用いて、

**楽しみながら自身の目標や不安を言語化できる**。というコンセプトを掲げたアプリです。
<img src="https://github.com/MatsudaSaku/MoodTune/assets/149235059/9c2b7db0-5906-44ff-9ae7-a96c2c2a8275" width="80%">

URL: https://mood-tune.com/ ※ログインの前に以下をお読みください

 (※ログインにはSpotifyアカウントが必要なのですが、**現在Spotifyの拡張モード申請の審査中ですので、登録したアカウントのみがログインできます。**
 お手数ですが、以下のゲストアカウントを入力してログインしてください。
 
 ※また同じアカウントを使用するので履歴は共有されます。履歴の削除は履歴閲覧中の右側にあるDeleteボタンでできます。)

 メールアドレス：t4kwo0sekglowg@gmail.com

 パスワード：xxxx000000
 
## ジャーナリングとは
プロダクトの説明をする前に、このプロダクトのコア機能であり、書く瞑想と呼ばれるジャーナリングについてお話します。

ジャーナリングとは自らの内面を知り、明確な言葉とする。メンタルヘルスやマインドフルネスの方法として注目されている方法です。

やり方は単純明快で、**紙などに今現在の自分の正直な気持ちを、バーッと書き綴ります**。

日記などとは違い、正確さなどは求めず、ポジティブ、ネガティブ、表現の統一などは気にせずに、心のままに文字で埋め尽くしていきます。

何も思い浮かばなければ、「なにも思い浮かばない」と書けばよいです。

そういった文章を書き残した後で、自身で文章を読み直すと、自身の気持ちや考えを客観視することができます。

**何度も繰り返し書かれた単語を見て、「自分はこの事に興味があるのか」「この事が不安の正体か」と自分でも気づかなかった一面に気づく効果が期待できます**。

不安や興味を言葉として表せるようになれば、自分がこれからどうしていけばよいか見通しを立てることがしやすくなると思います。

また期間を置いて、何度も行うことで自身の変化を理解することもできます。

このプロダクトは、**音楽推薦や感情解析という小さな目的を重ねていくことで、ジャーナリングを楽しみながら継続していくことを目標としたプロダクト**です。

## 機能一覧
### ユーザー利用機能
- Spotifyアカウントを利用したユーザー登録(OAuth認証)
- スマホ、タブレットへのレスポンシブ対応

### ジャーナリング機能
- ジャーナリングをする際の背景画像を選択する機能
- ジャーナル(ジャーナリングで作成した文章)の保存、閲覧、削除機能

### ChatGPT
- ChatGPT機能を用いたジャーナル内容から解析した気分の評価
- 質問から現在のストレスなどの解析をする、ChatGPTとの会話機能、口調の選択機能

### 音楽提供機能
- クリックのみで気分とジャンルを選択し、音楽のオススメのみ受ける機能
- ジャーナルを解析し、Spotifyの曲解析情報を指定してオススメの曲を表示、視聴

### 非ユーザー利用機能
- SPA
- ジャーナリング内容とタイトルの暗号化
- Route53による独自ドメイン、SSL化

## 使用方法
### ジャーナリング機能（メイン機能）

- 1.好きな背景を設定し、ジャーナリングをする
<img src="https://github.com/MatsudaSaku/MoodTune/assets/149235059/66568f09-3590-4ae3-ad43-ab5245ed03de" width="80%">


- 2.「保存して解析」をクリック。保存したくない場合は「解析のみ」をクリック
- 3.現在の気分が数値化される。そこからオススメされる文字をクリック
<img src="https://github.com/MatsudaSaku/MoodTune/assets/149235059/f1843d90-e944-4164-9bc3-735d0bca718d" width="80%">

  
- 4.レコメンド画面が表示される。「更新」をクリックで同じオススメの曲解析情報に一致した別の曲が表示。音楽の視聴
<img src="https://github.com/MatsudaSaku/MoodTune/assets/149235059/6827f6a7-4e0a-4726-ad85-354d4c2da495" width="80%">

<img src="https://github.com/MatsudaSaku/MoodTune/assets/149235059/458788b9-4d96-4340-a6c7-0665ce44f232" width="80%">


- 5.ジャーナリング画面の履歴で今までの文章を読み返し、自分自身を振り返る
<img src="https://github.com/MatsudaSaku/MoodTune/assets/149235059/d515727b-7709-4fd8-bd2a-3b6c6a31d9ee" width="80%">


### Chat機能
- ChatGPTからの質問に答え、ストレスなどの解析をしてもらいながら、自身の振り返りを行うことができます。
<img src="https://github.com/MatsudaSaku/MoodTune/assets/149235059/2b02f469-1645-4ef3-82db-a9289a855614" width="80%">

### Music機能
- 気分とジャンルを選択するだけで音楽の推薦を手早く受けることができます。
<img src="https://github.com/MatsudaSaku/MoodTune/assets/149235059/b1dc50d9-bff3-409a-9ee3-13b89724675a" width="80%">



## クラウドアーキテクチャー
![アーキテクチャ図2 drawio](https://github.com/MatsudaSaku/MoodTune/assets/149235059/eaf106ca-b424-4e85-b4d1-56935d816582)

## 使用した技術
- フロントエンド
  - HTML/CSS
  - Javascript
  - React(ビルドツールとしてVite使用)
- バックエンド
  - PHP 8.2
  - Laravel 11.10
  - MySQL(データベース)
  - Laravel Passport
  - Laravel socialite(OAuth認証)
- インフラ・開発環境
  - AWS(RDS、Route53、ALB、ACM)
  - 外部API(ChatGPT、Spotify)
## ER図
![DB drawio](https://github.com/MatsudaSaku/MoodTune/assets/149235059/83fce149-9991-4468-8c54-a75b9382f81d)
