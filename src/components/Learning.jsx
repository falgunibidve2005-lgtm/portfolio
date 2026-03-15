import { motion } from 'framer-motion'
import './Learning.css'

const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
}

const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15
        }
    }
}

const learningItems = [
    {
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20V10" />
                <path d="M18 20V4" />
                <path d="M6 20v-4" />
            </svg>
        ),
        title: 'Data Structures & Algorithms',
        description: 'Deepening algorithmic thinking to write more efficient and optimized code solutions'
    },
    {
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
            </svg>
        ),
        title: 'React & Modern Frontend',
        description: 'Expanding React skills to build more complex and interactive web applications'
    },
    {
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
        ),
        title: 'Japanese Language',
        description: 'Learning Japanese to enhance international communication and collaboration skills'
    },
    {
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <ellipse cx="12" cy="5" rx="9" ry="3" />
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
            </svg>
        ),
        title: 'Database Design & Optimization',
        description: 'Exploring advanced SQL query optimization and database schema design patterns'
    }
]

function Learning() {
    return (
        <section className="learning section" id="learning">
            <div className="container">
                <div className="learning-content">
                    <motion.div 
                        className="learning-text"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={staggerVariants}
                    >
                        <motion.h2 variants={fadeUpVariants}>What I'm Currently Working On</motion.h2>
                        <motion.p variants={fadeUpVariants}>
                            I believe in continuous improvement. Here's what I'm focused on right now
                            to grow as a developer and communicator.
                        </motion.p>

                        <div className="learning-items">
                            {learningItems.map((item, index) => (
                                <motion.div variants={fadeUpVariants} className="learning-item" key={index}>
                                    <div className="learning-item-icon">{item.icon}</div>
                                    <div className="learning-item-content">
                                        <h4>{item.title}</h4>
                                        <p>{item.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div 
                        className="learning-visual"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={fadeUpVariants}
                    >
                        <div className="learning-card">
                            <p className="learning-quote">
                                "The best engineers I know aren't the ones who know everything —
                                they're the ones who <span>never stop learning</span> and aren't afraid
                                to say 'I don't know, but I'll figure it out.'"
                            </p>
                            <div className="learning-author">
                                <div className="learning-author-avatar">F</div>
                                <div className="learning-author-info">
                                    <h5>My Philosophy</h5>
                                    <p>Growth over perfection</p>
                                </div>
                            </div>
                        </div>

                        {/* Internship callout */}
                        <div className="internship-card">
                            <div className="internship-header">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                                </svg>
                                <span>Industry Experience</span>
                            </div>
                            <h4>Industrial Trainee — Web Development</h4>
                            <p>Sumago Infotech Pvt. Ltd., Nashik</p>
                            <span className="internship-period">June 2023 – July 2023 · 6 Weeks</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default Learning
