import React, { useRef, useState, useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { toPng } from 'html-to-image';
import download from 'downloadjs';
import moment from 'moment-timezone';
import EduImage from './images/dokumen3.png';
import './Edukasi.css';

const Edukasi = () => {
    const [patientName, setPatientName] = useState('');
    const [ageGender, setAgeGender] = useState('');
    const [address1, setAddress1] = useState('');
    const [signatureName, setSignatureName] = useState('');
    const [address2, setAddress2] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [selectedDate, setSelectedDate] = useState(moment().tz('Asia/Jakarta').format('YYYY-MM-DDTHH:mm'));
    const [patientRepSignature, setPatientRepSignature] = useState(null);
    const [medicalSignature, setMedicalSignature] = useState(null);
    const [nomorRM, setNomorRM] = useState('');
    const [namaMedis, setNamaMedis] = useState('');
    const certRef = useRef();
    const patientRepSigCanvasRef = useRef();
    const medicalSigCanvasRef = useRef();

    useEffect(() => {
        setSelectedDate(moment().tz('Asia/Jakarta').format('YYYY-MM-DDTHH:mm'));
    }, []);

    const handleClearSignature = (ref, setSignature) => {
        ref.current.clear();
        setSignature(null);
    };

    const handleSendSignature = (ref, setSignature) => {
        const signatureDataUrl = ref.current.toDataURL();
        setSignature(signatureDataUrl);
    };

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
                {/* New form fields */}
                <label>
                    Nomor RM:
                    <input type="text" value={nomorRM} onChange={e => setNomorRM(e.target.value)} />
                </label>
                <label>
                    Nama Medis:
                    <input type="text" value={namaMedis} onChange={e => setNamaMedis(e.target.value)} />
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
                    Alamat1:
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
                    Alamat 2:
                    <input type="text" value={address2} onChange={e => setAddress2(e.target.value)} />
                </label>
                <label>
                    No Telp:
                    <input type="text" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
                </label>
            </div>

            {/* Signature Canvas for Patient's Representative */}
            <div className="signature-container">
                <h4>Signature for Patient’s Representative</h4>
                <SignatureCanvas ref={patientRepSigCanvasRef} penColor="black" canvasProps={{ width: 400, height: 150, className: 'sigCanvas' }} />
                <button onClick={() => handleClearSignature(patientRepSigCanvasRef, setPatientRepSignature)}>Clear</button>
                <button onClick={() => handleSendSignature(patientRepSigCanvasRef, setPatientRepSignature)}>Send e-Sign</button>
            </div>

            <div className="signature-container">
                <h4>Signature for Medical Personnel</h4>
                <SignatureCanvas ref={medicalSigCanvasRef} penColor="black" canvasProps={{ width: 400, height: 150, className: 'sigCanvas' }} />
                <button onClick={() => handleClearSignature(medicalSigCanvasRef, setMedicalSignature)}>Clear</button>
                <button onClick={() => handleSendSignature(medicalSigCanvasRef, setMedicalSignature)}>Send e-Sign</button>
            </div>

            {/* Certificate Display */}
            <div ref={certRef} className="S-Unix2024 certificate-container">
                <img src={EduImage} alt="Certificate" className="S-Unix2024 certificate-image" />
                <div className="S-Unix2024 overlay-text" style={{ left: '134px', top: '70px' }}>
                    {nomorRM}
                </div>
                <div className="S-Unix2024 overlay-text patient-name" style={{ left: '135px', top: '94px' }}>
                    {patientName}
                </div>
                <div className="S-Unix2024 overlay-text age-gender" style={{ left: '135px', top: '120px' }}>
                    {ageGender}
                </div>
                <div className="S-Unix2024 overlay-text address1" style={{ left: '140px', top: '145px' }}>
                    {address1}
                </div>
                <div className="S-Unix2024 overlay-text current-time" style={{ left: '-40px', top: '40px' }}>
                    {moment(selectedDate).format('DD/MM/YYYY HH:mm:ss')}
                </div>
                <div className="S-Unix2024 overlay-text signature-name" style={{ left: '190px', top: '320px' }}>
                    {signatureName}
                </div>
                <div className="S-Unix2024 overlay-text address2" style={{ left: '192px', top: '340px' }}>
                    {address2}
                </div>
                <div className="S-Unix2024 overlay-text phone-number" style={{ left: '192px', top: '364px' }}>
                    {phoneNumber}
                </div>
                {/* Display Patient Representative Signature */}
                {patientRepSignature && (
                    <div className="S-Unix2024 overlay-text signature-display" style={{ left: '250px', top: '1100px' }}>
                        <img src={patientRepSignature} alt="Patient Representative Signature" style={{ maxWidth: '70%', maxHeight: '70%' }} />
                    </div>
                )}
                {patientRepSignature && signatureName && (
                    <div className="S-Unix2024 overlay-text" style={{ left: '120px', top: '1100px', textAlign: 'center' }}>
                        {signatureName}
                    </div>
                )}

                {/* Display Medical Personnel Signature */}
                {medicalSignature && (
                    <div className="S-Unix2024 overlay-text signature-display" style={{ left: '650px', top: '1100px' }}>
                        <img src={medicalSignature} alt="Medical Personnel Signature" style={{ maxWidth: '70%', maxHeight: '70%' }} />
                    </div>
                )}
                {medicalSignature && namaMedis && (
                    <div className="S-Unix2024 overlay-text" style={{ left: '530px', top: '1100px', textAlign: 'center' }}>
                        {namaMedis}
                    </div>
                )}

            </div>

            {/* Download Button */}
            <div className="S-Unix2024 download-button-container">
                <button className="S-Unix2024 download-button" onClick={handleDownload}>Download Dokumen</button>
            </div>
        </div>
    );
};

export default Edukasi;
