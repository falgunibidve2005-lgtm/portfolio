import { motion } from 'framer-motion'
import './About.css'

const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
}

const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
}

const education = [
    {
        degree: 'B.E Computer Engineering',
        institution: 'International Institute of Information Technology, Pune',
        period: 'Currently Pursuing',
        grade: null,
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
        )
    },
    {
        degree: 'Diploma in Computer Engineering',
        institution: 'First Class with Distinction',
        period: '2021 – 2024',
        grade: '91.43%',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /><path d="M16 13H8" /><path d="M16 17H8" /><path d="M10 9H8" />
            </svg>
        )
    },
    {
        degree: 'SSC (10th Grade)',
        institution: 'Canossa Convent High School',
        period: null,
        grade: '85.40%',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
            </svg>
        )
    }
]

function About() {
    return (
        <section className="about section" id="about">
            <div className="container">
                <div className="about-grid">
                    {/* Main Content */}
                    <div className="about-content">
                        <motion.div 
                            className="about-intro"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={fadeUpVariants}
                        >
                            <h2>About Me</h2>
                            <p className="about-lead">
                                Aspiring <em>Full Stack Developer</em> with a passion for building meaningful software.
                            </p>
                        </motion.div>

                        <motion.div 
                            className="about-philosophy"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={fadeUpVariants}
                        >
                            <p>
                                I'm a Computer Engineering student with strong foundations in Data Structures,
                                Web Development, and Database Systems. I enjoy building web applications using
                                modern frontend and backend technologies.
                            </p>
                            <p>
                                Experienced in developing full-stack projects using HTML, CSS, JavaScript, React,
                                PHP, and SQL. I've also completed an industry internship at Sumago Infotech,
                                where I gained hands-on exposure to real-world development workflows.
                            </p>
                            <p>
                                Currently pursuing Japanese language to expand my international communication skills —
                                because great engineers communicate across any boundary.
                            </p>
                        </motion.div>

                        {/* Education Cards */}
                        <motion.div 
                            className="about-approach"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={staggerVariants}
                        >
                            <motion.h3 variants={fadeUpVariants}>Education</motion.h3>
                            <div className="approach-cards education-cards">
                                {education.map((edu, index) => (
                                    <motion.div variants={fadeUpVariants} className="approach-card edu-card" key={index}>
                                        <div className="approach-icon">{edu.icon}</div>
                                        <div className="edu-card-body">
                                            <h4>{edu.degree}</h4>
                                            <p>{edu.institution}</p>
                                            <div className="edu-meta">
                                                {edu.period && <span className="edu-period">{edu.period}</span>}
                                                {edu.grade && <span className="edu-grade">{edu.grade}</span>}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Sidebar */}
                    <motion.aside 
                        className="about-sidebar"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={fadeUpVariants}
                    >
                        <div className="about-snapshot card">
                            <h3>Quick Snapshot</h3>
                            <dl className="snapshot-list">
                                <div className="snapshot-item">
                                    <dt>Specialization</dt>
                                    <dd>Full Stack Dev</dd>
                                </div>
                                <div className="snapshot-item">
                                    <dt>Education</dt>
                                    <dd>B.E. Computer Eng.</dd>
                                </div>
                                <div className="snapshot-item">
                                    <dt>Experience</dt>
                                    <dd>Sumago Intern</dd>
                                </div>
                                <div className="snapshot-item">
                                    <dt>Languages</dt>
                                    <dd>English, Marathi, Japanese (Learning)</dd>
                                </div>
                            </dl>
                        </div>

                        <div className="about-quote">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="quote-icon">
                                <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 2.5 1 4.5 4 6" />
                                <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 2.5 1 4.5 4 6" />
                            </svg>
                            <blockquote>
                                "Passionate about building efficient software solutions that solve real-world problems through clean code and modern architecture."
                            </blockquote>
                            <cite>— Falguni Bidave</cite>
                        </div>
                    </motion.aside>
                </div>
            </div>
        </section>
    )
}

export default About
