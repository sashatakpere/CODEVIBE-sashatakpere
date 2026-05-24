import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const DBMSLesson12 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();
  const handleSuccess = () => setIsCorrect(true);

  // Social Share Handlers
  const shareOnTwitter = () => {
    const text = encodeURIComponent("🎯 Just mastered Advanced SQL queries, Joins, and Database Management Systems on CodeVibe! 💾📊 Backend data handling feels solid now! #GSSoC26");
    const url = encodeURIComponent(window.location.origin);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
  };

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(window.location.origin);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
  };

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 12: Mini Project - Library Management System</h1>

      <div className="lesson-content">
        <p>
          Combine all learned DBMS concepts:
          CREATE tables, INSERT books/students, UPDATE prices, SELECT queries, and JOINs.
        </p>
      </div>

      <pre className="instructions">
{`Task:
1. Create Books & Students tables.
2. Insert 3 books & 3 students.
3. Show student names & the book they borrowed using JOIN.`}
      </pre>

      <Compiler
        hint="💡 Hint: 1. Create Books & Students tables. 2. Insert 3 books & 3 students."
        LessonId="dbms-lesson-12"
        language="sql"
        initialCode={`-- Write your SQL code here
CREATE TABLE Books(id INT PRIMARY KEY, title VARCHAR(50), price INT);
CREATE TABLE Students(id INT PRIMARY KEY, name VARCHAR(50), book_id INT, FOREIGN KEY(book_id) REFERENCES Books(id));
INSERT INTO Books VALUES(1,'C Programming',500),(2,'Java Basics',600),(3,'DBMS',550);
INSERT INTO Students VALUES(1,'Alice',1),(2,'Bob',2),(3,'Charlie',3);
SELECT Students.name, Books.title FROM Students INNER JOIN Books ON Students.book_id = Books.id;`}
        expectedOutput={`alice`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <div style={{ marginTop: '20px' }} className="success-action-container">
          <div>
            <Link to="/Certificate" className="next-lesson" style={{ fontWeight: "bold", fontSize: "18px", color: "green", display: "block", marginBottom: "15px" }}>
              ✅ COURSE COMPLETED
            </Link>
          </div>

          {/* Social Share Buttons Block */}
          <div className="share-buttons-block" style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <button 
              onClick={shareOnTwitter} 
              style={{
                backgroundColor: "#1DA1F2",
                color: "white",
                padding: "8px 16px",
                borderRadius: "6px",
                border: "none",
                fontWeight: "600",
                cursor: "pointer",
                transition: "background-color 0.2s"
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = "#1a91da"}
              onMouseOut={(e) => e.target.style.backgroundColor = "#1DA1F2"}
            >
              Share on Twitter 🐦
            </button>
            <button 
              onClick={shareOnLinkedIn} 
              style={{
                backgroundColor: "#0077B5",
                color: "white",
                padding: "8px 16px",
                borderRadius: "6px",
                border: "none",
                fontWeight: "600",
                cursor: "pointer",
                transition: "background-color 0.2s"
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = "#00669b"}
              onMouseOut={(e) => e.target.style.backgroundColor = "#0077B5"}
            >
              Share on LinkedIn 💼
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DBMSLesson12;