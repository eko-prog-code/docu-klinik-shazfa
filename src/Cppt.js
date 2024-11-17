import React, { useRef, useState, useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import moment from 'moment-timezone';
import CpptImg from './images/cppt-img.png';
import './Cppt.css';

const Cppt = () => {
  const [nomorRM, setNomorRM] = useState('');
  const [patientName, setPatientName] = useState('');
  const [ageGender, setAgeGender] = useState('');
  const [gender, setGender] = useState('');
  const [address1, setAddress1] = useState('');
  const [selectedDate, setSelectedDate] = useState(moment().tz('Asia/Jakarta').format('YYYY-MM-DDTHH:mm'));
  const [signatureName, setSignatureName] = useState('');
  const [profesi, setProfesi] = useState('');
  const [soap, setSoap] = useState('');
  const [instruksi, setInstruksi] = useState('');
  const [medicalSignature, setMedicalSignature] = useState(null);

  const certRef = useRef();
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
    setTimeout(() => {
      html2canvas(certRef.current, { backgroundColor: '#fff' })
        .then((canvas) => {
          canvas.toBlob((blob) => {
            saveAs(blob, `${patientName}-${moment(selectedDate).format('YYYYMMDD-HHmmss')}.png`);
          });
        })
        .catch((err) => {
          console.error('Failed to capture image', err);
        });
    }, 1000);
  };



  // Function to split text for wrapping based on character length
  const wrapText = (text, maxLength) => {
    const lines = [];
    let currentLine = '';

    for (let i = 0; i < text.length; i++) {
      currentLine += text[i];
      if (currentLine.length === maxLength) {
        lines.push(currentLine);
        currentLine = '';
      }
    }
    if (currentLine) lines.push(currentLine);
    return lines;
  };

  const soapLines = wrapText(soap, 30);
  const instruksiLines = wrapText(instruksi, 20);

  return (
    <div className="newcppt-container">
      <form className="newcppt-form">
        <h3 className="centered-heading">Form - CPPT -</h3>
        <label className="newcppt-form__label">Nomor RM:
          <input type="text" className="newcppt-form__input" value={nomorRM} onChange={e => setNomorRM(e.target.value)} />
        </label>
        <label className="newcppt-form__label">Nama Pasien:
          <input type="text" className="newcppt-form__input" value={patientName} onChange={e => setPatientName(e.target.value)} />
        </label>
        <label className="newcppt-form__label">Usia / JK:
          <input type="text" className="newcppt-form__input" value={ageGender} onChange={e => setAgeGender(e.target.value)} />
        </label>
        <label className="newcppt-form__label">Jenis Kelamin:
          <input type="text" className="newcppt-form__input" value={gender} onChange={e => setGender(e.target.value)} />
        </label>
        <label className="newcppt-form__label">Alamat 1:
          <input type="text" className="newcppt-form__input" value={address1} onChange={e => setAddress1(e.target.value)} />
        </label>
        <label className="newcppt-form__label">Tanggal:
          <input type="datetime-local" className="newcppt-form__input" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} />
        </label>
        <label className="newcppt-form__label">Nama Penanda Tangan:
          <input type="text" className="newcppt-form__input" value={signatureName} onChange={e => setSignatureName(e.target.value)} />
        </label>
        <label className="newcppt-form__label">Profesi:
          <input type="text" className="newcppt-form__input" value={profesi} onChange={e => setProfesi(e.target.value)} />
        </label>
        <label className="newcppt-form__label">SOAP:
          <textarea
            className="newcppt-form__input"
            value={soap}
            onChange={(e) => setSoap(e.target.value)}
            rows="4"
            placeholder="Enter SOAP notes here..."
          />
        </label>
        <label className="newcppt-form__label">Instruksi:
          <textarea
            className="newcppt-form__input"
            value={instruksi}
            onChange={(e) => setInstruksi(e.target.value)}
            rows="4"
            placeholder="Enter instructions here..."
          />
        </label>
      </form>

      <div className="signature-container">
        <h4>Signature for Medical Personnel</h4>
        <SignatureCanvas ref={medicalSigCanvasRef} penColor="black" canvasProps={{ className: 'signature-canvas' }} />
        <div className="newcppt-buttons">
          <button className="newcppt-buttons__button newcppt-buttons__button--clear" onClick={() => handleClearSignature(medicalSigCanvasRef, setMedicalSignature)}>Clear</button>
          <button className="newcppt-buttons__button newcppt-buttons__button--download" onClick={() => handleSendSignature(medicalSigCanvasRef, setMedicalSignature)}>Send e-Sign</button>
        </div>
      </div>

      <div ref={certRef} className="newcppt-certificate-container">
        <img src={CpptImg} alt="Certificate" className="newcppt-image" />
        <div className="text-overlay text-overlay--recipient-name" style={{ left: '190px', top: '1310px' }}>{nomorRM}</div>
        <div className="text-overlay text-overlay--recipient-name" style={{ left: '190px', top: '1330px' }}>{patientName}</div>
        <div className="text-overlay text-overlay--recipient-name" style={{ left: '190px', top: '1350px' }}>{ageGender}</div>
        <div className="text-overlay text-overlay--recipient-name" style={{ left: '190px', top: '1370px' }}>{gender}</div>
        <div className="text-overlay text-overlay--recipient-name" style={{ left: '190px', top: '1390px' }}>{address1}</div>
        <div className="text-overlay text-overlay--current-time" style={{ top: '1590px' }}>
          {moment(selectedDate).format('DD/MM/YYYY')}
        </div>
        <div className="text-overlay text-overlay--current-time" style={{ top: '1610px' }}>
          {moment(selectedDate).format('HH:mm:ss')}
        </div>
        <div className="text-overlay text-overlay--recipient-name" style={{ left: '145px', top: '1625px' }}>{profesi}</div>

        <div className="text-overlay text-overlay--soap" style={{ left: '210px', top: '1730px', maxWidth: '212px' }}>
          {soap.split('\n').map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </div>

        <div className="text-overlay text-overlay--instruksi" style={{ left: '444px', top: '1730px', maxWidth: '126px' }}>
          {instruksi.split('\n').map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </div>

        <div className="text-overlay text-overlay--signature-display" style={{ left: '594px', top: '1780px' }}>{signatureName}</div>
        {medicalSignature && (
          <div className="text-overlay text-overlay--signature-display" style={{ left: '440px', top: '1716px' }}>
            <img src={medicalSignature} alt="Medical Personnel Signature" />
          </div>
        )}
      </div>

      <div className="newcppt-buttons">
        <button className="newcppt-buttons__button newcppt-buttons__button--download" onClick={handleDownload}>Download CPPT</button>
      </div>
    </div>
  );
};

export default Cppt;
