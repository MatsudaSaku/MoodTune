import React, { useState } from "react";
import styles from "../../css/login.module.css";

const modals = [
    {
        number: "",
        title: "MoodTuneとは？",
        content: [
            "MoodTuneとは「書く瞑想」と呼ばれるジャーナリングを用いて、楽しみながら自身の目標や不安を言語化できる。",
            "というコンセプトを掲げたアプリです。",
            "ジャーナリングを続けるために、「ジャーナリングから気分を解析し、その気分に適した音楽を推薦する。」",
            "といった”小さな目的”を作る部分がMoodTuneの特徴です。",
        ],
        media: {
            type: "video",
            src: "/MoodTune - Google Chrome 2024-06-26 19-58-18.mp4",
        },
    },
    {
        number: "",
        title: "ジャーナリングとは?",
        content: [
            "ジャーナリングとは自らの内面を知り、明確な言葉とする。メンタルヘルスやマインドフルネスの方法として注目されている方法です。",
            "やり方は単純明快で、紙などに今現在の自分の正直な気持ちを書き綴ります。",
            "日記などとは違い正確さなどは求めず、ポジティブ、ネガティブ、表現の統一などは気にせずに心のままに文字で埋め尽くしていきます。",
            "書き綴った文章を見直し、自分の本心から出た言葉と向き合うことで、自分でも気づかなかった不安や望みを言葉にする。",
            "それがジャーナリングの目的です。",
        ],
        media: { type: "image", src: "/moodtune2.png" },
    },
    {
        number: "1.",
        title: "ログイン",
        content: [
            "まず最初にトップページのロゴをクリックしましょう。",
            "するとSpotifyの認証が求められます。そのまま認証を進めてください。",
            "もし現在Spotifyにログインされている場合は認証ページには遷移されず、認可画面が表示されます。",
            "「承認」を選択して進んでください。",
        ],
        media: { type: "image", src: "/moodtune1.png" },
    },
    {
        number: "2.",
        title: "ジャーナリング",
        content: [
            "最初に表示されるページがジャーナリング画面です。",
            "このまま本文を入力してもよいですが、画面右下にあるメニューから好きな背景を選択することもできます。",
            "一番書きやすい環境で、気持ちのままにジャーナリングを行ってください。",
            "タイトルは入力せずとも次に進むことができます。",
        ],
        media: { type: "image", src: "/moodtune1.png" },
    },
    {
        number: "3.",
        title: "保存して解析",
        content: [
            "ジャーナリングを終えたら、下記の「保存して解析」「解析のみ」をクリックすることで文章の内容から、現在の気分を解析されます。",
            "「保存して解析」を行うと、後で履歴として見直すことができます。ジャーナリングの効果を実感したい方にはこちらがオススメです。",
            "解析が終了すると、現在の気分の数値と、その数値から割り出した音楽レコメンドリンクが生成されます。",
            "リンクをクリックでレコメンド画面へ遷移します。",
        ],
        media: { type: "image", src: "/moodtune1.png" },
    },
    {
        number: "4.",
        title: "音楽のレコメンド",
        content: [
            "こちらがレコメンド画面です。",
            "先ほど生成したレコメンド内容に適した音楽が表示されています。",
            "もし気に入った音楽がなければ下の更新ボタンをクリックで、同じレコメンド内容の違った音楽が表示され直します。",
        ],
        media: { type: "image", src: "/moodtune1.png" },
    },
    {
        number: "5.",
        title: "履歴",
        content: [
            "左上のロゴをクリック、もしくは右上のメニューを開き、「Journaling」をクリックでジャーナリング画面に戻ります。",
            "ジャーナリング画面右下の「Journaling History」から過去に保存したジャーナルを閲覧することができます。",
            "自動で作成した日時が保存されるので、その時間とジャーナルの内容を見て自身の変化を実感することができます。",
        ],
        media: { type: "image", src: "/moodtune1.png" },
    },
    {
        number: "",
        title: "チャット",
        content: [
            "右上のメニューを開き、「Chat」をクリックでチャット画面になります。",
            "この画面ではChatGPTから五つ質問をされます。その後、答えから、ストレスやポジティブなどを数値化されます。",
            "現在の気分を把握することと、質問に答えることで自らを振り返る。二つの効果が期待できます。",
            "ジャーナリングと合わせて、自らの振り返りに使用してみてください。",
        ],
        media: { type: "image", src: "/moodtune1.png" },
    },
    {
        number: "",
        title: "自分で選択するレコメンド",
        content: [
            "右上のメニューを開き、「Music」をクリックでミュージック画面になります。",
            "「なりたい気分」と「音楽のジャンル」、この二つを入力し、「決定」をクリックでレコメンド画面へ遷移します。",
            "ジャーナリングの解析で得られるレコメンド機能を、自分の気分で簡単に得ることができます。",
            "今の気分にあった音楽を探したいときに使用してみてください。",
        ],
        media: { type: "image", src: "/moodtune1.png" },
    },
];

const SpotifyLogin = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [slideDirection, setSlideDirection] = useState("");

    const handleSpotifyLogin = () => {
        window.location.href = "/auth/spotify/redirect";
    };

    const openModal = () => {
        console.log("openModal called");
        setIsModalOpen(true);
    };

    const closeModal = () => {
        console.log("closeModal called");
        setIsModalOpen(false);
        setSlideDirection("");
    };

    const slideLeft = () => {
        setSlideDirection("modal-slide-left-exit");
        setTimeout(() => {
            setCurrentIndex((currentIndex - 1 + modals.length) % modals.length);
            setSlideDirection("modal-slide-left-enter");
        }, 500);
    };

    const slideRight = () => {
        setSlideDirection("modal-slide-right-exit");
        setTimeout(() => {
            setCurrentIndex((currentIndex + 1) % modals.length);
            setSlideDirection("modal-slide-right-enter");
        }, 500);
    };

    const renderMedia = (media) => {
        if (!media) return null;
        if (media.type === "image") {
            return (
                <img
                    src={media.src}
                    alt={media.alt || "media"}
                    className={styles.media}
                />
            );
        } else if (media.type === "video") {
            return (
                <video controls muted className={styles.media}>
                    <source src={media.src} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            );
        }
        return null;
    };

    return (
        <div className={styles.login_container}>
            <div className={styles.howto_container}>
                <p className={styles.welcome_message}>気持ちを言葉にしてみませんか？</p>
                <div className={styles.login_display}>
                    <button
                        className={styles.login_button}
                        onClick={handleSpotifyLogin}
                    >
                        <img
                            src={"/logo_dev2.png"}
                            width={250}
                            height={100}
                            alt="Icon"
                            className="plusIcon"
                        />

                        <img
                            src={"/Spotify_Logo_RGB_Black.png"}
                            width={130}
                            height={40}
                            alt="Icon"
                            className="plusIcon"
                        />
                        <p className={styles.guide}>新規登録 ログイン</p>
                    </button>
                </div>
                <button className={styles.howto_button} onClick={openModal}>
                    What MoodTune?
                </button>
            </div>
            <div
                className={`${styles.modal} ${
                    isModalOpen ? styles.modal_open : ""
                }`}
            >
                <button
                    className={styles.slide_button_left}
                    onClick={slideLeft}
                >
                    ＜
                </button>
                <div
                    className={`${styles.modal_content} ${styles[slideDirection]}`}
                >
                    <span className={styles.close} onClick={closeModal}>
                        &times;
                    </span>
                    <span className={styles.number}>
                        {modals[currentIndex].number}
                    </span>
                    <p className={styles.title}>{modals[currentIndex].title}</p>
                    {modals[currentIndex].content.map((paragraph, index) => (
                        <p key={index} className={styles.content}>
                            {paragraph}
                        </p>
                    ))}
                    {renderMedia(modals[currentIndex].media)}
                </div>

                <button
                    className={styles.slide_button_right}
                    onClick={slideRight}
                >
                    ＞
                </button>
            </div>
        </div>
    );
};

export default SpotifyLogin;

