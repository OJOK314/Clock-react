import { useState } from "react";

function Calculator() {
  const [input, setInput] = useState("");

  const handleClick = (value) => setInput((prev) => prev + value);
  const handleClear = () => setInput("");
  const handleBackspace = () => setInput(input.slice(0, -1));
  const handleCalculate = () => {
    try {
      // eslint-disable-next-line no-eval
      setInput(eval(input).toString());
    } catch {
      setInput("Error");
    }
  };

  const styles = {
    container: {
      background: "linear-gradient(135deg, #1e293b, #0f172a)",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "Poppins, sans-serif",
      margin: 0,
    },
    calculator: {
      background: "rgba(255, 255, 255, 0.08)",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255, 255, 255, 0.15)",
      borderRadius: "20px",
      padding: "25px",
      width: "320px",
      boxShadow: "0 8px 30px rgba(0, 0, 0, 0.4)",
      textAlign: "center",
      transition: "transform 0.3s ease",
    },
    title: {
      color: "#e2e8f0",
      fontSize: "1.3rem",
      marginBottom: "15px",
    },
    display: {
      width: "100%",
      height: "60px",
      backgroundColor: "#0f172a",
      color: "#fff",
      fontSize: "1.6rem",
      textAlign: "right",
      border: "none",
      borderRadius: "10px",
      padding: "10px 15px",
      marginBottom: "20px",
      outline: "none",
      boxShadow: "inset 0 2px 6px rgba(0,0,0,0.3)",
    },
    buttons: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "10px",
    },
    button: {
      fontSize: "1.2rem",
      padding: "15px",
      border: "none",
      borderRadius: "10px",
      backgroundColor: "#334155",
      color: "#f8fafc",
      cursor: "pointer",
      transition: "all 0.2s ease",
      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.25)",
    },
    clear: {
      backgroundColor: "#dc2626",
    },
    equal: {
      backgroundColor: "#2563eb",
    },
    zero: {
      gridColumn: "span 2",
    },
  };

  // helper for hover effect
  const hoverStyle = (color) => ({
    backgroundColor: color,
    transform: "translateY(-2px)",
  });

  return (
    <div style={styles.container}>
      <div
        style={styles.calculator}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
      >
        <h2 style={styles.title}>🧮 Alfred Calculator</h2>
        <input
          type="text"
          value={input}
          style={styles.display}
          readOnly
          placeholder="0"
        />
        <div style={styles.buttons}>
          <button
            style={{ ...styles.button, ...styles.clear }}
            onMouseOver={(e) => Object.assign(e.target.style, hoverStyle("#b91c1c"))}
            onMouseOut={(e) => Object.assign(e.target.style, styles.clear)}
            onClick={handleClear}
          >
            C
          </button>
          <button
            style={styles.button}
            onClick={handleBackspace}
            onMouseOver={(e) => Object.assign(e.target.style, hoverStyle("#475569"))}
            onMouseOut={(e) => Object.assign(e.target.style, styles.button)}
          >
            ⌫
          </button>
          <button
            style={styles.button}
            onClick={() => handleClick("%")}
            onMouseOver={(e) => Object.assign(e.target.style, hoverStyle("#475569"))}
            onMouseOut={(e) => Object.assign(e.target.style, styles.button)}
          >
            %
          </button>
          <button
            style={styles.button}
            onClick={() => handleClick("/")}
            onMouseOver={(e) => Object.assign(e.target.style, hoverStyle("#475569"))}
            onMouseOut={(e) => Object.assign(e.target.style, styles.button)}
          >
            ÷
          </button>

          {["7", "8", "9", "*", "4", "5", "6", "-", "1", "2", "3", "+"].map(
            (val) => (
              <button
                key={val}
                style={styles.button}
                onClick={() => handleClick(val)}
                onMouseOver={(e) =>
                  Object.assign(e.target.style, hoverStyle("#475569"))
                }
                onMouseOut={(e) =>
                  Object.assign(e.target.style, styles.button)
                }
              >
                {val === "*" ? "×" : val === "-" ? "−" : val}
              </button>
            )
          )}

          <button
            style={{ ...styles.button, ...styles.zero }}
            onClick={() => handleClick("0")}
            onMouseOver={(e) => Object.assign(e.target.style, hoverStyle("#475569"))}
            onMouseOut={(e) => Object.assign(e.target.style, { ...styles.button, ...styles.zero })}
          >
            0
          </button>
          <button
            style={styles.button}
            onClick={() => handleClick(".")}
            onMouseOver={(e) => Object.assign(e.target.style, hoverStyle("#475569"))}
            onMouseOut={(e) => Object.assign(e.target.style, styles.button)}
          >
            .
          </button>
          <button
            style={{ ...styles.button, ...styles.equal }}
            onMouseOver={(e) => Object.assign(e.target.style, hoverStyle("#1d4ed8"))}
            onMouseOut={(e) => Object.assign(e.target.style, styles.equal)}
            onClick={handleCalculate}
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
