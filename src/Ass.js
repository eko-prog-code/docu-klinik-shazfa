import React, { useRef, useState, useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import moment from 'moment-timezone';
import AssImg from './images/Dok-Ass.png';
import './Ass.css';

const Ass = () => {
  const [medicalOfficerName, setMedicalOfficerName] = useState("");
  const [namePosition, setNamePosition] = useState({ left: "100px", top: "2902px" });

  // Handler untuk mengubah nama petugas medis
  const handleNameChange = (event) => {
    setMedicalOfficerName(event.target.value);
  };

  // Handler untuk mengatur posisi nama
  const updateNamePosition = (axis, value) => {
    setNamePosition((prev) => ({
      ...prev,
      [axis]: `${value}px`,
    }));
  };

  const [nomorRM, setNomorRM] = useState('');
  const [patientName, setPatientName] = useState('');
  const [ageGender, setAgeGender] = useState('');
  // State untuk menyimpan pilihan gender
  const [selectedGender, setSelectedGender] = useState(null);



  // State untuk posisi
  const [genderPositions, setGenderPositions] = useState({
    lakiLaki: { left: '586px', top: '-2770px' },
    perempuan: { left: '658px', top: '-2770px' },
  });

  const [currentDateTime, setCurrentDateTime] = useState(moment().tz("Asia/Jakarta"));
  const [datetimePositions, setDatetimePositions] = useState({
    date: { left: "127px", top: "2750px" },
    time: { left: "254px", top: "2750px" },
  });

  // Perbarui waktu setiap detik
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(moment().tz("Asia/Jakarta"));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fungsi untuk menangani perubahan pilihan radio button
  const handleGenderChange = (gender) => {
    setSelectedGender(gender);
  };
  const [address1, setAddress1] = useState('');
  const [selectedDate, setSelectedDate] = useState(moment().tz('Asia/Jakarta').format('YYYY-MM-DDTHH:mm'));
  // State untuk menyimpan input ruangan
  const [room, setRoom] = useState("");

  // Posisi tetap untuk hasil
  const roomPosition = {
    left: "542px",
    top: "-2686px",
  };

  // Handler untuk mengubah input ruangan
  const handleRoomChange = (event) => {
    setRoom(event.target.value);
  };


  // State untuk menyimpan pilihan sumber data
  const [dataSource, setDataSource] = useState("");

  // State untuk menyimpan detail jika "Lainnya" dipilih
  const [otherSource, setOtherSource] = useState("");

  // Posisi tetap untuk hasil
  const dataSourcePositions = {
    pasien: { left: "190px", top: "-2664px" },
    keluarga: { left: "316px", top: "-2664px" },
    lainnya: { left: "434px", top: "-2664px" },
  };

  // Handler untuk mengubah pilihan sumber data
  const handleDataSourceChange = (event) => {
    const { value } = event.target;
    setDataSource(value);

    // Reset detail lainnya jika pilihan bukan "lainnya"
    if (value !== "lainnya") {
      setOtherSource("");
    }
  };

  // Handler untuk mengubah detail "lainnya"
  const handleOtherSourceChange = (event) => {
    setOtherSource(event.target.value);
  };



  const [mainComplaint, setMainComplaint] = useState("");

  // Posisi tetap untuk hasil
  const complaintPosition = {
    left: "94px",
    top: "-2600px",
  };

  // Handler untuk mengubah keluhan utama
  const handleComplaintChange = (event) => {
    setMainComplaint(event.target.value);
  };

  // State untuk menyimpan nilai pemeriksaan fisik
  const [physicalExam, setPhysicalExam] = useState({
    bb: "",
    tb: "",
    td: "",
    sb: "",
    rr: "",
    nadi: "",
  });

  // Posisi untuk setiap hasil
  const [examPositions, setExamPositions] = useState({
    bb: { left: "122px", top: "-2496px" },
    tb: { left: "338px", top: "-2496px" },
    td: { left: "122px", top: "-2478px" },
    sb: { left: "618px", top: "-2478px" },
    rr: { left: "500px", top: "-2478px" },
    nadi: { left: "338px", top: "-2478px" },
  });

  // Handler untuk mengubah nilai pemeriksaan fisik
  const handleInputChange = (field, value) => {
    setPhysicalExam((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const [signatureName, setSignatureName] = useState('');
  const [medicalSignature, setMedicalSignature] = useState(null);

  //Riwayat penyakit lalu
  const [historyIllness, setHistoryIllness] = useState(false);
  const [illnessDescription, setIllnessDescription] = useState('');

  // Pernah di rawat State untuk menyimpan pilihan radio button
  const [hospitalization, setHospitalization] = useState("");

  // State untuk menyimpan detail jika "Ya" dipilih
  const [hospitalizationDetails, setHospitalizationDetails] = useState({
    diagnosis: "",
    when: "",
    where: "",
  });

  // Posisi hasil untuk setiap pilihan
  const [hospitalizationPositions, setHospitalizationPositions] = useState({
    tidak: { left: "272px", top: "-2456px" },
    ya: { left: "320px", top: "-2456px" },
  });

  // Handler untuk mengubah status radio button
  const handleHospitalizationChange = (event) => {
    const { value } = event.target;
    setHospitalization(value);

    // Reset detail jika "Tidak" dipilih
    if (value === "tidak") {
      setHospitalizationDetails({ diagnosis: "", when: "", where: "" });
    }
  };

  // Fungsi baru untuk mengubah rincian rawat inap
  const updateHospitalizationDetails = (field, value) => {
    setHospitalizationDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };


  //riwayat operasi
  const [surgeryHistory, setSurgeryHistory] = useState(false); // State for surgery history
  const [surgeryDescription, setSurgeryDescription] = useState(''); // State for surgery description
  const [surgeryDate, setSurgeryDate] = useState(''); // State for surgery date
  const [surgeryLocation, setSurgeryLocation] = useState(''); // State for surgery location


  // Riwayat Pengbatan State untuk menyimpan pilihan radio button
  const [recoveryStatus, setRecoveryStatus] = useState("");

  // State untuk menyimpan detail jika "Ya" dipilih
  const [recoveryDetails, setRecoveryDetails] = useState("");

  // Posisi untuk setiap hasil
  const recoveryPositions = {
    tidak: { left: "272px", top: "-2418px" },
    ya: { left: "410px", top: "-2414x" },
    details: { left: "370px", top: "-2414px" },
  };

  // Handler untuk mengubah status radio button
  const handleRecoveryStatusChange = (event) => {
    const { value } = event.target;
    setRecoveryStatus(value);

    // Reset detail jika "Tidak" dipilih
    if (value === "tidak") {
      setRecoveryDetails("");
    }
  };

  // Handler untuk mengubah rincian proses penyembuhan
  const updateRecoveryDetails = (event) => {
    setRecoveryDetails(event.target.value);
  };

  const [familyHistory, setFamilyHistory] = useState(false); // State to manage radio selection
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const result1 = score1 === 1 ? '1' : '0';
  const result2 = score2 === 1 ? '1' : '0';

  const [weightLossScore, setWeightLossScore] = useState(0);  // Skor Penurunan Berat Badan
  const [appetiteScore, setAppetiteScore] = useState(0);  // Skor Nafsu Makan

  // Menghitung Total Skor Skrining Gizi
  const totalNutritionScore = weightLossScore + appetiteScore;

  // State untuk Skor Skrining Gizi Anak
  const [diseaseRiskScore, setDiseaseRiskScore] = useState(0); // Form 1
  const [malnutritionStatusScore, setMalnutritionStatusScore] = useState(0); // Form 2
  const [nutritionConditionsScore, setNutritionConditionsScore] = useState(0); // Form 3
  const [weightChangeScore, setWeightChangeScore] = useState(0); // Form 4

  // Menghitung Total Skor Skrining Gizi Anak
  const totalChildNutritionScore = diseaseRiskScore + malnutritionStatusScore + nutritionConditionsScore + weightChangeScore;


  // Menghitung total skor
  const totalScore = score1 + score2;

  const [familyDiseases, setFamilyDiseases] = useState({
    tidak: false,
    ya: false,
    hipertensi: false,
    jantung: false,
    paru: false,
    dm: false,
    ginjal: false,
    lainnya: false,
  });

  // Riwayat Penyakit keluarga Menyimpan posisi (left, top) untuk setiap hasil yang dipilih
  const [familyDiseasePositions, setFamilyDiseasePositions] = useState({
    tidak: { left: '118px', top: '610px' },
    ya: { left: '212px', top: '610px' },
    hipertensi: { left: '250px', top: '610px' },
    jantung: { left: '340px', top: '610px' },
    paru: { left: '418px', top: '610px' },
    dm: { left: '478px', top: '610px' },
    ginjal: { left: '538px', top: '610px' },
    lainnya: { left: '610px', top: '610px' },
  });

  // Handler untuk mengubah nilai checkbox
  const handleDiseaseChange = (event) => {
    const { name, checked } = event.target;
    setFamilyDiseases((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  // Menyimpan status pilihan (bisa memilih lebih dari satu)
  const [dependencies, setDependencies] = useState({
    tidak: false,
    ya: false,
    "obat-obatan": false,
    rokok: false,
    alkohol: false,
    lainnya: false,
  });

  // Menyimpan rincian jika memilih "lainnya"
  const [dependencyDetails, setDependencyDetails] = useState("");

  // Menyimpan posisi (left, top) untuk setiap pilihan
  const [dependencyPositions, setDependencyPositions] = useState({
    tidak: { left: "114px", top: "-2360px" },
    ya: { left: "210px", top: "-2360px" },
    "obat-obatan": { left: "298px", top: "-2360px" },
    rokok: { left: "420px", top: "-2360px" },
    alkohol: { left: "494px", top: "-2360px" },
    lainnya: { left: "516px", top: "-2360px" },
    dependencyDetails: { left: "578px", top: "-2360px" },
  });

  // Handler untuk mengubah status checkbox
  const handleDependencyChange = (event) => {
    const { name, checked } = event.target;
    setDependencies((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  // Handler untuk rincian "lainnya"
  const handleDetailsChange = (event) => {
    setDependencyDetails(event.target.value);
  };

  // Menyimpan status radio button (apakah dipilih atau tidak)
  const [employmentHistory, setEmploymentHistory] = useState("");

  // Menyimpan rincian pekerjaan jika "Ya" dipilih
  const [employmentDetails, setEmploymentDetails] = useState("");

  //pekerjaan Menyimpan posisi (left, top) untuk setiap pilihan dan teks rincian pekerjaan
  const [employmentPositions, setEmploymentPositions] = useState({
    tidak: { left: "130px", top: "-2326px" },
    ya: { left: "200px", top: "-2326px" },
    employmentDetails: { left: "220px", top: "-2326px" }, // Posisi untuk teks detail
  });

  // Handler untuk mengubah status radio button
  const handleEmploymentChange = (event) => {
    const { value } = event.target;
    setEmploymentHistory(value);

    // Reset employment details jika "Tidak" dipilih
    if (value === "tidak") {
      setEmploymentDetails("");
    }
  };

  // Handler untuk rincian pekerjaan
  const handleEmploymentDetailsChange = (event) => {
    setEmploymentDetails(event.target.value);
  };


  // State untuk menyimpan pilihan radio button
  const [allergyHistory, setAllergyHistory] = useState("");

  // State untuk menyimpan detail jika "Ya" dipilih
  const [allergyDetails, setAllergyDetails] = useState({
    obat: "",
    makanan: "",
    lainnya: "",
  });

  // Menyimpan posisi (left, top) untuk setiap hasil
  const [allergyPositions, setAllergyPositions] = useState({
    tidak: { left: "196px", top: "-2310px" },
    ya: { left: "240px", top: "-2310px" },
    obat: { left: "292px", top: "-2310px" }, // Posisi untuk detail obat
    makanan: { left: "480px", top: "-2310px" }, // Posisi untuk detail makanan
    lainnya: { left: "625px", top: "-2310px" }, // Posisi untuk detail lainnya
  });

  // Handler untuk mengubah status radio button
  const handleAllergyChange = (event) => {
    const { value } = event.target;
    setAllergyHistory(value);

    // Reset semua detail jika "Tidak" dipilih
    if (value === "tidak") {
      setAllergyDetails({ obat: "", makanan: "", lainnya: "" });
    }
  };

  // Handler untuk mengubah rincian alergi
  const handleAllergyDetailsChange = (type, event) => {
    setAllergyDetails((prevDetails) => ({
      ...prevDetails,
      [type]: event.target.value,
    }));
  };

  // Handler untuk mengubah posisi (left dan top) dari masing-masing hasil
  const handlePositionChange = (key, field, value) => {
    setAllergyPositions((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: `${value}px`,
      },
    }));
  };

  // State untuk menyimpan pilihan radio button
  const [medicationHistory, setMedicationHistory] = useState("");

  // State untuk menyimpan detail jika "Ya" dipilih
  const [medicationDetails, setMedicationDetails] = useState("");

  // Posisi untuk setiap hasil
  const medicationPositions = {
    tidak: { left: "118px", top: "-2282px" },
    ya: { left: "195px", top: "-2282px" },
    details: { left: "300px", top: "-2282px" },
  };

  // Handler untuk mengubah status radio button
  const handleMedicationHistoryChange = (event) => {
    const { value } = event.target;
    setMedicationHistory(value);

    // Reset detail jika "Tidak" dipilih
    if (value === "tidak") {
      setMedicationDetails("");
    }
  };

  // Handler untuk mengubah rincian pemakaian obat
  const updateMedicationDetails = (event) => {
    setMedicationDetails(event.target.value);
  };

  // State untuk menyimpan riwayat psikologi
  const [psychologyHistory, setPsychologyHistory] = useState(null);

  // State untuk posisi
  const [historyPositions, setHistoryPositions] = useState({
    cemas: { left: '114px', top: '-2218px' },
    takut: { left: '204px', top: '-2218px' },
    sedih: { left: '284px', top: '-2218px' },
  });

  // Fungsi untuk menangani perubahan radio button
  const handlePsychologyChange = (emotion) => {
    setPsychologyHistory(emotion);
  };


  // State untuk menyimpan status hubungan keluarga
  const [relationshipStatus, setRelationshipStatus] = useState(null);

  // State untuk posisi
  const [statusPositions, setStatusPositions] = useState({
    tidakBaik: { left: '350px', top: '-2176px' },
    baikKerabat: { left: '430px', top: '-2176px' },
  });

  // Fungsi untuk menangani perubahan pilihan radio button
  const handleStatusChange = (status) => {
    setRelationshipStatus(status);
  };

  // State untuk menyimpan input
  const [contactDetails, setContactDetails] = useState({
    name: "",
    relation: "",
    phone: "",
  });

  // State untuk menyimpan posisi (left, top) dari hasil
  const [contactPositions, setContactPositions] = useState({
    name: { left: "164px", top: "-2128px" },
    relation: { left: "338px", top: "-2128px" },
    phone: { left: "510px", top: "-2128px" },
  });

  // Handler untuk mengubah input
  const updateContactInput = (field, value) => {
    setContactDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handler untuk mengubah posisi (left, top)
  const updateContactPosition = (field, axis, value) => {
    setContactPositions((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        [axis]: `${value}px`,
      },
    }));
  };

  // State untuk menyimpan input aktivitas keagamaan
  const [religiousActivity, setReligiousActivity] = useState("");

  // State untuk posisi hasil
  const [activityPosition, setActivityPosition] = useState({
    left: "358px",
    top: "-2100px",
  });

  // Handler untuk mengubah input aktivitas keagamaan
  const handleActivityChange = (value) => {
    setReligiousActivity(value);
  };

  // Handler untuk mengubah posisi hasil
  const handleActivityPositionChange = (axis, value) => {
    setActivityPosition((prev) => ({
      ...prev,
      [axis]: `${value}px`,
    }));
  };


  // State untuk menyimpan status checkbox
  const [selectedNeeds, setSelectedNeeds] = useState({
    tidak: false,
    ya: false,
    pendengaran: false,
    penglihatan: false,
    kognitif: false,
    fisik: false,
    budaya: false,
    emosi: false,
    bahasa: false,
    lainnya: false,
  });

  // State untuk posisi hasil
  const [needsPositions, setNeedsPositions] = useState({
    tidak: { left: "90px", top: "-2030px" },
    ya: { left: "168px", top: "-2030px" },
    pendengaran: { left: "272px", top: "-2030px" },
    penglihatan: { left: "390px", top: "-2030px" },
    kognitif: { left: "508px", top: "-2030px" },
    fisik: { left: "606px", top: "-2030px" },
    budaya: { left: "272px", top: "-2010px" },
    emosi: { left: "390px", top: "-2010px" },
    bahasa: { left: "508px", top: "-2010px" },
    lainnya: { left: "606px", top: "-2010px" },
  });

  // Handler untuk mengubah status checkbox
  const handleNeedsChange = (event) => {
    const { name, checked } = event.target;
    setSelectedNeeds((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  // Handler untuk mengubah posisi hasil
  const updatePosition = (key, axis, value) => {
    setNeedsPositions((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [axis]: `${value}px`,
      },
    }));
  };

  // State untuk menyimpan pilihan radio button
  const [translatorNeeded, setTranslatorNeeded] = useState("");

  // State untuk menyimpan detail jika "Iya" dipilih
  const [translatorDetails, setTranslatorDetails] = useState("");

  // State untuk mengatur posisi hasil
  const [translatorPositions, setTranslatorPositions] = useState({
    tidak: { left: "272px", top: "-1996px" },
    iya: { left: "362px", top: "-1996px" },
  });

  // Handler untuk mengubah status radio button
  const handleTranslatorChange = (event) => {
    const { value } = event.target;
    setTranslatorNeeded(value);

    // Reset detail jika "Tidak" dipilih
    if (value === "tidak") {
      setTranslatorDetails("");
    }
  };

  // Handler untuk mengubah rincian penerjemah
  const handleTranslatorDetailsChange = (event) => {
    setTranslatorDetails(event.target.value);
  };

  // Handler untuk mengatur posisi hasil
  const adjustPosition = (key, axis, value) => {
    setTranslatorPositions((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [axis]: `${value}px`,
      },
    }));
  };


  // State untuk menyimpan pilihan radio button
  const [signLanguageNeeded, setSignLanguageNeeded] = useState("");

  // State untuk mengatur posisi hasil
  const [signLanguagePositions, setSignLanguagePositions] = useState({
    tidak: { left: "620px", top: "-1996px" },
    iya: { left: "722px", top: "-1996px" },
  });

  // Handler untuk mengubah pilihan radio button
  const handleSignLanguageChange = (event) => {
    setSignLanguageNeeded(event.target.value);
  };

  // Handler untuk mengatur posisi hasil
  const adjustSignLanguagePosition = (key, axis, value) => {
    setSignLanguagePositions((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [axis]: `${value}px`,
      },
    }));
  };


  // State untuk menyimpan pilihan tindakan keperawatan
  const [nursingAction, setNursingAction] = useState("");

  // State untuk detail jika "Lain-lain" dipilih
  const [nursingActionDetails, setNursingActionDetails] = useState("");

  // State untuk mengatur posisi hasil
  const [actionPositions, setActionPositions] = useState({
    rehabilitasi: { left: "358px", top: "-1960px" },
    managementNyeri: { left: "540px", top: "-1960px" },
    lainLain: { left: "96px", top: "-1946px" },
  });

  // Handler untuk mengubah pilihan tindakan keperawatan
  const handleActionChange = (event) => {
    const { value } = event.target;
    setNursingAction(value);

    // Reset detail jika pilihan bukan "Lain-lain"
    if (value !== "lainLain") {
      setNursingActionDetails("");
    }
  };

  // Ganti nama fungsi untuk mengubah detail
  const updateActionDetails = (event) => {
    setNursingActionDetails(event.target.value);
  };

  // Handler untuk mengatur posisi hasil
  const adjustActionPosition = (key, axis, value) => {
    setActionPositions((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [axis]: `${value}px`,
      },
    }));
  };



  // State untuk menyimpan pilihan MST
  const [mstSelection, setMstSelection] = useState([]);
  const [otherDetails, setOtherDetails] = useState("");

  // State untuk mengatur posisi hasil
  const [mstPositions, setMstPositions] = useState({
    tidak: { left: "310px", top: "-1096px" },
    ya: { left: "372px", top: "-1096px" },
    dm: { left: "460px", top: "-1096px" },
    ginjal: { left: "518px", top: "-1096px" },
    hi: { left: "566px", top: "-1096px" },
    jantung: { left: "116px", top: "-1078px" },
    paru: { left: "168px", top: "-1056px" },
    stroke: { left: "224px", top: "-1056px" },
    kanker: { left: "286px", top: "-1056px" },
    imunitas: { left: "430px", top: "-1056px" },
    geriatri: { left: "490px", top: "-1056px" },
    lainnya: { left: "142px", top: "-1036px" },
  });

  // Handler untuk mengubah pilihan
  const handleSelectionChange = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      setMstSelection((prev) => [...prev, value]);
    } else {
      setMstSelection((prev) => prev.filter((item) => item !== value));
    }

    // Reset detail jika "lainnya" tidak dipilih
    if (value === "lainnya" && !checked) {
      setOtherDetails("");
    }
  };

  // Handler untuk mengubah rincian lainnya
  const updateOtherDetails = (event) => {
    setOtherDetails(event.target.value);
  };

  // Handler untuk mengatur posisi hasil
  const updateMstPosition = (key, axis, value) => {
    setMstPositions((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [axis]: `${value}px`,
      },
    }));
  };

  // State untuk menyimpan pilihan Strong Kids
  // State untuk menyimpan pilihan Strong Kids
  const [strongKidsSelection, setStrongKidsSelection] = useState([]);
  const [otherStrongKidsDetails, setOtherStrongKidsDetails] = useState("");

  // State untuk mengatur posisi hasil
  const [strongKidsPositions, setStrongKidsPositions] = useState({
    tidak: { left: "310px", top: "-598px" },
    ya: { left: "372px", top: "-598px" },
    dm: { left: "460px", top: "-598px" },
    ginjal: { left: "518px", top: "-598px" },
    hi: { left: "566px", top: "-598px" },
    jantung: { left: "118px", top: "-582px" },
    paru: { left: "168px", top: "-564px" },
    stroke: { left: "224px", top: "-564px" },
    kanker: { left: "286px", top: "-564px" },
    imunitas: { left: "430px", top: "-564px" },
    geriatri: { left: "490px", top: "-564px" },
    lainnya: { left: "142px", top: "-548px" },
  });

  // Handler untuk mengubah pilihan
  const handleStrongKidsSelectionChange = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      setStrongKidsSelection((prev) => [...prev, value]);
    } else {
      setStrongKidsSelection((prev) => prev.filter((item) => item !== value));
    }

    // Reset detail jika "lainnya" tidak dipilih
    if (value === "lainnya" && !checked) {
      setOtherStrongKidsDetails("");
    }
  };

  // Handler untuk mengubah rincian lainnya
  const handleStrongKidsOtherDetailsChange = (event) => {
    setOtherStrongKidsDetails(event.target.value);
  };

  // Handler untuk mengatur posisi hasil
  const adjustPositionStrongKids = (key, axis, value) => {
    setStrongKidsPositions((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [axis]: `${value}px`,
      },
    }));
  };



  // State untuk menyimpan nilai pilihan dan status
  const [isPain, setIsPain] = useState(false); // Menyimpan apakah pasien merasakan nyeri
  const [painScale, setPainScale] = useState(0); // Skala nyeri 0-10
  const [painLocation, setPainLocation] = useState(''); // Lokasi nyeri
  const [painFrequency, setPainFrequency] = useState(''); // Frekuensi nyeri
  const [painDuration, setPainDuration] = useState(''); // Durasi nyeri

  // State untuk menyimpan status pilihan relief
  const [selectedReliefs, setSelectedReliefs] = useState({
    minumObat: false,
    istirahat: false,
    mendengarMusik: false,
    berubahPosisi: false,
  });

  // State untuk posisi tiap relief
  const [positions, setPositions] = useState({
    minumObat: { left: '92px', top: '-1542px' },
    istirahat: { left: '238px', top: '-1542px' },
    mendengarMusik: { left: '356px', top: '-1542px' },
    berubahPosisi: { left: '542px', top: '-1542px' },
  });

  // Fungsi untuk menangani perubahan checkbox
  const handleReliefChange = (relief) => {
    setSelectedReliefs((prev) => ({
      ...prev,
      [relief]: !prev[relief],  // Toggle status relief
    }));
  };


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


  let riskLevel;
  if (totalScore === 0) {
    riskLevel = 'Tidak Berisiko';
  } else if (totalScore === 1) {
    riskLevel = 'Risiko Sedang';
  } else if (totalScore === 2) {
    riskLevel = 'Risiko Tinggi';
  }

  // Menentukan Status Risiko Berdasarkan Total Skor
  let nutritionRiskLevel;
  if (totalNutritionScore === 0) {
    nutritionRiskLevel = 'Tidak Berisiko';
  } else if (totalNutritionScore === 1) {
    nutritionRiskLevel = 'Risiko Sedang';
  } else if (totalNutritionScore === 2) {
    nutritionRiskLevel = 'Risiko Tinggi';
  } else if (totalNutritionScore === 3) {
    nutritionRiskLevel = 'Risiko Sangat Tinggi';
  }

  // Menentukan Status Risiko Berdasarkan Total Skor
  let childNutritionRiskLevel;
  if (totalChildNutritionScore <= 2) {
    childNutritionRiskLevel = 'Tidak Berisiko';
  } else if (totalChildNutritionScore <= 4) {
    childNutritionRiskLevel = 'Risiko Sedang';
  } else if (totalChildNutritionScore <= 6) {
    childNutritionRiskLevel = 'Risiko Tinggi';
  } else {
    childNutritionRiskLevel = 'Risiko Sangat Tinggi';
  }

  // Menentukan kategori nyeri berdasarkan angka yang dipilih
  let painCategory = '';
  if (painScale >= 1 && painScale <= 3) {
    painCategory = 'Nyeri Ringan';
  } else if (painScale >= 4 && painScale <= 7) {
    painCategory = 'Nyeri Sedang';
  } else if (painScale >= 8 && painScale <= 10) {
    painCategory = 'Nyeri Berat';
  }

  return (
    <div className="ass-container">
      <form className="ass-form">
        <h3 className="centered-heading">Form - Assesment Pasien Rawat Jalan -</h3>
        {/* Basic Patient Information */}
        <label className="cppt-form__label">Nomor RM:
          <input type="text" className="cppt-form__input" value={nomorRM} onChange={e => setNomorRM(e.target.value)} />
        </label>
        <label className="cppt-form__label">Nama Pasien:
          <input type="text" className="cppt-form__input" value={patientName} onChange={e => setPatientName(e.target.value)} />
        </label>
        <label className="cppt-form__label">Usia / JK:
          <input type="text" className="cppt-form__input" value={ageGender} onChange={e => setAgeGender(e.target.value)} />
        </label>
        <label className="cppt-form__label">Alamat 1:
          <input type="text" className="cppt-form__input" value={address1} onChange={e => setAddress1(e.target.value)} />
        </label>
        <h4>Jenis Kelamin</h4>
        <div>
          {/* Radio button untuk Laki Laki */}
          <label>
            <input
              type="radio"
              name="gender"
              checked={selectedGender === 'lakiLaki'}
              onChange={() => handleGenderChange('lakiLaki')}
            />
            Laki Laki
          </label>
          {/* Radio button untuk Perempuan */}
          <label>
            <input
              type="radio"
              name="gender"
              checked={selectedGender === 'perempuan'}
              onChange={() => handleGenderChange('perempuan')}
            />
            Perempuan
          </label>
        </div>

        <label className="cppt-form__label">Tanggal:
          <input type="datetime-local" className="cppt-form__input" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} />
        </label>

        <h4>Form Keluhan Utama</h4>

        {/* Input Keluhan Utama */}
        <div style={{ marginBottom: "10px" }}>
          <label>
            Keluhan Utama:
            <input
              type="text"
              value={mainComplaint}
              onChange={handleComplaintChange}
              placeholder="Masukkan keluhan utama"
              style={{
                display: "block",
                marginTop: "5px",
                padding: "5px",
                fontSize: "14px",
                width: "300px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </label>
        </div>

        <h4>Form Ruangan</h4>

        {/* Input Ruangan */}
        <div style={{ marginBottom: "10px" }}>
          <label>
            Ruangan:
            <input
              type="text"
              value={room}
              onChange={handleRoomChange}
              placeholder="Masukkan ruangan"
              style={{
                display: "block",
                marginTop: "5px",
                padding: "5px",
                fontSize: "14px",
                width: "300px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </label>
        </div>

        <h4>Form Sumber Data</h4>

        {/* Radio Button untuk pilihan sumber data */}
        <div style={{ marginBottom: "10px" }}>
          <label>
            <input
              type="radio"
              name="dataSource"
              value="pasien"
              checked={dataSource === "pasien"}
              onChange={handleDataSourceChange}
            />
            Pasien
          </label>
          <label style={{ marginLeft: "15px" }}>
            <input
              type="radio"
              name="dataSource"
              value="keluarga"
              checked={dataSource === "keluarga"}
              onChange={handleDataSourceChange}
            />
            Keluarga
          </label>
          <label style={{ marginLeft: "15px" }}>
            <input
              type="radio"
              name="dataSource"
              value="lainnya"
              checked={dataSource === "lainnya"}
              onChange={handleDataSourceChange}
            />
            Lainnya
          </label>
        </div>

        <h4>Form Pemeriksaan Fisik</h4>

        {/* Form Input untuk Pemeriksaan Fisik */}
        <div style={{ marginBottom: "20px" }}>
          <label>
            BB (Berat Badan):
            <input
              type="text"
              value={physicalExam.bb}
              onChange={(e) => handleInputChange("bb", e.target.value)}
              placeholder="Masukkan BB"
              style={{
                display: "block",
                marginTop: "5px",
                padding: "5px",
                fontSize: "14px",
                width: "300px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </label>

          <label style={{ marginTop: "10px", display: "block" }}>
            TB (Tinggi Badan):
            <input
              type="text"
              value={physicalExam.tb}
              onChange={(e) => handleInputChange("tb", e.target.value)}
              placeholder="Masukkan TB"
              style={{
                display: "block",
                marginTop: "5px",
                padding: "5px",
                fontSize: "14px",
                width: "300px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </label>

          <label style={{ marginTop: "10px", display: "block" }}>
            TD (Tekanan Darah):
            <input
              type="text"
              value={physicalExam.td}
              onChange={(e) => handleInputChange("td", e.target.value)}
              placeholder="Masukkan TD"
              style={{
                display: "block",
                marginTop: "5px",
                padding: "5px",
                fontSize: "14px",
                width: "300px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </label>

          <label style={{ marginTop: "10px", display: "block" }}>
            SB (Suhu Badan):
            <input
              type="text"
              value={physicalExam.sb}
              onChange={(e) => handleInputChange("sb", e.target.value)}
              placeholder="Masukkan SB"
              style={{
                display: "block",
                marginTop: "5px",
                padding: "5px",
                fontSize: "14px",
                width: "300px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </label>

          <label style={{ marginTop: "10px", display: "block" }}>
            RR (Respirasi Rate):
            <input
              type="text"
              value={physicalExam.rr}
              onChange={(e) => handleInputChange("rr", e.target.value)}
              placeholder="Masukkan RR"
              style={{
                display: "block",
                marginTop: "5px",
                padding: "5px",
                fontSize: "14px",
                width: "300px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </label>

          <label style={{ marginTop: "10px", display: "block" }}>
            Nadi:
            <input
              type="text"
              value={physicalExam.nadi}
              onChange={(e) => handleInputChange("nadi", e.target.value)}
              placeholder="Masukkan Nadi"
              style={{
                display: "block",
                marginTop: "5px",
                padding: "5px",
                fontSize: "14px",
                width: "300px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </label>
        </div>


        {/* Input untuk "Lainnya" */}
        {dataSource === "lainnya" && (
          <div style={{ marginBottom: "10px" }}>
            <input
              type="text"
              value={otherSource}
              onChange={handleOtherSourceChange}
              placeholder="Siapa sumber datanya?"
              style={{
                display: "block",
                marginTop: "5px",
                padding: "5px",
                fontSize: "14px",
                width: "300px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </div>
        )}


        {/* Medical History Section */}
        <h4>3a. Riwayat Penyakit Lalu</h4>
        <label>
          <input
            type="radio"
            checked={!historyIllness}
            onChange={() => {
              setHistoryIllness(false);
              setIllnessDescription(''); // Clear illness description when "Tidak" is selected
            }}
          />
          {historyIllness ? 'Tidak' : '✔️ Tidak ada penyakit masa lalu'}
        </label>
        <label>
          <input
            type="radio"
            checked={historyIllness}
            onChange={() => setHistoryIllness(true)}
          />
          {historyIllness ? '✔️ Ya' : 'Ya'}
        </label>
        {historyIllness && (
          <input
            type="text"
            className="cppt-form__input"
            placeholder="Penyakit apa?"
            value={illnessDescription}
            onChange={(e) => setIllnessDescription(e.target.value)}
          />
        )}

        <h4>Pernah Dirawat?</h4>
        <div>
          {/* Radio Button Tidak */}
          <label>
            <input
              type="radio"
              name="hospitalization"
              value="tidak"
              checked={hospitalization === "tidak"}
              onChange={handleHospitalizationChange}
            />
            Tidak
          </label>

          {/* Radio Button Ya */}
          <label style={{ marginLeft: "10px" }}>
            <input
              type="radio"
              name="hospitalization"
              value="ya"
              checked={hospitalization === "ya"}
              onChange={handleHospitalizationChange}
            />
            Ya
          </label>
        </div>

        {/* Tampilkan input jika "Ya" dipilih */}
        {hospitalization === "ya" && (
          <div style={{ marginTop: "10px" }}>
            <input
              type="text"
              value={hospitalizationDetails.diagnosis}
              onChange={(e) =>
                updateHospitalizationDetails("diagnosis", e.target.value)
              }
              placeholder="Diagnosa?"
              style={{
                display: "block",
                marginBottom: "10px",
                padding: "5px",
                fontSize: "14px",
                width: "300px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
            <input
              type="text"
              value={hospitalizationDetails.when}
              onChange={(e) =>
                updateHospitalizationDetails("when", e.target.value)
              }
              placeholder="Kapan?"
              style={{
                display: "block",
                marginBottom: "10px",
                padding: "5px",
                fontSize: "14px",
                width: "300px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
            <input
              type="text"
              value={hospitalizationDetails.where}
              onChange={(e) =>
                updateHospitalizationDetails("where", e.target.value)
              }
              placeholder="Di mana?"
              style={{
                display: "block",
                marginBottom: "10px",
                padding: "5px",
                fontSize: "14px",
                width: "300px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </div>
        )}


        <h4>3b. Pernah di Operasi</h4>
        <label>
          <input
            type="radio"
            checked={!surgeryHistory}
            onChange={() => {
              setSurgeryHistory(false);
              setSurgeryDescription(''); // Clear surgery description when "Tidak" is selected
              setSurgeryDate('');
              setSurgeryLocation('');
            }}
          />
          {surgeryHistory ? 'Tidak' : '✔️ Tidak ada operasi sebelumnya'}
        </label>
        <label>
          <input
            type="radio"
            checked={surgeryHistory}
            onChange={() => setSurgeryHistory(true)}
          />
          {surgeryHistory ? '✔️ Ya' : 'Ya'}
        </label>
        {surgeryHistory && (
          <>
            <input
              type="text"
              className="cppt-form__input"
              placeholder="Diagnosa?"
              value={surgeryDescription}
              onChange={(e) => setSurgeryDescription(e.target.value)}
            />
            <input
              type="text"
              className="cppt-form__input"
              placeholder="Kapan?"
              value={surgeryDate}
              onChange={(e) => setSurgeryDate(e.target.value)}
            />
            <input
              type="text"
              className="cppt-form__input"
              placeholder="Di mana?"
              value={surgeryLocation}
              onChange={(e) => setSurgeryLocation(e.target.value)}
            />
          </>
        )}

        <h4>Masih Dalam Proses Penyembuhan?</h4>
        <div>
          {/* Radio Button Tidak */}
          <label>
            <input
              type="radio"
              name="recoveryStatus"
              value="tidak"
              checked={recoveryStatus === "tidak"}
              onChange={handleRecoveryStatusChange}
            />
            Tidak
          </label>

          {/* Radio Button Ya */}
          <label>
            <input
              type="radio"
              name="recoveryStatus"
              value="ya"
              checked={recoveryStatus === "ya"}
              onChange={handleRecoveryStatusChange}
            />
            Ya
          </label>
        </div>

        {/* Tampilkan input hanya jika "Ya" dipilih */}
        {recoveryStatus === "ya" && (
          <div style={{ marginTop: "10px" }}>
            <input
              type="text"
              value={recoveryDetails}
              onChange={updateRecoveryDetails}
              placeholder="Sebutkan?"
              style={{
                padding: "5px",
                fontSize: "14px",
                width: "300px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </div>
        )}

        <h4>3c. Riwayat Keluarga</h4>
        <div>
          {/* Checkbox untuk Tidak */}
          <label>
            <input
              type="checkbox"
              name="tidak"
              checked={familyDiseases.tidak}
              onChange={handleDiseaseChange}
            />
            Tidak
          </label>

          {/* Checkbox untuk Ya */}
          <label>
            <input
              type="checkbox"
              name="ya"
              checked={familyDiseases.ya}
              onChange={handleDiseaseChange}
            />
            Ya
          </label>

          {/* Checkbox untuk Hipertensi */}
          <label>
            <input
              type="checkbox"
              name="hipertensi"
              checked={familyDiseases.hipertensi}
              onChange={handleDiseaseChange}
            />
            Hipertensi
          </label>

          {/* Checkbox untuk Jantung */}
          <label>
            <input
              type="checkbox"
              name="jantung"
              checked={familyDiseases.jantung}
              onChange={handleDiseaseChange}
            />
            Jantung
          </label>

          {/* Checkbox untuk Paru */}
          <label>
            <input
              type="checkbox"
              name="paru"
              checked={familyDiseases.paru}
              onChange={handleDiseaseChange}
            />
            Paru
          </label>

          {/* Checkbox untuk DM (Diabetes Melitus) */}
          <label>
            <input
              type="checkbox"
              name="dm"
              checked={familyDiseases.dm}
              onChange={handleDiseaseChange}
            />
            DM (Diabetes Melitus)
          </label>

          {/* Checkbox untuk Ginjal */}
          <label>
            <input
              type="checkbox"
              name="ginjal"
              checked={familyDiseases.ginjal}
              onChange={handleDiseaseChange}
            />
            Ginjal
          </label>

          {/* Checkbox untuk Lainnya */}
          <label>
            <input
              type="checkbox"
              name="lainnya"
              checked={familyDiseases.lainnya}
              onChange={handleDiseaseChange}
            />
            Lainnya
          </label>
        </div>

        <h4>Ketergantungan Pada</h4>
        <div>
          {/* Checkbox untuk Tidak */}
          <label>
            <input
              type="checkbox"
              name="tidak"
              checked={dependencies.tidak}
              onChange={handleDependencyChange}
            />
            Tidak
          </label>

          {/* Checkbox untuk Ya */}
          <label>
            <input
              type="checkbox"
              name="ya"
              checked={dependencies.ya}
              onChange={handleDependencyChange}
            />
            Ya
          </label>

          {/* Checkbox untuk Obat-obatan */}
          <label>
            <input
              type="checkbox"
              name="obat-obatan"
              checked={dependencies["obat-obatan"]}
              onChange={handleDependencyChange}
            />
            Obat-obatan
          </label>

          {/* Checkbox untuk Rokok */}
          <label>
            <input
              type="checkbox"
              name="rokok"
              checked={dependencies.rokok}
              onChange={handleDependencyChange}
            />
            Rokok
          </label>

          {/* Checkbox untuk Alkohol */}
          <label>
            <input
              type="checkbox"
              name="alkohol"
              checked={dependencies.alkohol}
              onChange={handleDependencyChange}
            />
            Alkohol
          </label>

          {/* Checkbox untuk Lainnya */}
          <label>
            <input
              type="checkbox"
              name="lainnya"
              checked={dependencies.lainnya}
              onChange={handleDependencyChange}
            />
            Lainnya
          </label>
        </div>

        {/* Menampilkan form input jika "lainnya" dipilih */}
        {dependencies.lainnya && (
          <div style={{ marginTop: "20px" }}>
            <label>
              Ketergantungan terhadap apa?
              <input
                type="text"
                value={dependencyDetails}
                onChange={handleDetailsChange}
                placeholder="Masukkan rincian"
                style={{
                  display: "block",
                  marginTop: "10px",
                  padding: "5px",
                  fontSize: "14px",
                }}
              />
            </label>
          </div>
        )}

        <h4>Riwayat Pekerjaan</h4>
        <div>
          {/* Radio Button Tidak */}
          <label>
            <input
              type="radio"
              name="employmentHistory"
              value="tidak"
              checked={employmentHistory === "tidak"}
              onChange={handleEmploymentChange}
            />
            Tidak
          </label>

          {/* Radio Button Ya */}
          <label>
            <input
              type="radio"
              name="employmentHistory"
              value="ya"
              checked={employmentHistory === "ya"}
              onChange={handleEmploymentChange}
            />
            Ya
          </label>
        </div>

        {/* Tampilkan input hanya jika "Ya" dipilih */}
        {employmentHistory === "ya" && (
          <div style={{ marginTop: "10px" }}>
            <label>
              Sebutkan?
              <input
                type="text"
                value={employmentDetails}
                onChange={handleEmploymentDetailsChange}
                placeholder="Sebutkan pekerjaan Anda"
                style={{
                  padding: "5px",
                  fontSize: "14px",
                  width: "300px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </label>
          </div>
        )}

        <h4>Riwayat Alergi</h4>
        <div>
          {/* Radio Button Tidak */}
          <label>
            <input
              type="radio"
              name="allergyHistory"
              value="tidak"
              checked={allergyHistory === "tidak"}
              onChange={handleAllergyChange}
            />
            Tidak
          </label>

          {/* Radio Button Ya */}
          <label>
            <input
              type="radio"
              name="allergyHistory"
              value="ya"
              checked={allergyHistory === "ya"}
              onChange={handleAllergyChange}
            />
            Ya
          </label>
        </div>

        {/* Tampilkan input hanya jika "Ya" dipilih */}
        {allergyHistory === "ya" && (
          <div style={{ marginTop: "10px" }}>
            <label>
              Obat
              <input
                type="text"
                value={allergyDetails.obat}
                onChange={(event) => handleAllergyDetailsChange("obat", event)}
                placeholder="Masukkan detail obat"
                style={{
                  display: "block",
                  marginTop: "5px",
                  padding: "5px",
                  fontSize: "14px",
                  width: "300px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </label>
            <label>
              Makanan
              <input
                type="text"
                value={allergyDetails.makanan}
                onChange={(event) => handleAllergyDetailsChange("makanan", event)}
                placeholder="Masukkan detail makanan"
                style={{
                  display: "block",
                  marginTop: "10px",
                  padding: "5px",
                  fontSize: "14px",
                  width: "300px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </label>
            <label>
              Lainnya
              <input
                type="text"
                value={allergyDetails.lainnya}
                onChange={(event) => handleAllergyDetailsChange("lainnya", event)}
                placeholder="Masukkan rincian lainnya"
                style={{
                  display: "block",
                  marginTop: "10px",
                  padding: "5px",
                  fontSize: "14px",
                  width: "300px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </label>
          </div>
        )}

        <h4>Riwayat Pemakaian Obat</h4>
        <div>
          {/* Radio Button Tidak */}
          <label>
            <input
              type="radio"
              name="medicationHistory"
              value="tidak"
              checked={medicationHistory === "tidak"}
              onChange={handleMedicationHistoryChange}
            />
            Tidak
          </label>

          {/* Radio Button Ya */}
          <label>
            <input
              type="radio"
              name="medicationHistory"
              value="ya"
              checked={medicationHistory === "ya"}
              onChange={handleMedicationHistoryChange}
            />
            Ya
          </label>
        </div>

        {/* Tampilkan input hanya jika "Ya" dipilih */}
        {medicationHistory === "ya" && (
          <div style={{ marginTop: "10px" }}>
            <input
              type="text"
              value={medicationDetails}
              onChange={updateMedicationDetails}
              placeholder="Sebutkan?"
              style={{
                padding: "5px",
                fontSize: "14px",
                width: "300px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </div>
        )}


        <h4>3d. Riwayat Psikologi</h4>
        <h4>Riwayat Psikologi</h4>
        <div>
          {/* Radio button untuk Cemas */}
          <label>
            <input
              type="radio"
              name="psychologyHistory"
              checked={psychologyHistory === 'cemas'}
              onChange={() => handlePsychologyChange('cemas')}
            />
            Cemas
          </label>
          {/* Radio button untuk Takut */}
          <label>
            <input
              type="radio"
              name="psychologyHistory"
              checked={psychologyHistory === 'takut'}
              onChange={() => handlePsychologyChange('takut')}
            />
            Takut
          </label>
          {/* Radio button untuk Sedih */}
          <label>
            <input
              type="radio"
              name="psychologyHistory"
              checked={psychologyHistory === 'sedih'}
              onChange={() => handlePsychologyChange('sedih')}
            />
            Sedih
          </label>
        </div>


        <h4>Status Sosial</h4>
        <div>
          {/* Radio button untuk Tidak Baik */}
          <label>
            <input
              type="radio"
              name="relationshipStatus"
              checked={relationshipStatus === 'tidakBaik'}
              onChange={() => handleStatusChange('tidakBaik')}
            />
            Tidak Baik
          </label>
          {/* Radio button untuk Baik Kerabat */}
          <label>
            <input
              type="radio"
              name="relationshipStatus"
              checked={relationshipStatus === 'baikKerabat'}
              onChange={() => handleStatusChange('baikKerabat')}
            />
            Baik Kerabat
          </label>
        </div>

        <h4>Kontak yang Dihubungi</h4>

        {/* Input Nama */}
        <div style={{ marginBottom: "10px" }}>
          <label>
            Nama:
            <input
              type="text"
              value={contactDetails.name}
              onChange={(e) => updateContactInput("name", e.target.value)}
              placeholder="Masukkan nama"
              style={{
                display: "block",
                marginTop: "5px",
                padding: "5px",
                fontSize: "14px",
                width: "300px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </label>
        </div>

        {/* Input Hubungan */}
        <div style={{ marginBottom: "10px" }}>
          <label>
            Hubungan:
            <input
              type="text"
              value={contactDetails.relation}
              onChange={(e) => updateContactInput("relation", e.target.value)}
              placeholder="Masukkan hubungan"
              style={{
                display: "block",
                marginTop: "5px",
                padding: "5px",
                fontSize: "14px",
                width: "300px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </label>
        </div>

        {/* Input No Telepon */}
        <div style={{ marginBottom: "10px" }}>
          <label>
            No Telepon:
            <input
              type="tel"
              value={contactDetails.phone}
              onChange={(e) => updateContactInput("phone", e.target.value)}
              placeholder="Masukkan no telepon"
              style={{
                display: "block",
                marginTop: "5px",
                padding: "5px",
                fontSize: "14px",
                width: "300px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </label>
        </div>

        <h4>Status Sosial</h4>

        {/* Input Aktivitas Keagamaan */}
        <div style={{ marginBottom: "10px" }}>
          <label>
            Aktivitas Keagamaan:
            <input
              type="text"
              value={religiousActivity}
              onChange={(e) => handleActivityChange(e.target.value)}
              placeholder="Masukkan aktivitas keagamaan"
              style={{
                display: "block",
                marginTop: "5px",
                padding: "5px",
                fontSize: "14px",
                width: "300px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </label>
        </div>

        <h3>Kebutuhan Komunikasi dan Edukasi</h3>
        <div>
          {/* Pilihan Checkbox */}
          {Object.keys(selectedNeeds).map((option) => (
            <label key={option} style={{ marginRight: "15px" }}>
              <input
                type="checkbox"
                name={option}
                checked={selectedNeeds[option]}
                onChange={handleNeedsChange}
              />
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </label>
          ))}
        </div>

        <h4>Dibutuhkan Penerjemah?</h4>
        <div>
          {/* Radio Button Tidak */}
          <label>
            <input
              type="radio"
              name="translatorNeeded"
              value="tidak"
              checked={translatorNeeded === "tidak"}
              onChange={handleTranslatorChange}
            />
            Tidak
          </label>

          {/* Radio Button Iya */}
          <label>
            <input
              type="radio"
              name="translatorNeeded"
              value="iya"
              checked={translatorNeeded === "iya"}
              onChange={handleTranslatorChange}
            />
            Iya
          </label>
        </div>

        {/* Tampilkan input jika "Iya" dipilih */}
        {translatorNeeded === "iya" && (
          <div style={{ marginTop: "10px" }}>
            <input
              type="text"
              value={translatorDetails}
              onChange={handleTranslatorDetailsChange}
              placeholder="Sebutkan?"
              style={{
                padding: "5px",
                fontSize: "14px",
                width: "300px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </div>
        )}


        <h4>Butuh Bahasa Isyarat?</h4>
        <div>
          {/* Radio Button Tidak */}
          <label>
            <input
              type="radio"
              name="signLanguageNeeded"
              value="tidak"
              checked={signLanguageNeeded === "tidak"}
              onChange={handleSignLanguageChange}
            />
            Tidak
          </label>

          {/* Radio Button Iya */}
          <label>
            <input
              type="radio"
              name="signLanguageNeeded"
              value="iya"
              checked={signLanguageNeeded === "iya"}
              onChange={handleSignLanguageChange}
            />
            Iya
          </label>
        </div>


        <h4>Tindakan Keperawatan?</h4>
        <div>
          {/* Radio Button Rehabilitasi */}
          <label>
            <input
              type="radio"
              name="nursingAction"
              value="rehabilitasi"
              checked={nursingAction === "rehabilitasi"}
              onChange={handleActionChange}
            />
            Rehabilitasi
          </label>

          {/* Radio Button Management Nyeri */}
          <label>
            <input
              type="radio"
              name="nursingAction"
              value="managementNyeri"
              checked={nursingAction === "managementNyeri"}
              onChange={handleActionChange}
            />
            Management Nyeri
          </label>

          {/* Radio Button Lain-lain */}
          <label>
            <input
              type="radio"
              name="nursingAction"
              value="lainLain"
              checked={nursingAction === "lainLain"}
              onChange={handleActionChange}
            />
            Lain-lain
          </label>
        </div>

        {/* Tampilkan input jika "Lain-lain" dipilih */}
        {nursingAction === "lainLain" && (
          <div style={{ marginTop: "10px" }}>
            <input
              type="text"
              value={nursingActionDetails}
              onChange={updateActionDetails}
              placeholder="Sebutkan?"
              style={{
                padding: "5px",
                fontSize: "14px",
                width: "300px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </div>
        )}


        <h2>Skrining Risiko Jatuh</h2>

        {/* Pertanyaan 1 */}
        <div className="form-question">
          <p>1. Apakah pasien berjalan sempoyongan atau memakai alat bantu kursi roda?</p>
          <label>
            <input
              type="radio"
              value="0"
              checked={score1 === 0}
              onChange={() => setScore1(0)}
            />
            Tidak (Skor 0)
          </label>
          <label>
            <input
              type="radio"
              value="1"
              checked={score1 === 1}
              onChange={() => setScore1(1)}
            />
            Ya (Skor 1)
          </label>
        </div>

        {/* Pertanyaan 2 */}
        <div className="form-question">
          <p>2. Apakah pasien menopang saat akan duduk?</p>
          <label>
            <input
              type="radio"
              value="0"
              checked={score2 === 0}
              onChange={() => setScore2(0)}
            />
            Tidak (Skor 0)
          </label>
          <label>
            <input
              type="radio"
              value="1"
              checked={score2 === 1}
              onChange={() => setScore2(1)}
            />
            Ya (Skor 1)
          </label>
        </div>

        <h2>Form - Nutrisi</h2>
        <div className="form-question">
          <p>1. Penurunan berat badan terakhir?</p>
          <label>
            <input
              type="radio"
              value="1"
              checked={weightLossScore === 1}
              onChange={() => setWeightLossScore(1)}
            />
            1kg hingga 5kg (Skor 1)
          </label>
          <label>
            <input
              type="radio"
              value="2"
              checked={weightLossScore === 2}
              onChange={() => setWeightLossScore(2)}
            />
            6kg hingga 10kg (Skor 2)
          </label>
          <label>
            <input
              type="radio"
              value="3"
              checked={weightLossScore === 3}
              onChange={() => setWeightLossScore(3)}
            />
            11kg hingga 15kg (Skor 3)
          </label>
          <label>
            <input
              type="radio"
              value="4"
              checked={weightLossScore === 4}
              onChange={() => setWeightLossScore(4)}
            />
            Lebih dari 15kg (Skor 4)
          </label>
        </div>

        {/* Form 2: Nafsu Makan */}
        <div className="form-question">
          <p>2. Apakah nafsu makan berkurang?</p>
          <label>
            <input
              type="radio"
              value="0"
              checked={appetiteScore === 0}
              onChange={() => setAppetiteScore(0)}
            />
            Tidak (Skor 0)
          </label>
          <label>
            <input
              type="radio"
              value="1"
              checked={appetiteScore === 1}
              onChange={() => setAppetiteScore(1)}
            />
            Ya (Skor 1)
          </label>
        </div>

        <h4>Berdasarkan MST</h4>
        <div>
          {/* Radio Button */}
          {["tidak", "ya", "dm", "ginjal", "hi", "jantung", "paru", "stroke", "kanker", "imunitas", "geriatri", "lainnya"].map((key) => (
            <label key={key} style={{ display: "block", margin: "5px 0" }}>
              <input
                type="checkbox"
                value={key}
                checked={mstSelection.includes(key)}
                onChange={handleSelectionChange}
              />
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
          ))}
        </div>

        {/* Tampilkan input jika "Lainnya" dipilih */}
        {mstSelection.includes("lainnya") && (
          <div style={{ marginTop: "10px" }}>
            <input
              type="text"
              value={otherDetails}
              onChange={updateOtherDetails}
              placeholder="Sebutkan?"
              style={{
                padding: "5px",
                fontSize: "14px",
                width: "300px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </div>
        )}


        <h2>Form - Skrining Gizi Anak</h2>

        {/* Form 1: Apakah ada penyakit yang mengakibatkan pasien berisiko malnutrisi? */}
        <div className="form-question">
          <p>1. Apakah ada penyakit yang mengakibatkan pasien berisiko malnutrisi?</p>
          <label>
            <input
              type="radio"
              value="0"
              checked={diseaseRiskScore === 0}
              onChange={() => setDiseaseRiskScore(0)}
            />
            Tidak (Skor 0)
          </label>
          <label>
            <input
              type="radio"
              value="2"
              checked={diseaseRiskScore === 2}
              onChange={() => setDiseaseRiskScore(2)}
            />
            Ya (Skor 2)
          </label>
        </div>

        {/* Form 2: Apakah pasien berstatus gizi buruk? */}
        <div className="form-question">
          <p>2. Apakah pasien berstatus gizi buruk?</p>
          <label>
            <input
              type="radio"
              value="0"
              checked={malnutritionStatusScore === 0}
              onChange={() => setMalnutritionStatusScore(0)}
            />
            Tidak (Skor 0)
          </label>
          <label>
            <input
              type="radio"
              value="2"
              checked={malnutritionStatusScore === 2}
              onChange={() => setMalnutritionStatusScore(2)}
            />
            Ya (Skor 2)
          </label>
        </div>

        {/* Form 3: Apakah ada kondisi berikut? */}
        <div className="form-question">
          <p>3. Apakah ada kondisi berikut: Diare lebih dari 5x/hari, Asupan makan berkurang selama beberapa hari, mendapat intervensi gizi, ketidakcukupan asupan gizi karena sakit?</p>
          <label>
            <input
              type="radio"
              value="0"
              checked={nutritionConditionsScore === 0}
              onChange={() => setNutritionConditionsScore(0)}
            />
            Tidak (Skor 0)
          </label>
          <label>
            <input
              type="radio"
              value="1"
              checked={nutritionConditionsScore === 1}
              onChange={() => setNutritionConditionsScore(1)}
            />
            Ya (Skor 1)
          </label>
        </div>

        {/* Form 4: Apakah tidak ada penambahan berat badan atau terdapat penurunan dalam beberapa minggu dan beberapa bulan terakhir? */}
        <div className="form-question">
          <p>4. Apakah tidak ada penambahan berat badan atau terdapat penurunan dalam beberapa minggu dan beberapa bulan terakhir?</p>
          <label>
            <input
              type="radio"
              value="0"
              checked={weightChangeScore === 0}
              onChange={() => setWeightChangeScore(0)}
            />
            Tidak (Skor 0)
          </label>
          <label>
            <input
              type="radio"
              value="1"
              checked={weightChangeScore === 1}
              onChange={() => setWeightChangeScore(1)}
            />
            Ya (Skor 1)
          </label>
        </div>

        <h4>Pasien dengan Diagnosa Khusus Strong Kids</h4>
        <div>
          {/* Checkbox */}
          {["tidak", "ya", "dm", "ginjal", "hi", "jantung", "paru", "stroke", "kanker", "imunitas", "geriatri", "lainnya"].map((key) => (
            <label key={key} style={{ display: "block", margin: "5px 0" }}>
              <input
                type="checkbox"
                value={key}
                checked={strongKidsSelection.includes(key)}
                onChange={handleStrongKidsSelectionChange}
              />
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
          ))}
        </div>

        {/* Input untuk "Lainnya" */}
        {strongKidsSelection.includes("lainnya") && (
          <div style={{ marginTop: "10px" }}>
            <input
              type="text"
              value={otherStrongKidsDetails}
              onChange={handleStrongKidsOtherDetailsChange}
              placeholder="Sebutkan?"
              style={{
                padding: "5px",
                fontSize: "14px",
                width: "300px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </div>
        )}


        <h2>Form - Pain Scale</h2>
        {/* Pertanyaan Nyeri */}
        {/* Pertanyaan Nyeri */}
        <div className="form-question">
          <p>Apakah Anda merasakan nyeri?</p>
          <label>
            <input
              type="radio"
              value="no"
              checked={!isPain}
              onChange={() => setIsPain(false)}
            />
            Tidak
          </label>
          <label>
            <input
              type="radio"
              value="yes"
              checked={isPain}
              onChange={() => setIsPain(true)}
            />
            Ya
          </label>
        </div>

        {/* Jika Ya, tampilkan Skala Nyeri */}
        {isPain && (
          <div className="pain-scale">
            <p>Skala Nyeri (0-10)</p>
            <div className="pain-scale-radio-buttons">
              {[...Array(11).keys()].map((num) => (
                <label key={num}>
                  <input
                    type="radio"
                    value={num}
                    checked={painScale === num}
                    onChange={() => setPainScale(num)}
                  />
                  {num}
                </label>
              ))}
            </div>

            {/* Menampilkan kategori nyeri */}
            {painScale > 0 && (
              <p><strong>Kategori Nyeri: {painCategory}</strong></p>
            )}

            {/* Jika Nyeri antara 1-10, tampilkan form untuk lokasi, frekuensi, dan durasi */}
            {(painScale >= 1 && painScale <= 10) && (
              <div className="pain-details">
                <div className="form-question">
                  <p>Lokasi Nyeri</p>
                  <input
                    type="text"
                    value={painLocation}
                    onChange={(e) => setPainLocation(e.target.value)}
                    placeholder="Masukkan lokasi nyeri"
                  />
                </div>

                <div className="form-question">
                  <p>Frekunsi Nyeri</p>
                  <input
                    type="text"
                    value={painFrequency}
                    onChange={(e) => setPainFrequency(e.target.value)}
                    placeholder="Masukkan frekuensi nyeri"
                  />
                </div>

                <div className="form-question">
                  <p>Durasi Nyeri</p>
                  <input
                    type="text"
                    value={painDuration}
                    onChange={(e) => setPainDuration(e.target.value)}
                    placeholder="Masukkan durasi nyeri"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        <h4>Nyeri Hilang Jika?</h4>
        <div>
          {/* Checkbox untuk Minum Obat */}
          <label>
            <input
              type="checkbox"
              checked={selectedReliefs.minumObat}
              onChange={() => handleReliefChange('minumObat')}
            />
            Minum Obat
          </label>
          {/* Checkbox untuk Istirahat */}
          <label>
            <input
              type="checkbox"
              checked={selectedReliefs.istirahat}
              onChange={() => handleReliefChange('istirahat')}
            />
            Istirahat
          </label>
          {/* Checkbox untuk Mendengar Musik */}
          <label>
            <input
              type="checkbox"
              checked={selectedReliefs.mendengarMusik}
              onChange={() => handleReliefChange('mendengarMusik')}
            />
            Mendengar Musik
          </label>
          {/* Checkbox untuk Berubah Posisi Tidur */}
          <label>
            <input
              type="checkbox"
              checked={selectedReliefs.berubahPosisi}
              onChange={() => handleReliefChange('berubahPosisi')}
            />
            Berubah Posisi Tidur
          </label>
        </div>
      </form>




      {/* Signature Section */}
      <div className="signature-container">
        <div>
          <label style={{ display: "block", marginBottom: "10px" }}>
            Nama Petugas Medis:
            <input
              type="text"
              value={medicalOfficerName}
              onChange={handleNameChange}
              placeholder="Masukkan nama petugas medis"
              style={{
                padding: "5px",
                fontSize: "14px",
                width: "300px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                marginLeft: "10px",
              }}
            />
          </label>
        </div>
        <h4>Signature for Medical Personnel</h4>
        <SignatureCanvas ref={medicalSigCanvasRef} penColor="black" canvasProps={{ className: 'signature-canvas' }} />
        <div className="cppt-buttons">
          <button onClick={() => handleClearSignature(medicalSigCanvasRef, setMedicalSignature)}>Clear</button>
          <button onClick={() => handleSendSignature(medicalSigCanvasRef, setMedicalSignature)}>Send e-Sign</button>
        </div>
      </div>

      <div ref={certRef} className="cppt-certificate-container">
        <img src={AssImg} alt="Certificate" className="cppt-image" />
        <div className="overlay-text overlay-text--recipient-name" style={{ left: '520px', top: '21px' }}>{nomorRM}</div>
        <div className="overlay-text overlay-text--recipient-name" style={{ left: '520px', top: '44px' }}>{patientName}</div>
        <div className="overlay-text overlay-text--recipient-name" style={{ left: '520px', top: '68px' }}>{ageGender}</div>
        <div className="overlay-text overlay-text--recipient-name" style={{ left: '520px', top: '90px' }}>{address1}</div>
        <div style={{ marginTop: '20px', position: 'relative' }}>
          <div style={{ position: 'relative' }}>
            {selectedGender === 'lakiLaki' && (
              <p
                style={{
                  position: 'absolute',
                  left: genderPositions.lakiLaki.left,
                  top: genderPositions.lakiLaki.top,
                  fontWeight: 'bold',
                  fontSize: '16px',
                }}
              >
                <strong>✔️</strong>
              </p>
            )}
            {selectedGender === 'perempuan' && (
              <p
                style={{
                  position: 'absolute',
                  left: genderPositions.perempuan.left,
                  top: genderPositions.perempuan.top,
                  fontWeight: 'bold',
                  fontSize: '16px',
                }}
              >
                <strong>✔️</strong>
              </p>
            )}
          </div>
        </div>

        <div style={{ position: "relative", marginTop: "20px" }}>
          {room && (
            <div
              style={{
                position: "absolute",
                left: roomPosition.left,
                top: roomPosition.top,
                fontSize: "14px",
              }}
            >
              <strong></strong> {room}
            </div>
          )}
        </div>

        {/* Tampilkan hasil dengan posisi tetap */}
        <div style={{ position: "relative", marginTop: "20px" }}>
          {dataSource === "pasien" && (
            <div
              style={{
                position: "absolute",
                left: dataSourcePositions.pasien.left,
                top: dataSourcePositions.pasien.top,
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              <strong>✔️</strong>
            </div>
          )}
          {dataSource === "keluarga" && (
            <div
              style={{
                position: "absolute",
                left: dataSourcePositions.keluarga.left,
                top: dataSourcePositions.keluarga.top,
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              <strong>✔️</strong>
            </div>
          )}
          {dataSource === "lainnya" && otherSource && (
            <div
              style={{
                position: "absolute",
                left: dataSourcePositions.lainnya.left,
                top: dataSourcePositions.lainnya.top,
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              <strong>✔️ lainnya: </strong> {otherSource}
            </div>
          )}
        </div>


        <div style={{ position: "relative", marginTop: "20px" }}>
          {mainComplaint && (
            <div
              style={{
                position: "absolute",
                left: complaintPosition.left,
                top: complaintPosition.top,
                fontSize: "14px",
              }}
            >
              <strong></strong> {mainComplaint}
            </div>
          )}
        </div>

        {/* Tampilkan hasil dengan posisi tetap */}
        <div style={{ position: "relative", marginTop: "20px" }}>
          {Object.keys(physicalExam).map(
            (key) =>
              physicalExam[key] && (
                <div
                  key={key}
                  style={{
                    position: "absolute",
                    left: examPositions[key].left,
                    top: examPositions[key].top,
                    fontSize: "14px",
                  }}
                >
                  {physicalExam[key]}
                </div>
              )
          )}
        </div>


        <div style={{ marginTop: "20px", position: "relative" }}>
          {hospitalization === "tidak" && (
            <div
              style={{
                position: "absolute",
                left: hospitalizationPositions.tidak.left,
                top: hospitalizationPositions.tidak.top,
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              ✔️
            </div>
          )}
          {hospitalization === "ya" &&
            (hospitalizationDetails.diagnosis ||
              hospitalizationDetails.when ||
              hospitalizationDetails.where) && (
              <div
                style={{
                  position: "absolute",
                  left: hospitalizationPositions.ya.left,
                  top: hospitalizationPositions.ya.top,
                  fontSize: "16px",
                  display: "flex", // Flexbox untuk tampilan horizontal
                  gap: "10px", // Jarak antar elemen
                }}
              >
                {hospitalizationDetails.diagnosis && (
                  <span>✔️ YA, Diagnosa: {hospitalizationDetails.diagnosis}</span>
                )}
                {hospitalizationDetails.when && (
                  <span>Kapan: {hospitalizationDetails.when}</span>
                )}
                {hospitalizationDetails.where && (
                  <span>Di mana: {hospitalizationDetails.where}</span>
                )}
              </div>
            )}
        </div>




        <div
          className="overlay-text overlay-text--surgery-history"
          style={{
            left: surgeryHistory ? '340px' : '270px',
            top: surgeryHistory ? '550px' : '550px',
          }}
        >
          {surgeryHistory
            ? `✔️ Ya, Diagnosa: ${surgeryDescription}, Kapan: ${surgeryDate}, Di Mana: ${surgeryLocation}`
            : '✔️ '}
        </div>

        <div style={{ marginTop: "20px", position: "relative" }}>
          {recoveryStatus === "tidak" && (
            <div
              style={{
                position: "absolute",
                left: recoveryPositions.tidak.left,
                top: recoveryPositions.tidak.top,
                fontSize: "14px",
              }}
            >
              <strong>✔️</strong>
            </div>
          )}
          {recoveryStatus === "ya" && (
            <>
              <div
                style={{
                  position: "absolute",
                  left: recoveryPositions.ya.left,
                  top: recoveryPositions.ya.top,
                  fontSize: "14px",
                }}
              >
                <strong>✔️penyembuhan</strong>
              </div>
              {recoveryDetails && (
                <div
                  style={{
                    position: "absolute",
                    left: recoveryPositions.details.left,
                    top: recoveryPositions.details.top,
                    fontSize: "14px",
                  }}
                >
                  ✔️Ya, Obat:{recoveryDetails}
                </div>
              )}
            </>
          )}
        </div>

        {/* Menampilkan hasil dengan posisi yang bisa diatur */}
        <div style={{ marginTop: '20px' }}>
          {Object.keys(familyDiseases).filter(key => familyDiseases[key]).length > 0 ? (
            Object.keys(familyDiseases).filter(key => familyDiseases[key]).map((key, index) => (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  left: familyDiseasePositions[key]?.left || '0px',
                  top: familyDiseasePositions[key]?.top || '0px',
                  fontWeight: 'bold',
                  fontSize: '16px',
                }}
              >
                <strong>✔️</strong>
              </div>
            ))
          ) : (
            <p><strong></strong></p>
          )}
        </div>

        <div
          className="overlay-text overlay-text--history-illness"
          style={{
            // Mengatur posisi berdasarkan kondisi historyIllness
            left: historyIllness ? '340px' : '260px',  // Riwayat penyakit lalu
            top: historyIllness ? '510px' : '510px', // Sama untuk keduanya, bisa Anda sesuaikan
          }}
        >
          {historyIllness
            ? `✔️ Ya ${illnessDescription}`
            : '✔️ '}
        </div>

        {/* Menampilkan hasil dengan posisi yang bisa diatur */}
        <div style={{ marginTop: "30px", position: "relative" }}>
          {Object.keys(dependencies)
            .filter((key) => dependencies[key] && key !== "lainnya") // Menghindari "lainnya"
            .map((key, index) => (
              <div
                key={index}
                style={{
                  position: "absolute",
                  left: dependencyPositions[key]?.left || "0px",
                  top: dependencyPositions[key]?.top || "0px",
                  fontWeight: "bold",
                }}
              >
                <strong>✔️</strong>
              </div>
            ))}

          {/* Menampilkan detail jika "lainnya" dipilih */}
          {dependencies.lainnya && dependencyDetails && (
            <div
              style={{
                position: "absolute",
                left: dependencyPositions.dependencyDetails.left,
                top: dependencyPositions.dependencyDetails.top,
                fontWeight: "bold",
              }}
            >
              <strong>✔️Lainnya</strong> {dependencyDetails}
            </div>
          )}
        </div>

        <div style={{ marginTop: "20px", position: "relative" }}>
          {employmentHistory === "tidak" && (
            <div
              style={{
                position: "absolute",
                left: employmentPositions.tidak.left,
                top: employmentPositions.tidak.top,
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              <strong>✔️</strong>
            </div>
          )}
          {employmentHistory === "ya" && employmentDetails && (
            <div
              style={{
                position: "absolute",
                left: employmentPositions.employmentDetails.left,
                top: employmentPositions.employmentDetails.top,
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              <strong>✔️</strong> {employmentDetails}
            </div>
          )}
        </div>

        {/* Tampilkan hasil */}
        <div style={{ marginTop: "20px", position: "relative" }}>
          {allergyHistory === "tidak" && (
            <div
              style={{
                position: "absolute",
                left: allergyPositions.tidak.left,
                top: allergyPositions.tidak.top,
                fontSize: "14px",
              }}
            >
              <strong>✔️</strong>
            </div>
          )}
          {allergyHistory === "ya" && (
            <>
              {allergyDetails.obat && (
                <div
                  style={{
                    position: "absolute",
                    left: allergyPositions.obat.left,
                    top: allergyPositions.obat.top,
                    fontSize: "14px",
                  }}
                >
                  ✔️  Obat: {allergyDetails.obat}
                </div>
              )}
              {allergyDetails.makanan && (
                <div
                  style={{
                    position: "absolute",
                    left: allergyPositions.makanan.left,
                    top: allergyPositions.makanan.top,
                    fontSize: "14px",
                  }}
                >
                  ✔️ Makanan: {allergyDetails.makanan}
                </div>
              )}
              {allergyDetails.lainnya && (
                <div
                  style={{
                    position: "absolute",
                    left: allergyPositions.lainnya.left,
                    top: allergyPositions.lainnya.top,
                    fontSize: "14px",
                  }}
                >
                  ✔️ Lainnya: {allergyDetails.lainnya}
                </div>
              )}
            </>
          )}
        </div>

        <div style={{ marginTop: "20px", position: "relative" }}>
          {medicationHistory === "tidak" && (
            <div
              style={{
                position: "absolute",
                left: medicationPositions.tidak.left,
                top: medicationPositions.tidak.top,
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              <strong>✔️</strong>
            </div>
          )}
          {medicationHistory === "ya" && (
            <>
              <div
                style={{
                  position: "absolute",
                  left: medicationPositions.ya.left,
                  top: medicationPositions.ya.top,
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                <strong>✔️</strong>
              </div>
              {medicationDetails && (
                <div
                  style={{
                    position: "absolute",
                    left: medicationPositions.details.left,
                    top: medicationPositions.details.top,
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                >
                  <strong>Detail:</strong> {medicationDetails}
                </div>
              )}
            </>
          )}
        </div>

        <div style={{ marginTop: '20px', position: 'relative' }}>
          <div style={{ position: 'relative' }}>
            {psychologyHistory === 'cemas' && (
              <p
                style={{
                  position: 'absolute',
                  left: historyPositions.cemas.left,
                  top: historyPositions.cemas.top,
                  fontWeight: 'bold',
                  fontSize: '16px',
                }}
              >
                <strong>✔️</strong>
              </p>
            )}
            {psychologyHistory === 'takut' && (
              <p
                style={{
                  position: 'absolute',
                  left: historyPositions.takut.left,
                  top: historyPositions.takut.top,
                  fontWeight: 'bold',
                  fontSize: '16px',
                }}
              >
                <strong>✔️</strong>
              </p>
            )}
            {psychologyHistory === 'sedih' && (
              <p
                style={{
                  position: 'absolute',
                  left: historyPositions.sedih.left,
                  top: historyPositions.sedih.top,
                  fontWeight: 'bold',
                  fontSize: '16px',
                }}
              >
                <strong>✔️</strong>
              </p>
            )}
          </div>
        </div>


        <div style={{ marginTop: '20px', position: 'relative' }}>
          <div style={{ position: 'relative' }}>
            {relationshipStatus === 'tidakBaik' && (
              <p
                style={{
                  position: 'absolute',
                  left: statusPositions.tidakBaik.left,
                  top: statusPositions.tidakBaik.top,
                  fontWeight: 'bold',
                  fontSize: '16px',
                }}
              >
                <strong>✔️</strong>
              </p>
            )}
            {relationshipStatus === 'baikKerabat' && (
              <p
                style={{
                  position: 'absolute',
                  left: statusPositions.baikKerabat.left,
                  top: statusPositions.baikKerabat.top,
                  fontWeight: 'bold',
                  fontSize: '16px',
                }}
              >
                <strong>✔️</strong>
              </p>
            )}
          </div>
        </div>

        <div style={{ position: "relative", marginTop: "20px" }}>
          {contactDetails.name && (
            <div
              style={{
                position: "absolute",
                left: contactPositions.name.left,
                top: contactPositions.name.top,
                fontSize: "14px",
              }}
            >
              {contactDetails.name}
            </div>
          )}
          {contactDetails.relation && (
            <div
              style={{
                position: "absolute",
                left: contactPositions.relation.left,
                top: contactPositions.relation.top,
                fontSize: "14px",
              }}
            >
              {contactDetails.relation}
            </div>
          )}
          {contactDetails.phone && (
            <div
              style={{
                position: "absolute",
                left: contactPositions.phone.left,
                top: contactPositions.phone.top,
                fontSize: "14px",
              }}
            >
              {contactDetails.phone}
            </div>
          )}
        </div>

        <div style={{ position: "relative", marginTop: "20px" }}>
          {religiousActivity && (
            <div
              style={{
                position: "absolute",
                left: activityPosition.left,
                top: activityPosition.top,
                fontSize: "14px",
              }}
            >
              {religiousActivity}
            </div>
          )}
        </div>

        <div style={{ position: "relative", marginTop: "20px" }}>
          {Object.keys(selectedNeeds)
            .filter((key) => selectedNeeds[key])
            .map((key) => (
              <div
                key={key}
                style={{
                  position: "absolute",
                  left: needsPositions[key].left,
                  top: needsPositions[key].top,
                  fontSize: "14px",
                }}
              >
                ✔️
              </div>
            ))}
        </div>

        <div style={{ marginTop: "20px", position: "relative" }}>
          {translatorNeeded === "tidak" && (
            <div
              style={{
                position: "absolute",
                left: translatorPositions.tidak.left,
                top: translatorPositions.tidak.top,
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              ✔️
            </div>
          )}
          {translatorNeeded === "iya" && translatorDetails && (
            <div
              style={{
                position: "absolute",
                left: translatorPositions.iya.left,
                top: translatorPositions.iya.top,
                fontSize: "14px",
              }}
            >
              ✔️ Ya, {translatorDetails}
            </div>
          )}
        </div>

        <div style={{ marginTop: "20px", position: "relative" }}>
          {signLanguageNeeded === "tidak" && (
            <div
              style={{
                position: "absolute",
                left: signLanguagePositions.tidak.left,
                top: signLanguagePositions.tidak.top,
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              ✔️
            </div>
          )}
          {signLanguageNeeded === "iya" && (
            <div
              style={{
                position: "absolute",
                left: signLanguagePositions.iya.left,
                top: signLanguagePositions.iya.top,
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              ✔️
            </div>
          )}
        </div>

        <div style={{ marginTop: "20px", position: "relative" }}>
          {nursingAction === "rehabilitasi" && (
            <div
              style={{
                position: "absolute",
                left: actionPositions.rehabilitasi.left,
                top: actionPositions.rehabilitasi.top,
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              ✔️
            </div>
          )}
          {nursingAction === "managementNyeri" && (
            <div
              style={{
                position: "absolute",
                left: actionPositions.managementNyeri.left,
                top: actionPositions.managementNyeri.top,
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              ✔️
            </div>
          )}
          {nursingAction === "lainLain" && nursingActionDetails && (
            <div
              style={{
                position: "absolute",
                left: actionPositions.lainLain.left,
                top: actionPositions.lainLain.top,
                fontSize: "14px",
              }}
            >
              ✔️ Lainnya: {nursingActionDetails}
            </div>
          )}
        </div>


        <div className="form-result" style={{ position: 'relative', width: '400px', height: '200px' }}>
          {/* Hasil Skrining Risiko Jatuh Mengatur letak Detail Hasil */}
          <p style={{ position: 'absolute' }}></p>
          <ul style={{ position: 'relative', listStyleType: 'none', padding: 0 }}>
            <li style={{ position: 'absolute', left: '600px', top: '-1810px' }}>{result1}</li>
            <li style={{ position: 'absolute', left: '600px', top: '-1762px' }}>{result2}</li>
          </ul>
          {/* Menambahkan Total Skor dengan pengaturan posisi */}
          <p style={{ position: 'absolute', left: '600px', top: '-1688px' }}>{totalScore}</p>

          {/* Menambahkan Status Risiko dengan pengaturan posisi */}
          <p style={{ position: 'absolute', left: '600px', top: '-1648px' }}>{riskLevel}</p>
        </div>

        <div className="result-container" style={{ position: 'absolute', left: '300px', top: '600px' }}>
          <h4 style={{ position: 'absolute', left: '288px', top: '1290px' }}>{weightLossScore}</h4>
          <h4 style={{ position: 'absolute', left: '288px', top: '1390px' }}>{appetiteScore}</h4>
          <h4 style={{ position: 'absolute', left: '288px', top: '1478px' }}>{totalNutritionScore}</h4>
        </div>

        {/* Tampilkan hasil */}
        <div style={{ marginTop: "20px", position: "relative" }}>
          {mstSelection.map((key) => (
            <div
              key={key}
              style={{
                position: "absolute",
                left: mstPositions[key].left,
                top: mstPositions[key].top,
                fontSize: "14px",
              }}
            >
              {key === "lainnya" && otherDetails ? `✔️ ${otherDetails}` : "✔️"}
            </div>
          ))}
        </div>


        {/* Menampilkan Hasil */}
        <div className="result-container" style={{ position: 'absolute', left: '300px', top: '600px' }}>
          <h4 style={{ position: 'absolute', left: '288px', top: '1684px' }}>{diseaseRiskScore}</h4>
          <h4 style={{ position: 'absolute', left: '288px', top: '1730px' }}>{malnutritionStatusScore}</h4>
          <h4 style={{ position: 'absolute', left: '288px', top: '1800px' }}>{nutritionConditionsScore}</h4>
          <h4 style={{ position: 'absolute', left: '288px', top: '1880px' }}>{weightChangeScore}</h4>
          <h4 style={{ position: 'absolute', left: '288px', top: '1966px' }}>{totalChildNutritionScore}</h4>
        </div>

        <div style={{ marginTop: "20px", position: "relative" }}>
          {strongKidsSelection.map((key) => (
            <div
              key={key}
              style={{
                position: "absolute",
                left: strongKidsPositions[key].left,
                top: strongKidsPositions[key].top,
                fontSize: "14px",
              }}
            >
              {key === "lainnya" && otherStrongKidsDetails ? `✔️ ${otherStrongKidsDetails}` : "✔️"}
            </div>
          ))}
        </div>

        {/* Menampilkan hasil setelah pengisian */}
        <div className="pain-result">
          <h4 style={{ position: 'absolute', top: '100px', left: '50px' }}></h4>

          {!isPain ? (
            // Jika tidak ada nyeri
            <p style={{ position: 'absolute', top: '1450px', left: '150px' }}><strong>✔️</strong></p>
          ) : (
            // Jika ada nyeri
            <>
              <p style={{ position: 'absolute', top: '1630px', left: '270px' }}><strong></strong> {painScale}</p>
              <p style={{ position: 'absolute', top: '1630px', left: '290px' }}><strong></strong> {painCategory}</p>
              <p style={{ position: 'absolute', top: '1610px', left: '270px' }}><strong></strong> {painLocation || 'Belum diisi'}</p>
              <p style={{ position: 'absolute', top: '1610px', left: '420px' }}><strong></strong> {painFrequency || 'Belum diisi'}</p>
              <p style={{ position: 'absolute', top: '1610px', left: '544px' }}><strong></strong> {painDuration || 'Belum diisi'}</p>
            </>
          )}
        </div>

        <div style={{ marginTop: '20px', position: 'relative' }}>
          {/* Hasil Relief Nyeri */}
          <div style={{ position: 'relative' }}>
            {selectedReliefs.minumObat && (
              <p
                style={{
                  position: 'absolute',
                  left: positions.minumObat.left,
                  top: positions.minumObat.top,
                  fontWeight: 'bold',
                  fontSize: '16px',
                }}
              >
                <strong>✔️</strong>
              </p>
            )}
            {selectedReliefs.istirahat && (
              <p
                style={{
                  position: 'absolute',
                  left: positions.istirahat.left,
                  top: positions.istirahat.top,
                  fontWeight: 'bold',
                  fontSize: '16px',
                }}
              >
                <strong>✔️</strong>
              </p>
            )}
            {selectedReliefs.mendengarMusik && (
              <p
                style={{
                  position: 'absolute',
                  left: positions.mendengarMusik.left,
                  top: positions.mendengarMusik.top,
                  fontWeight: 'bold',
                  fontSize: '16px',
                }}
              >
                <strong>✔️</strong>
              </p>
            )}
            {selectedReliefs.berubahPosisi && (
              <p
                style={{
                  position: 'absolute',
                  left: positions.berubahPosisi.left,
                  top: positions.berubahPosisi.top,
                  fontWeight: 'bold',
                  fontSize: '16px',
                }}
              >
                <strong>✔️</strong>
              </p>
            )}
          </div>
        </div>


        <div className="overlay-text overlay-text--current-time" style={{ left: '34px', top: '110px' }}>{moment(selectedDate).format('DD/MM/YYYY')}</div>
        <div className="overlay-text overlay-text--current-time" style={{ left: '266px', top: '110px' }}>{moment(selectedDate).format('HH:mm')}</div>

        <div
          style={{
            position: "absolute",
            left: datetimePositions.date.left,
            top: datetimePositions.date.top,
            fontSize: "14px",
          }}
        >
          {currentDateTime.format("DD/MM/YYYY")}
        </div>

        {/* Tampilkan Jam */}
        <div
          style={{
            position: "absolute",
            left: datetimePositions.time.left,
            top: datetimePositions.time.top,
            fontSize: "14px",
          }}
        >
          {currentDateTime.format("HH:mm:ss")}
        </div>


        {medicalSignature && (
          <div className="overlay-text overlay-text--signature-display" style={{ left: '30px', top: '2816px' }}>
            <img src={medicalSignature} alt="Medical Personnel Signature" />
          </div>
        )}

        <div
          style={{
            position: "absolute",
            left: namePosition.left,
            top: namePosition.top,
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          {medicalOfficerName}
        </div>
      </div>
      <button onClick={handleDownload} className="ass-download-button">Download</button>
    </div >
  );
};

export default Ass;
