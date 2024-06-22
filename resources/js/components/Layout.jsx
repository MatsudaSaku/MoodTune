import styles from "../../css/app.module.css";
import React, { useState } from "react";
import Chat from "./Chat";
import { MoodGenreList } from "./MoodGenreList";
import { Journaling } from "./Journaling";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const metadata = {
    title: "Mood Tune",
    description: "Generate a playlist based on your mood and genre preferences",
};

export default function RootLayout({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const [showChat, setShowChat] = useState(false);
    const [showMusic, setShowMusic] = useState(false);
    const [showJournaling, setShowJournaling] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleChat = () => {
        setShowChat(true);
    };

    const toggleMusic = () => {
        setShowMusic(true);
    };

    const toggleJournaling = () => {
        setShowJournaling(true);
    };

    const toggleLogout = async () => {
        try {
            await axios.post("/logout");
            navigate("/");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    if (showChat) {
        return <Chat />;
    }

    if (showMusic) {
        return <MoodGenreList />;
    }

    if (showJournaling) {
        return <Journaling />;
    }

    return (
        <div>
            <header>
                {/* FOT-UD角ゴ_ラージ Pr6N Adobe font */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
            <script>
            (function(d) {
              var config = {
                kitId: 'txg3tbf',
                scriptTimeout: 3000,
                async: true
              },
              h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
            })(document);
            script>
          `,
                    }}
                />
            </header>
            <nav className={styles.navWrapper}>
                <div className={styles.navInner}>
                    {/* <div></div> 左端の空の要素 */}
                    <h1 className={styles.navTitle}>
                        <button
                            onClick={toggleJournaling}
                            className={styles.navTitle}
                        >
                            <img
                                src={"/logo_dev2.png"}
                                width={250}
                                height={100}
                                alt="Icon"
                                className="plusIcon"
                            />
                        </button>
                    </h1>
                    <div className={styles.toggleWrapper}>
                        <button className={styles.toggle} onClick={toggleMenu}>
                            <span>☰</span>
                        </button>
                        {isOpen && (
                            <div className="menu">
                                <button onClick={toggleJournaling}>
                                    Journaling
                                </button>
                                <button onClick={toggleChat}>Chat</button>
                                <button onClick={toggleMusic}>Music</button>
                                <button onClick={toggleLogout}>Log out</button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            <main className={styles.mainWrapper}>{children}</main>
            <footer className={styles.footer}>
                <p> © 2024 MoodTune All Rights Reserved.</p>
            </footer>
        </div>
    );
}
