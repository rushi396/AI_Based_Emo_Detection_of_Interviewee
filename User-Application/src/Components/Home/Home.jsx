import React from 'react';
import Footer from '../Templates/Footer';
import Header from '../Templates/Header';
function Home() {
    return (
        <>
            <div id="homePageContainer">
                <Header />
                <section id="landingPageImage">
                    <h1>Welcome To Integrated Emotion Detection System</h1>
                    <p>Here, We try to predict the emotion using image of Human Faces, Transcripts, Audios in fine-grained classes</p>
                    <button><a href="/dashboard">Try Now</a></button>
                </section>
                <h1 className='centeredMainHeading' style={{ color: "black", textAlign: "center" }}>Process flow on This Site</h1>
                <section id="processFlow">
                    <div className="processItem">
                        1. Upload Video
                    </div>
                    <div className="processItem">
                        2. Analysis By Our Team
                    </div>
                    <div className="processItem">
                        3. Report of Emotion Statistics
                    </div>
                </section>
                <h1 className='centeredMainHeading' style={{ color: "black", textAlign: "center" }}>Data Types on we Work</h1>
                <section id="dataTypes">
                    <div className="dataType">
                        <img src="https://images.unsplash.com/photo-1543769657-fcf1236421bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80" alt="" />
                        <h2>Text Based Analysis</h2>
                    </div>
                    <div className="dataType">
                        <h2>Image Based Analysis</h2>
                        <img src="https://images.unsplash.com/photo-1500051638674-ff996a0ec29e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1218&q=80" alt="" />
                    </div>
                    <div className="dataType">
                        <img src="https://images.unsplash.com/photo-1507838153414-b4b713384a76?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="" />
                        <h2>Audio Based Analysis</h2>
                    </div>
                    <div className="dataType">
                        <h2>Video Based Analysis</h2>
                        <img src="https://images.unsplash.com/photo-1599240211563-17590b1af857?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="" />
                    </div>
                </section>
                <Footer />
            </div>
        </>
    )
}

export default Home