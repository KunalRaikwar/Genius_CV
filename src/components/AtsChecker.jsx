import React, { useState, useEffect } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, Loader2, Sparkles, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Polyfill for Promise.withResolvers required by pdfjs-dist
if (typeof Promise.withResolvers === 'undefined') {
  Promise.withResolvers = function () {
    let resolve, reject;
    const promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    return { promise, resolve, reject };
  };
}

import * as pdfjsLib from 'pdfjs-dist';
import pdfWorkerSrc from 'pdfjs-dist/build/pdf.worker.min.js?url';
import { analyzeATS } from '../utils/aiService';

// Set up the PDF.js worker using Vite's URL import
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerSrc;

export default function AtsChecker() {
  const [file, setFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  
  const loadingSteps = [
    "Extracting text from PDF...",
    "Analyzing document structure...",
    "Evaluating ATS compatibility...",
    "Cross-referencing industry keywords...",
    "Generating actionable suggestions..."
  ];
  const [loadingStepIndex, setLoadingStepIndex] = useState(0);

  useEffect(() => {
    let interval;
    if (isAnalyzing) {
      interval = setInterval(() => {
        setLoadingStepIndex((prev) => (prev + 1 < loadingSteps.length ? prev + 1 : prev));
      }, 2500);
    } else {
      setLoadingStepIndex(0);
    }
    return () => clearInterval(interval);
  }, [isAnalyzing]);

  const extractTextFromPDF = async (pdfFile) => {
    let pdfUrl = null;
    try {
      // Use Object URL instead of ArrayBuffer to avoid Safari ReadableStream bug
      pdfUrl = URL.createObjectURL(pdfFile);
      const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
      let fullText = '';
      
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(' ');
        fullText += pageText + '\n';
      }
      
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
      return fullText;
    } catch (err) {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
      console.error("PDF Extraction Error:", err);
      throw new Error(`PDF Error: ${err.message || 'Unknown extraction error'}`);
    }
  };

  const handleFileUpload = async (event) => {
    const uploadedFile = event.target.files[0];
    if (!uploadedFile) return;

    if (uploadedFile.type !== 'application/pdf') {
      setError("Please upload a valid PDF file.");
      return;
    }

    setFile(uploadedFile);
    setError(null);
    setResults(null);
    setIsAnalyzing(true);

    try {
      // 1. Extract Text
      const text = await extractTextFromPDF(uploadedFile);
      
      if (text.trim().length < 50) {
        throw new Error("Not enough text found in the PDF. Make sure it's not an image-only PDF.");
      }

      // 2. Analyze with Gemini
      const analysisData = await analyzeATS(text);
      setResults(analysisData);

    } catch (err) {
      setError(err.message || "An error occurred during analysis.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Function to calculate color based on score
  const getScoreColor = (score) => {
    if (score >= 80) return '#22c55e'; // Green
    if (score >= 50) return '#eab308'; // Yellow
    return '#ef4444'; // Red
  };

  return (
    <div className="container" style={{ paddingTop: '80px', paddingBottom: '4rem', minHeight: '100vh' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem', maxWidth: '800px', margin: '0 auto 3rem' }}>
        <h1 className="heading-lg" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <Sparkles className="text-gradient" size={36} /> ATS Resume Scanner
        </h1>
        <p className="text-secondary" style={{ fontSize: '1.1rem' }}>
          Upload your existing PDF resume to get an instant AI-powered Applicant Tracking System (ATS) score and actionable feedback.
        </p>
      </div>

      {!results && !isAnalyzing && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card" style={{ maxWidth: '600px', margin: '0 auto', padding: '3rem', textAlign: 'center', border: '2px dashed rgba(124, 58, 237, 0.3)' }}>
          <div style={{ width: '80px', height: '80px', background: 'rgba(124, 58, 237, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
            <Upload size={40} color="var(--accent-primary)" />
          </div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Upload your Resume</h3>
          <p className="text-secondary" style={{ marginBottom: '2rem' }}>PDF formats only. Max size 5MB.</p>
          
          <label className="btn btn-primary" style={{ display: 'inline-flex', cursor: 'pointer', padding: '0.75rem 2rem' }}>
            Select PDF File
            <input type="file" accept="application/pdf" onChange={handleFileUpload} style={{ display: 'none' }} />
          </label>

          {error && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', color: '#ef4444', marginTop: '1.5rem', padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px' }}>
              <AlertTriangle size={18} />
              <span>{error}</span>
            </div>
          )}
        </motion.div>
      )}

      {isAnalyzing && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', padding: '5rem 0' }}>
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
            style={{ display: 'inline-block', margin: '0 auto 1.5rem' }}
          >
            <Loader2 size={56} color="var(--accent-primary)" />
          </motion.div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Scanning your Resume...</h3>
          <AnimatePresence mode="wait">
            <motion.p 
              key={loadingStepIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-secondary"
              style={{ fontSize: '1.1rem' }}
            >
              {loadingSteps[loadingStepIndex]}
            </motion.p>
          </AnimatePresence>
        </motion.div>
      )}

      <AnimatePresence>
        {results && !isAnalyzing && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ maxWidth: '900px', margin: '0 auto' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <FileText size={24} color="var(--text-secondary)" />
                <h3 style={{ fontSize: '1.2rem', margin: 0 }}>{file?.name}</h3>
              </div>
              <button onClick={() => { setResults(null); setFile(null); }} className="btn btn-secondary">
                Scan Another Resume
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', alignItems: 'start' }}>
              
              {/* Score Card */}
              <div className="glass-card" style={{ padding: '3rem 2rem', textAlign: 'center' }}>
                <h4 style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Overall ATS Score</h4>
                
                <div style={{ position: 'relative', width: '180px', height: '180px', margin: '0 auto 1.5rem' }}>
                  <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                    {/* Background circle */}
                    <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                    {/* Progress circle */}
                    <motion.circle 
                      initial={{ strokeDasharray: "0 300" }}
                      animate={{ strokeDasharray: `${(results.score / 100) * 283} 300` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      cx="50" cy="50" r="45" 
                      fill="none" 
                      stroke={getScoreColor(results.score)} 
                      strokeWidth="8" 
                      strokeLinecap="round" 
                    />
                  </svg>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                    <span style={{ fontSize: '3.5rem', fontWeight: 900, color: getScoreColor(results.score) }}>
                      {results.score}
                    </span>
                    <span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>/ 100</span>
                  </div>
                </div>

                <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>
                  {results.score >= 80 ? 'Excellent! Highly ATS compatible.' : 
                   results.score >= 50 ? 'Good, but needs improvement.' : 
                   'Needs significant changes to pass ATS.'}
                </p>
              </div>

              {/* Details Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                
                {/* Missing Keywords */}
                <div className="glass-card" style={{ padding: '2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    <AlertCircle color="#eab308" />
                    <h4 style={{ fontSize: '1.2rem', margin: 0 }}>Missing Keywords</h4>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                    {results.missingKeywords && results.missingKeywords.length > 0 ? (
                      results.missingKeywords.map((kw, i) => (
                        <span key={i} style={{ background: 'rgba(234, 179, 8, 0.1)', color: '#eab308', border: '1px solid rgba(234, 179, 8, 0.3)', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.9rem' }}>
                          + {kw}
                        </span>
                      ))
                    ) : (
                      <p className="text-secondary">Your resume contains all standard expected keywords!</p>
                    )}
                  </div>
                </div>

                {/* Actionable Suggestions */}
                <div className="glass-card" style={{ padding: '2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    <CheckCircle color="var(--accent-primary)" />
                    <h4 style={{ fontSize: '1.2rem', margin: 0 }}>Actionable Suggestions</h4>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {results.suggestions && results.suggestions.map((suggestion, i) => (
                      <li key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(124, 58, 237, 0.1)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700, flexShrink: 0, marginTop: '2px' }}>
                          {i + 1}
                        </div>
                        <p style={{ color: 'var(--text-primary)', lineHeight: 1.5 }}>{suggestion}</p>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
