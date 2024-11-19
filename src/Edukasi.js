import React, { useRef, useState, useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { toPng } from 'html-to-image';
import download from 'downloadjs';
import moment from 'moment-timezone';
import EduImage from './images/dokumen3.png';
import { useNavigate } from "react-router-dom";
import './Edukasi.css';

const Edukasi = () => {
    const navigate = useNavigate();
    const [patientName, setPatientName] = useState('');
    const [ageGender, setAgeGender] = useState('');
    const [address1, setAddress1] = useState('');
    const [signatureName, setSignatureName] = useState('');
    const [address2, setAddress2] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [selectedDate, setSelectedDate] = useState(moment().tz('Asia/Jakarta').format('YYYY-MM-DDTHH:mm'));
    const [uploadedMedicalSignature, setUploadedMedicalSignature] = useState(null); // For medical personnel signature
    const [patientRepSignature, setPatientRepSignature] = useState(null); // Canvas signature data URL
    const [medicalSignaturePosition, setMedicalSignaturePosition] = useState({ left: '530px', top: '1020px' });

    const patientRepSigCanvasRef = useRef(); // Ref for canvas signature
    const certRef = useRef();

    const handleClearCanvas = () => {
        patientRepSigCanvasRef.current.clear();
        setPatientRepSignature(null);
    };

    const handleSaveCanvasSignature = () => {
        const signatureDataUrl = patientRepSigCanvasRef.current.toDataURL();
        setPatientRepSignature(signatureDataUrl);
    };

    const handleMedicalSignatureUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setUploadedMedicalSignature(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const [nomorRM, setNomorRM] = useState('');
    const [namaMedis, setNamaMedis] = useState('');

    useEffect(() => {
        setSelectedDate(moment().tz('Asia/Jakarta').format('YYYY-MM-DDTHH:mm'));
    }, []);

    const handleDownload = () => {
        toPng(certRef.current, { width: 1420, height: 1260 })
            .then((dataUrl) => {
                download(dataUrl, `${patientName}-${moment(selectedDate).format('YYYYMMDD-HHmmss')}.png`);
            })
            .catch((err) => {
                console.error('Failed to generate image', err);
            });
    };

    return (
        <div>
            <div className="S-Unix2024 input-fields">
                <h3 className="centered-heading">Form - Edukasi -</h3>
                <label>
                    Nomor RM:
                    <input type="text" value={nomorRM} onChange={e => setNomorRM(e.target.value)} />
                </label>
                <label>
                    Nama Pasien:
                    <input type="text" value={patientName} onChange={e => setPatientName(e.target.value)} />
                </label>
                <label>
                    Usia / JK:
                    <input type="text" value={ageGender} onChange={e => setAgeGender(e.target.value)} />
                </label>
                <label>
                    Alamat Pasien:
                    <input type="text" value={address1} onChange={e => setAddress1(e.target.value)} />
                </label>
                <label>
                    Tanggal:
                    <input
                        type="datetime-local"
                        value={selectedDate}
                        onChange={e => setSelectedDate(e.target.value)}
                    />
                </label>
                <label>
                    Nama Penanda Tangan:
                    <input type="text" value={signatureName} onChange={e => setSignatureName(e.target.value)} />
                </label>
                <label>
                    Alamat :
                    <input type="text" value={address2} onChange={e => setAddress2(e.target.value)} />
                </label>
                <label>
                    No Telp:
                    <input type="text" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
                </label>

                <label>
                    Nama Medis:
                    <input type="text" value={namaMedis} onChange={e => setNamaMedis(e.target.value)} />
                </label>

                {/* Upload Signature for Medical Personnel */}
                <label>
                    Upload Tanda Tangan Tenaga Medis:
                    <input type="file" accept="image/*" onChange={handleMedicalSignatureUpload} />
                </label>

                {/* Canvas for Patient's Representative */}
                <div className="signature-container">
                    <h4>Tanda Tangan Perwakilan Pasien / Pasien:</h4>
                    <SignatureCanvas
                        ref={patientRepSigCanvasRef}
                        penColor="black"
                        canvasProps={{
                            width: 400,
                            height: 150,
                            className: 'sigCanvas'
                        }}
                    />
                    <button onClick={handleClearCanvas}>Clear</button>
                    <button onClick={handleSaveCanvasSignature}>Simpan Tanda Tangan</button>
                </div>
            </div>

            {/* Certificate Display */}
            <div ref={certRef} className="S-Unix2024 certificate-container">
                <img src={EduImage} alt="Certificate" className="S-Unix2024 certificate-image" />
                <div className="S-Unix2024 overlay-text" style={{ left: '134px', top: '78px' }}>
                    {nomorRM}
                </div>
                <div className="S-Unix2024 overlay-text patient-name" style={{ left: '135px', top: '102px' }}>
                    {patientName}
                </div>
                <div className="S-Unix2024 overlay-text age-gender" style={{ left: '135px', top: '128px' }}>
                    {ageGender}
                </div>
                <div className="S-Unix2024 overlay-text address1" style={{ left: '138px', top: '153px' }}>
                    {address1}
                </div>
                <div className="S-Unix2024 overlay-text current-time" style={{ left: '-40px', top: '40px' }}>
                    {moment(selectedDate).format('DD/MM/YYYY HH:mm:ss')}
                </div>
                <div className="S-Unix2024 overlay-text signature-name" style={{ left: '190px', top: '328px' }}>
                    {signatureName}
                </div>
                <div className="S-Unix2024 overlay-text address2" style={{ left: '192px', top: '348px' }}>
                    {address2}
                </div>
                <div className="S-Unix2024 overlay-text phone-number" style={{ left: '192px', top: '372px' }}>
                    {phoneNumber}
                </div>

                {/* Display Canvas Signature */}
                {patientRepSignature && (
                    <div>
                        <div className="S-Unix2024 overlay-text signature-display" style={{ left: '250px', top: '1100px' }}>
                            <img src={patientRepSignature} alt="Patient Representative Signature" style={{ maxWidth: '70%', maxHeight: '70%' }} />
                        </div>
                        {/* Text under Patient Representative Signature */}
                        <div className="S-Unix2024 overlay-text signature-name-text" style={{ left: '110px', top: '1110px' }}>
                            {signatureName || "Nama Perwakilan Pasien"}
                        </div>
                    </div>
                )}

                {/* Display Medical Personnel Signature */}
                {uploadedMedicalSignature && (
                    <div>
                        <div className="S-Unix2024 overlay-text medical-signature" style={medicalSignaturePosition}>
                            <img src={uploadedMedicalSignature} alt="Medical Personnel Signature" style={{ maxWidth: '70%', maxHeight: '70%' }} />
                        </div>
                        {/* Text under Medical Personnel Signature */}
                        <div className="S-Unix2024 overlay-text medical-name-text" style={{ left: medicalSignaturePosition.left, top: `calc(${medicalSignaturePosition.top} + 90px)` }}>
                            {namaMedis || "Nama Medis"}
                        </div>
                    </div>
                )}

            </div>

            {/* Download Button */}
            <div className="S-Unix2024 download-button-container">
                <button className="S-Unix2024 download-button" onClick={handleDownload}>Download Dokumen</button>
            </div>
            <div
            className="back-to-home"
            onClick={() => navigate("/")}
            title="Kembali ke Beranda"
        >
            🏠 {/* Anda dapat mengganti dengan ikon sesuai kebutuhan */}
        </div>
        </div>
    );
};

export default Edukasi;
