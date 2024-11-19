// src/Home.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="docu-klinik-container">
            <h2>Docu Klinik Shazfa Mounira</h2>
            <p className="centered-text">Halaman Home</p>
            <div className="icon-card-container">
                <div className="icon-card">
                    <img
                        src="https://firebasestorage.googleapis.com/v0/b/rme-shazfa-mounira.appspot.com/o/Icon%20DocKlinik%2Ficon1.png?alt=media&token=492415a8-025a-4b5c-916c-779a312ff13c"
                        alt="Icon 1"
                        onClick={() => navigate("/ass")}
                        className="icon"
                    />
                    <img
                        src="https://firebasestorage.googleapis.com/v0/b/rme-shazfa-mounira.appspot.com/o/Icon%20DocKlinik%2Ficon2.png?alt=media&token=0c72785c-f8ff-4763-8374-ca94c9ccced5"
                        alt="Icon 2"
                        onClick={() => navigate("/cppt")}
                        className="icon"
                    />
                    <img
                        src="https://firebasestorage.googleapis.com/v0/b/rme-shazfa-mounira.appspot.com/o/Icon%20DocKlinik%2Ficon3.png?alt=media&token=40c2b295-7b52-4e7e-b0da-912e28c81557"
                        alt="Icon 3"
                        onClick={() => navigate("/edukasi")}
                        className="icon"
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
