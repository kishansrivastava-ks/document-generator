import { useState } from "react";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";

const DocumentGenerator = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [template, setTemplate] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTemplateUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        setTemplate(content);
        setError(null);
      };
      reader.onerror = () => {
        setError("Error reading the template file");
      };
      reader.readAsBinaryString(file);
    }
  };

  const generateDocument = async () => {
    if (!template) {
      setError("Please upload a template first");
      return;
    }

    try {
      // Create a new instance of PizZip
      const zip = new PizZip(template);

      // Create Docxtemplater instance with error handler
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });

      console.log("Data being rendered:", formData); // Debug log

      // Render the document with form data
      doc.render(formData);

      // Generate output
      const out = doc.getZip().generate({
        type: "blob",
        mimeType:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      // Trigger download
      saveAs(out, `generated-document-${formData.name}.docx`);
      setError(null);
    } catch (error) {
      console.error("Template error:", error);
      if (error.properties && error.properties.errors) {
        const errorMessages = error.properties.errors
          .map(
            (error) =>
              `Field: ${error.properties.name}, Error: ${error.message}`
          )
          .join("\n");
        setError(`Template errors: \n${errorMessages}`);
      } else {
        setError("Error generating document: " + error.message);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await generateDocument();
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      maxWidth: "600px",
      margin: "40px auto",
      padding: "20px",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      borderRadius: "8px",
      backgroundColor: "white",
    },
    title: {
      textAlign: "center",
      marginBottom: "20px",
      color: "#333",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "5px",
    },
    label: {
      fontWeight: "bold",
      color: "#555",
    },
    input: {
      padding: "8px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "16px",
    },
    button: {
      padding: "10px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "16px",
    },
    disabledButton: {
      backgroundColor: "#cccccc",
      cursor: "not-allowed",
    },
    error: {
      color: "red",
      marginTop: "10px",
      padding: "10px",
      backgroundColor: "#fff5f5",
      borderRadius: "4px",
      whiteSpace: "pre-line",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Document Generator</h1>

      <div style={styles.formGroup}>
        <label style={styles.label}>Upload Template (.docx)</label>
        <input
          type="file"
          accept=".docx"
          onChange={handleTemplateUpload}
          style={styles.input}
        />
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Full Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="John Doe"
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Address</label>
          <input
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="123 Main St, City, Country"
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Phone Number</label>
          <input
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="+1 234 567 8900"
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="john@example.com"
            required
            style={styles.input}
          />
        </div>

        <button
          type="submit"
          disabled={loading || !template}
          style={{
            ...styles.button,
            ...(loading || !template ? styles.disabledButton : {}),
          }}
        >
          {loading ? "Generating..." : "Generate Document"}
        </button>
      </form>

      {error && <div style={styles.error}>{error}</div>}
    </div>
  );
};

export default DocumentGenerator;
