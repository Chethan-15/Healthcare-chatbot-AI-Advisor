import React, { useState } from 'react';
import './ChatCheckup.css';

const ChatCheckup = () => {
    const [symptoms, setSymptoms] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [activeModal, setActiveModal] = useState(null);

    const startSpeechRecognition = () => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            recognition.lang = 'en-US';

            recognition.onstart = () => {
                // Optional: show listening state
            };

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setSymptoms(transcript);
            };

            recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                alert('Error with speech recognition. Please type your symptoms.');
            };

            recognition.start();
        } else {
            alert('Speech recognition is not supported in this browser.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!symptoms.trim()) return;

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await fetch('http://localhost:5000/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ symptoms }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Something went wrong');
            }

            setResult(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const openModal = (type) => setActiveModal(type);
    const closeModal = () => setActiveModal(null);

    return (
        <div className="chat-page-body">
            <div className="container">
                <h1 className="text-center mb-5 font-bold text-4xl" style={{ color: '#e0f7fa' }}>Health Care Chatbot</h1>

                <div className="custom-container">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="symptoms" className="block mb-2 font-bold">Enter Symptoms</label>
                            <input
                                type="text"
                                className="form-control-dark"
                                id="symptoms"
                                placeholder="e.g. itching, coughing, aching"
                                value={symptoms}
                                onChange={(e) => setSymptoms(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <button
                                type="button"
                                onClick={startSpeechRecognition}
                                className="btn-cyan"
                            >
                                Start Speech Recognition
                            </button>
                        </div>

                        {error && <p className="text-red-500 mb-3">{error}</p>}

                        <button type="submit" className="btn-red" disabled={loading}>
                            {loading ? 'Predicting...' : 'Predict'}
                        </button>
                    </form>
                </div>

                {result && (
                    <div className="results-section">
                        <h2 className="mb-4 text-3xl font-bold">AI Diagnosis Results</h2>
                        <div className="flex flex-wrap justify-center gap-3">
                            <button className="toggle-button" onClick={() => openModal('disease')}>Disease</button>
                            <button className="toggle-button" onClick={() => openModal('description')}>Description</button>
                            <button className="toggle-button" onClick={() => openModal('precautions')}>Precautions</button>
                            <button className="toggle-button" onClick={() => openModal('medications')}>Medications</button>
                            <button className="toggle-button" onClick={() => openModal('workouts')}>Workouts</button>
                            <button className="toggle-button" onClick={() => openModal('diets')}>Diets</button>
                        </div>
                    </div>
                )}

                {/* Modal Logic */}
                {activeModal && result && (
                    <div className="modal-overlay" onClick={closeModal}>
                        <div className="modal-content-dark" onClick={e => e.stopPropagation()}>
                            <div className="modal-header-dark">
                                <h5 className="text-xl font-bold">
                                    {activeModal === 'disease' && 'Predicted Disease'}
                                    {activeModal === 'description' && 'Description'}
                                    {activeModal === 'precautions' && 'Precautions'}
                                    {activeModal === 'medications' && 'Medications'}
                                    {activeModal === 'workouts' && 'Workouts'}
                                    {activeModal === 'diets' && 'Diets'}
                                </h5>
                                <button className="btn-close-dark" onClick={closeModal}>&times;</button>
                            </div>
                            <div className="modal-body-dark">
                                {activeModal === 'disease' && <p className="text-2xl font-bold text-center">{result.disease}</p>}
                                {activeModal === 'description' && <p>{result.description}</p>}
                                {activeModal === 'precautions' && (
                                    <ul className="list-disc pl-5">
                                        {result.precautions.map((item, i) => <li key={i}>{item}</li>)}
                                    </ul>
                                )}
                                {activeModal === 'medications' && (
                                    <ul className="list-disc pl-5">
                                        {Array.isArray(result.medications) ? result.medications.map((item, i) => <li key={i}>{item}</li>) : <li>{result.medications}</li>}
                                    </ul>
                                )}
                                {activeModal === 'workouts' && (
                                    <ul className="list-disc pl-5">
                                        {/* The API returns 'workout' as a key, check main.py helper return. 
                        helper returns: desc, pre, med, die, wrkout.
                        wrkout comes from workout_df.
                        Usually single text or list? main.py logic:
                        wrkout = workout[workout['disease'] == dis]['workout']
                        return ..., wrkout
                        So it might be a series/list.
                    */}
                                        {Array.isArray(result.workout) ? result.workout.map((item, i) => <li key={i}>{item}</li>) : <li>{result.workout}</li>}
                                    </ul>
                                )}
                                {activeModal === 'diets' && (
                                    <ul className="list-disc pl-5">
                                        {Array.isArray(result.diet) ? result.diet.map((item, i) => <li key={i}>{item}</li>) : <li>{result.diet}</li>}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatCheckup;
