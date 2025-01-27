import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'; // Import components and functions from react-pdf

// Define styles for the PDF document
const styles = StyleSheet.create({
    page: {
      padding: 20,
      backgroundColor: 'white', 
    },
    title: {
      fontSize: 30,
      marginBottom: 20,
      textAlign: 'center',
      fontWeight: 'extrabold',
    },
    personalInfoContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between', 
      marginBottom: 10,
    },
    personalInfoItem: {
      fontSize: 12,
      marginBottom: 0,
      flexGrow: 1,
      textAlign: 'center', 
    },
    personalInfoLabel: {
        fontSize: 13,
        fontWeight: 'extrabold', 
    },
    personalInfoValue: {
      marginLeft: 5,
    },
    sectionTitle: {
      fontSize: 20,
      marginTop: 15,
      marginBottom: 5,
      fontWeight: 'bold',
      textDecorationLine: 'underline', 
    },
    sectionText: {
      fontSize: 12,
      marginBottom: 5,
      lineHeight: 1.4, 
    },
    skillsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap', 
      justifyContent: 'space-between', 
    },
    skillColumn: {
      width: '48%', 
      marginBottom: 10, 
    },
    skillText: {
      fontSize: 12, 
      lineHeight: 1.1, 
    },
});

// ResumeDocument component to generate a PDF resume using provided formData
const ResumeDocument = ({ formData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View>
        <Text style={styles.title}>{formData.title || "Your Resume Title"}</Text> {/* Display resume title */}

        {/* Personal Information in a Row */}
        <View style={styles.personalInfoContainer}>
          <Text style={styles.personalInfoItem}>
            <Text style={styles.personalInfoLabel}>Name:</Text>
            <Text style={styles.personalInfoValue}> {formData.personalInfo.name || "Your Name"}</Text>
          </Text>
          <Text style={styles.personalInfoItem}>
            <Text style={styles.personalInfoLabel}>Phone:</Text>
            <Text style={styles.personalInfoValue}> {formData.personalInfo.phone || "Your Phone"}</Text>
          </Text>
          <Text style={styles.personalInfoItem}>
            <Text style={styles.personalInfoLabel}>Email:</Text>
            <Text style={styles.personalInfoValue}> {formData.personalInfo.email || "Your Email"}</Text>
          </Text>
          <Text style={styles.personalInfoItem}>
            <Text style={styles.personalInfoLabel}>City:</Text>
            <Text style={styles.personalInfoValue}> {formData.personalInfo.city || "Your City"}</Text>
          </Text>
        </View>

        {/* Underline for Personal Info */}
        <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgrey', marginVertical: 10 }} />

        {/* Summary Section */}
        {formData.personalInfo.summary && formData.personalInfo.summary.trim() && (
          <>
            <Text style={styles.sectionTitle}>Summary</Text> {/* Summary section title */}
            <Text style={styles.sectionText}>{formData.personalInfo.summary}</Text> {/* Display summary content */}
            <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgrey', marginVertical: 10 }} />
          </>
        )}

        {/* Skills Preview */}
        {formData.skills.length > 0 && (
         <>
             <Text style={styles.sectionTitle}>Skills</Text> {/* Skills section title */}
           <View style={styles.skillsContainer}>
              {formData.skills.map((skill, idx) => (
               <Text key={idx} style={[styles.skillColumn, styles.skillText]}>
               • {skill.skillName} {/* Display each skill */}
             </Text>
             ))}
          </View>
       <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgrey', marginVertical: 10 }} />
       </>
     )}

        {/* Experience Preview */}
        {formData.experience.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Experience</Text> {/* Experience section title */}
            {formData.experience.map((exp, idx) => (
              <View key={idx} style={{ marginBottom: 10 }}>
                <Text style={styles.sectionText}><strong>{exp.jobTitle}</strong> at {exp.companyName}</Text> {/* Display job title and company name */}
                <Text style={styles.sectionText}>From: {new Date(exp.startDate).toLocaleDateString()} To: {new Date(exp.endDate).toLocaleDateString()}</Text> {/* Display employment dates */}
              </View>
            ))}
            <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgrey', marginVertical: 10 }} />
          </>
        )}

        {/* Education Preview */}
        {formData.education.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Education</Text> {/* Education section title */}
            {formData.education.map((edu, idx) => (
              <Text key={idx} style={styles.sectionText}>{edu.degree} from {edu.institution} ({edu.startDate && new Date(edu.startDate).getFullYear()} - {edu.endDate && new Date(edu.endDate).getFullYear()})</Text>
            ))}
            <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgrey', marginVertical: 10 }} />
          </>
        )}

        {/* Certifications Preview */}
        {formData.certifications.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Certifications</Text> {/* Certifications section title */}
            {formData.certifications.map((cert, idx) => (
              <Text key={idx} style={styles.sectionText}>{cert.certificationName} by {cert.by}</Text>
            ))}
            <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgrey', marginVertical: 10 }} />
          </>
        )}

        {/* Custom Sections Preview */}
        {formData.customSections.length > 0 && (
          <>
            {formData.customSections.map((section, idx) => (
              <View key={idx}>
                <Text style={styles.sectionTitle}>{section.sectionTitle}</Text> {/* Display custom section title */}
                <Text style={styles.sectionText}>{section.content}</Text> {/* Display custom section content */}
                <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgrey', marginVertical: 10 }} />
              </View>
            ))}
          </>
        )}
      </View>
    </Page>
  </Document>
);

export default ResumeDocument; 
